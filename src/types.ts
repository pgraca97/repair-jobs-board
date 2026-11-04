export type JobRequest = {
  id: string
  service: string // "Canalização", "Eletricidade", "Pintura"
  city: string // "Lisboa", "Porto", "Braga", "Coimbra"
  startsAt: string // ISO 8601, em UTC
  durationMin: number
  priceCents: number // valor em cêntimos, para evitar erros de vírgula flutuante
  urgent: boolean
}
