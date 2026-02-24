import { StudentInput, RecommendationResult, SimulationInput, SimulationResult } from "@/types/recommendation";

const API_BASE = "http://127.0.0.1:8000";

export async function getRecommendation(input: StudentInput): Promise<RecommendationResult> {
  const res = await fetch(`${API_BASE}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to get recommendation");
  return res.json();
}

export async function getSimulation(input: SimulationInput): Promise<SimulationResult> {
  const res = await fetch(`${API_BASE}/simulate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to run simulation");
  return res.json();
}
