import type { JobRequest } from '../types'

type AcceptButtonProps = {
  job: JobRequest
  onAccept: (id: string) => void
  // Classes extra de posição ou largura, consoante onde o botão é usado.
  className?: string
}

export function AcceptButton({ job, onAccept, className = '' }: AcceptButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onAccept(job.id)}
      // Vários botões "Aceitar" iguais não dizem nada a um leitor de ecrã: o nome inclui o pedido.
      aria-label={`Aceitar pedido de ${job.service} em ${job.city}`}
      className={`rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${className}`}
    >
      Aceitar
    </button>
  )
}
