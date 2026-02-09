import Image from "next/image";
import Link from "next/link";
import { fetchFilteredProducts } from "@/app/lib/data";

export default async function ProductsGrid({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredProducts(query, currentPage);

  return (
    <div className="space-y-4">
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] place-items-center">
        {products?.map((p) => (
          <Link
            key={p.id}
            href={`/products/${p.id}`}
            className="w-full max-w-[300px] rounded-lg border p-4 hover:bg-slate-50 transition-colors shadow-sm flex flex-col"
          >
            {/* Fixed image area height */}
            <div className="relative h-40 w-full rounded-md border bg-slate-100 overflow-hidden">
              {p.image_url ? (
                <Image
                  src={p.image_url}
                  alt={p.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center bg-slate-200">
                  <span className="text-[10px] text-slate-500 font-bold uppercase">
                    {p.category}
                  </span>
                  <p className="text-[8px] text-slate-400">
                    No Image Available
                  </p>
                </div>
              )}

              <p className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-green-300 text-[13px] font-semibold">
                {Math.round(Number(p.rating || 0))}/5
              </p>
            </div>

            {/* Fixed body height so cards align */}
            <div className="mt-3 flex h-[140px] flex-col justify-between">
              <div>
                <p className="font-semibold text-lg line-clamp-1">{p.name}</p>
                <p className="text-sm text-slate-600 line-clamp-2">
                  {p.description}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <p className="text-blue-600 font-bold">${p.price}</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  By {p.seller}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
