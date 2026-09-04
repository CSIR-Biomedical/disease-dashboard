import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { getArticleById } from "@/data/articles"

export default function ArticleDetail() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const article = getArticleById(params.get("id"))

  if (!article) {
    return (
      <div className="space-y-4 max-w-xl">
        <h1 className="font-['Merriweather',serif] text-2xl font-bold text-secondary">
          Article not found
        </h1>
        <p className="text-slate-600">This story may have moved or is no longer available.</p>
        <Button onClick={() => navigate("/articles")} variant="outline" className="rounded-none">
          Back to articles
        </Button>
      </div>
    )
  }

  return (
    <article className="max-w-3xl space-y-8">
      <div>
        <Link
          to="/articles"
          className="text-sm font-semibold text-secondary underline-offset-4 hover:underline hover:text-primary"
        >
          ← All articles
        </Link>
      </div>

      <header>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">
            {article.category}
          </span>
          <span className="text-xs text-slate-300">·</span>
          <time className="text-xs font-medium text-slate-500">{article.date}</time>
        </div>
        <h1 className="font-['Merriweather',serif] text-3xl md:text-4xl font-bold text-secondary leading-tight mb-6">
          {article.title}
        </h1>
        <div className="aspect-[16/9] overflow-hidden bg-slate-100 mb-6">
          <img src={article.image} alt="" className="w-full h-full object-cover" />
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">{article.summary}</p>
      </header>

      <div className="space-y-5 border-t border-[#e0e0e0] pt-8">
        {article.body.map((para) => (
          <p key={para.slice(0, 32)} className="text-base text-slate-700 leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <div className="border-t border-[#e0e0e0] pt-8 flex flex-wrap gap-x-6 gap-y-3">
        <Link
          to="/publications"
          className="text-sm font-semibold text-secondary underline-offset-4 hover:underline hover:text-primary"
        >
          Peer-reviewed publications
        </Link>
        <Link
          to="/research"
          className="text-sm font-semibold text-secondary underline-offset-4 hover:underline hover:text-primary"
        >
          Research areas
        </Link>
      </div>
    </article>
  )
}
