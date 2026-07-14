import { Activity, Skull, HeartPulse, TrendingUp, ChevronRight, ArrowUpDown } from "lucide-react"
import { useNavigate } from "react-router-dom"
import {
  ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { StatCard } from "@/components/StatCard"
import { GeoMap } from "@/components/GeoMap"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"
import { getDiseasesByType, Disease } from "@/data/diseases"
import { getOverallTrends, computeOutcomes } from "@/data/trends"
import { getRegionalData } from "@/data/geography"
import { useDiseaseType } from "@/context/DiseaseTypeContext"
import { useFilters } from "@/context/FilterContext"

export default function Overview() {
  const navigate = useNavigate()
  const { diseaseType } = useDiseaseType()
  const { region, setRegion, district, setDistrict, timePeriod, setTimePeriod } = useFilters()
  const diseases = getDiseasesByType(diseaseType)

  const diseaseColumns: ColumnDef<Disease>[] = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button variant="ghost" className="-ml-4" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Disease
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="font-medium text-foreground flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: row.original.color }} />
          {row.original.name}
        </div>
      )
    },
    {
      accessorKey: "category",
      header: "Category",
      cell: ({ row }) => <div className="text-muted-foreground">{row.getValue("category")}</div>,
    },
    {
      accessorKey: "pathogen",
      header: "Pathogen / Mechanism",
      cell: ({ row }) => <div className="text-muted-foreground italic text-xs">{row.getValue("pathogen")}</div>,
    },
    {
      accessorKey: "id",
      header: "Cases",
      cell: ({ row }) => {
        const id = row.getValue("id") as string
        const cases = 3000 + (id.charCodeAt(0) * 419 % 9000)
        return <div className="font-medium">{cases.toLocaleString()}</div>
      }
    },
    {
      accessorKey: "cfr",
      header: "CFR",
      cell: ({ row }) => {
        const cfr = parseFloat(row.getValue("cfr"))
        return <div>{cfr.toFixed(1)}%</div>
      }
    },
    {
      accessorKey: "alertStatus",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("alertStatus") as string
        const badgeVariant = status === "High Alert" ? "destructive"
          : status === "Active" ? "default" : "secondary"
        return <Badge variant={badgeVariant}>{status}</Badge>
      }
    },
    {
      id: "actions",
      cell: () => (
        <div className="text-muted-foreground group-hover:text-foreground transition-colors text-right">
          <ChevronRight size={15} className="ml-auto" />
        </div>
      )
    }
  ]


  // TODO: replace with useEffect + useState when swapping to Supabase async queries
  const trends  = getOverallTrends()
  const regions = getRegionalData()
  const totalCases  = regions.reduce((s, r) => s + r.cases, 0)
  const totalDeaths = regions.reduce((s, r) => s + r.deaths, 0)
  const { recovered: totalRecovered, active: activeCases } = computeOutcomes(totalCases, totalDeaths)

  const isNCD = diseaseType === "non-communicable"
  const subtitleDiseases = diseases.map(d => d.name).join(" · ")

  const regionsList = ["All Regions", ...regions.map(r => r.region)]
  const districtsList = [
    "All Districts", "Kumasi Metro", "Accra Metro", "Tamale Metro", "Sekondi-Takoradi", "Cape Coast", "West Mamprusi", "Asante Akim North", "Nadowli-Kaleo", "Kpandu Municipal", "Asuogyaman", "South Tongu", "Krachi East", "Ada East", "Prus West", "Kintampo North", "Bole District", "Hohoe Municipal", "East Gonja", "Tema Metropolitan", "Ledzokuku", "Ho Municipal", "Kpong", "Battor"
  ]
  const timePeriods = ["This Year (2024)", "Last Year (2023)", "Last 30 Days", "Last 12 Months"]

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground">
            {isNCD ? "NCD Overview" : "Dashboard Overview"}
          </h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            {subtitleDiseases} · {region} · {timePeriod}
          </p>
        </div>

        {/* Filter Dropdowns */}
        <div className="flex items-center flex-wrap gap-2">
          <select
            value={region}
            onChange={e => setRegion(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none"
          >
            {regionsList.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          <select
            value={district}
            onChange={e => setDistrict(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none"
          >
            {districtsList.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <select
            value={timePeriod}
            onChange={e => setTimePeriod(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 outline-none"
          >
            {timePeriods.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Cases"  value={totalCases}     sub="All diseases combined" icon={Activity}   trend={8}  iconColor="bg-blue-500" />
        <StatCard title="Active Cases" value={activeCases}    sub="Currently under care"  icon={TrendingUp}  trend={12} iconColor="bg-orange-500" />
        <StatCard title="Recovered"    value={totalRecovered} sub="Successfully treated"  icon={HeartPulse}  trend={-4} trendPositiveIsGood iconColor="bg-green-500" />
        <StatCard title="Deaths"       value={totalDeaths}    sub="Case fatality rate"    icon={Skull}       trend={-2} iconColor="bg-red-600" />
      </div>

      {/* Trend chart — full width with dual Y-axis so deaths are visible */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Case Trends — 2025–2026</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={trends} margin={{ top: 5, right: 40, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="gCases"     x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="gRecovered" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} className="text-muted-foreground" />
              {/* Left axis: cases + recovered */}
              <YAxis
                yAxisId="left"
                tick={{ fontSize: 11 }}
                className="text-muted-foreground"
              />
              {/* Right axis: deaths (separate scale so the line is visible) */}
              <YAxis
                yAxisId="right"
                orientation="right"
                tick={{ fontSize: 11 }}
                className="text-muted-foreground"
                label={{ value: "Deaths", angle: 90, position: "insideRight", offset: 10, fontSize: 11, fill: "#ef4444" }}
              />
              <Tooltip
                contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Area yAxisId="left"  type="monotone" dataKey="cases"     name="Cases"     stroke="#3b82f6" fill="url(#gCases)"     strokeWidth={2} />
              <Area yAxisId="left"  type="monotone" dataKey="recovered" name="Recovered" stroke="#22c55e" fill="url(#gRecovered)" strokeWidth={2} />
              <Line  yAxisId="right" type="monotone" dataKey="deaths"    name="Deaths"    stroke="#ef4444" strokeWidth={2} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Geo map — full width below chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Regional Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <GeoMap />
        </CardContent>
      </Card>

      {/* Disease summary table */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Disease Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mt-2">
            <DataTable 
              columns={diseaseColumns} 
              data={diseases} 
              onRowClick={(row) => navigate(`/dashboard/disease?id=${row.id}`)} 
              searchKey="name"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
