export interface RegionData {
  region: string
  code: string
  cases: number
  deaths: number
  riskLevel: "low" | "medium" | "high" | "critical"
}

// Swap with: await supabase.from("regional_cases").select("*").eq("disease_id", id)
export function getRegionalData(diseaseId?: string): RegionData[] {
  const base: RegionData[] = [
    { region: "Greater Accra",  code: "GA", cases: 12480, deaths: 312, riskLevel: "critical" },
    { region: "Ashanti",        code: "AH", cases: 9870,  deaths: 198, riskLevel: "high"     },
    { region: "Western",        code: "WE", cases: 7340,  deaths: 147, riskLevel: "high"     },
    { region: "Eastern",        code: "EA", cases: 5620,  deaths: 112, riskLevel: "medium"   },
    { region: "Central",        code: "CE", cases: 4980,  deaths: 89,  riskLevel: "medium"   },
    { region: "Northern",       code: "NO", cases: 6710,  deaths: 201, riskLevel: "high"     },
    { region: "Upper East",     code: "UE", cases: 3240,  deaths: 97,  riskLevel: "medium"   },
    { region: "Upper West",     code: "UW", cases: 2110,  deaths: 63,  riskLevel: "medium"   },
    { region: "Volta",          code: "VO", cases: 3870,  deaths: 77,  riskLevel: "medium"   },
    { region: "Brong-Ahafo",    code: "BA", cases: 4320,  deaths: 86,  riskLevel: "medium"   },
    { region: "Oti",            code: "OT", cases: 1540,  deaths: 31,  riskLevel: "low"      },
    { region: "Bono East",      code: "BE", cases: 2230,  deaths: 45,  riskLevel: "low"      },
    { region: "Ahafo",          code: "AF", cases: 1890,  deaths: 38,  riskLevel: "low"      },
    { region: "Savannah",       code: "SA", cases: 2640,  deaths: 79,  riskLevel: "medium"   },
    { region: "North East",     code: "NE", cases: 1780,  deaths: 53,  riskLevel: "medium"   },
    { region: "Western North",  code: "WN", cases: 2410,  deaths: 48,  riskLevel: "low"      },
  ]
  if (!diseaseId) return base
  const factor = (diseaseId.charCodeAt(0) % 5 + 6) / 10
  return base.map(r => ({
    ...r,
    cases:  Math.round(r.cases * factor),
    deaths: Math.round(r.deaths * factor),
  }))
}

export const RISK_COLORS: Record<string, string> = {
  critical: "#dc2626",
  high:     "#ea580c",
  medium:   "#ca8a04",
  low:      "#16a34a",
}
