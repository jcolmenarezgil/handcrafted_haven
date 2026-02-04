const shimmer =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

function Skeleton({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-slate-200 ${shimmer} ${className}`}
    />
  );
}

/* ========== PRODUCT CARD SKELETON ONLY ========== */
export function ProductCardSkeleton() {
  return (
    <div className="rounded-lg border p-4 space-y-3">
      {/* Image */}
      <Skeleton className="aspect-4/3 w-full" />

      {/* Text */}
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-full" />
      <Skeleton className="h-4 w-1/3" />
    </div>
  );
}

export function ProductCardsSkeleton() {
  return (
    <>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </>
  );
}
