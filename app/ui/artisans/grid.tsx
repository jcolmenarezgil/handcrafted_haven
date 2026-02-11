import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredArtisans } from '@/app/lib/data';
import { StarIcon, UserIcon, CheckBadgeIcon } from '@heroicons/react/24/solid';

export default async function ArtisansGrid({
  query,
  currentPage,
  itemsPerPage,
}: {
  query: string;
  currentPage: number;
  itemsPerPage: number;
}) {
  const artisans = await fetchFilteredArtisans(
    query, 
    currentPage, 
    itemsPerPage,
  );

  if (!artisans || artisans.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <UserIcon className="h-12 w-12 text-slate-200 mb-4" />
        <h3 className="font-serif italic text-xl text-slate-800">No artisans found</h3>
        <p className="text-sm text-slate-500">Perhaps they are out sourcing new materials.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {artisans.map((a) => (
        <Link
          key={a.id}
          href={`/artisans/${a.id}`}
          className="group relative flex flex-col items-center bg-white p-6 rounded-2xl border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
        >
          
          <div className="absolute top-4 right-4 flex items-center gap-1 bg-[#faf7f2] px-2 py-1 rounded-full border border-[#c97c5d]/20 shadow-sm">
            <StarIcon className="h-3 w-3 text-[#c97c5d]" />
            <span className="text-[10px] font-bold text-[#6b4f3f]">
              {Number(a.rating).toFixed(1)}
            </span>
          </div>

          <div className="relative mb-4">
            <div className="h-24 w-24 overflow-hidden rounded-full border-2 border-[#faf7f2] shadow-inner ring-4 ring-white transition-transform group-hover:scale-105">
              {a.profile_image ? (
                <Image
                  src={a.profile_image}
                  alt={a.name}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-slate-100">
                  <UserIcon className="h-10 w-10 text-slate-300" />
                </div>
              )}
            </div>

            {a.description && (
              <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 shadow-sm">
                <CheckBadgeIcon className="h-5 w-5 text-[#2f5e4d]" />
              </div>
            )}
          </div>

          <div className="text-center">
            <h3 className="font-serif text-lg text-[#2e2e2e] group-hover:text-[#c97c5d] transition-colors leading-tight">
              {a.name}
            </h3>

            <div className="mt-2 inline-block">
              {a.description ? (
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#2f5e4d]">
                  Master Artisan
                </span>
              ) : (
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">
                  New Talent
                </span>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}