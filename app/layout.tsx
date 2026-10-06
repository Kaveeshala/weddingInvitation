import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://wedding-invitation-omega-opal.vercel.app'),
  title: "Dilma & Isuru | Wedding Invitation",
  description: "A modern wedding invitation website for Dilma and Isuru.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9F6F0' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1614' },
  ],
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