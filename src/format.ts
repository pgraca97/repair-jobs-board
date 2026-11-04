// Fixar o fuso garante as mesmas datas e horas em qualquer computador,
// mesmo que o browser esteja configurado noutro fuso horário.
const LOCALE = 'pt-PT'
const TIME_ZONE = 'Europe/Lisbon'

// Os formatadores são criados uma vez e reutilizados em cada chamada.
const dateFormatter = new Intl.DateTimeFormat(LOCALE, {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  timeZone: TIME_ZONE,
})

const timeFormatter = new Intl.DateTimeFormat(LOCALE, {
  hour: '2-digit',
  minute: '2-digit',
  timeZone: TIME_ZONE,
})

const priceFormatter = new Intl.NumberFormat(LOCALE, {
  style: 'currency',
  currency: 'EUR',
})

// "2026-11-12T10:00:00Z" -> "quinta, 12/11"
export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso))
}

// "2026-11-12T10:00:00Z" -> "10:00"
export function formatTime(iso: string): string {
  return timeFormatter.format(new Date(iso))
}

// 45 -> "45 min", 60 -> "1h", 90 -> "1h30"
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60

  if (hours === 0) return `${rest} min`
  if (rest === 0) return `${hours}h`
  return `${hours}h${String(rest).padStart(2, '0')}`
}

// 4500 -> "45,00 €"
export function formatPrice(cents: number): string {
  return priceFormatter.format(cents / 100)
}
