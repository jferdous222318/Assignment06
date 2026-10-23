"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { fetchWorkout } from "@/lib/api";
import type { Workout } from "@/types/workout";
import Tag from "@/Components/Tag";
import Spinner from "@/Components/Spinner";
import DetailActions from "@/Components/DetailActions";

export default function WorkoutDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    fetchWorkout(id).then((data) => {
      if (cancelled) return;
      setWorkout(data);
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <Spinner label="Loading workout…" />;
  if (!workout) notFound();

  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: String(workout.rating) },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-muted transition hover:text-accent"
      >
        <ArrowLeft size={14} /> Back to library
      </Link>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-white/5 bg-surface-2">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div>
          <div className="flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((g) => (
              <Tag key={g}>{g}</Tag>
            ))}
          </div>

          <h1 className="mt-4 font-display text-3xl font-bold uppercase leading-tight text-white sm:text-4xl">
            {workout.name}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
            {workout.description}
          </p>

          <h2 className="mt-8 font-display text-sm font-bold uppercase tracking-widest text-accent">
            Key Specs
          </h2>
          <dl className="mt-3 divide-y divide-white/5 overflow-hidden rounded-xl border border-white/5 bg-surface">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex items-center justify-between px-4 py-2.5 text-xs"
              >
                <dt className="font-semibold uppercase tracking-wider text-muted">
                  {s.label}
                </dt>
                <dd className="font-medium text-white">{s.value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-8 font-display text-sm font-bold uppercase tracking-widest text-accent">
            Instructions
          </h2>
          <ol className="mt-3 space-y-3">
            {workout.instructions.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-white/90">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-black">
                  {i + 1}
                </span>
                <span className="pt-0.5 leading-relaxed">{step}</span>
              </li>
            ))}
          </ol>

          <DetailActions id={workout.id} />
        </div>
      </div>
    </section>
  );
}