import parasitologyImg from "@/assets/parasitology_research_1783948072477.png"
import immunologyImg from "@/assets/immunology_research_1783948090027.png"
import pharmacologyImg from "@/assets/pharmacology_research_1783948099919.png"

export interface Article {
  id: string
  title: string
  date: string
  category: string
  image: string
  summary: string
  body: string[]
}

export const ARTICLES: Article[] = [
  {
    id: "malaria-biomarker",
    title: "CSIR Center Discovers Novel Biomarker for Early Malaria Detection",
    date: "August 12, 2026",
    category: "Press Release",
    image: parasitologyImg,
    summary:
      "New diagnostic marker shows promise for earlier detection in district-level screening programs.",
    body: [
      "Researchers at the Center for Health Research and Innovation have identified a novel biomarker that may support earlier malaria detection in district-level screening programs.",
      "Early findings suggest the marker could improve case finding where microscopy capacity is limited, helping public health teams intervene sooner in high-burden communities.",
      "The Center will next evaluate performance across partner districts and publish peer-reviewed results through its publications library.",
    ],
  },
  {
    id: "genomic-surveillance-summit",
    title: "Annual Global Health Summit Highlights CSIR's Genomic Surveillance Expansion",
    date: "July 24, 2026",
    category: "Article",
    image: immunologyImg,
    summary:
      "Expanded sequencing capacity strengthens regional preparedness for emerging pathogens.",
    body: [
      "At this year's Global Health Summit, Center scientists outlined expanded genomic sequencing capacity supporting regional preparedness for emerging pathogens.",
      "The program links laboratory workflows with surveillance dashboards so ministries and district partners can act on timely molecular evidence.",
      "Collaborators emphasized the need for sustained investment in sample transport, bioinformatics training, and open reporting standards.",
    ],
  },
  {
    id: "moh-vaccination-partnership",
    title: "New Partnership Announced with Ministry of Health for Vaccination Drive Data",
    date: "July 05, 2026",
    category: "Update",
    image: pharmacologyImg,
    summary:
      "Shared data infrastructure will support coverage tracking and equitable vaccine delivery.",
    body: [
      "The Center and the Ministry of Health have announced a partnership to strengthen shared data infrastructure for national vaccination campaigns.",
      "The collaboration will support coverage tracking, equity analysis, and faster feedback loops between districts and national planners.",
      "Sample dashboards and methods notes will be released iteratively as the joint platform matures.",
    ],
  },
]

export function getArticleById(id: string | null | undefined): Article | undefined {
  if (!id) return undefined
  return ARTICLES.find((a) => a.id === id)
}
