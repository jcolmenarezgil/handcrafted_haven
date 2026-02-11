import Image from "next/image";
import { notFound } from "next/navigation";

import { fetchArtisanProfileById, fetchProductsPages } from "@/app/lib/data";
import ProductsGrid from "@/app/ui/products/grid";
import { ProductsGridSkeleton } from "@/app/ui/skeleton";
import { Suspense } from "react";
import Pagination from "@/app/ui/helpers/pagination";

export default async function ArtisanPage (props: { 
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>; 
}) {
  const { id: artisanId } = await props.params;
  const searchParams = await props.searchParams;

  const query = '';
  const category = '';
  const minPrice = 0;
  const maxPrice = 99999;
  const orderBy =  "name";
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = 3

  const artisan = await fetchArtisanProfileById(artisanId);
  const totalPages = await fetchProductsPages(query, category, minPrice.toString(), maxPrice.toString(), itemsPerPage, artisanId);
  if (!artisan) return notFound();

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid grid-cols-[1fr_200px] gap-12 items-center max-w-3xl">
        {/* Business Name */}
        <div className="flex flex-col">
          <h1 className="font-serif italic text-4xl md:text-5xl text-[#2e2e2e] leading-tight mb-2">
            {artisan.name}
          </h1>
          <h2 className="text-[#9b4d33] text-[10px] font-bold uppercase tracking-[0.3em] mb-2">
            Owned by {artisan.business_name}
          </h2>
        </div>

        {/* User Image */}
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-[#faf7f2] border border-slate-100 shadow-sm group w-50">
          {artisan.image_url ? (
            <Image
              src={artisan.image_url}
              alt={artisan.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority
            />
          ) : (
            <div className="flex h-full items-center justify-center text-slate-400">
              No Image
            </div>
          )}
        </div>

        <div className="col-span-2">
          <h2 className="text-bñack text-[15px] font-bold uppercase tracking-[0.3em] mb-2">
            About Us
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg mb-8 font-light italic">
            &quot;
            {artisan.description ||
              "This artisan has just begun this beautiful journey."}
            &quot;
          </p>
        </div>
      </div>

      <section className="mt-20 max-w-3xl">
        <h2 className="text-bñack text-[15px] font-bold uppercase tracking-[0.3em] mb-4">
          Our Products
        </h2>

        <div className="mx-auto px-4 bg-[#faf7f2] border border-slate-100 shadow-sm rounded-md p-2">
          <Suspense key="text" fallback={<ProductsGridSkeleton />}>
            <ProductsGrid
              query={query}
              currentPage={currentPage}
              category={category}
              minPrice={minPrice}
              maxPrice={maxPrice}
              orderBy={orderBy}
              itemsPerPage={itemsPerPage}
              sellerId={artisanId}
            />
          </Suspense>
        </div>

        <div className="mt-5 flex w-full justify-center">
          <Pagination totalPages={totalPages} />
        </div>
      </section>
    </main>
  );
}