import Image from "next/image";
import Link from "next/link";
import { Check, Clock, Eye, Flame, Star, X } from "lucide-react";
import type { Workout } from "@/types/workout";

type Props = {
  workout: Workout;
  mode: "plan" | "saved";
  done?: boolean;
  onDone?: () => void;
  onRemove: () => void;
};

export default function PlanCard({ workout, mode, done, onDone, onRemove }: Props) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-xl border bg-surface p-3 transition sm:flex-row sm:items-center sm:p-4 ${
        done ? "border-accent/40" : "border-white/5"
      }`}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-lg bg-surface-2 sm:aspect-square sm:h-24 sm:w-24">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 640px) 96px, 100vw"
          className={`object-cover ${done ? "opacity-60" : ""}`}
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h3
          className={`font-display text-base font-bold uppercase ${
            done ? "text-white/60 line-through" : "text-white"
          }`}
        >
          {workout.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-muted">{workout.equipment}</p>

        <div className="mt-2 flex items-center gap-4 text-[11px] text-muted">
          <span className="flex items-center gap-1.5">
            <Clock size={12} /> {workout.duration} min
          </span>
          <span className="flex items-center gap-1.5">
            <Flame size={12} /> {workout.caloriesBurned} kcal
          </span>
          <span className="flex items-center gap-1.5">
            <Star size={12} /> {workout.rating}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="inline-flex items-center gap-1.5 rounded-md border border-white/20 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white transition hover:border-accent hover:text-accent"
        >
          <Eye size={12} /> View Details
        </Link>

        {mode === "plan" && (
          <button
            onClick={onDone}
            disabled={done}
            className="inline-flex items-center gap-1.5 rounded-md bg-accent px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-black transition hover:brightness-110 disabled:cursor-default disabled:opacity-50 disabled:hover:brightness-100"
          >
            <Check size={12} strokeWidth={3} />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          onClick={onRemove}
          aria-label={`Remove ${workout.name}`}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-white/20 text-muted transition hover:border-red-500 hover:text-red-500"
        >
          <X size={14} />
        </button>
      </div>
    </article>
  );
}