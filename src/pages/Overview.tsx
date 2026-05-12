import { Activity, Skull, HeartPulse, TrendingUp } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatCard } from "@/components/StatCard"
import { GeoMap } from "@/components/GeoMap"
import { DISEASES } from "@/data/diseases"
import { getOverallTrends, computeOutcomes } from "@/data/trends"
import { getRegionalData } from "@/data/geography"

export default function Overview() {
  const navigate = useNavigate()

  // TODO: replace with useEffect + useState when swapping to Supabase async queries
  const trends  = getOverallTrends()
  const regions = getRegionalData()
  const totalCases  = regions.reduce((s, r) => s + r.cases, 0)
  const totalDeaths = regions.reduce((s, r) => s + r.deaths, 0)
  const { recovered: totalRecovered, active: activeCases } = computeOutcomes(totalCases, totalDeaths)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground">Dashboard Overview</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Malaria · Schistosomiasis · Onchocerciasis · COVID-19 · All regions · 2025–2026</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Cases"  value={totalCases}     sub="All diseases combined" icon={Activity}   trend={8}  iconColor="bg-blue-500" />
        <StatCard title="Active Cases" value={activeCases}    sub="Currently under care"  icon={TrendingUp}  trend={12} iconColor="bg-orange-500" />
        <StatCard title="Recovered"    value={totalRecovered} sub="Successfully treated"  icon={HeartPulse}  trend={-4} trendPositiveIsGood iconColor="bg-green-500" />
        <StatCard title="Deaths"       value={totalDeaths}    sub="Case fatality rate"    icon={Skull}       trend={-2} iconColor="bg-red-600" />
      </div>

      {/* Trend chart + map */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Case Trends — 2025</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={trends} margin={{ top: 5, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gCases"     x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gRecovered" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gDeaths"    x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <YAxis tick={{ fontSize: 11 }} className="text-muted-foreground" />
                <Tooltip
                  contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Area type="monotone" dataKey="cases"     name="Cases"     stroke="#3b82f6" fill="url(#gCases)"     strokeWidth={2} />
                <Area type="monotone" dataKey="recovered" name="Recovered" stroke="#22c55e" fill="url(#gRecovered)" strokeWidth={2} />
                <Area type="monotone" dataKey="deaths"    name="Deaths"    stroke="#ef4444" fill="url(#gDeaths)"    strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Regional Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <GeoMap />
          </CardContent>
        </Card>
      </div>

      {/* Disease table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Disease Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  {["Disease","Category","Pathogen","Cases","CFR","Status"].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DISEASES.map((d) => {
                  const cases = 3000 + (d.id.charCodeAt(0) * 419 % 9000)
                  const badgeVariant = d.alertStatus === "High Alert" ? "destructive"
                    : d.alertStatus === "Active" ? "default" : "secondary"
                  return (
                    <tr
                      key={d.id}
                      onClick={() => navigate(`/disease?id=${d.id}`)}
                      className="border-b last:border-0 hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <td className="py-2.5 px-3 font-medium text-foreground flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }} />
                        {d.name}
                      </td>
                      <td className="py-2.5 px-3 text-muted-foreground">{d.category}</td>
                      <td className="py-2.5 px-3 text-muted-foreground italic text-xs">{d.pathogen}</td>
                      <td className="py-2.5 px-3 font-medium">{cases.toLocaleString()}</td>
                      <td className="py-2.5 px-3">{d.cfr.toFixed(1)}%</td>
                      <td className="py-2.5 px-3">
                        <Badge variant={badgeVariant}>{d.alertStatus}</Badge>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
