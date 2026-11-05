import { describe, expect, it } from 'vitest'
import { formatDate, formatDuration, formatPrice, formatTime } from './format'

describe('formatDate', () => {
  it('mostra o dia da semana e o dia/mês em português', () => {
    expect(formatDate('2026-11-12T10:00:00Z')).toBe('quinta, 12/11')
  })
})

describe('formatTime', () => {
  it('mostra a hora de Lisboa no inverno (UTC+0)', () => {
    expect(formatTime('2026-11-12T10:00:00Z')).toBe('10:00')
  })

  it('mostra a hora de Lisboa no verão (UTC+1)', () => {
    expect(formatTime('2026-07-01T10:00:00Z')).toBe('11:00')
  })
})

describe('formatDuration', () => {
  it.each([
    [30, '30 min'],
    [60, '1h'],
    [90, '1h30'],
    [65, '1h05'],
    [480, '8h'],
  ])('%i minutos -> "%s"', (minutes, expected) => {
    expect(formatDuration(minutes)).toBe(expected)
  })
})

describe('formatPrice', () => {
  it('converte cêntimos em euros com vírgula decimal', () => {
    // O Intl separa o valor do símbolo com um espaço não separável (U+00A0).
    expect(formatPrice(4500)).toBe('45,00\u00a0€')
  })
})
