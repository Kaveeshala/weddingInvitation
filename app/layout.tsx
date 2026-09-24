import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
  ),
  title: "Dilma & Isuru | Wedding Invitation",
  description: "A modern wedding invitation website for Dilma and Isuru.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="si"
      className="h-full antialiased"
    >
      <body className="min-h-full flex flex-col bg-[#F9F6F0] text-[#2c2c2c]">
        {children}
      </body>
    </html>
  );
}