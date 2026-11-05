const SKELETON_ROWS = 4

// Só anima para quem não pediu ao sistema para reduzir animações.
const bar = 'rounded bg-gray-200 motion-safe:animate-pulse'

export function JobListSkeleton() {
  return (
    <div role="status">
      {/* Os leitores de ecrã leem este texto; as barras abaixo são só visuais. */}
      <span className="sr-only">A carregar pedidos…</span>
      <div aria-hidden="true">
        <div className={`mb-4 h-8 w-40 ${bar}`} />
        <div className="divide-y divide-gray-200 rounded-lg border border-gray-200">
          {Array.from({ length: SKELETON_ROWS }, (_, index) => (
            <div key={index} className="flex items-center gap-4 px-4 py-4">
              <div className={`h-4 w-32 ${bar}`} />
              <div className={`h-4 w-20 ${bar}`} />
              <div className={`hidden h-4 w-24 sm:block ${bar}`} />
              <div className={`hidden h-4 w-16 sm:block ${bar}`} />
              <div className={`ml-auto h-8 w-20 ${bar}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
