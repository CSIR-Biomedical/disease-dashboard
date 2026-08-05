import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  sub?: string
  icon: LucideIcon
  trend?: number
  trendPositiveIsGood?: boolean
  iconColor?: string
  className?: string
}

export function StatCard({ title, value, sub, icon: Icon, trend, trendPositiveIsGood = false, iconColor, className }: StatCardProps) {
  const trendIsGood = trend !== undefined
    ? (trendPositiveIsGood ? trend >= 0 : trend < 0)
    : false

  return (
    <Card className={cn("shadow-none", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.14em] truncate">
              {title}
            </p>
            <p className="mt-1.5 font-['Merriweather',serif] text-2xl font-bold text-foreground">
              {typeof value === "number" ? value.toLocaleString() : value}
            </p>
            {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
            {trend !== undefined && (
              <p className={cn("mt-1.5 text-xs font-medium", trendIsGood ? "text-green-500" : "text-red-500")}>
                {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% vs last month
              </p>
            )}
          </div>
          <div
            className={cn(
              "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
              iconColor ?? "bg-primary/10"
            )}
          >
            <Icon size={18} className={cn(iconColor ? "text-white" : "text-primary")} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
