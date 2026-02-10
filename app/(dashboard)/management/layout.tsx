import { requireManager } from "@/app/lib/auth";

export default async function ManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireManager(); // redirect if not manager
  return <>{children}</>;
}
