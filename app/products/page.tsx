import { fetchProductsPages } from "@/app/lib/data";
import ProductsGrid from "@/app/ui/products/grid";
import Pagination from "@/app/ui/helpers/pagination";
import Search from '@/app/ui/helpers/search';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchProductsPages(query);

  return (
    <main className="bg-white text-slate-900 w-full">
        <h1 className="text-3xl md:text-2xl font-bold text-center pb-8">Products</h1>

      <div className="flex items-center justify-between gap-2 mb-8">
        <Search placeholder="Search product..." />
      </div>

      <div className="mx-auto max-w-6xl">
        <ProductsGrid query={query} currentPage={currentPage} />
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}