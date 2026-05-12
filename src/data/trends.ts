export interface TrendPoint { date: string; cases: number; deaths: number; recovered: number }

export interface Outcomes { recovered: number; active: number }

/**
 * Centralised outcome calculator.
 * Uses Math.max(0) to guard against negative active counts when real data
 * has cumulative re-infections or rounding differences.
 * recoveredRate default matches getCaseTrends (0.88) — kept consistent here.
 */
export function computeOutcomes(totalCases: number, totalDeaths: number, recoveredRate = 0.88): Outcomes {
  const recovered = Math.round(totalCases * recoveredRate)
  const active    = Math.max(0, totalCases - totalDeaths - recovered)
  return { recovered, active }
}

// Swap with: await supabase.from("case_trends").select("*").eq("disease_id", id).order("date")
export function getCaseTrends(diseaseId: string): TrendPoint[] {
  const seed = diseaseId.charCodeAt(0)
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return months.map((m, i) => {
    const base = (seed * (i + 1) * 317) % 8000 + 500
    return {
      date: m,
      cases:     base,
      deaths:    Math.round(base * 0.04),
      recovered: Math.round(base * 0.88),
    }
  })
}

export function getOverallTrends(): TrendPoint[] {
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
  return months.map((m, i) => ({
    date: m,
    cases:     12000 + Math.round(Math.sin(i * 0.6) * 3000) + i * 400,
    deaths:    480  + Math.round(Math.sin(i * 0.6) * 120)  + i * 10,
    recovered: 10500 + Math.round(Math.sin(i * 0.6) * 2600) + i * 350,
  }))
}
