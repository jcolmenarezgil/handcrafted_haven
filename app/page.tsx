import Link from "next/link";
import Header from "@/app/ui/header";
import Footer from "@/app/ui/footer";
import { fetchProducts } from "@/app/lib/data";
import Image from 'next/image';

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="bg-white text-slate-900">

      <div className="mx-auto max-w-6xl p-4">
        {/* <div className="grid gap-6 lg:grid-cols-[240px_1fr]"> */}
          {/* <SidebarNav /> */}

        <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-black"> 
        {/* ******TODO: Remember to look for an image for the Hero */}
      {/* <Image
      src="/hero-desktop.png"
      width={1000}
      height={760}
      className="hidden md:block"
      alt="Screenshots of the dashboard project showing desktop version"
      />
      <Image
        src="/hero-mobile.png"
        width={560}
        height={620}
        className="block md:hidden"
        alt="Screenshot of the dashboard project showing mobile version"
      /> */}

          <div className="relative z-10 text-center text-white">
            <h1 className="text-3xl md:text-5xl font-bold drop-shadow-xl">
              Handcrafted Haven
            </h1>
            <p className="text-lg md:text-xl mt-2 drop-shadow-xl">
              Made with heart to be shared with the World
            </p>
          </div>
        </div>
        

        {/* MENU TO STAR BROWSING */}
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

        </div>
        {/* </div> */}
      </div>

    </main>
  );
}
