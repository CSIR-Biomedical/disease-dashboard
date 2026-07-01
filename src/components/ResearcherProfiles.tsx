import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RESEARCHERS } from "@/data/researchers"
import { User, Search } from "lucide-react"

export function ResearcherProfiles() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredResearchers = RESEARCHERS.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div>
      <div className="relative mt-6 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search researchers by name, role, or specialty..." 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-slate-100 placeholder:text-slate-400"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        {filteredResearchers.length === 0 ? (
          <div className="col-span-full py-8 text-center text-slate-500 dark:text-slate-400">
            No researchers found matching "{searchQuery}"
          </div>
        ) : (
          filteredResearchers.map((researcher) => (
            <Card 
              key={researcher.id} 
              className="cursor-pointer hover:shadow-md hover:-translate-y-1 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 group overflow-hidden"
              onClick={() => navigate(`/researcher?id=${researcher.id}`)}
            >
              {/* Top Half: Profile Picture / Avatar Area */}
              <div className="h-32 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors relative">
                {/* Decorative background pattern (optional, just adds texture) */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#334155_1px,transparent_1px)]"></div>
                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 shadow-sm border-4 border-white dark:border-slate-900 flex items-center justify-center relative z-10">
                  <User className="w-10 h-10 text-slate-300 dark:text-slate-600 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
              
              {/* Bottom Half: Details */}
              <CardContent className="p-5 flex flex-col items-center text-center">
                <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate w-full">{researcher.name}</h4>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 truncate mt-1 w-full">{researcher.role}</p>
                <div className="flex flex-wrap justify-center gap-1.5 mt-4">
                  {researcher.specialties.slice(0, 3).map((s) => (
                    <Badge key={s} variant="secondary" className="text-[10px] px-2 py-0.5 font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700">
                      {s}
                    </Badge>
                  ))}
                  {researcher.specialties.length > 3 && (
                    <Badge variant="secondary" className="text-[10px] px-2 py-0.5 font-medium bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
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
