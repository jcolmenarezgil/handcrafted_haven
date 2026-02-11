import Link from "next/link";
import Image from "next/image";
import { requireManager } from "@/app/lib/auth";
import { fetchProductsBySeller } from "@/app/lib/data";
import ConfirmDeleteButton from "@/app/ui/management/confirm-delete-button";
import { deleteProductAction } from "@/app/lib/actions/management_actions";
import { PlusIcon, PencilSquareIcon, StarIcon, ArchiveBoxIcon } from "@heroicons/react/24/outline";
import { SellerProduct } from "@/app/lib/definitions";

export default async function ManagementPage() {
  const { userId } = await requireManager();
  const products = await fetchProductsBySeller(userId);

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-slate-100 pb-8">
        <div>
          <h2 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#6b4f3f] mb-1">
            Workshop
          </h2>
          <h1 className="font-serif italic text-4xl text-[#2e2e2e]">
            My Creations
          </h1>
        </div>

        <Link
          href="/management/new"
          className="inline-flex items-center gap-2 rounded-full bg-[#2e2e2e] px-6 py-3 text-sm font-semibold text-white hover:bg-black transition-all shadow-md active:scale-95"
        >
          <PlusIcon className="w-4 h-4" />
          Add New Masterpiece
        </Link>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-[#faf7f2]/30">
            <ArchiveBoxIcon className="w-12 h-12 text-slate-200 mb-4" />
            <p className="font-serif italic text-lg text-slate-500">
              Your workshop is currently empty.
            </p>
            <Link
              href="/management/new"
              className="mt-4 text-[#c97c5d] text-sm font-bold uppercase tracking-widest hover:underline"
            >
              Start creating
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-50">
            {products.map((p: SellerProduct) => (
              <li
                key={p.id}
                className="group flex flex-col sm:flex-row items-center gap-6 p-6 hover:bg-[#faf7f2]/50 transition-colors"
              >
                <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-inner">
                  {p.image_url ? (
                    <Image
                      src={p.image_url}
                      alt={p.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-110"
                      sizes="96px"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-50">
                      <ArchiveBoxIcon className="w-6 h-6 text-slate-200" />
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                    <h3 className="font-serif text-xl text-[#2e2e2e]">
                      {p.name}
                    </h3>
                    <span className="hidden sm:block text-slate-300">•</span>
                    <span className="text-[#8fae9e] font-bold text-xs uppercase tracking-wider bg-[#8fae9e]/10 px-2 py-0.5 rounded">
                      {p.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-start gap-4 mt-2">
                    <p className="text-lg font-light text-[#6b4f3f]">
                      ${Number(p.price).toFixed(2)}
                    </p>

                    <div className="flex items-center gap-1 bg-[#fff3ec] px-2 py-1 rounded-full text-[#a85c3f]">
                      <StarIcon className="w-4 h-4 fill-current" />
                      <span className="text-xs font-bold">
                        {Number(p.rating).toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/management/${p.id}/edit`}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-[#c97c5d] hover:text-[#c97c5d] transition-all hover:shadow-sm"
                    title="Edit creation"
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </Link>

                  <form action={deleteProductAction}>
                    <input type="hidden" name="productId" value={p.id} />
                    <ConfirmDeleteButton />
                  </form>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}