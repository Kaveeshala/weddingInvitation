import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
      <body className="min-h-full flex flex-col bg-[#fdf8f2] text-[#2c2c2c]">
        {children}
      </body>
    </html>
  );
}