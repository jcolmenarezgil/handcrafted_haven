import Link from "next/link";
import Header from "@/app/ui/header";
import SidebarNav from "@/app/ui/sidebar-nav";
import Footer from "@/app/ui/footer";

const products = [
  { id: "1", name: "Product Name", price: 45, short: "Short intro..." },
  { id: "2", name: "Another Product", price: 30, short: "Short intro..." },
];

export default function HomePage() {
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
                  href={`/products/${p.id}`}
                  className="rounded-lg border p-4 hover:bg-slate-50"
                >
                  <div className="aspect-[4/3] w-full rounded-md border bg-white" />
                  <div className="mt-3">
                    <p className="font-semibold">{p.name}</p>
                    <p className="text-sm text-slate-600">{p.short}</p>
                    <p className="mt-2 text-sm">
                      <span className="font-semibold">Price:</span> ${p.price}
                    </p>
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
