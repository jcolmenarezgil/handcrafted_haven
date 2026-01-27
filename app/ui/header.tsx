import Image from "next/image";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-md border bg-slate-50">
            <Image src="/logo.svg" alt="Handcrafted Haven logo" fill />
          </div>

          <div>
            <p className="text-lg font-semibold leading-tight">
              Handcrafted Haven
            </p>
            <p className="text-sm text-slate-600 leading-tight">
              Unique handmade treasures
            </p>
          </div>
        </div>

      </div>
    </header>
  );
}
