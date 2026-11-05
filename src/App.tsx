import { useState } from 'react'
import { CityFilter } from './components/CityFilter'
import { EmptyState } from './components/EmptyState'
import { JobListSkeleton } from './components/JobListSkeleton'
import { JobTable } from './components/JobTable'
import { useJobs } from './hooks/useJobs'

function App() {
  const { jobs, isLoading, acceptJob } = useJobs()
  // String vazia significa "todas as cidades".
  const [city, setCity] = useState('')

  // A lista de cidades sai dos próprios dados, sem repetições e por ordem alfabética.
  const cities = [...new Set(jobs.map((job) => job.city))]
  // Mantém a cidade escolhida nas opções, mesmo depois de aceite o último pedido dela.
  if (city && !cities.includes(city)) cities.push(city)
  cities.sort((a, b) => a.localeCompare(b, 'pt-PT'))
  const visibleJobs = city ? jobs.filter((job) => job.city === city) : jobs

  return (
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">Pedidos disponíveis</h1>
      {isLoading ? (
        <JobListSkeleton />
      ) : (
        <>
          <CityFilter cities={cities} value={city} onChange={setCity} />
          {visibleJobs.length > 0 ? (
            <JobTable jobs={visibleJobs} onAccept={acceptJob} />
          ) : (
            // Sem pedidos em lado nenhum, a cidade deixa de interessar: mostra a mensagem geral.
            <EmptyState city={jobs.length > 0 ? city : ''} onShowAll={() => setCity('')} />
          )}
        </>
      )}
    </main>
  )
}

export default App
