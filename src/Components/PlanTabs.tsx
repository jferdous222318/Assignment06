export type TabKey = "plan" | "saved";

type Props = {
  active: TabKey;
  onChange: (tab: TabKey) => void;
  planCount: number;
  savedCount: number;
};

export default function PlanTabs({ active, onChange, planCount, savedCount }: Props) {
  const tabs: { key: TabKey; label: string; count: number }[] = [
    { key: "plan", label: "Today's Plan", count: planCount },
    { key: "saved", label: "Saved", count: savedCount },
  ];

  return (
    <div
      role="tablist"
      className="mt-8 inline-flex rounded-full border border-white/10 bg-surface p-1"
    >
      {tabs.map((t) => {
        const isActive = active === t.key;
        return (
          <button
            key={t.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(t.key)}
            className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-semibold transition-colors sm:px-5 ${
              isActive
                ? "bg-accent text-black"
                : "text-muted hover:text-white"
            }`}
          >
            {t.label}
            <span
              className={`rounded-full px-1.5 text-[10px] font-bold ${
                isActive ? "bg-black/20 text-black" : "bg-white/10 text-white"
              }`}
            >
              {t.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}