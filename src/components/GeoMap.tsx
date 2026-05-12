import { RISK_COLORS, getRegionalData } from "@/data/geography"

interface GeoMapProps { diseaseId?: string }

export function GeoMap({ diseaseId }: GeoMapProps) {
  const data = getRegionalData(diseaseId)
  const sorted = [...data].sort((a, b) => b.cases - a.cases)

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground mb-3">Case distribution by region (bubble size = case count)</p>
      <div className="grid grid-cols-2 gap-2">
        {sorted.map(r => {
          const maxCases = sorted[0].cases
          const pct = (r.cases / maxCases) * 100
          return (
            <div key={r.code} className="flex items-center gap-2 text-xs">
              <div className="flex-shrink-0 w-5 h-5 rounded-sm flex items-center justify-center text-white text-[9px] font-bold"
                style={{ backgroundColor: RISK_COLORS[r.riskLevel] }}>
                {r.code.slice(0,2)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <span className="truncate text-foreground font-medium">{r.region}</span>
                  <span className="text-muted-foreground ml-1 flex-shrink-0">{r.cases.toLocaleString()}</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: RISK_COLORS[r.riskLevel] }} />
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {/* Risk legend */}
      <div className="flex flex-wrap gap-3 pt-2 mt-2 border-t">
        {Object.entries(RISK_COLORS).map(([level, color]) => (
          <span key={level} className="flex items-center gap-1 text-xs text-muted-foreground capitalize">
            <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
            {level}
          </span>
        ))}
      </div>
    </div>
  )
}
