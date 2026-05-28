import { useEffect, useRef } from "react"
import * as L from "leaflet"
import { RISK_COLORS, getRegionalData } from "@/data/geography"

// Approximate center coordinates for Ghana's 16 regions
const REGION_COORDS: Record<string, [number, number]> = {
  GA: [5.6037,  -0.1870],
  AH: [6.6885,  -1.6244],
  WE: [5.1093,  -2.0495],
  EA: [6.5442,  -0.4614],
  CE: [5.5502,  -1.0264],
  NO: [9.4008,  -0.8393],
  UE: [10.7833, -0.0500],
  UW: [10.2529, -2.1073],
  VO: [6.5698,   0.4494],
  BA: [7.9500,  -1.7000],
  OT: [7.9000,   0.3000],
  BE: [7.7500,  -1.0500],
  AF: [7.3500,  -2.5000],
  SA: [9.0000,  -1.5000],
  NE: [10.5000, -0.5000],
  WN: [7.0000,  -2.7000],
}

interface GeoMapProps { diseaseId?: string }

export function GeoMap({ diseaseId }: GeoMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Tear down any existing map on this element before creating a new one
    if (mapRef.current) {
      mapRef.current.remove()
      mapRef.current = null
    }

    const data = getRegionalData(diseaseId)
    const maxCases = Math.max(...data.map(r => r.cases))

    const map = L.map(el, { scrollWheelZoom: false }).setView([7.9465, -1.0232], 6)
    mapRef.current = map

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 19,
    }).addTo(map)

    data.forEach(r => {
      const coords = REGION_COORDS[r.code]
      if (!coords) return
      const radius = 6 + (r.cases / maxCases) * 22
      L.circleMarker(coords, {
        radius,
        color: RISK_COLORS[r.riskLevel],
        fillColor: RISK_COLORS[r.riskLevel],
        fillOpacity: 0.55,
        weight: 1.5,
      })
        .bindTooltip(
          `<strong>${r.region}</strong><br/>Cases: ${r.cases.toLocaleString()}<br/>Deaths: ${r.deaths.toLocaleString()}<br/>Risk: ${r.riskLevel}`,
          { sticky: true }
        )
        .addTo(map)
    })

    return () => {
      map.remove()
      mapRef.current = null
    }
  }, [diseaseId])

  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground mb-2">Circle size = case count. Hover a marker for details.</p>
      <div ref={containerRef} style={{ height: 300, width: "100%", borderRadius: 8 }} />
      <div className="flex flex-wrap gap-3 pt-2">
        {Object.entries(RISK_COLORS).map(([level, color]) => (
          <span key={level} className="flex items-center gap-1 text-xs text-muted-foreground capitalize">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            {level}
          </span>
        ))}
      </div>
    </div>
  )
}
