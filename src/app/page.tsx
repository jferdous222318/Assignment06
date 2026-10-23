import Hero from "@/Components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Library comes next — the Hero button scrolls to this id */}
      <section id="library" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6">
        <h2 className="font-display text-2xl font-bold uppercase text-white">
          The Library
        </h2>
        <p className="mt-1 text-xs text-muted">
          Twelve lifts covering every major muscle group.
        </p>
      </section>
    </>
  );
}