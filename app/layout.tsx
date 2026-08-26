import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "AVENIQTECH SDN. BHD. — From Idea to Digital. Built to Last.",
  description:
    "AVENIQTECH builds the digital backbone of the modern enterprise through intelligent Web, IoT, AI, and Automation solutions.",
  metadataBase: new URL("https://aveneqtech.example"),
  openGraph: {
    title: "AVENIQTECH SDN. BHD.",
    description:
      "We build the digital backbone of the modern enterprise through intelligent Web, IoT, AI, and Automation solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-[#fafafa] text-[#1a1a2e]">
        {children}
      </body>
    </html>
  );
}
