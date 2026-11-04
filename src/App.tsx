import { JobTable } from './components/JobTable'
import { jobs } from './data'

function App() {
  return (
    <main className="mx-auto max-w-5xl p-4">
      <h1 className="mb-4 text-2xl font-semibold">Pedidos disponíveis</h1>
      <JobTable jobs={jobs} />
    </main>
  )
}

export default App
