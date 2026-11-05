import { formatDate, formatDuration, formatPrice, formatTime } from '../format'
import type { JobRequest } from '../types'
import { AcceptButton } from './AcceptButton'
import { UrgentBadge } from './UrgentBadge'

type JobTableProps = {
  jobs: JobRequest[]
  onAccept: (id: string) => void
}

export function JobTable({ jobs, onAccept }: JobTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium">Serviço</th>
            <th scope="col" className="px-4 py-3 font-medium">Cidade</th>
            <th scope="col" className="px-4 py-3 font-medium">Data</th>
            <th scope="col" className="px-4 py-3 font-medium">Hora</th>
            <th scope="col" className="px-4 py-3 font-medium">Duração</th>
            <th scope="col" className="px-4 py-3 text-right font-medium">Valor</th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Ações</span>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="px-4 py-3">
                <span className="font-medium">{job.service}</span>
                {job.urgent && <UrgentBadge />}
              </td>
              <td className="px-4 py-3">{job.city}</td>
              <td className="px-4 py-3">
                <time dateTime={job.startsAt}>{formatDate(job.startsAt)}</time>
              </td>
              <td className="px-4 py-3">{formatTime(job.startsAt)}</td>
              <td className="px-4 py-3">{formatDuration(job.durationMin)}</td>
              <td className="px-4 py-3 text-right tabular-nums">
                {formatPrice(job.priceCents)}
              </td>
              <td className="px-4 py-3 text-right">
                <AcceptButton job={job} onAccept={onAccept} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
