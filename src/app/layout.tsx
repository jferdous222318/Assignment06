import type { Metadata } from "next";
import { Suspense } from "react";
import { Inter, Oswald } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { PlanProvider } from "@/context/PlanContext";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import "./globals.css";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "FitLog — Workout Library",
  description: "Pick a lift, lock it into today's plan, and log every set.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${oswald.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <PlanProvider>
          <Suspense
            fallback={<div className="h-14 border-b border-white/5 bg-bg" />}
          >
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: "#1c1c1c",
                color: "#f5f5f5",
                border: "1px solid #2a2a2a",
              },
              success: { iconTheme: { primary: "#ccff00", secondary: "#0b0b0b" } },
            }}
          />
        </PlanProvider>
      </body>
    </html>
  );
}