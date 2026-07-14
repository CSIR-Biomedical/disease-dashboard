import { useDeferredValue, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import PublicationCard from "@/components/PublicationCard"
import { PUBLICATIONS } from "@/data/papers"
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react"

const PAGE_SIZE = 6

export default function Publications() {
  const [searchQuery, setSearchQuery] = useState("")
  const [page, setPage] = useState(1)
  const deferredQuery = useDeferredValue(searchQuery.trim().toLowerCase())

  const filtered = PUBLICATIONS.filter((paper) => {
    if (!deferredQuery) return true
    const haystack = [paper.title, paper.authors, paper.journal, paper.badge, paper.description]
      .join(" ")
      .toLowerCase()
    return haystack.includes(deferredQuery)
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const start = (currentPage - 1) * PAGE_SIZE
  const pageItems = filtered.slice(start, start + PAGE_SIZE)

  useEffect(() => {
    setPage(1)
  }, [deferredQuery])

  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm font-bold tracking-widest text-primary uppercase mb-3">Publications</p>
        <h1 className="font-['Merriweather',serif] text-3xl md:text-4xl font-bold text-secondary mb-3">
          Research Publications
        </h1>
        <p className="text-slate-500 max-w-2xl">
          Peer-reviewed studies, clinical reports, and policy briefs from the Center for Health
          Research and Innovation.
        </p>
      </header>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search by title, author, journal, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
            aria-label="Search publications"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-secondary"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        <p className="text-sm text-slate-500 shrink-0">
          {filtered.length} of {PUBLICATIONS.length} publications
        </p>
      </div>

      {pageItems.length === 0 ? (
        <div className="py-12 text-center border border-dashed border-slate-200 rounded-xl bg-white">
          <p className="text-slate-500 mb-3">No publications found matching &ldquo;{searchQuery}&rdquo;</p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="text-sm font-semibold text-primary hover:underline"
          >
            Clear search
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {pageItems.map((paper) => (
            <PublicationCard key={paper.title} paper={paper} />
          ))}
        </div>
      )}

      {filtered.length > 0 && (
        <div className="flex items-center justify-between gap-4 pt-2">
          <p className="text-sm text-slate-500">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-slate-200"
              disabled={currentPage <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="border-slate-200"
              disabled={currentPage >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
