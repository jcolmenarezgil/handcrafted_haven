import Link from 'next/link';
import "@/app/globals.css";
import { HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
    return (
        <main className="flex min-h-[80vh] flex-col items-center justify-center bg-[#faf7f2] px-6 text-center">
            <div className="relative mb-8 h-64 w-64 md:h-80 md:w-80">
                <div className="absolute inset-0 animate-pulse rounded-full bg-[#c97c5d]/10" />
                <div className="flex h-full flex-col items-center justify-center p-8">
                    <span className="text-8xl">🏺</span>
                    <div className="mt-4 h-1 w-24 bg-[#c97c5d] rounded-full opacity-40" />
                </div>
            </div>

            <div className="max-w-md">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.4em] text-[#6b4f3f] opacity-70">
                    Error 404
                </h2>
                <h1 className="mt-2 font-serif text-4xl italic text-[#2e2e2e] md:text-5xl">
                    Lost in the workshop
                </h1>
                <p className="mt-6 text-base leading-relaxed text-[#6f6f6f]">
                    It seems the treasure you are looking for hasn&apos;t been crafted yet or has moved to a new shelf in our haven.
                </p>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
                <Link
                    href="/"
                    className="flex items-center gap-2 rounded-full bg-[#2e2e2e] px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-black hover:shadow-lg active:scale-95"
                >
                    <HomeIcon className="w-4 h-4" />
                    Back to Home
                </Link>

                <Link
                    href="/products"
                    className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-3 text-sm font-semibold text-[#2e2e2e] transition-all hover:border-[#c97c5d] hover:text-[#c97c5d] active:scale-95"
                >
                    <ArrowLeftIcon className="w-4 h-4" />
                    Browse Inventory
                </Link>
            </div>

            <div className="absolute bottom-10 left-10 hidden opacity-10 lg:block">
                <p className="font-serif text-9xl">Handcrafted Heaven</p>
            </div>
        </main>
    );
}