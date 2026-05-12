export type AlertStatus = "High Alert" | "Active" | "Monitoring"

export interface Disease {
  id: string
  name: string
  category: string
  pathogen: string
  color: string
  /** Case fatality rate as a percentage, e.g. 2.1 */
  cfr: number
  alertStatus: AlertStatus
}

export const DISEASES: Disease[] = [
  { id: "malaria",          name: "Malaria",          category: "Parasitic (NTD)", pathogen: "Plasmodium falciparum",          color: "#ef4444", cfr: 1.9, alertStatus: "High Alert" },
  { id: "schistosomiasis",  name: "Schistosomiasis",  category: "Parasitic (NTD)", pathogen: "Schistosoma haematobium",        color: "#f97316", cfr: 0.4, alertStatus: "High Alert" },
  { id: "onchocerciasis",   name: "Onchocerciasis",   category: "Parasitic (NTD)", pathogen: "Onchocerca volvulus",            color: "#eab308", cfr: 0.1, alertStatus: "Active"     },
  { id: "covid19",          name: "COVID-19",          category: "Viral",           pathogen: "SARS-CoV-2",                    color: "#3b82f6", cfr: 1.2, alertStatus: "Monitoring" },
]
