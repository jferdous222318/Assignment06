import { ChevronDown } from "lucide-react";

export type SortKey = "duration" | "caloriesBurned" | "rating";

const options: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

type Props = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

export default function SortDropdown({ value, onChange }: Props) {
  return (
    <label className="flex items-center gap-2 text-[11px] text-muted">
      <span className="uppercase tracking-wider">Sort By</span>
      <span className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value as SortKey)}
          className="cursor-pointer appearance-none rounded-md border border-line bg-surface py-1.5 pl-3 pr-8 text-[11px] font-semibold text-white outline-none transition hover:border-accent focus:border-accent"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={14}
          className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-accent"
        />
      </span>
    </label>
  );
}