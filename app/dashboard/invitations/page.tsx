"use client";

import Link from "next/link";

export default function DashboardInvitationsPage() {
  return (
    <div className="space-y-8">
      <section className="rounded-[1.75rem] border border-[#eadfce] bg-white p-6 shadow-sm">
        <p className="text-xs uppercase tracking-[0.24em] text-[#b08d57]">
          Invitation Card
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-[#2f2a24]">
          Wedding invitation preview
        </h2>

        <p className="mt-3 max-w-2xl text-sm leading-6 text-[#76685a]">
          Open the full invitation card with the intro video in a separate
          browser tab.
        </p>

        <div className="mt-6">
          <Link
            href="/dashboard/invitations/card"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[#b08d57] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#9a7847]"
          >
            Open Invitation Card
          </Link>
        </div>
      </section>
    </div>
  );
}