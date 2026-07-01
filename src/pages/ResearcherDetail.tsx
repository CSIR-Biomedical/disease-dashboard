import { useNavigate, useSearchParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { getResearcherById } from "@/data/researchers"
import { getPapersByResearcher } from "@/data/papers"
import { ArrowLeft, User, Mail, Building, BookOpen, FileText } from "lucide-react"
import { cn } from "@/lib/utils"

export default function ResearcherDetail() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const id = searchParams.get("id")
  const researcher = getResearcherById(id)

  if (!researcher) {
    return (
      <div className="flex flex-col items-center justify-center h-full space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Researcher Not Found</h2>
        <Button onClick={() => navigate("/")} variant="outline">Back to Dashboard</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h2 className="text-2xl font-bold text-foreground">Researcher Profile</h2>
      </div>

      <Card>
        <CardContent className="p-8 sm:p-10 flex flex-col sm:flex-row items-center sm:items-start gap-8">
          <div className="w-32 h-32 rounded-full bg-slate-100 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-sm flex items-center justify-center flex-shrink-0">
            <User className="w-16 h-16 text-slate-400" />
          </div>
          
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{researcher.name}</h1>
            <p className="text-lg text-slate-500 dark:text-slate-400 mt-1">{researcher.role}</p>
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-4 text-sm text-slate-600 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <Building className="w-4 h-4 opacity-70" />
                {researcher.department}
              </span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-4 h-4 opacity-70" />
                {researcher.email}
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 opacity-70" />
                {researcher.publicationsCount} Publications
              </span>
            </div>

            <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-6">
              {researcher.specialties.map(s => (
                <Badge key={s} variant="secondary">{s}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Biography</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {researcher.bio}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm font-bold text-slate-800 dark:text-slate-100">
                Related Research & Publications
              </CardTitle>
              <p className="text-[11px] text-slate-400 mt-0.5">Recent academic literature by {researcher.name}</p>
            </div>
            <FileText className="w-5 h-5 text-slate-400" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 pt-2">
            {getPapersByResearcher(researcher.name).map((paper, i) => (
              <a
                key={i}
                href={paper.url}
                target="_blank"
                rel="noopener noreferrer"
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
              </a>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
