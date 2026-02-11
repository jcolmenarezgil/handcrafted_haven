import Link from "next/link";
import Image from "next/image";

export default async function HomePage() {
  return (
    <main className="bg-white text-slate-900">
      <div className="mx-auto max-w-7xl p-4">
        <div className="relative w-full h-75 md:h-125 flex items-center justify-center overflow-hidden rounded-xl shadow-lg">
          <Image
            src="/handcrafted_haven_home.webp"
            alt="Made with heart to be shared with the World"
            fill
            priority
            className="object-cover transition-transform duration-700 hover:scale-105"
          />

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12 mb-8">
          <Link
            href="/products"
            className="group relative flex items-center justify-center overflow-hidden rounded-lg bg-[#2e2e2e] px-8 py-4 text-white transition-all hover:bg-black"
          >
            <span className="relative z-10 font-semibold md:text-lg">Explore Products</span>
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>

          <Link
            href="/artisans"
            className="group relative flex items-center justify-center overflow-hidden rounded-lg border-2 border-[#6b4f3f] px-8 py-4 text-[#6b4f3f] transition-all hover:bg-[#6b4f3f] hover:text-white"
          >
            <span className="relative z-10 font-semibold md:text-lg">Meet Our Artisans</span>
          </Link>
        </div>
      </div>
    </main>
  );
}