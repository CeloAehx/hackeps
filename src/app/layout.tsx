import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import HelpButton from "@/components/ui/HelpButton";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "APMaps | Encuentra tu hogar ideal",
  description: "Descubre las mejores zonas para vivir basadas en datos reales.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.className} ${outfit.variable}`}>
        <Sidebar />
        {children}
        <HelpButton />
      </body>
    </html>
  );
}
