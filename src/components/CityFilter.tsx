type CityFilterProps = {
  cities: string[]
  value: string
  onChange: (city: string) => void
}

export function CityFilter({ cities, value, onChange }: CityFilterProps) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <label htmlFor="city-filter" className="text-sm font-medium text-gray-700">
        Cidade
      </label>
      <select
        id="city-filter"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm"
      >
        <option value="">Todas</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  )
}
