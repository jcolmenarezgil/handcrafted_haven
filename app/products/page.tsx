import { fetchCategories, fetchProductsPages } from "@/app/lib/data";
import { Suspense } from "react";
import ProductsGrid from "@/app/ui/products/grid";
import Pagination from "@/app/ui/helpers/pagination";
import Search from '@/app/ui/helpers/search';
import CategoryDropdown from "@/app/ui/products/category-filter";

import { Metadata } from 'next';
import PriceRangeFilter from "@/app/ui/products/price-range";
import OrderBy from "@/app/ui/products/order-by";
import FilterToggle from "@/app/ui/products/filter-toggle";

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
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const category = searchParams?.category || '';
  const currentPage = Number(searchParams?.page) || 1;
  const minPrice = Number(searchParams?.minPrice) || 0;
  const maxPrice = Number(searchParams?.maxPrice) || 99999;
  const orderBy =  searchParams?.orderBy || "name";

  const categories = await fetchCategories();
  const totalPages = await fetchProductsPages(query, category, minPrice.toString(), maxPrice.toString());

  return (
    <main className="bg-white text-slate-900 w-full">
      <div className="pb-2">
        <h1 className="text-3xl md:text-2xl font-bold text-center">Products</h1>
      </div>

      <div className="flex items-center justify-between gap-2 m-4">
        <Suspense>
          <Search placeholder="Search product..." />
        </Suspense>
      </div>

      <div className="grid md:grid md:grid-cols-[repeat(auto-fit,minmax(250px,1fr))] items-center gap-2 m-4 font-[10px]">
        <FilterToggle>
          <Suspense>
            <OrderBy />
            <CategoryDropdown categories={categories} />
            <PriceRangeFilter />
          </Suspense>
        </FilterToggle>
      </div>

      <div className="mx-auto max-w-6xl p-4">
        <ProductsGrid query={query} currentPage={currentPage} category={category} minPrice={minPrice} maxPrice={maxPrice} orderBy={orderBy} />
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}