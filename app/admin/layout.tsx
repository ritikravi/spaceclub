import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // If not on login page and not authenticated, redirect
  if (!session) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}
