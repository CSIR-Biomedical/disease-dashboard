import { useSearchParams, Link } from "react-router-dom"
import {
  ComposedChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell, Area, AreaChart
} from "recharts"
import {
  ArrowLeft, Calendar, Share2, Download, AlertTriangle,
  Thermometer, Droplets, Compass, Users, CheckCircle, TrendingUp, Info,
  FileText, FlaskConical
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/StatCard"
import { GeoMap } from "@/components/GeoMap"
import { getDiseasesByType } from "@/data/diseases"
import { getRegionalData } from "@/data/geography"
import { useFilters } from "@/context/FilterContext"
import { MosquitoIcon } from "@/layouts/AppLayout"
import { cn } from "@/lib/utils"
import { getAgeDistribution, getSexBreakdown, getRiskGroups } from "@/data/demographics"
import { getRelatedPapers } from "@/data/papers"
import { DataTable } from "@/components/ui/data-table"
import { ColumnDef } from "@tanstack/react-table"

// Color Palette for Pie Chart
const GENDER_COLORS = ["#3b82f6", "#ec4899"] // Male (Blue), Female (Pink)

export default function DiseaseDetail() {
  const [params] = useSearchParams()
  const { region, setRegion, district, setDistrict, timePeriod, setTimePeriod } = useFilters()

  const communicableDiseases = getDiseasesByType("communicable")
  const nonCommunicableDiseases = getDiseasesByType("non-communicable")
  const allDiseases = [...communicableDiseases, ...nonCommunicableDiseases]

  // Identify selected disease
  const id = params.get("id") ?? allDiseases[0]?.id ?? "malaria"
  const disease = allDiseases.find(d => d.id === id) ?? allDiseases[0]

  // Fetch geographic regional data for this disease
  const regionsData = getRegionalData(disease.id)

  const regionsList = ["All Regions", ...regionsData.map(r => r.region)]
  const districtsList = [
    "All Districts", "Kumasi Metro", "Accra Metro", "Tamale Metro", "Sekondi-Takoradi", "Cape Coast", "West Mamprusi", "Asante Akim North", "Nadowli-Kaleo", "Kpandu Municipal", "Asuogyaman", "South Tongu", "Krachi East", "Ada East", "Prus West", "Kintampo North", "Bole District", "Hohoe Municipal", "East Gonja", "Tema Metropolitan", "Ledzokuku", "Ho Municipal", "Kpong", "Battor"
  ]
  const timePeriods = ["This Year (2024)", "Last Year (2023)", "Last 30 Days", "Last 12 Months"]

  // FILTER LOGIC
  // Calculate dynamic scaling factor based on selected filters
  let filterLabel = "All Regions · All Districts"
  let scalingFactor = 1.0

  if (region !== "All Regions") {
    filterLabel = `${region}`
    const selectedRegionData = regionsData.find(r => r.region === region)
    if (selectedRegionData) {
      // Scale based on region's percentage of total cases
      const totalGeoCases = regionsData.reduce((sum, r) => sum + r.cases, 0)
      scalingFactor = selectedRegionData.cases / (totalGeoCases || 1)
    } else {
      scalingFactor = 0.1 // Fallback
    }

    if (district !== "All Districts") {
      filterLabel += ` · ${district}`
      scalingFactor *= 0.15 // Scale down for district-level view
    }
  }
    const fakeOutbreaks = [
    { id: `OB-${disease.id.substring(0,3).toUpperCase()}-01`, location: "Asante Akim North", startDate: "2024-03-12", cases: 142, status: "Active", risk: "High" },
    { id: `OB-${disease.id.substring(0,3).toUpperCase()}-02`, location: "Cape Coast", startDate: "2024-05-01", cases: 38, status: "Contained", risk: "Medium" },
    { id: `OB-${disease.id.substring(0,3).toUpperCase()}-03`, location: "Tamale Metro", startDate: "2023-11-20", cases: 215, status: "Resolved", risk: "Low" },
  ]
  const filteredOutbreaks = (district && district !== "All Districts") 
    ? fakeOutbreaks.filter(o => o.location === district)
    : fakeOutbreaks

  type Outbreak = typeof fakeOutbreaks[0]
  
  const outbreakColumns: ColumnDef<Outbreak>[] = [
    {
      accessorKey: "id",
      header: "Outbreak ID",
      cell: ({ row }) => <div className="font-bold text-slate-950 dark:text-white">{row.getValue("id")}</div>
    },
    {
      accessorKey: "location",
      header: "Location",
    },
    {
      accessorKey: "startDate",
      header: "Start Date",
    },
    {
      accessorKey: "cases",
      header: "Cases",
      cell: ({ row }) => <div className="font-bold">{(row.getValue("cases") as number).toLocaleString()}</div>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          {row.getValue("status")}
        </span>
      )
    },
    {
      accessorKey: "risk",
      header: () => <div className="text-right">Risk Level</div>,
      cell: ({ row }) => {
        const risk = row.getValue("risk") as string
        return (
          <div className="text-right">
            <span className={cn(
              "text-[10px] font-bold px-2 py-0.5 rounded-full",
              risk === "High" ? "bg-red-50 text-red-600 dark:bg-red-950/25 dark:text-red-400" :
              risk === "Medium" ? "bg-orange-50 text-orange-600 dark:bg-orange-950/25 dark:text-orange-400" :
              "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/25 dark:text-emerald-400"
            )}>
              {risk}
            </span>
          </div>
        )
      }
    }
  ]

  // Adjust YTD values based on scaling factor
  const totalCasesYTD = Math.max(1, Math.round(disease.totalCasesYTD * scalingFactor))
  const newCases7Days = Math.max(0, Math.round(disease.newCases7Days * scalingFactor))
  const deathsYTD = Math.max(0, Math.round(disease.deathsYTD * scalingFactor))
  const activeOutbreaksCount = region === "All Regions" ? disease.activeOutbreaksCount : (scalingFactor > 0.3 ? 2 : 1)

  // Re-calculate CFR and Incidence Rate
  const cfrVal = totalCasesYTD > 0 ? (deathsYTD / totalCasesYTD) * 100 : disease.cfr
  const cfrFormatted = cfrVal.toFixed(2)
  const incidenceRate = (disease.incidenceRate * scalingFactor * 10).toFixed(1)

  // Format numbers nicely
  const formattedCases = totalCasesYTD.toLocaleString()
  const formattedNewCases = newCases7Days.toLocaleString()
  const formattedDeaths = deathsYTD.toLocaleString()

  // Generate dynamic chart data based on filter scaling
  const filteredWeeklyTrend = disease.weeklyTrend.map(pt => ({
    ...pt,
    cases2024: Math.round(pt.cases2024 * scalingFactor),
    cases2023: Math.round(pt.cases2023 * scalingFactor),
    threshold: Math.round(pt.threshold * scalingFactor),
  }))

  const filteredForecast = disease.forecast.map(pt => ({
    ...pt,
    observed: pt.observed !== undefined ? Math.round(pt.observed * scalingFactor) : undefined,
    forecast: Math.round(pt.forecast * scalingFactor),
    upper: Math.round(pt.upper * scalingFactor),
    lower: Math.round(pt.lower * scalingFactor),
  }))

  const filteredDistricts = disease.topDistricts.map(d => ({
    ...d,
    cases: Math.round(d.cases * (region === "All Regions" ? 1 : scalingFactor * 5))
  })).sort((a,b) => b.cases - a.cases)

  // Gender demographics data
  const sexBreakdown = getSexBreakdown(disease.id)
  const maleCount = Math.round(totalCasesYTD * (sexBreakdown.male / 100))
  const femaleCount = totalCasesYTD - maleCount

  const genderPieData = [
    { name: "Male", value: maleCount, percentage: sexBreakdown.male.toFixed(1) },
    { name: "Female", value: femaleCount, percentage: sexBreakdown.female.toFixed(1) }
  ]

  // Demographics: Cases by Age Group
  const rawAge = getAgeDistribution(disease.id)
  const totalAgeCases = rawAge.reduce((sum, a) => sum + a.male + a.female, 0)
  const ageGroupData = rawAge.map(a => {
    const count = a.male + a.female
    const pct = totalAgeCases > 0 ? (count / totalAgeCases) * 100 : 0
    return {
      group: a.group,
      count: Math.round(totalCasesYTD * (pct / 100)),
      pct: `${pct.toFixed(1)}%`
    }
  })

  // Demographics: Cases by Risk Group
  const rawRisk = getRiskGroups(disease.id)
  const riskGroupData = rawRisk.map(r => ({
    group: r.name,
    count: Math.round(totalCasesYTD * (r.percentage / 100)),
    pct: `${r.percentage}%`
  }))

  // Disease outline icon
  const renderDiseaseIcon = (diseaseId: string) => {
    const cls = "w-7 h-7 text-red-500 flex-shrink-0"
    if (diseaseId === "malaria") {
      return <MosquitoIcon className={cls} />
    }
    return <FlaskConical className={cls} />
  }

  // Correlation and risk color classes
  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case "strong":
        return "bg-red-50 text-red-600 border border-red-200 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/50"
      case "high":
        return "bg-orange-50 text-orange-600 border border-orange-200 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/50"
      case "medium":
        return "bg-amber-50 text-amber-600 border border-amber-200 dark:bg-amber-950/20 dark:text-amber-400 dark:border-amber-900/50"
      default:
        return "bg-emerald-50 text-emerald-600 border border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/50"
    }
  }

  // Interventions layout icon
  const getInterventionIcon = (idx: number) => {
    const cls = "w-4 h-4 text-slate-400"
    switch (idx) {
      case 0: return <Compass className={cls} />
      case 1: return <CheckCircle className={cls} />
      case 2: return <TrendingUp className={cls} />
      case 3: return <Thermometer className={cls} />
      default: return <Droplets className={cls} />
    }
  }

  return (
    <div className="space-y-6">

      {/* ── Page Header Section ────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Title Block */}
        <div className="flex items-center gap-3.5">
          <div className="p-2.5 bg-red-50 dark:bg-slate-900 rounded-xl border border-red-100 dark:border-slate-800">
            {renderDiseaseIcon(disease.id)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white leading-tight">
                {disease.name}
              </h2>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 uppercase">
                {disease.category}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Disease Intelligence Dashboard <span className="opacity-40">•</span> <span className="text-slate-600 dark:text-slate-400 font-semibold">{filterLabel}</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Risk Pill */}
        <div className="flex items-center flex-wrap gap-2.5">
          {/* Outbreak Risk Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-600 dark:text-red-400 text-xs font-bold border border-red-100 dark:border-red-900/50">
            <AlertTriangle size={14} className="animate-bounce" />
            <span>Outbreak Risk: {disease.alertStatus === "High Alert" ? "HIGH" : disease.alertStatus === "Active" ? "MEDIUM" : "MONITORING"}</span>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex items-center gap-2 flex-wrap">
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

          <Button variant="outline" size="sm" className="flex items-center gap-1.5 h-8 text-xs border-slate-200 dark:border-slate-800">
            <Share2 size={13} />
            <span>Share</span>
          </Button>

          <Button variant="default" size="sm" className="flex items-center gap-1.5 h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white">
            <Download size={13} />
            <span>Download Report</span>
          </Button>
        </div>
      </div>

      {/* ── Tabs Implementation ────────────────────────────────────────── */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto flex-nowrap rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 mb-6">
          <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
          <TabsTrigger value="outbreaks" className="rounded-md">Outbreaks</TabsTrigger>
          <TabsTrigger value="geography" className="rounded-md">Geography</TabsTrigger>
          <TabsTrigger value="demographics" className="rounded-md">Demographics</TabsTrigger>
          <TabsTrigger value="trends" className="rounded-md">Trends & Forecast</TabsTrigger>
          <TabsTrigger value="interventions" className="rounded-md">Interventions</TabsTrigger>
          <TabsTrigger value="papers" className="rounded-md">Related Papers</TabsTrigger>
        </TabsList>

        {/* ── OVERVIEW TAB ─────────────────────────────────────────────── */}
        <TabsContent value="overview" className="mt-0 outline-none space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
            <StatCard
              title="Total Cases (YTD)"
              value={formattedCases}
              sub="▲ 18.6% vs last year"
              icon={Users}
              iconColor="bg-blue-500"
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
            <StatCard
              title="New Cases (Last 7 Days)"
              value={formattedNewCases}
              sub="▲ 15.3% vs prev 7 days"
              icon={Calendar}
              iconColor="bg-blue-500"
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
            <StatCard
              title="Incidence Rate"
              value={incidenceRate}
              sub="per 100,000 population"
              icon={TrendingUp}
              iconColor="bg-emerald-500"
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
            <StatCard
              title="Deaths (YTD)"
              value={formattedDeaths}
              sub="▼ 8.7% vs last year"
              icon={AlertTriangle}
              iconColor="bg-red-500"
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
            <StatCard
              title="Case Fatality Rate"
              value={`${cfrFormatted}%`}
              sub="▼ 0.08% vs last year"
              icon={Info}
              iconColor="bg-indigo-500"
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
            <StatCard
              title="Active Outbreaks"
              value={activeOutbreaksCount}
              sub={`in ${disease.outbreakRegionsCount} regions`}
              icon={AlertTriangle}
              iconColor="bg-amber-500"
              className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* AI Insight Card */}
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 border-l-4 border-l-emerald-500">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-100">
                    <CheckCircle className="w-4 h-4 text-emerald-500"/>
                    AI Forecast Insight
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                    {disease.forecastInsight}
                  </p>
                </CardContent>
              </Card>

              {/* Trend Mini-Chart */}
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Recent Trend (YTD Cases)
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600 dark:text-blue-400" onClick={() => document.querySelector<HTMLButtonElement>('[value="trends"]')?.click()}>
                    View Full Forecast
                  </Button>
                </CardHeader>
                <CardContent className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={filteredWeeklyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorCasesOverview" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={disease.color} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={disease.color} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.3} />
                      <XAxis dataKey="week" tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} />
                      <YAxis tick={{ fill: "#64748b", fontSize: 10 }} tickLine={false} axisLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0f172a", borderColor: "#1e293b", color: "#f1f5f9", borderRadius: "8px" }}
                        itemStyle={{ color: "#f1f5f9" }}
                      />
                      <Area type="monotone" dataKey="cases2024" stroke={disease.color} fillOpacity={1} fill="url(#colorCasesOverview)" strokeWidth={2} name="2024 Cases" />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              {/* Quick Facts */}
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">Quick Facts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5 mt-2">
                  <div>
                    <p className="text-xs text-slate-500 mb-1 uppercase font-semibold tracking-wider">Pathogen / Cause</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{disease.pathogen}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1 uppercase font-semibold tracking-wider">Disease Category</p>
                    <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{disease.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-2 uppercase font-semibold tracking-wider">Alert Status</p>
                    <Badge className={cn(
                      "px-2.5 py-0.5 shadow-none",
                      disease.alertStatus === "High Alert" 
                        ? "bg-red-100 text-red-700 hover:bg-red-100 dark:bg-red-900/30 dark:text-red-400" 
                        : disease.alertStatus === "Monitoring"
                        ? "bg-amber-100 text-amber-700 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-emerald-100 text-emerald-700 hover:bg-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400"
                    )}>
                      {disease.alertStatus}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Top Districts Preview */}
              <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">Top Impacted Districts</CardTitle>
                  <Button variant="ghost" size="sm" className="h-8 text-xs text-blue-600 dark:text-blue-400" onClick={() => document.querySelector<HTMLButtonElement>('[value="geography"]')?.click()}>
                    View Map
                  </Button>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3.5">
                    {filteredDistricts.slice(0, 5).map((d, i) => (
                      <div key={i} className="flex justify-between items-center text-sm group">
                        <div className="flex items-center gap-3">
                          <div className="w-5 h-5 rounded flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-xs font-medium text-slate-500 dark:text-slate-400">
                            {i + 1}
                          </div>
                          <span className="text-slate-700 dark:text-slate-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{d.name}</span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-slate-100">{d.cases.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* ── OUTBREAKS TAB ────────────────────────────────────────────── */}
        <TabsContent value="outbreaks" className="mt-0 outline-none space-y-6">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Active Outbreaks
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="mt-2">
                <DataTable columns={outbreakColumns} data={filteredOutbreaks} searchKey="location" />
              </div>

              <div className="pt-3 text-center border-t border-slate-100 dark:border-slate-800 mt-2">
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer flex items-center justify-center gap-1">
                  View All Outbreaks
                  <ArrowLeft size={12} className="rotate-180" />
                </span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ── GEOGRAPHY TAB ────────────────────────────────────────────── */}
        <TabsContent value="geography" className="mt-0 outline-none space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            {/* Leaflet Choropleth Map Wrapper */}
            <Card className="lg:col-span-8 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col justify-between">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Geographic Distribution (Cases)
                </CardTitle>
                <p className="text-[11px] text-slate-400 mt-0.5">By Region</p>
              </CardHeader>
              <CardContent className="flex-1 pb-2 min-h-[400px]">
                <GeoMap diseaseId={disease.id} />
              </CardContent>
            </Card>

            {/* Top 5 Districts bar chart */}
            <Card className="lg:col-span-4 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Top Districts by Cases
                </CardTitle>
                <p className="text-[11px] text-slate-400 mt-0.5">District ranking</p>
              </CardHeader>
              <CardContent className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredDistricts.slice(0, 10)}
                    layout="vertical"
                    margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-slate-800" horizontal={false} />
                    <XAxis type="number" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: "#64748b" }} axisLine={false} tickLine={false} width={80} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} formatter={(value) => [`${value} cases`, "Cases"]} />
                    <Bar dataKey="cases" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={12} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── DEMOGRAPHICS TAB ─────────────────────────────────────────── */}
        <TabsContent value="demographics" className="mt-0 outline-none space-y-6">
          {/* Demographics Card (Three Sub-Sections inside) */}
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Demographics
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
              
              {/* Age Group progress list */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block border-b pb-1">
                  Cases by Age Group
                </span>
                <div className="space-y-3 pt-1">
                  {ageGroupData.map((d, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-slate-700 dark:text-slate-300">
                        <span>{d.group}</span>
                        <span className="text-slate-400">{d.count.toLocaleString()} ({d.pct})</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-indigo-500 h-full rounded-full"
                          style={{ width: d.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gender Distribution Donut */}
              <div className="flex flex-col items-center justify-between border-t md:border-t-0 md:border-l md:border-r border-slate-100 dark:border-slate-800 px-4 py-2 md:py-0">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block w-full border-b pb-1 text-center">
                  Gender Distribution
                </span>
                <div className="relative w-full h-40 flex items-center justify-center mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={genderPieData}
                        cx="50%"
                        cy="55%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                      >
                        {genderPieData.map((_, index) => (
                          <Cell key={`cell-${index}`} fill={GENDER_COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value.toLocaleString()} cases`} />
                    </PieChart>
                  </ResponsiveContainer>
                  {/* Donut inner text */}
                  <div className="absolute flex flex-col items-center justify-center mt-2.5">
                    <span className="text-base font-extrabold text-slate-800 dark:text-white">{genderPieData[0].percentage}%</span>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase">Male</span>
                  </div>
                </div>

                {/* Legend */}
                <div className="flex items-center gap-4 text-[11px] mt-2 font-semibold">
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-blue-500" />
                    Male ({genderPieData[0].percentage}%)
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-full bg-pink-500" />
                    Female ({genderPieData[1].percentage}%)
                  </span>
                </div>
              </div>

              {/* Cases by Risk Group progress list */}
              <div className="space-y-3">
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide block border-b pb-1">
                  Cases by Risk Group
                </span>
                <div className="space-y-3 pt-1">
                  {riskGroupData.map((d, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-[11px] font-medium text-slate-700 dark:text-slate-300">
                        <span className="truncate min-w-0 flex-1 max-w-[40%] sm:max-w-[140px]">{d.group}</span>
                        <span className="text-slate-400">{d.count.toLocaleString()} ({d.pct})</span>
                      </div>
                      <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="bg-teal-500 h-full rounded-full"
                          style={{ width: d.pct }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </CardContent>
          </Card>
        </TabsContent>

        {/* ── TRENDS & FORECAST TAB ──────────────────────────────────────── */}
        <TabsContent value="trends" className="mt-0 outline-none space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Weekly Epidemiological Trend Chart */}
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
              <CardHeader className="pb-3 flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Epidemiological Trend
                  </CardTitle>
                  <p className="text-[11px] text-slate-400 mt-0.5">Weekly cases</p>
                </div>
                <select className="bg-slate-50 border border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-[10px] font-semibold text-slate-600 dark:text-slate-300 rounded-md px-2 py-1 outline-none">
                  <option>This Year</option>
                  <option>Previous Year</option>
                </select>
              </CardHeader>
              <CardContent className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={filteredWeeklyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-slate-800" />
                    <XAxis dataKey="week" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6 }} />
                    <Legend verticalAlign="top" height={32} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                    <Line type="monotone" dataKey="cases2024" name="2024" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 3, fill: "#2563eb" }} activeDot={{ r: 5 }} />
                    <Line type="monotone" dataKey="cases2023" name="2023" stroke="#94a3b8" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
                    <Line type="monotone" dataKey="threshold" name="Epidemic Threshold" stroke="#ef4444" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
                  </ComposedChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Forecast Card */}
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Forecast (Next 12 Weeks)
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between">
                <div className="h-48 mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={filteredForecast} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="forecastBg2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#2563eb" stopOpacity={0.15}/>
                          <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-slate-100 dark:stroke-slate-800" />
                      <XAxis dataKey="week" tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fontSize: 9, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
                      <Tooltip contentStyle={{ fontSize: 11 }} />
                      <Legend verticalAlign="top" height={24} iconType="circle" wrapperStyle={{ fontSize: 9 }} />
                      
                      {/* Area representing range */}
                      <Area type="monotone" dataKey="upper" stroke="none" fill="url(#forecastBg2)" name="Forecast Interval" />
                      <Area type="monotone" dataKey="lower" stroke="none" fill="#ffffff" fillOpacity={0} name="" />
                      
                      <Line type="monotone" dataKey="observed" name="Observed" stroke="#2563eb" strokeWidth={2.5} dot={{ r: 2 }} />
                      <Line type="monotone" dataKey="forecast" name="Forecast" stroke="#2563eb" strokeDasharray="4 4" strokeWidth={1.5} dot={{ r: 2 }} />
                    </ComposedChart>
                  </ResponsiveContainer>
                </div>

                {/* Forecast Insight Panel */}
                <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                    Forecast Insight
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                    {disease.forecastInsight}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── INTERVENTIONS TAB ────────────────────────────────────────── */}
        <TabsContent value="interventions" className="mt-0 outline-none space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Key Risk Factors Card */}
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Key Risk Factors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4 flex-1 flex flex-col">
                {disease.riskFactors.map((r, i) => (
                  <div key={i} className="flex items-center justify-between text-sm gap-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                    <div className="flex items-center gap-3 text-slate-700 dark:text-slate-200 font-medium">
                      {getInterventionIcon(i)}
                      <span>{r.factor}</span>
                    </div>
                    <span className={cn("text-xs font-bold px-2.5 py-1 rounded", getRiskBadgeColor(r.level))}>
                      {r.impact}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Interventions & Response Card */}
            <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 flex flex-col justify-between">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">
                  Interventions & Response
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-4">
                {disease.interventions.map((int, i) => (
                  <div key={i} className="space-y-1.5 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50">
                    <div className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <span>{int.name}</span>
                      <span>{int.value}</span>
                    </div>
                    {int.percentage !== undefined && int.percentage > 0 && (
                      <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden mt-2">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${int.percentage}%` }}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ── RELATED PAPERS TAB ───────────────────────────────────────── */}
        <TabsContent value="papers" className="mt-0 outline-none space-y-6">
          <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">
                    Related Research & Publications
                  </CardTitle>
                  <p className="text-[11px] text-slate-400 mt-0.5">Recent academic literature regarding {disease.name}</p>
                </div>
                <FileText className="w-5 h-5 text-slate-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 pt-2">
                {getRelatedPapers(disease.name).map((paper) => (
                  <Link
                    key={paper.id}
                    to={`/publication?id=${paper.id}`}
                    className="block p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-md transition-shadow cursor-pointer text-left"
                  >
                    <div className="flex justify-between items-start mb-1.5 gap-4">
                      <h4 className="text-sm font-bold text-blue-600 dark:text-blue-400 leading-tight hover:underline">{paper.title}</h4>
                      <span className={cn(
                        "text-[10px] font-bold px-2 py-0.5 rounded flex-shrink-0",
                        paper.badgeColor === "indigo" ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400" :
                        paper.badgeColor === "emerald" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400" :
                        paper.badgeColor === "amber" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400" :
                        "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                      )}>{paper.badge}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mb-2.5 font-medium">{paper.journal} • Published {paper.time} • {paper.authors}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {paper.description}
                    </p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

    </div>
  )
}
