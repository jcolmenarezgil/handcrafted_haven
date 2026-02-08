import { requireSeller } from "@/app/lib/auth";

export default async function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireSeller(); // redirect if not seller
  return <>{children}</>;
}
