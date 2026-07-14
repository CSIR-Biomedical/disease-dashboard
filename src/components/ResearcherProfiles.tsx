import { useDeferredValue, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RESEARCHERS } from "@/data/researchers"
import { Search, X } from "lucide-react"
import ImagePlaceholder from "@/components/ImagePlaceholder"

export function ResearcherProfiles() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const deferredQuery = useDeferredValue(searchQuery.trim().toLowerCase())

  const filteredResearchers = RESEARCHERS.filter((r) => {
    if (!deferredQuery) return true
    const haystack = [
      r.name,
      r.role,
      r.department,
      ...r.specialties,
    ]
      .join(" ")
      .toLowerCase()
    return haystack.includes(deferredQuery)
  })

  return (
    <div>
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="search"
            placeholder="Search by name, role, department, or specialty..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-10 py-2.5 rounded-lg border border-slate-200 bg-white text-sm outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-slate-400"
            aria-label="Search researchers"
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
          {filteredResearchers.length} of {RESEARCHERS.length} researchers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        {filteredResearchers.length === 0 ? (
          <div className="col-span-full py-12 text-center">
            <p className="text-slate-500 mb-3">No researchers found matching &ldquo;{searchQuery}&rdquo;</p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="text-sm font-semibold text-primary hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          filteredResearchers.map((researcher) => (
            <Card
              key={researcher.id}
              className="cursor-pointer hover:shadow-md hover:-translate-y-1 hover:border-primary/30 transition-all duration-300 group overflow-hidden border-slate-200 bg-white"
              onClick={() => navigate(`/researcher?id=${researcher.id}`)}
            >
              <div className="h-40 bg-slate-100 border-b border-slate-100 relative overflow-hidden">
                <ImagePlaceholder
                  label="Photo"
                  className="absolute inset-0 bg-slate-200 group-hover:bg-slate-300 transition-colors"
                />
              </div>

              <CardContent className="p-5 flex flex-col items-center text-center">
                <h4 className="font-bold text-secondary truncate w-full group-hover:text-primary transition-colors">
                  {researcher.name}
                </h4>
                <p className="text-xs font-medium text-slate-500 truncate mt-1 w-full">{researcher.role}</p>
                <p className="text-[11px] text-slate-400 truncate mt-0.5 w-full">{researcher.department}</p>
                <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                  {researcher.specialties.slice(0, 3).map((s) => (
                    <Badge
                      key={s}
                      variant="secondary"
                      className="text-[10px] px-2 py-0.5 font-medium bg-secondary/10 text-secondary hover:bg-secondary/15"
                    >
                      {s}
                    </Badge>
                  ))}
                  {researcher.specialties.length > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] px-2 py-0.5 font-medium bg-secondary/10 text-secondary"
                    >
                      +{researcher.specialties.length - 3}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
