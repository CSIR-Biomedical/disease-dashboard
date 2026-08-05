import { useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAgeDistribution, getRiskGroups, getSexBreakdown } from "@/data/demographics"
import { getDiseasesByType } from "@/data/diseases"
import { useDiseaseType } from "@/context/DiseaseTypeContext"

const RISK_PALETTE = ["#3b82f6","#f97316","#22c55e","#8b5cf6","#ec4899","#14b8a6"]

export default function Demographics() {
  const { diseaseType } = useDiseaseType()
  const diseases = getDiseasesByType(diseaseType)

  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

  // Reset selection when disease type changes and selected disease is no longer in list
  const validSelected = diseases.find(d => d.id === selectedId) ? selectedId : undefined
  const activeId = validSelected

  const ageData  = getAgeDistribution(activeId)
  const riskData = getRiskGroups(activeId)
  const sex      = getSexBreakdown(activeId)

  const agePyramid = ageData.map(d => ({ ...d, male: -d.male }))

  const isNCD = diseaseType === "non-communicable"
  const activeDisease = diseases.find(d => d.id === activeId)
  const subtitleSuffix = activeDisease ? ` · ${activeDisease.name}` : ""

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between flex-wrap gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.16em] uppercase text-slate-500 mb-2">
            Population
          </p>
          <h2 className="font-['Merriweather',serif] text-xl md:text-2xl font-bold text-secondary dark:text-white">
            Demographics
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {isNCD ? "NCD patient" : "Case"} demographics by age, sex &amp; risk group{subtitleSuffix}
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs text-slate-500 mr-1">Filter:</span>
          <button
            onClick={() => setSelectedId(undefined)}
            className={`text-xs px-2.5 py-1 rounded-sm transition-colors border ${!activeId ? "bg-secondary text-white border-secondary" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
          >All</button>
          {diseases.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={`text-xs px-2.5 py-1 rounded-sm transition-colors border ${activeId === d.id ? "text-white border-transparent" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
              style={activeId === d.id ? { backgroundColor: d.color } : {}}
            >{d.name}</button>
          ))}
        </div>
      </div>

      {/* Sex split + risk groups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sex donut */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="font-['Merriweather',serif] text-base font-bold text-secondary dark:text-white">Sex distribution</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={[{ name: "Male", value: sex.male }, { name: "Female", value: sex.female }]}
                  cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={4} dataKey="value"
                >
                  <Cell fill="#3b82f6" />
                  <Cell fill="#ec4899" />
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-6 text-sm mt-1">
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-500" /> Male {sex.male}%</span>
              <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-pink-500" /> Female {sex.female}%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="font-['Merriweather',serif] text-base font-bold text-secondary dark:text-white">Vulnerable populations</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskData.map((r, i) => (
                <div key={r.name} className="flex items-center gap-3 text-sm">
                  {/* Widened label column — no truncation, wrap if needed (fixes DM-1) */}
                  <div className="min-w-0 w-[30%] max-w-[11rem] flex-shrink text-muted-foreground text-xs leading-tight">{r.name}</div>
                  <div className="flex-1 min-w-0 h-5 bg-muted rounded overflow-hidden">
                    <div
                      className="h-full rounded flex items-center justify-end pr-1.5 text-white text-[10px] font-medium transition-all"
                      style={{ width: `${r.percentage}%`, backgroundColor: RISK_PALETTE[i % RISK_PALETTE.length] }}
                    >{r.percentage}%</div>
                  </div>
                  <div className="w-12 sm:w-16 text-right text-xs text-muted-foreground flex-shrink-0">{r.count.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age pyramid — kept as primary age/sex view */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="font-['Merriweather',serif] text-base font-bold text-secondary dark:text-white">Age pyramid</CardTitle></CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground mb-2 text-center">← Male &nbsp;|&nbsp; Female →</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={agePyramid} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }} stackOffset="sign">
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis type="number" tick={{ fontSize: 10 }} tickFormatter={v => Math.abs(v).toLocaleString()} />
              <YAxis type="category" dataKey="group" tick={{ fontSize: 11 }} width={36} />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                formatter={(v: number) => [Math.abs(v).toLocaleString(), ""]}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="male"   name="Male"   fill="#3b82f6" radius={[0,3,3,0]} />
              <Bar dataKey="female" name="Female" fill="#ec4899" radius={[3,0,0,3]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2"><CardTitle className="font-['Merriweather',serif] text-base font-bold text-secondary dark:text-white">Cases by age group — male vs female</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={ageData} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="group" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="male"   name="Male"   fill="#3b82f6" radius={[3,3,0,0]} />
              <Bar dataKey="female" name="Female" fill="#ec4899" radius={[3,3,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
