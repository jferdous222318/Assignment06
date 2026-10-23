import { Dumbbell, Flame, Timer } from "lucide-react";

type Props = {
  exercises: number;
  minutes: number;
  calories: number;
};

export default function MetricsRow({ exercises, minutes, calories }: Props) {
  const stats = [
    { label: "Exercises", value: exercises, Icon: Dumbbell },
    { label: "Minutes", value: minutes, Icon: Timer },
    { label: "Calories", value: calories, Icon: Flame },
  ];

  return (
    <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
      {stats.map(({ label, value, Icon }) => (
        <div
          key={label}
          className="rounded-xl border border-white/5 bg-surface px-3 py-4 text-center sm:px-5 sm:py-5 sm:text-left"
        >
          <p className="flex items-center justify-center gap-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted sm:justify-start">
            <Icon size={12} className="text-accent" />
            {label}
          </p>
          <p className="mt-2 font-display text-3xl font-bold text-white sm:text-4xl">
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}