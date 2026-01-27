import { Metadata } from "next";
import Header from "@/app/ui/header";
import SidebarNav from "@/app/ui/sidebar-nav";
import ReviewCard from "@/app/ui/review-card";
import Footer from "@/app/ui/footer";

export const metadata: Metadata = {
  title: "View Product",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-6">
        {/* 3-column layout on large screens: sidebar | main | add-to-cart */}
        <div className="grid gap-6 lg:grid-cols-[240px_1fr_220px]">
          {/* Left sidebar (Browse / Categories / Sellers) */}
          <SidebarNav />

          {/* Main center column */}
          <section className="space-y-6">
            {/* Product section */}
            <div className="rounded-lg border p-5">
              <h1 className="text-2xl font-bold">Product Name</h1>

              {/* Product info + image */}
              <div className="mt-5 rounded-lg border bg-slate-50 p-4">
                <div className="mb-3 aspect-[4/3] w-full rounded-md border bg-white" />
                <div className="space-y-2 text-sm text-slate-700">
                  <p>
                    <span className="font-semibold">Price:</span> $45.00
                  </p>
                  <p>
                    <span className="font-semibold">Category:</span> Home Décor
                  </p>
                  <p>
                    <span className="font-semibold">Made by:</span> Artisan Name
                  </p>
                  <p className="text-slate-600">
                    Product description placeholder. Add details about the
                    craft, materials, sizing, and care instructions.
                  </p>
                </div>
              </div>

              {/* Mobile add-to-cart button (right wireframe) */}
              <button className="mt-5 w-full rounded-md bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800 lg:hidden">
                Add to Cart
              </button>
            </div>

            {/* Comments / Reviews */}
            <div className="rounded-lg border p-5">
              <h2 className="text-lg font-semibold">Comments / Reviews</h2>
              <div className="mt-4 space-y-4">
                <ReviewCard
                  name="Jamie"
                  rating="★★★★★"
                  text="Super high quality. Arrived quickly and looks even better in person."
                />
                <ReviewCard
                  name="Riley"
                  rating="★★★★☆"
                  text="Beautiful work. Packaging was great. Would buy again."
                />
              </div>

              {/* Placeholder for future review form */}
              <div className="mt-5 rounded-md border bg-slate-50 p-4 text-sm text-slate-700">
                <p className="font-semibold">Leave a review</p>
                <p className="text-slate-600">
                  (We’ll add the review form + rating next.)
                </p>
              </div>
            </div>

            {/* Footer sits under the main content (like wireframe bottom) */}
            <Footer />
          </section>

          {/* Right column: sticky add-to-cart (diamond area on large screens) */}
          <aside className="hidden lg:block">
            <div className="sticky top-6 rounded-lg border p-4">
              <p className="text-sm font-semibold text-slate-700">
                Add to cart
              </p>

              <button className="mt-3 w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                Add to Cart
              </button>

              <div className="mt-4 space-y-1 text-xs text-slate-600">
                <p>• Ships in 3–5 days</p>
                <p>• Free returns</p>
                <p>• Secure checkout</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
