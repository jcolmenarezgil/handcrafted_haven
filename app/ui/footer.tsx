import { HeartIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-5 pb-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent mb-12" />

        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">

          <div className="flex flex-col items-center md:items-start gap-2">
            <h2 className="font-serif italic text-xl text-[#2e2e2e]">
              Handcrafted Haven
            </h2>
            <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-bold">
              © {currentYear} • Authenticity in every detail
            </p>
          </div>

          <div className="flex flex-col items-center gap-1">
            <div className="px-3 py-1 rounded-full bg-red-50 border border-red-100">
              <p className="text-[9px] font-bold text-red-400 uppercase tracking-widest">
                Educational Project • Not an actual store
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
              Carefully curated by
              <span className="flex items-center gap-1 text-[#6b4f3f]">
                <HeartIcon className="w-3 h-3 text-[#c97c5d]" />
                ABModel Team
              </span>
            </p>

            {/* Sello de Calidad Visual */}
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-1 w-1 rounded-full bg-[#c97c5d]/30" />
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}