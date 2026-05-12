import { useSearchParams, useNavigate } from "react-router-dom"
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts"
import { ArrowLeft, FlaskConical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GeoMap } from "@/components/GeoMap"
import { DISEASES } from "@/data/diseases"
import { getCaseTrends, computeOutcomes } from "@/data/trends"
import { getRegionalData } from "@/data/geography"

const PIE_COLORS = ["#ef4444","#22c55e","#3b82f6"]

export default function DiseaseDetail() {
  const [params] = useSearchParams()
  const navigate  = useNavigate()
  const id        = params.get("id") ?? "malaria"
  const disease   = DISEASES.find(d => d.id === id) ?? DISEASES[0]

  // TODO: replace with useEffect + useState when swapping to Supabase async queries
  const trends    = getCaseTrends(disease.id)
  const regions   = getRegionalData(disease.id)

  const totalCases  = regions.reduce((s, r) => s + r.cases, 0)
  const totalDeaths = regions.reduce((s, r) => s + r.deaths, 0)
  const { recovered: totalRecovered, active } = computeOutcomes(totalCases, totalDeaths)

  const pieData = [
    { name: "Deaths",    value: totalDeaths },
    { name: "Recovered", value: totalRecovered },
    { name: "Active",    value: active },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Button variant="ghost" size="icon" onClick={() => window.history.length > 1 ? navigate(-1) : navigate("/")}>
          <ArrowLeft size={18} />
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-xl font-bold text-foreground">{disease.name}</h2>
            <Badge style={{ backgroundColor: disease.color, color: "white", borderColor: "transparent" }}>
              {disease.category}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground italic mt-0.5">{disease.pathogen}</p>
        </div>
        {/* Selector */}
        <div className="flex flex-wrap gap-1">
          {DISEASES.map(d => (
            <button
              key={d.id}
              onClick={() => navigate(`/disease?id=${d.id}`)}
              className={`text-xs px-2 py-1 rounded-md transition-colors ${d.id === disease.id ? "text-white" : "bg-muted text-muted-foreground hover:bg-accent"}`}
              style={d.id === disease.id ? { backgroundColor: disease.color } : {}}
            >{d.name}</button>
          ))}
        </div>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center">
        {[
          { label: "Total Cases",  val: totalCases,     color: "text-blue-500" },
          { label: "Active",       val: active,         color: "text-orange-500" },
          { label: "Recovered",    val: totalRecovered, color: "text-green-500" },
          { label: "Deaths",       val: totalDeaths,    color: "text-red-500" },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.val.toLocaleString()}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trend + outcome pie */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <FlaskConical size={16} style={{ color: disease.color }} />
              Monthly Case Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={trends} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="cases"     name="Cases"     stroke={disease.color} strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="recovered" name="Recovered" stroke="#22c55e"       strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="deaths"    name="Deaths"    stroke="#ef4444"       strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Case Outcomes</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center justify-center">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ fontSize: 12, backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex gap-4 text-xs mt-1">
              {pieData.map((d, i) => (
                <span key={d.name} className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: PIE_COLORS[i] }} />
                  {d.name}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Regional + monthly bars */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Regional Distribution</CardTitle></CardHeader>
          <CardContent><GeoMap diseaseId={disease.id} /></CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-base">Monthly Cases vs Deaths</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={trends} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="cases"  name="Cases"  fill={disease.color} opacity={0.85} radius={[3,3,0,0]} />
                <Bar dataKey="deaths" name="Deaths" fill="#ef4444"       opacity={0.85} radius={[3,3,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
