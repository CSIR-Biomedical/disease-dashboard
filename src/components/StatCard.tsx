import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import type { LucideIcon } from "lucide-react"

interface StatCardProps {
  title: string
  value: string | number
  sub?: string
  icon: LucideIcon
  trend?: number        // positive = up, negative = down
  /** When true, an upward trend is green (good). Default false — up is red (bad), e.g. cases/deaths. */
  trendPositiveIsGood?: boolean
  iconColor?: string
  className?: string
}

export function StatCard({ title, value, sub, icon: Icon, trend, trendPositiveIsGood = false, iconColor, className }: StatCardProps) {
  const trendIsGood = trend !== undefined
    ? (trendPositiveIsGood ? trend >= 0 : trend < 0)
    : false

  return (
    <Card className={cn("", className)}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide truncate">{title}</p>
            <p className="mt-1 text-2xl font-bold text-foreground">{typeof value === "number" ? value.toLocaleString() : value}</p>
            {sub && <p className="mt-0.5 text-xs text-muted-foreground">{sub}</p>}
            {trend !== undefined && (
              <p className={cn("mt-1 text-xs font-medium", trendIsGood ? "text-green-500" : "text-red-500")}>
                {trend >= 0 ? "▲" : "▼"} {Math.abs(trend)}% vs last month
              </p>
            )}
          </div>
          <div className={cn("flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center", iconColor ?? "bg-primary/10")}>
            <Icon size={20} className={cn(iconColor ? "text-white" : "text-primary")} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
