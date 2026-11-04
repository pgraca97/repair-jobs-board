import { JobTable } from './components/JobTable'
import { useJobs } from './hooks/useJobs'

function App() {
  const { jobs, isLoading } = useJobs()

  return (
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">Pedidos disponíveis</h1>
      {isLoading ? (
        <p role="status" className="text-gray-600">
          A carregar pedidos…
        </p>
      ) : (
        <JobTable jobs={jobs} />
      )}
    </main>
  )
}

export default App
