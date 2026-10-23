"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchWorkouts } from "@/lib/api";
import { matchesQuery } from "@/lib/search";
import type { Workout } from "@/types/workout";
import WorkoutCard from "@/Components/WorkoutCard";
import SortDropdown, { type SortKey } from "@/Components/SortDropdown";
import SearchInput from "@/Components/SearchInput";
import Spinner from "@/Components/Spinner";

export default function Librarys() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [query, setQuery] = useState("");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetchWorkouts()
      .then((data) => {
        if (!cancelled) setWorkouts(data);
      })
      .catch(() => {
        if (!cancelled) setError(true);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [attempt]);

  
  const visible = useMemo(
    () =>
      workouts
        .filter((w) => matchesQuery(w, query))
        .sort((a, b) => b[sortBy] - a[sortBy]),
    [workouts, query, sortBy]
  );

  return (
    <section
      id="library"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6"
    >
      <div>
        <h2 className="font-display text-2xl font-bold uppercase text-white">
          The Library
        </h2>
        <p className="mt-1 text-xs text-muted">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      <div className="mb-6 mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <SearchInput value={query} onChange={setQuery} />
        <SortDropdown value={sortBy} onChange={setSortBy} />
      </div>

      {loading ? (
        <Spinner />
      ) : error ? (
        <div className="rounded-xl border border-line bg-surface py-16 text-center">
          <p className="font-display text-lg uppercase text-white">
            Couldn&apos;t load workouts
          </p>
          <button
            onClick={() => setAttempt((n) => n + 1)}
            className="mt-4 rounded-md bg-accent px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-black hover:brightness-110"
          >
            Try again
          </button>
        </div>
      ) : visible.length === 0 ? (
        <div className="rounded-xl border border-dashed border-white/10 bg-surface py-16 text-center">
          <p className="font-display text-xl uppercase text-white">
            No lifts found
          </p>
          <p className="mt-1 text-xs text-muted">
            Nothing matches &ldquo;{query}&rdquo;. Try a name like squat or a tag like core.
          </p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}