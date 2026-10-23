import { Search, X } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search by name or tag…",
}: Props) {
  return (
    <div className="relative w-full sm:max-w-xs">
      <Search
        size={14}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted"
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search workouts"
        className="w-full rounded-md border border-line bg-surface py-2 pl-9 pr-8 text-xs text-white outline-none transition placeholder:text-muted focus:border-accent"
      />
      {value && (
        <button
          onClick={() => onChange("")}
          aria-label="Clear search"
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-white"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}