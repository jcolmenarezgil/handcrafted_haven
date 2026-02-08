import Link from "next/link";
import { requireSeller } from "@/app/lib/auth";

export default async function HomePage() {
  await requireSeller();

  return (
    <main className="bg-white text-slate-900">

      <div className="mx-auto max-w-6xl p-4">

        <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-black"> 

          <div className="relative z-10 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold drop-shadow-xl">
              Handcrafted Haven
            </h1>
            <p className="text-lg md:text-xl mt-2 drop-shadow-xl">
              Made with heart to be shared with the World
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-6 px-4 py-6">

          <Link
            href="/products"
            className="flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white md:text-base"
          >
            <span>Products</span>
          </Link>

          <Link
            href="/artisans"
            className="flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white md:text-base"
          >
            <span>Artisans</span>
          </Link>

          <Link
            href="/management"
            className="flex items-center justify-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white md:text-base"
          >
            <span>Manage Your Wares</span>
          </Link>

        </div>
      </div>

    </main>
  );
}
