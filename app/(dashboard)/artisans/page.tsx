import { fetchArtisansPages } from "@/app/lib/data";
import Pagination from "@/app/ui/helpers/pagination";
import Search from '@/app/ui/helpers/search';
import { Metadata } from 'next';
import ArtisansGrid from "@/app/ui/artisans/grid";
import { Suspense } from 'react';
import { ArtisansGridSkeleton } from '@/app/ui/skeleton';
import ItemsPerPage from "@/app/ui/helpers/itemsPerPage";

export const metadata: Metadata = {
  title: 'Artisans',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
    itemsPerPage?: string;
  }>;
}) {
  const minCardShow = 5;
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const itemsPerPage = Number(searchParams?.itemsPerPage) || minCardShow;

  const totalPages = await fetchArtisansPages(query, itemsPerPage);

  return (
    <main className="w-full">
      <div className="mb-6 px-4">
        <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b4f3f]">
          Community
        </h2>
        <h1 className="text-3xl font-serif text-[#2e2e2e] mt-1 italic">
          Master Artisans
        </h1>
      </div>

      <div className="flex items-center justify-between gap-2 m-4">
        <Search placeholder="Search artisan..." />
      </div>

      <div className="mt-8 px-4">
        <Suspense
          key={query + currentPage}
          fallback={<ArtisansGridSkeleton />}
        >
          <ArtisansGrid query={query} currentPage={currentPage} itemsPerPage={itemsPerPage} />
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