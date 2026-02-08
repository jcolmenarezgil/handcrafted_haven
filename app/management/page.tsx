import Link from "next/link";
import { requireSeller } from "@/app/lib/auth";
import { fetchProductsBySeller, SellerProduct } from "@/app/lib/data";
import ConfirmDeleteButton from "@/app/ui/management/confirm-delete-button";
import { deleteProductAction } from "@/app/lib/actions/management_actions";

export default async function ManagementPage() {
  const { userId } = await requireSeller(); // blocks non-sellers

  const products = await fetchProductsBySeller(userId);

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Management</h1>

        <Link
          href="/management/new"
          className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
        >
          + New Product
        </Link>
      </div>

      <div className="mt-6 rounded-lg border">
        {products.length === 0 ? (
          <p className="p-4 text-sm text-slate-600">No products yet.</p>
        ) : (
          <ul className="divide-y">
            {products.map((p: SellerProduct) => (
              <li key={p.id} className="flex items-center justify-between p-4">
                <div>
                  <p className="font-semibold">{p.name}</p>
                  <p className="text-sm text-slate-600">${p.price}</p>
                </div>

                <div className="flex gap-6">
                  <Link
                    href={`/management/${p.id}/edit`}
                    className="
                      inline-flex
                      h-9
                      items-center
                      justify-center
                      rounded-md
                      border
                      px-4
                      text-sm
                      font-semibold
                      text-white
                      hover:bg-slate-700
                    "
                  >
                    Edit
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
