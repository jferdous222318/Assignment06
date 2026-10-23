"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds, hydrated } = usePlan();

  const planCount = hydrated ? planIds.length : 0;
  const savedCount = hydrated ? savedIds.length : 0;

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname.startsWith("/workout")
      : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-bg/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-2 px-4 py-3 sm:px-6 md:grid md:grid-cols-[1fr_auto_1fr]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="FitLog logo" width={20} height={20} priority />
          <span className="font-display text-sm font-bold uppercase tracking-wide text-white">
            FitLog
          </span>
        </Link>

        
        <ul className="order-3 flex w-full items-center justify-center gap-1 md:order-none md:w-auto">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`block rounded-full px-4 py-1.5 text-[11px] font-semibold transition-colors ${
                  isActive(link.href)
                    ? "bg-accent/15 text-accent"
                    : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        
        <div className="flex items-center gap-4 md:justify-self-end">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[11px] font-medium text-white"
          >
            Plan
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-accent px-1.5 text-[10px] font-bold text-black">
              {planCount}
            </span>
          </Link>
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 text-[11px] font-medium text-muted hover:text-white"
          >
            Saved
            <span className="flex h-5 min-w-5 items-center justify-center rounded-full border border-white/30 px-1.5 text-[10px] font-bold text-white">
              {savedCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}