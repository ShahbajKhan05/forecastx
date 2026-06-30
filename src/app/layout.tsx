import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Navbar import kiya
import Footer from "@/components/Footer"; 
import TechMarquee from '@/components/TechMarquee';
import About from "@/components/About";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FORECAST X",
  description: "Award-winning weather dashboard by 0.5 Production",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-black text-white">
        <Navbar />
        <main className="grow">{children}</main>
        <TechMarquee />
        <About />
        <Footer />
      </body>
    </html>
  );
}