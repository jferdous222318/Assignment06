import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-6xl flex-col items-center justify-center px-4 text-center">
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
        Error 404
      </p>
      <h1 className="mt-3 font-display text-5xl font-bold uppercase text-white sm:text-6xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-muted">
        This lift skipped the session. The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-md bg-accent px-5 py-2.5 text-[11px] font-bold uppercase tracking-wider text-black hover:brightness-110"
      >
        Go to workouts
      </Link>
    </section>
  );
}