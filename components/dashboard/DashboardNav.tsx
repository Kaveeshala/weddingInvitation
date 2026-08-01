"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#eadfce] bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#b08d57]">
              Wedding Couple
            </p>
            <h1 className="mt-1 truncate text-lg font-semibold text-[#2f2a24] sm:text-xl">
              Dilma &amp; Isuru
            </h1>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <div className="text-right">
              <p className="text-[11px] uppercase tracking-[0.18em] text-[#b08d57]">
                Logged in as
              </p>
              <p className="max-w-[220px] truncate text-sm font-medium text-[#2f2a24]">
                {admin?.email || "Admin"}
              </p>
            </div>

            <LogoutButton />
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-xl border border-[#eadfce] bg-[#fcf8f3] p-2 text-[#6f5f51] transition hover:border-[#b08d57] hover:text-[#b08d57] md:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18" />
                <path d="M3 12h18" />
                <path d="M3 18h18" />
              </svg>
            )}
          </button>
        </div>

        <nav className="mt-4 hidden flex-wrap items-center justify-center gap-2 md:flex">
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

        {mobileOpen ? (
          <div className="mt-4 space-y-4 rounded-2xl border border-[#eadfce] bg-white p-4 shadow-sm md:hidden">
            <div className="space-y-2">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-[#b08d57] text-white"
                        : "bg-[#fcf8f3] text-[#6f5f51] hover:text-[#b08d57]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-[#eadfce] pt-4">
              <div className="min-w-0">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[#b08d57]">
                  Logged in as
                </p>
                <p className="truncate text-sm font-medium text-[#2f2a24]">
                  {admin?.email || "Admin"}
                </p>
              </div>

              <LogoutButton />
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}