import Image from "next/image";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 sm:pt-8">
      <div className="grid items-center gap-8 rounded-2xl border border-white/5 bg-surface px-6 py-10 sm:px-10 md:grid-cols-2 md:py-14 lg:px-14">
        {/* Text */}
        <div className="order-2 text-center md:order-1 md:text-left">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            Workout Library
          </p>

          <h1 className="mt-4 font-display text-4xl font-bold uppercase leading-[1.05] text-white sm:text-5xl lg:text-6xl">
            Train with intent. Log every set.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-xs leading-relaxed text-muted sm:text-sm md:mx-0">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="mt-7 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black transition hover:brightness-110"
          >
            Browse Workouts
            <ArrowDown size={14} strokeWidth={3} />
          </a>
        </div>

        {/* Banner */}
        <div className="order-1 flex justify-center md:order-2 md:justify-end">
          <Image
            src="/banner.png"
            alt="Athlete training on a gym machine"
            width={334}
            height={334}
            priority
            className="h-auto w-48 object-contain sm:w-60 md:w-64 lg:w-72"
          />
        </div>
      </div>
    </section>
  );
}