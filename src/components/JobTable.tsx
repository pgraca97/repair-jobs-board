import { formatDate, formatDuration, formatPrice, formatTime } from '../format'
import type { JobRequest } from '../types'

type JobTableProps = {
  jobs: JobRequest[]
}

export function JobTable({ jobs }: JobTableProps) {
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {jobs.map((job) => (
            <tr key={job.id}>
              <td className="px-4 py-3">
                <span className="font-medium">{job.service}</span>
                {job.urgent && (
                  <span className="ml-2 rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-800">
                    Urgente
                  </span>
                )}
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
