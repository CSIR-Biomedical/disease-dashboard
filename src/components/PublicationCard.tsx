import { Link } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Paper } from "@/data/papers"
import { cn } from "@/lib/utils"
import { ArrowRight, BookOpen } from "lucide-react"

function badgeClasses(color: Paper["badgeColor"]) {
  if (color === "emerald") return "bg-emerald-50 text-emerald-700"
  if (color === "amber") return "bg-amber-50 text-amber-700"
  if (color === "blue") return "bg-primary/10 text-primary"
  return "bg-secondary/10 text-secondary"
}

interface PublicationCardProps {
  paper: Paper
}

export default function PublicationCard({ paper }: PublicationCardProps) {
  return (
    <Link to={`/publication?id=${paper.id}`} className="block h-full">
      <Card className="h-full border-slate-200 bg-white ring-0 border py-0 gap-0 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30 transition-all duration-300 group overflow-hidden">
        <div className="h-28 bg-gradient-to-br from-secondary/10 via-primary/5 to-slate-50 border-b border-slate-100 flex items-center justify-center relative">
          <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#282161_1px,transparent_1px)] [background-size:14px_14px]" />
          <BookOpen className="w-8 h-8 text-secondary/30 group-hover:text-primary/50 transition-colors relative z-10" />
        </div>

        <CardContent className="p-5 flex flex-col h-[calc(100%-7rem)]">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge className={cn("text-[10px] font-bold border-0", badgeClasses(paper.badgeColor))}>
              {paper.badge}
            </Badge>
            <span className="text-[11px] text-slate-400 font-medium">{paper.time}</span>
          </div>

          <h2 className="font-['Merriweather',serif] text-base font-bold text-secondary leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-3">
            {paper.title}
          </h2>

          <p className="text-xs font-medium text-slate-500 mb-2 line-clamp-1">{paper.authors}</p>
          <p className="text-[11px] text-slate-400 mb-3">{paper.journal}</p>

          <p className="text-sm text-slate-600 leading-relaxed line-clamp-3 flex-1">
            {paper.description}
          </p>

          <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary group-hover:text-primary transition-colors">
            View details
            <ArrowRight className="ml-1 w-4 h-4" />
          </span>
        </CardContent>
      </Card>
    </Link>
  )
}
