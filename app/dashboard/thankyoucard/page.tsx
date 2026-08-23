"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

export default function ThankYouCardDashboardPage() {
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    // Generate the URL for the QR code based on the current origin
    if (typeof window !== "undefined") {
      setQrUrl(`${window.location.origin}/thankyou`);
    }
  }, []);

  return (
    <div className="space-y-8 max-w-2xl">
      <section className="rounded-[1.75rem] border border-[#eadfce] bg-white p-8 shadow-sm">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-1 space-y-4">
            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#b08d57]">
                Thank You Card Generator
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#2f2a24]">
                Share with Guests
              </h2>
            </div>
            
            <p className="text-[#7a6755] leading-relaxed">
              Ask your guests to scan this QR code to access the Thank You Card generator. 
              They can upload their own photo to complete the collage and download the final memory!
            </p>

            {qrUrl && (
              <div className="pt-4">
                <Link 
                  href="/thankyou" 
                  target="_blank"
                  className="inline-flex items-center text-sm font-medium text-[#b08d57] hover:text-[#9a7847] transition"
                >
                  Preview Guest Experience <ExternalLink className="ml-1 w-4 h-4" />
                </Link>
              </div>
            )}
          </div>

          <div className="bg-[#fcfaf8] p-6 rounded-[1.5rem] border border-[#f1e7da] flex flex-col items-center gap-4">
            {qrUrl ? (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#f1e7da]">
                <QRCodeSVG 
                  value={qrUrl} 
                  size={160} 
                  fgColor="#2f2a24" 
                  bgColor="#ffffff" 
                  level="Q"
                />
              </div>
            ) : (
              <div className="w-[160px] h-[160px] bg-[#f5ede3] animate-pulse rounded-xl" />
            )}
            <p className="text-[10px] uppercase tracking-widest text-[#8a7a6a]">
              Scan to open
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
