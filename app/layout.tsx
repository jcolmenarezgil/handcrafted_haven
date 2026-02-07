import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/app/ui/header";
import Footer from '@/app/ui/footer';
import SideNav from '@/app/ui/sidenav';

export const metadata: Metadata = {
  title: {
    template: "%s | Handcrafted Haven",
    default: "Handcrafted Haven",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen"><Header />
        <div className="flex flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="w-full">
            <div className="grow p-6 md:overflow-y-auto">{children}</div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
