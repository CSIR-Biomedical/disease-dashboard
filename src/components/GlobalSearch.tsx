import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Search, ShieldAlert, HeartPulse } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { getDiseasesByType } from "@/data/diseases"
import { useDiseaseType } from "@/context/DiseaseTypeContext"

export function GlobalSearch({ variant = "full" }: { variant?: "full" | "icon" }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()
  const { setDiseaseType } = useDiseaseType()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const communicableDiseases = getDiseasesByType("communicable").filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  )
  const nonCommunicableDiseases = getDiseasesByType("non-communicable").filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase())
  )

  const handleSelect = (disease: any) => {
    setDiseaseType(disease.diseaseType)
    navigate(`/dashboard/disease?id=${disease.id}`)
    setOpen(false)
    setQuery("")
  }

  return (
    <>
      {variant === "icon" ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Search diseases"
          className="inline-flex items-center justify-center w-9 h-9 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-white dark:hover:bg-slate-800 transition-colors"
        >
          <Search size={16} />
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 w-full max-w-xs lg:w-64 rounded-md border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-sm hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <Search size={16} />
          <span className="flex-1 text-left truncate">Search diseases...</span>
          <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-300 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 px-1.5 font-mono text-[10px] font-medium text-slate-500 dark:text-slate-400">
            <span className="text-xs">⌘</span>K
          </kbd>
        </button>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="p-0 overflow-hidden bg-white dark:bg-slate-950 border-slate-200 dark:border-slate-800 shadow-2xl max-w-2xl gap-0">
          
          <DialogTitle className="sr-only">Search</DialogTitle>
          <DialogDescription className="sr-only">Search diseases</DialogDescription>
          
          <div className="flex items-center border-b border-slate-200 dark:border-slate-800 px-4 py-3">
            <Search size={18} className="text-slate-400 mr-3" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search diseases..."
              className="flex-1 bg-transparent outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
              autoFocus
            />
          </div>

          <div className="max-h-[60vh] overflow-y-auto p-2">
            {communicableDiseases.length === 0 && nonCommunicableDiseases.length === 0 && (
              <div className="py-6 text-center text-sm text-slate-500 dark:text-slate-400">
                No diseases found for "{query}".
              </div>
            )}

            {communicableDiseases.length > 0 && (
              <div className="mb-4">
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <ShieldAlert size={14} className="text-blue-500" />
                  Communicable Diseases
                </div>
                <div className="space-y-1">
                  {communicableDiseases.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => handleSelect(d)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left text-sm"
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: d.color }}
                      />
                      <span className="text-slate-800 dark:text-slate-200 font-medium">{d.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {nonCommunicableDiseases.length > 0 && (
              <div>
                <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                  <HeartPulse size={14} className="text-purple-500" />
                  Non-Communicable
                </div>
                <div className="space-y-1">
                  {nonCommunicableDiseases.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => handleSelect(d)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left text-sm"
                    >
                      <span
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ backgroundColor: d.color }}
                      />
                      <span className="text-slate-800 dark:text-slate-200 font-medium">{d.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
