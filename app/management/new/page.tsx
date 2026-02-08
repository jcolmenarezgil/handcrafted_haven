import Link from "next/link";
import { requireSeller } from "@/app/lib/auth";
import { fetchCategories } from "@/app/lib/data";
import { createProductAction } from "@/app/management/actions";
import CategorySelect from "@/app/ui/category-select";

export default async function NewProductPage() {
  await requireSeller();
  const categories = await fetchCategories();

  return (
    <main className="mx-auto max-w-2xl px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Create Product</h1>
        <Link
          href="/management"
          className="text-sm text-slate-600 hover:underline"
        >
          Back
        </Link>
      </div>

      <form
        action={createProductAction}
        className="mt-6 space-y-4 rounded-lg border p-5"
      >
        <div className="space-y-1">
          <label className="text-sm font-semibold">Name</label>
          <input
            name="name"
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="Product name"
            required
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold">Price</label>
          <input
            name="price"
            type="number"
            step="0.01"
            min="0"
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="49.99"
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
            className="w-full rounded-md border px-3 py-2 text-sm"
            placeholder="https://..."
          />
          <p className="text-xs text-slate-500">Optional</p>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-semibold">Description</label>
          <textarea
            name="description"
            className="w-full rounded-md border px-3 py-2 text-sm"
            rows={4}
            placeholder="What makes it special?"
            required
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Create
          </button>

          <Link
            href="/management"
            className="rounded-md border px-4 py-2 text-sm hover:bg-slate-50"
          >
            Cancel
          </Link>
        </div>
      </form>
    </main>
  );
}
