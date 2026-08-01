"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "../../components/admin/LogoutButton";

const navItems = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/budget", label: "Budget" },
  { href: "/dashboard/guests", label: "Guests" },
  { href: "/dashboard/rsvps", label: "RSVPs" },
  { href: "/dashboard/seating", label: "Seat Management" },
  { href: "/dashboard/invitations", label: "Invitation Card" },
  { href: "/dashboard/thankyoucard", label: "Thankyou Card" },
];

type DashboardNavProps = {
  admin: {
    id: string;
    email: string;
    role: string;
  } | null;
};

export default function DashboardNav({ admin }: DashboardNavProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfce] bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <div className="min-w-[180px]">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#b08d57]">
            Wedding Couple
          </p>
          <h1 className="mt-1 text-xl font-semibold text-[#2f2a24]">
            Dilma &amp; Isuru
          </h1>
        </div>

        <nav className="hidden flex-1 items-center justify-center gap-2 md:flex">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-[#b08d57] text-white shadow-sm"
                    : "text-[#6f5f51] hover:bg-[#f7efe6] hover:text-[#b08d57]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden min-w-[220px] items-center justify-end gap-3 md:flex">
          <div className="text-right">
            <p className="text-sm font-medium text-[#2f2a24]">
              {admin?.email || "Admin"}
            </p>
          </div>

          <LogoutButton />
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-6 pb-4 md:hidden">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-[#b08d57] text-white shadow-sm"
                  : "bg-[#fcf8f3] text-[#6f5f51] hover:text-[#b08d57]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>

      <div className="mx-auto flex items-center justify-between gap-3 px-6 pb-4 md:hidden">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#b08d57]">
            Logged in as
          </p>
          <p className="text-sm font-medium text-[#2f2a24]">
            {admin?.email || "Admin"}
          </p>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}
