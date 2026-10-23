import type { Workout } from "@/types/workout";

export function matchesQuery(workout: Workout, query: string) {
    const q = query.trim().toLowerCase();
    if (!q) return true;

    return (
        workout.name.toLowerCase().includes(q) ||
        workout.equipment.toLowerCase().includes(q) ||
        workout.muscleGroups.some((g) => g.toLowerCase().includes(q))
    );
}