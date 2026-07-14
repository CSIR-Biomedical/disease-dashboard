import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getPublicationById } from "@/data/papers"
import { cn } from "@/lib/utils"
import { ArrowLeft, ExternalLink } from "lucide-react"

function badgeClasses(color: NonNullable<ReturnType<typeof getPublicationById>>["badgeColor"]) {
  if (color === "emerald") return "bg-emerald-50 text-emerald-700"
  if (color === "amber") return "bg-amber-50 text-amber-700"
  if (color === "blue") return "bg-primary/10 text-primary"
  return "bg-secondary/10 text-secondary"
}

export default function PublicationDetail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const paper = getPublicationById(searchParams.get("id"))

  if (!paper) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <h2 className="text-xl font-semibold text-secondary">Publication Not Found</h2>
        <Button onClick={() => navigate("/publications")} variant="outline">
          Back to Publications
        </Button>
      </div>
    )
  }

  return (
    <article className="space-y-8 max-w-3xl">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate(-1)}
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <Link to="/publications" className="text-sm font-semibold text-primary hover:underline">
          All publications
        </Link>
      </div>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge className={cn("text-[10px] font-bold border-0", badgeClasses(paper.badgeColor))}>
            {paper.badge}
          </Badge>
          <span className="text-xs text-slate-400 font-medium">{paper.time}</span>
        </div>
        <h1 className="font-['Merriweather',serif] text-3xl md:text-4xl font-bold text-secondary leading-tight">
          {paper.title}
        </h1>
        <div className="space-y-1 text-sm text-slate-500">
          <p className="font-medium text-slate-600">{paper.authors}</p>
          <p>{paper.journal}</p>
        </div>
      </header>

      <section className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 space-y-3">
        <h2 className="font-['Merriweather',serif] text-xl font-bold text-secondary">Abstract</h2>
        <p className="text-slate-600 leading-relaxed text-base">{paper.abstract}</p>
      </section>

      {paper.url && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 md:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="font-['Merriweather',serif] text-lg font-bold text-secondary mb-1">
              Full document
            </h2>
            <p className="text-sm text-slate-500">
              Open the complete publication on an external source.
            </p>
          </div>
          <Button
            asChild
            className="bg-primary hover:bg-[#c40069] text-white shrink-0"
          >
            <a href={paper.url} target="_blank" rel="noopener noreferrer">
              View full document
              <ExternalLink className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </section>
      )}
    </article>
  )
}
