"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchWorkouts } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";
import type { Workout } from "@/types/workout";
import MetricsRow from "@/Components/MetricsRow";
import PlanTabs, { type TabKey } from "@/Components/PlanTabs";
import PlanCard from "@/Components/PlanCard";
import EmptyState from "@/Components/EmptyState";
import Spinner from "@/Components/Spinner";

export default function MyPlan() {
  const {
    planIds,
    savedIds,
    doneIds,
    hydrated,
    removeFromPlan,
    removeFromSaved,
    markDone,
  } = usePlan();

  const [all, setAll] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [tab, setTab] = useState<TabKey>("plan");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);

    fetchWorkouts()
      .then((data) => {
        if (!cancelled) setAll(data);
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

  const byId = useMemo(() => new Map(all.map((w) => [w.id, w])), [all]);

  const planItems = planIds
    .map((id) => byId.get(id))
    .filter((w): w is Workout => Boolean(w));
  const savedItems = savedIds
    .map((id) => byId.get(id))
    .filter((w): w is Workout => Boolean(w));

  const metrics = {
    exercises: planItems.length,
    minutes: planItems.reduce((sum, w) => sum + w.duration, 0),
    calories: planItems.reduce((sum, w) => sum + w.caloriesBurned, 0),
  };

  const items = tab === "plan" ? planItems : savedItems;
  const isLoading = loading || !hydrated;

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
      <h1 className="font-display text-3xl font-bold uppercase text-white sm:text-4xl">
        My Plan
      </h1>
      <p className="mt-1 text-xs text-muted sm:text-sm">
        Cap of five lifts for today. Finish them, then load more.
      </p>

      <MetricsRow {...metrics} />

      <PlanTabs
        active={tab}
        onChange={setTab}
        planCount={planIds.length}
        savedCount={savedIds.length}
      />

      <div className="mt-6">
        {isLoading ? (
          <Spinner label="Loading workouts…" />
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
        ) : items.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-3">
            {items.map((w) => (
              <PlanCard
                key={w.id}
                workout={w}
                mode={tab}
                done={doneIds.includes(w.id)}
                onDone={() => markDone(w.id)}
                onRemove={() =>
                  tab === "plan" ? removeFromPlan(w.id) : removeFromSaved(w.id)
                }
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}