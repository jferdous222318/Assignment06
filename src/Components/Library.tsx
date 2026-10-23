"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchWorkouts } from "@/lib/api";
import type { Workout } from "@/types/workout";
import WorkoutCard from "@/Components/WorkoutCard";
import SortDropdown, { type SortKey } from "@/Components/SortDropdown";
import Spinner from "@/Components/Spinner";

export default function Library() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [sortBy, setSortBy] = useState<SortKey>("duration");
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

  const sorted = useMemo(
    () => [...workouts].sort((a, b) => b[sortBy] - a[sortBy]),
    [workouts, sortBy]
  );

  return (
    <section
      id="library"
      className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14 sm:px-6"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase text-white">
            The Library
          </h2>
          <p className="mt-1 text-xs text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>
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
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {sorted.map((w) => (
            <WorkoutCard key={w.id} workout={w} />
          ))}
        </div>
      )}
    </section>
  );
}