import type { Workout } from "@/types/workout";

const BASES = [
  "https://api.abcz.workers.dev/api/fitlog",
  "https://api.api-store.workers.dev/api/fitlog",
];

async function tryFetch<T>(path = ""): Promise<T> {
  let lastError: unknown;
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return (await res.json()) as T;
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
}

export function fetchWorkouts(): Promise<Workout[]> {
  return tryFetch<Workout[]>();
}

export async function fetchWorkout(id: string | number): Promise<Workout | null> {
  try {
    const data = await tryFetch<Workout>(`/${id}`);
    if (data && typeof data === "object" && "id" in data) return data;
  } catch {
    // fall through to list lookup
  }
  try {
    const all = await fetchWorkouts();
    return all.find((w) => String(w.id) === String(id)) ?? null;
  } catch {
    return null;
  }
}