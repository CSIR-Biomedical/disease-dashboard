import { useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { RESEARCH_AREAS } from "@/data/researchAreas"

export default function Research() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.slice(1)
    const t = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    }, 80)
    return () => window.clearTimeout(t)
  }, [location.hash])

  return (
    <div className="space-y-14">
      <header className="max-w-3xl">
        <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-4">
          Research
        </p>
        <h1 className="font-['Merriweather',serif] text-3xl md:text-5xl font-bold text-secondary leading-tight mb-5">
          Core research areas
        </h1>
        <div className="w-16 h-0.5 bg-primary mb-6" />
        <p className="text-lg text-slate-600 leading-relaxed">
          The Center advances evidence across four scientific pillars — from laboratory discovery
          to surveillance and intervention — in service of national and regional public health.
        </p>
      </header>

      <div className="space-y-16 md:space-y-20">
        {RESEARCH_AREAS.map((area, index) => {
          const imageRight = index % 2 === 1
          return (
            <article
              key={area.id}
              id={area.id}
              className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center scroll-mt-28"
            >
              <div className={imageRight ? "lg:order-2" : undefined}>
                <div className="aspect-[16/11] overflow-hidden bg-slate-200">
                  <img
                    src={area.imageSrc}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className={imageRight ? "lg:order-1" : undefined}>
                <p className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-500 mb-3">
                  Research area
                </p>
                <h2 className="font-['Merriweather',serif] text-2xl md:text-3xl font-bold text-secondary mb-4">
                  {area.title}
                </h2>
                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  {area.description}
                </p>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mb-8">
                  {area.focus.map((item) => (
                    <li
                      key={item}
                      className="text-sm text-slate-600 border-t border-slate-200 pt-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/publications"
                  className="inline-flex text-sm font-semibold text-secondary underline-offset-4 hover:underline hover:text-primary"
                >
                  Related publications
                </Link>
              </div>
            </article>
          )
        })}
      </div>

      <section className="border-t border-slate-200 pt-12">
        <h2 className="font-['Merriweather',serif] text-2xl font-bold text-secondary mb-3">
          Continue exploring
        </h2>
        <p className="text-slate-600 mb-6 max-w-2xl leading-relaxed">
          Browse peer-reviewed outputs from these programs, or meet the scientists leading the work.
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-3">
          <Link
            to="/publications"
            className="text-sm font-semibold text-secondary underline-offset-4 hover:underline hover:text-primary"
          >
            Publications
          </Link>
          <Link
            to="/researchers"
            className="text-sm font-semibold text-secondary underline-offset-4 hover:underline hover:text-primary"
          >
            Researcher profiles
          </Link>
          <Link
            to="/dashboard"
            className="text-sm font-semibold text-secondary underline-offset-4 hover:underline hover:text-primary"
          >
            Data platform
          </Link>
        </div>
      </section>
    </div>
  )
}
