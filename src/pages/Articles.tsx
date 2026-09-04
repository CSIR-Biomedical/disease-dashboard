import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import { ARTICLES } from "@/data/articles"

export default function Articles() {
  return (
    <div className="space-y-10">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
          Articles
        </p>
        <h1 className="font-['Merriweather',serif] text-3xl md:text-5xl font-bold text-secondary leading-tight mb-5">
          News & updates
        </h1>
        <div className="w-16 h-0.5 bg-primary mb-6" />
        <p className="text-lg text-slate-600 leading-relaxed">
          Press releases, feature stories, and Center updates — separate from peer-reviewed
          publications in the research library.
        </p>
      </header>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {ARTICLES.map((item) => (
          <Link
            key={item.id}
            to={`/article?id=${item.id}`}
            className="group flex flex-col text-left"
          >
            <div className="overflow-hidden mb-5 aspect-[16/10] bg-slate-100">
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                {item.category}
              </span>
              <span className="text-xs text-slate-300">·</span>
              <time className="text-xs font-medium text-slate-500">{item.date}</time>
            </div>
            <h2 className="font-['Merriweather',serif] text-lg font-bold text-secondary leading-snug mb-3 group-hover:text-primary transition-colors">
              {item.title}
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed flex-1">{item.summary}</p>
            <span className="mt-4 inline-flex items-center text-sm font-semibold text-secondary underline-offset-4 group-hover:underline">
              Read more <ArrowRight className="ml-1.5 w-4 h-4" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
