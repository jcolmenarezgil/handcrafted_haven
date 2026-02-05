import Image from "next/image";
import Link from 'next/link';


export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex items-center justify-between px-4 py-4">

        <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border bg-slate-50">
              <Image src="/logo.svg" alt="Handcrafted Haven logo" fill />
            </div>

            <div>
              <p className="text-lg font-semibold leading-tight">
                Handcrafted Haven
              </p>
              <p className="text-sm text-slate-600 leading-tight">
                Unique Handmade Treasures
              </p>
            </div>   
        </div>

        <div className="h-10 w-10 bg-black rounded-md text-center">
          <p className="text-white">Log</p>
        </div>

      </div>
    </header>
  );
}
