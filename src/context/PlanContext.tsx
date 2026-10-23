"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";

export const PLAN_CAP = 5;
const KEY = "fitlog-state-v1";

type StoredState = {
  planIds: number[];
  savedIds: number[];
  doneIds: number[];
};

type PlanContextValue = StoredState & {
  hydrated: boolean;
  addToPlan: (id: number) => void;
  saveForLater: (id: number) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  markDone: (id: number) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoredState>({
    planIds: [],
    savedIds: [],
    doneIds: [],
  });
  const [hydrated, setHydrated] = useState(false);

  // Load from localStorage once on the client
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState(JSON.parse(raw) as StoredState);
    } catch {
      /* ignore corrupted storage */
    }
    setHydrated(true);
  }, []);

  // Persist after hydration
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* storage may be unavailable */
    }
  }, [state, hydrated]);

  const addToPlan = useCallback(
    (id: number) => {
      if (state.planIds.includes(id)) {
        toast("Already in today's plan");
        return;
      }
      if (state.planIds.length >= PLAN_CAP) {
        toast.error(`Plan is full — max ${PLAN_CAP} lifts`);
        return;
      }
      setState((s) => ({ ...s, planIds: [...s.planIds, id] }));
      toast.success("Added to today's plan");
    },
    [state.planIds]
  );

  const saveForLater = useCallback(
    (id: number) => {
      if (state.savedIds.includes(id)) {
        toast("Already saved");
        return;
      }
      setState((s) => ({ ...s, savedIds: [...s.savedIds, id] }));
      toast.success("Saved for later");
    },
    [state.savedIds]
  );

  const removeFromPlan = useCallback((id: number) => {
    setState((s) => ({
      ...s,
      planIds: s.planIds.filter((x) => x !== id),
      doneIds: s.doneIds.filter((x) => x !== id),
    }));
    toast("Removed from today's plan");
  }, []);

  const removeFromSaved = useCallback((id: number) => {
    setState((s) => ({ ...s, savedIds: s.savedIds.filter((x) => x !== id) }));
    toast("Removed from saved");
  }, []);

  const markDone = useCallback(
    (id: number) => {
      if (state.doneIds.includes(id)) {
        toast("Already marked as done");
        return;
      }
      setState((s) => ({ ...s, doneIds: [...s.doneIds, id] }));
      toast.success("Marked as done 💪");
    },
    [state.doneIds]
  );

  return (
    <PlanContext.Provider
      value={{
        ...state,
        hydrated,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markDone,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}