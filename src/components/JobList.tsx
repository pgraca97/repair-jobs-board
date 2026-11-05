import type { JobRequest } from '../types'
import { JobCardList } from './JobCardList'
import { JobTable } from './JobTable'

type JobListProps = {
  jobs: JobRequest[]
  onAccept: (id: string) => void
}

export function JobList({ jobs, onAccept }: JobListProps) {
  return (
    // Container query: a vista depende da largura disponível para a lista, não da do ecrã.
    <div className="@container">
      {/* "hidden" é display: none, por isso a vista inativa também sai do leitor de ecrã e do Tab. */}
      <div className="hidden @3xl:block">
        <JobTable jobs={jobs} onAccept={onAccept} />
      </div>
      <div className="@3xl:hidden">
        <JobCardList jobs={jobs} onAccept={onAccept} />
      </div>
    </div>
  )
}
