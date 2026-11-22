import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LoadLoop - Move More. Waste Less.",
  description: "Digital logistics platform for MSMEs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-brand-light text-brand-navy antialiased`}>
        {children}
      </body>
    </html>
  );
}
