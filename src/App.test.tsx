import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { jobs } from './data'

// Timers falsos: os testes avançam o relógio em vez de esperar 1s real.
beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

function renderLoadedApp() {
  render(<App />)
  act(() => {
    vi.advanceTimersByTime(1000)
  })
  // Com os dados carregados, volta aos timers reais: o user-event espera por
  // timers internos que, com o relógio parado, nunca disparavam.
  vi.useRealTimers()
  return userEvent.setup()
}

// O jsdom não aplica o CSS, por isso a tabela e os cards existem os dois no DOM.
// Os testes olham para a tabela, para cada pedido aparecer uma só vez.
function getAcceptButtons() {
  return within(screen.getByRole('table')).getAllByRole('button', { name: /^Aceitar/ })
}

describe('App', () => {
  it('mostra o estado de carregamento durante 1 segundo e depois os pedidos', () => {
    render(<App />)
    expect(screen.getByRole('status')).toHaveTextContent('A carregar pedidos…')

    act(() => {
      vi.advanceTimersByTime(999)
    })
    expect(screen.queryByRole('table')).not.toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(getAcceptButtons()).toHaveLength(jobs.length)
  })

  it('filtra os pedidos por cidade', async () => {
    const user = renderLoadedApp()
    const cityFilter = screen.getByRole('combobox', { name: 'Cidade' })

    await user.selectOptions(cityFilter, 'Porto')
    const buttons = getAcceptButtons()
    expect(buttons).toHaveLength(jobs.filter((job) => job.city === 'Porto').length)
    for (const button of buttons) {
      expect(button).toHaveAccessibleName(/em Porto$/)
    }

    await user.selectOptions(cityFilter, 'Todas')
    expect(getAcceptButtons()).toHaveLength(jobs.length)
  })

  it('remove o pedido da lista ao aceitar', async () => {
    const user = renderLoadedApp()
    const name = 'Aceitar pedido de Pintura em Braga'

    await user.click(within(screen.getByRole('table')).getByRole('button', { name }))

    // Sai das duas vistas, não só da tabela.
    expect(screen.queryByRole('button', { name })).not.toBeInTheDocument()
    expect(getAcceptButtons()).toHaveLength(jobs.length - 1)
  })

  it('indica a cidade quando o filtro fica sem pedidos e permite ver todas', async () => {
    const user = renderLoadedApp()
    const cityFilter = screen.getByRole('combobox', { name: 'Cidade' })

    await user.selectOptions(cityFilter, 'Braga')
    await user.click(getAcceptButtons()[0])

    expect(screen.getByText('Não há pedidos disponíveis em Braga.')).toBeInTheDocument()
    expect(cityFilter).toHaveValue('Braga')

    await user.click(screen.getByRole('button', { name: 'Ver todas as cidades' }))
    expect(cityFilter).toHaveValue('')
    expect(getAcceptButtons()).toHaveLength(jobs.length - 1)
  })

  it('mostra uma mensagem geral quando já não há pedidos', async () => {
    const user = renderLoadedApp()

    for (let i = 0; i < jobs.length; i++) {
      await user.click(getAcceptButtons()[0])
    }

    expect(screen.getByText('Não há pedidos disponíveis de momento.')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Ver todas as cidades' })).not.toBeInTheDocument()
  })
})
