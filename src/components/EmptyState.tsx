type EmptyStateProps = {
  // Cidade do filtro ativo, ou string vazia quando não há filtro.
  city: string
  onShowAll: () => void
}

export function EmptyState({ city, onShowAll }: EmptyStateProps) {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center text-gray-600">
      {city ? (
        <>
          <p>Não há pedidos disponíveis em {city}.</p>
          <button
            type="button"
            onClick={onShowAll}
            className="mt-2 rounded text-sm font-medium text-blue-600 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          >
            Ver todas as cidades
          </button>
        </>
      ) : (
        <p>Não há pedidos disponíveis de momento.</p>
      )}
    </div>
  )
}
