import { ProductsGridSkeleton } from "@/app/ui/skeleton";
import { fetchCategories, fetchProductsPages } from "@/app/lib/data";
import { Suspense } from "react";
import ProductsGrid from "@/app/ui/products/grid";
import Pagination from "@/app/ui/helpers/pagination";

import { Metadata } from 'next';
import ProductFilterBar from "@/app/ui/products/filter-bar";
import ItemsPerPage from "@/app/ui/helpers/itemsPerPage";

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
    orderBy?: string;
    itemsPerPage?: string;
  }>;
}) {
  const minCardShow = 5;
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const category = searchParams?.category || '';
  const currentPage = Number(searchParams?.page) || 1;
  const minPrice = Number(searchParams?.minPrice) || 0;
  const maxPrice = Number(searchParams?.maxPrice) || 99999;
  const orderBy =  searchParams?.orderBy || "name";
  const itemsPerPage = Number(searchParams?.itemsPerPage) || minCardShow;


  const categories = await fetchCategories();
  const totalPages = await fetchProductsPages(query, category, minPrice.toString(), maxPrice.toString(), itemsPerPage);

  return (
    <main className="w-full">
      <div className="mb-6 px-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b4f3f]">Inventory</h2>
        <h1 className="text-3xl font-serif text-[#2e2e2e] mt-1 italic">Our Products</h1>
      </div>

      <div className="px-4">
        <ProductFilterBar categories={categories} />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <Suspense
          key={query + category + minPrice + maxPrice + orderBy + currentPage}
          fallback={<ProductsGridSkeleton />}
        >
          <ProductsGrid
            query={query}
            currentPage={currentPage}
            category={category}
            minPrice={minPrice}
            maxPrice={maxPrice}
            orderBy={orderBy}
            itemsPerPage={itemsPerPage}
          />
        </Suspense>
      </div>
      
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
      <div className="w-full text-center">
        <ItemsPerPage minCardShow={minCardShow} />
      </div>
    </main>
  );
}