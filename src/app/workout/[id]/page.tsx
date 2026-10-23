import { Suspense } from "react";
import WorkoutDetails from "@/Components/WorkoutDetails";
import Spinner from "@/Components/Spinner";

export default function WorkoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<Spinner label="Loading workout…" />}>
      <WorkoutDetails params={params} />
    </Suspense>
  );
}