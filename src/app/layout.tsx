import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SyncFura Digital | Digital Backbone of the Modern Enterprise",
  description: "SyncFura Digital builds intelligent Web, IoT, AI, Automation, and Data Analytics solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-[#FAFAFC] text-neutral-950 antialiased selection:bg-purple-200 selection:text-purple-900`}>
        {children}
      </body>
    </html>
  );
}
