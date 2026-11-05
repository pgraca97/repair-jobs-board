import { formatDate, formatDuration, formatPrice, formatTime } from '../format'
import type { JobRequest } from '../types'
import { AcceptButton } from './AcceptButton'
import { UrgentBadge } from './UrgentBadge'

type JobCardListProps = {
  jobs: JobRequest[]
  onAccept: (id: string) => void
}

export function JobCardList({ jobs, onAccept }: JobCardListProps) {
  return (
    // Uma lista: o leitor de ecrã anuncia quantos pedidos há e deixa saltar entre eles.
    <ul className="space-y-3">
      {jobs.map((job) => (
        <li key={job.id} className="rounded-lg border border-gray-200 p-4">
          <h2 className="font-medium">
            {job.service}
            {job.urgent && <UrgentBadge />}
          </h2>
          {/* Sem cabeçalhos de coluna, cada valor precisa da sua etiqueta: pares <dt>/<dd>. */}
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
            <dt className="text-gray-500">Cidade</dt>
            <dd>{job.city}</dd>
            <dt className="text-gray-500">Data</dt>
            <dd>
              <time dateTime={job.startsAt}>
                {formatDate(job.startsAt)} às {formatTime(job.startsAt)}
              </time>
            </dd>
            <dt className="text-gray-500">Duração</dt>
            <dd>{formatDuration(job.durationMin)}</dd>
            <dt className="text-gray-500">Valor</dt>
            <dd className="font-medium tabular-nums">{formatPrice(job.priceCents)}</dd>
          </dl>
          <AcceptButton job={job} onAccept={onAccept} className="mt-3 w-full" />
        </li>
      ))}
    </ul>
  )
}
