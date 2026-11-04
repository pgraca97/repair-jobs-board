import { useEffect, useState } from 'react'
import { jobs as initialJobs } from '../data'
import type { JobRequest } from '../types'

const LOADING_DELAY_MS = 1000

export function useJobs() {
  const [jobs, setJobs] = useState<JobRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simula o tempo de resposta de um pedido ao servidor.
    const timeoutId = setTimeout(() => {
      setJobs(initialJobs)
      setIsLoading(false)
    }, LOADING_DELAY_MS)

    // Se o componente sair do ecrã antes de o tempo acabar, cancela o timer.
    return () => clearTimeout(timeoutId)
  }, [])

  return { jobs, isLoading }
}
