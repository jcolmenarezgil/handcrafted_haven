const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

function Skeleton({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-slate-200 ${shimmer} ${className}`}
    />
  );
}

// Componente base para una sola Card
export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
      {/* Área de Imagen */}
      <div className="relative aspect-[4/5] w-full bg-slate-200 animate-pulse" />

      {/* Cuerpo de la Card */}
      <div className="p-5 flex flex-col gap-4">
        <div>
          {/* Título */}
          <div className="h-6 w-3/4 bg-slate-200 rounded-lg animate-pulse" />
          {/* Descripción (2 líneas) */}
          <div className="mt-3 h-3 w-full bg-slate-100 rounded-md animate-pulse" />
          <div className="mt-2 h-3 w-5/6 bg-slate-100 rounded-md animate-pulse" />
        </div>

        {/* Footer de la Card */}
        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
          <div className="space-y-2">
            <div className="h-2 w-10 bg-slate-100 rounded animate-pulse" />
            <div className="h-4 w-16 bg-slate-200 rounded animate-pulse" />
          </div>
          <div className="text-right space-y-2">
            <div className="h-2 w-10 bg-slate-100 rounded animate-pulse ml-auto" />
            <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Grid completo de esqueletos
export function ProductsGridSkeleton() {
  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
}

export function ArtisanCardSkeleton() {
  return (
    <div className="relative flex flex-col items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
      {/* Badge de Rating Placeholder */}
      <div className="absolute top-4 right-4 h-5 w-10 bg-slate-100 rounded-full animate-pulse" />

      {/* Avatar Circular Placeholder */}
      <div className="relative mb-4">
        <div className="h-24 w-24 rounded-full bg-slate-200 animate-pulse ring-4 ring-white shadow-sm" />
        {/* Pequeño círculo para el badge de experiencia */}
        <div className="absolute -bottom-1 -right-1 h-6 w-6 bg-slate-100 rounded-full border-2 border-white animate-pulse" />
      </div>

      {/* Info Placeholder */}
      <div className="flex flex-col items-center gap-3 w-full">
        {/* Nombre */}
        <div className="h-5 w-3/4 bg-slate-200 rounded-md animate-pulse" />
        {/* Label de Experiencia */}
        <div className="h-3 w-1/2 bg-slate-100 rounded-md animate-pulse" />
      </div>
    </div>
  );
}

export function ArtisansGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      <ArtisanCardSkeleton />
      <ArtisanCardSkeleton />
      <ArtisanCardSkeleton />
      <ArtisanCardSkeleton />
      <ArtisanCardSkeleton />
      <ArtisanCardSkeleton />
      <ArtisanCardSkeleton />
      <ArtisanCardSkeleton />
    </div>
  );
}