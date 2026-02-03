import Link from "next/link";
import Header from "@/app/ui/header";
import SidebarNav from "@/app/ui/sidebar-nav";
import Footer from "@/app/ui/footer";
import { fetchProducts } from "@/app/lib/data";

export default async function HomePage() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <Header />

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
          <SidebarNav />

          <section className="space-y-4">
            <h1 className="text-2xl font-bold">Browse Products</h1>

            <div className="grid gap-4 sm:grid-cols-2">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/dashboard/product/${p.id}`} 
                  className="rounded-lg border p-4 hover:bg-slate-50 transition-colors shadow-sm"
                >
                  <div className="aspect-video w-full rounded-md border bg-slate-100 flex items-center justify-center">
                    <span className="text-xs text-slate-400 font-medium uppercase">{p.category}</span>
                  </div>

                  <div className="mt-3">
                    <p className="font-semibold text-lg">{p.name}</p>
                    <p className="text-sm text-slate-600 line-clamp-2">{p.description}</p>

                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-blue-600 font-bold">${p.price}</p>
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        By {p.seller}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Footer />
          </section>
        </div>
      </div>
    </main>
  );
}
