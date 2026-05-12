import { useState } from "react"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell, RadarChart,
  PolarGrid, PolarAngleAxis, Radar,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAgeDistribution, getRiskGroups, getSexBreakdown } from "@/data/demographics"
import { DISEASES } from "@/data/diseases"

const RISK_PALETTE = ["#3b82f6","#f97316","#22c55e","#8b5cf6","#ec4899","#14b8a6"]

export default function Demographics() {
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

  const ageData  = getAgeDistribution(selectedId)
  const riskData = getRiskGroups(selectedId)
  const sex      = getSexBreakdown(selectedId)

  const agePyramid = ageData.map(d => ({ ...d, male: -d.male }))

  const radarData = ageData.map(d => ({
    group: d.group,
    Male:  d.male,
    Female: d.female,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-foreground">Demographics</h2>
          <p className="text-sm text-muted-foreground mt-0.5">Age, sex, and risk group breakdown</p>
        </div>
        {/* Disease filter */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs text-muted-foreground mr-1">Filter:</span>
          <button
            onClick={() => setSelectedId(undefined)}
            className={`text-xs px-2.5 py-1 rounded-full transition-colors border ${!selectedId ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:bg-accent"}`}
          >All</button>
          {DISEASES.map(d => (
            <button
              key={d.id}
              onClick={() => setSelectedId(d.id)}
              className={`text-xs px-2.5 py-1 rounded-full transition-colors border ${selectedId === d.id ? "text-white border-transparent" : "border-border text-muted-foreground hover:bg-accent"}`}
              style={selectedId === d.id ? { backgroundColor: d.color } : {}}
            >{d.name}</button>
          ))}
        </div>
      </div>

      {/* Sex split + risk groups */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Sex donut */}
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Sex Distribution</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={[{ name: "Male", value: sex.male }, { name: "Female", value: sex.female }]}
                  cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={4} dataKey="value"
                  label={({ name, value }) => `${name} ${value}%`} labelLine={false}
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

        {/* Risk groups */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-base">Vulnerable Populations</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {riskData.map((r, i) => (
                <div key={r.name} className="flex items-center gap-3 text-sm">
                  <div className="w-28 flex-shrink-0 text-muted-foreground text-xs truncate" title={r.name}>{r.name}</div>
                  <div className="flex-1 h-5 bg-muted rounded overflow-hidden">
                    <div
                      className="h-full rounded flex items-center justify-end pr-1.5 text-white text-[10px] font-medium transition-all"
                      style={{ width: `${r.percentage}%`, backgroundColor: RISK_PALETTE[i % RISK_PALETTE.length] }}
                    >{r.percentage}%</div>
                  </div>
                  <div className="w-14 text-right text-xs text-muted-foreground flex-shrink-0">{r.count.toLocaleString()}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Age pyramid + radar */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Age Pyramid</CardTitle></CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground mb-2 text-center">← Male &nbsp;|&nbsp; Female →</p>
            <ResponsiveContainer width="100%" height={280}>
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
          <CardHeader className="pb-2"><CardTitle className="text-base">Age Group Radar — Male vs Female</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid className="stroke-border" />
                <PolarAngleAxis dataKey="group" tick={{ fontSize: 11 }} />
                <Radar name="Male"   dataKey="Male"   stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} />
                <Radar name="Female" dataKey="Female" stroke="#ec4899" fill="#ec4899" fillOpacity={0.25} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Age breakdown bar */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-base">Cases by Age Group — Absolute Count</CardTitle></CardHeader>
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
