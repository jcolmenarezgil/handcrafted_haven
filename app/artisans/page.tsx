import { fetchArtisansPages } from "@/app/lib/data";
import Pagination from "@/app/ui/helpers/pagination";
import Search from '@/app/ui/helpers/search';
import { Metadata } from 'next';
import ArtisansGrid from "@/app/ui/artisans/grid";

export const metadata: Metadata = {
  title: 'Artisans',
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
  const totalPages = await fetchArtisansPages(query);

  return (
    <main className="bg-white text-slate-900 w-full">
      <div className="pb-2">
        <h1 className="text-3xl md:text-2xl font-bold text-center">Artisans</h1>
      </div>

      <div className="flex items-center justify-between gap-2 m-4">
        <Search placeholder="Search artisan..." />
      </div>

      <div className="mx-auto max-w-6xl p-4">
        <ArtisansGrid query={query} currentPage={currentPage} />
      </div>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </main>
  );
}