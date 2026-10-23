"use client";

import { Bookmark, BookmarkCheck, Check, Plus } from "lucide-react";
import { PLAN_CAP, usePlan } from "@/context/PlanContext";

export default function DetailActions({ id }: { id: number }) {
  const { planIds, savedIds, addToPlan, saveForLater } = usePlan();

  const inPlan = planIds.includes(id);
  const isSaved = savedIds.includes(id);
  const planFull = planIds.length >= PLAN_CAP && !inPlan;

  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <button
        onClick={() => addToPlan(id)}
        disabled={planFull}
        title={planFull ? `Plan is full (max ${PLAN_CAP} lifts)` : undefined}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-accent px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:brightness-100"
      >
        {inPlan ? (
          <Check size={14} strokeWidth={3} />
        ) : (
          <Plus size={14} strokeWidth={3} />
        )}
        {planFull ? "Plan is full" : inPlan ? "In today's plan" : "Add to today's plan"}
      </button>

      <button
        onClick={() => saveForLater(id)}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white transition hover:border-accent hover:text-accent"
      >
        {isSaved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
        {isSaved ? "Saved" : "Save for later"}
      </button>
    </div>
  );
}