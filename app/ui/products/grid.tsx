import Image from "next/image";
import Link from "next/link";
import { fetchFilteredProducts } from "@/app/lib/data";
import { StarIcon, MagnifyingGlassIcon, ArrowPathIcon } from "@heroicons/react/24/outline";

export default async function ProductsGrid({
  query,
  currentPage,
  category,
  minPrice,
  maxPrice,
  orderBy,
  itemsPerPage,
}: {
  query: string;
  currentPage: number;
  category: string;
  minPrice: number;
  maxPrice: number;
  orderBy: string;
  itemsPerPage: number;
}) {
  const products = await fetchFilteredProducts(
    query,
    currentPage,
    category,
    minPrice.toString(),
    maxPrice.toString(),
    orderBy,
    itemsPerPage,
  );

  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 bg-[#faf7f2]/40 rounded-3xl border-2 border-dashed border-slate-200">
        <div className="bg-white p-5 rounded-full shadow-sm mb-6">
          <MagnifyingGlassIcon className="w-12 h-12 text-slate-300" />
        </div>

        <h3 className="text-2xl font-serif italic text-[#2e2e2e]">No treasures found</h3>

        <p className="text-slate-500 text-sm mt-3 text-center max-w-sm leading-relaxed">
          We couldn&apos;t find anything matching <span className="font-bold text-[#6b4f3f]">&quot;{query || 'your filters'}&quot;</span>.
          The artisans might be crafting it as we speak!
        </p>

        <Link
          href="/products"
          className="mt-8 flex items-center gap-2 px-6 py-3 bg-[#2e2e2e] text-white rounded-full text-sm font-semibold hover:bg-black transition-all shadow-md hover:shadow-lg active:scale-95"
        >
          <ArrowPathIcon className="w-4 h-4" />
          Clear all filters
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products?.map((p) => (
        <Link
          key={p.id}
          href={`/products/${p.id}`}
          className="group flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border border-slate-100"
        >
          <div className="relative aspect-[4/5] w-full bg-[#faf7f2] overflow-hidden">
            {p.image_url ? (
              <Image
                src={p.image_url}
                alt={p.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <span className="text-xs text-slate-400 font-serif italic">No image available</span>
              </div>
            )}

            <div className="absolute top-3 left-3">
              <span className="bg-white/90 backdrop-blur-sm text-[#6b4f3f] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-widest shadow-sm">
                {p.category}
              </span>
            </div>

            <div className="absolute bottom-3 left-3 bg-[#2e2e2e]/80 backdrop-blur-md text-white px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg">
              <StarIcon className="w-3 h-3 text-[#c97c5d]" />
              <span className="text-xs font-medium">{Math.round(Number(p.rating || 0))}</span>
            </div>
          </div>

          <div className="p-5 flex flex-col flex-grow justify-between bg-white">
            <div>
              <h3 className="text-[#2e2e2e] font-serif text-xl leading-tight group-hover:text-[#c97c5d] transition-colors line-clamp-1">
                {p.name}
              </h3>
              <p className="text-[#6f6f6f] text-sm mt-2 line-clamp-2 leading-relaxed">
                {p.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Price</span>
                <p className="text-[#2e2e2e] font-bold text-lg">${p.price}</p>
              </div>

              <div className="text-right">
                <span className="text-[10px] uppercase tracking-tighter text-slate-400 font-bold">Artisan</span>
                <p className="text-[#6b4f3f] text-xs font-semibold italic truncate max-w-[100px]">
                  {p.seller}
                </p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}