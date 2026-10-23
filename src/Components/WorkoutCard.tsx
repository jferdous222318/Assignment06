import Image from "next/image";
import Link from "next/link";
import { Clock, Flame, Star } from "lucide-react";
import Tag from "@/Components/Tag";
import type { Workout } from "@/types/workout";

export default function WorkoutCard({ workout }: { workout: Workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden rounded-xl border border-white/5 bg-surface transition hover:-translate-y-1 hover:border-accent/40"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-2">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="flex flex-wrap gap-1.5">
          {workout.muscleGroups.map((group) => (
            <Tag key={group}>{group}</Tag>
          ))}
        </div>

        <h3 className="mt-3 font-display text-base font-bold uppercase text-white">
          {workout.name}
        </h3>
        <p className="mt-0.5 text-[11px] text-muted">{workout.equipment}</p>

        <div className="mt-4 flex items-center gap-4 border-t border-white/5 pt-3 text-[11px] text-muted">
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
    </Link>
  );
}