import { useState } from 'react'
import { CityFilter } from './components/CityFilter'
import { JobTable } from './components/JobTable'
import { useJobs } from './hooks/useJobs'

function App() {
  const { jobs, isLoading } = useJobs()
  // String vazia significa "todas as cidades".
  const [city, setCity] = useState('')

  // A lista de cidades sai dos próprios dados, sem repetições e por ordem alfabética.
  const cities = [...new Set(jobs.map((job) => job.city))].sort((a, b) =>
    a.localeCompare(b, 'pt-PT'),
  )
  const visibleJobs = city ? jobs.filter((job) => job.city === city) : jobs

  return (
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">Pedidos disponíveis</h1>
      {isLoading ? (
        <p role="status" className="text-gray-600">
          A carregar pedidos…
        </p>
      ) : (
        <>
          <CityFilter cities={cities} value={city} onChange={setCity} />
          <JobTable jobs={visibleJobs} />
        </>
      )}
    </main>
  )
}

export default App
