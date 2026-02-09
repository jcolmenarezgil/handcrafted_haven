import { notFound } from "next/navigation";
import { requireManager} from "@/app/lib/auth";
import { fetchProductByIdForSeller, fetchCategories } from "@/app/lib/data";
import {
  updateProductAction,
  deleteProductAction,
} from "@/app/lib/actions/management_actions";
import CategorySelect from "@/app/ui/management/category-select";

export default async function EditProductPage(props: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const params = await props.params;
  const productId = params.id;

  const { userId } = await requireManager();

  const product = await fetchProductByIdForSeller(userId, productId);
  if (!product) return notFound();

  const categories = await fetchCategories();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8 space-y-6">
      <h1 className="text-2xl font-bold">Edit Product</h1>

      <form
        action={updateProductAction}
        className="space-y-4 rounded-lg border p-5"
      >
        <input type="hidden" name="productId" value={productId} />

        <div className="space-y-1">
          <label className="text-sm font-semibold">Name</label>
          <input
            name="name"
            defaultValue={product.name}
            className="w-full rounded-md border px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold">Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            defaultValue={Number(product.price)}
            className="w-full rounded-md border px-3 py-2 text-sm"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold">Category</label>
          <CategorySelect categories={categories} />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold">Image URL</label>
          <input
            name="image_url"
            defaultValue={product.image_url || ""}
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="https://..."
          />
          <p className="text-xs text-slate-500">
            Leave blank to keep the current image.
          </p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            name="description"
            defaultValue={product.description || ""}
            className="w-full rounded-md border px-3 py-2 text-sm"
            rows={4}
            required
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Save changes
          </button>

          <form action={deleteProductAction}>
            <input type="hidden" name="productId" value={productId} />
            <button
              type="submit"
              className="rounded-md border border-red-300 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50"
            >
              Delete
            </button>
          </form>
        </div>
      </form>
    </main>
  );
}
