import type { Metadata } from "next";
import "@/app/globals.css";

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
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
