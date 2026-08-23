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
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-20 items-center justify-between gap-4">
          
          <div className="hidden flex-1 md:block"></div>

          <nav className="hidden flex-none items-center justify-center gap-8 md:flex">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[15px] font-medium transition-colors ${
                    isActive
                      ? "text-[#b08d57] border-b-2 border-[#b08d57]"
                      : "text-[#8a7a6a] hover:text-[#b08d57] border-b-2 border-transparent"
                  } pb-1`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="hidden flex-1 items-center justify-end md:flex">
            <LogoutButton className="cursor-pointer" />
          </div>

          <div className="flex flex-1 justify-end md:hidden">
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="inline-flex items-center justify-center rounded-xl border border-[#eadfce] bg-[#fcf8f3] p-2 text-[#6f5f51] transition hover:border-[#b08d57] hover:text-[#b08d57]"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="space-y-4 border-t border-[#eadfce] bg-white p-4 shadow-sm md:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block text-sm font-medium transition-colors ${
                      isActive
                        ? "text-[#b08d57]"
                        : "text-[#6f5f51] hover:text-[#b08d57]"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-3 border-t border-[#eadfce] pt-4">
              <div className="self-start">
                <LogoutButton className="cursor-pointer" />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}