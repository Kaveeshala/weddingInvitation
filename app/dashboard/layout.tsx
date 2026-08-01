import { ReactNode } from "react";
import DashboardNav from "../../components/dashboard/DashboardNav";
import { requireAdmin } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-[#f8f3ec]">
      <DashboardNav admin={admin} />

      <main className="mx-auto max-w-7xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}