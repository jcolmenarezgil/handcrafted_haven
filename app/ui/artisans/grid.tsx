import Image from 'next/image';
import Link from 'next/link';
import { fetchFilteredArtisans } from '@/app/lib/data';

export default async function ArtisansGrid({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const products = await fetchFilteredArtisans(query, currentPage);

  return (
    <div className="space-y-4">
        <div className="flex flex-col md:grid gap-6 md:grid-cols-[repeat(auto-fit,minmax(140px,1fr))] place-items-center">
              {products?.map((a) => (
                <Link
                key={a.id}
                href={`/artisans/${a.id}`}
                className="rounded-lg border p-4 grid grid-cols-[60px_1fr] hover:bg-slate-50 transition-colors shadow-sm max-h-[84px] w-full md:max-w-[135px] md:flex md:flex-col md:max-h-full"
              >
                <div className='w-full place-items-center'>
                    <div className="aspect-video rounded-full border bg-slate-100 relative overflow-hidden w-[50px] h-[50px] md:w-[90px] md:h-[90px]">
                    {a.profile_image ? (
                      <Image
                        src={a.profile_image}
                        alt={a.name}
                        fill
                        className="object-contain"
                        sizes="(max-width: 640px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full bg-slate-200">
                        <p className="text-[8px] text-slate-400 text-center">No Image Available</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="my-auto md:place-items-center">
                    <p className="font-semibold text-lg line-clamp-1 pl-4 md:pl-0 md:line-clamp-2 md:text-center md:h-[60px]">{a.name}</p>
                    <div className='w-full'>
                      {a.description ? (
                      <p className="text-[10px] text-green-500 text-center border-1 border-green-500 w-full">Experienced Artisan</p>
                    ) : (
                      <p className="text-[10px] text-black text-center w-full bg-slate-200">New Artisan</p>
                    )}
                    </div>
                </div>
              </Link>
              ))}
        </div>
    </div>
  );
}
