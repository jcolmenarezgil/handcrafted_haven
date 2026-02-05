import Link from "next/link";
import Image from "next/image";
import { fetchProducts } from "@/app/lib/data";
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Page() {
  const products = await fetchProducts();

  return (
    <main className="bg-white text-slate-900 w-full">
        <h1 className="text-3xl md:text-2xl font-bold text-center pb-8">Products</h1>

      <div className="mx-auto max-w-6xl">
        

          <section className="space-y-4">
            <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
              {products.map((p) => (
                <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="rounded-lg border p-4 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <div className="aspect-video w-full rounded-md border bg-slate-100 relative overflow-hidden">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={p.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full bg-slate-200">
                      <span className="text-[10px] text-slate-500 font-bold uppercase">
                        {p.category}
                      </span>
                      <p className="text-[8px] text-slate-400">No Image Available</p>
                    </div>
                  )}
                </div>

                <div className="mt-3">
                  <p className="font-semibold text-lg">{p.name}</p>
                  <p className="text-sm text-slate-600 line-clamp-2">{p.description}</p>

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

          </section>
      </div>
    </main>
  );
}