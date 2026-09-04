import { Link, useNavigate, useSearchParams } from "react-router-dom"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  getAdjacentArticles,
  getArticleById,
  getSuggestedArticles,
} from "@/data/articles"

export default function ArticleDetail() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const article = getArticleById(params.get("id"))

  if (!article) {
    return (
      <div className="mx-auto max-w-xl space-y-4">
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

  const { prev, next } = getAdjacentArticles(article.id)
  const suggested = getSuggestedArticles(article.id)

  return (
    <div className="mx-auto max-w-3xl space-y-12">
      <article className="space-y-8">
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

        <nav className="border-t border-[#e0e0e0] pt-8 grid sm:grid-cols-2 gap-4">
          {prev ? (
            <Link
              to={`/article?id=${prev.id}`}
              className="group flex items-start gap-3 border border-[#e0e0e0] p-4 hover:border-secondary/40 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mt-1 shrink-0 text-secondary" />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Previous
                </p>
                <p className="text-sm font-semibold text-secondary group-hover:text-primary line-clamp-2">
                  {prev.title}
                </p>
              </div>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={`/article?id=${next.id}`}
              className="group flex items-start gap-3 border border-[#e0e0e0] p-4 hover:border-secondary/40 transition-colors sm:text-right sm:flex-row-reverse"
            >
              <ArrowRight className="w-4 h-4 mt-1 shrink-0 text-secondary" />
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Next
                </p>
                <p className="text-sm font-semibold text-secondary group-hover:text-primary line-clamp-2">
                  {next.title}
                </p>
              </div>
            </Link>
          ) : null}
        </nav>
      </article>

      {suggested.length > 0 && (
        <section className="border-t border-[#e0e0e0] pt-10 space-y-6">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-3">
              More to read
            </p>
            <h2 className="font-['Merriweather',serif] text-2xl font-bold text-secondary">
              Suggested articles
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-8">
            {suggested.map((item) => (
              <Link key={item.id} to={`/article?id=${item.id}`} className="group text-left">
                <div className="overflow-hidden mb-4 aspect-[16/10] bg-slate-100">
                  <img
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                  {item.category}
                </p>
                <h3 className="font-['Merriweather',serif] text-base font-bold text-secondary group-hover:text-primary transition-colors leading-snug mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 line-clamp-2">{item.summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
