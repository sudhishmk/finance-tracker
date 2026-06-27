import type { CoachResponse } from "../types";

export async function getMonthlySummary(month: string) {
  const response = await fetch(
    `http://localhost:8080/api/v1/summary?month=${month}`
  );
  return response.json();
}

export async function getCoachReview(month: string): Promise<CoachResponse> {

  const response = await fetch(
    `http://localhost:8080/api/v1/coach/review?month=${month}`
  );

  if (!response.ok) {
    throw new Error("Failed to load coach insights");
  }
  return response.json();
}
