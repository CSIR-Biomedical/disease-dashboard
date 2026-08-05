import parasitologyImg from "@/assets/parasitology_research_1783948072477.png"
import immunologyImg from "@/assets/immunology_research_1783948090027.png"
import pharmacologyImg from "@/assets/pharmacology_research_1783948099919.png"
import microbiologyImg from "@/assets/microbiology_research_1783948110096.png"

export interface ResearchArea {
  id: string
  title: string
  description: string
  focus: string[]
  imageSrc: string
}

export const RESEARCH_AREAS: ResearchArea[] = [
  {
    id: "parasitology",
    title: "Parasitology",
    description:
      "Investigating the biology, ecology, and transmission of parasitic diseases such as Malaria and Leishmaniasis to develop novel interventions.",
    focus: ["Malaria transmission", "Vector biology", "Diagnostic biomarkers", "Intervention trials"],
    imageSrc: parasitologyImg,
  },
  {
    id: "immunology",
    title: "Immunology",
    description:
      "Understanding the immune system's response to pathogens and developing vaccines to combat emerging infectious threats.",
    focus: ["Host response", "Vaccine development", "Serosurveillance", "Emerging pathogens"],
    imageSrc: immunologyImg,
  },
  {
    id: "pharmacology",
    title: "Pharmacology",
    description:
      "Discovering and developing new therapeutic agents, assessing drug efficacy, and monitoring antimicrobial resistance.",
    focus: ["Drug discovery", "Efficacy studies", "Antimicrobial resistance", "Therapeutic guidance"],
    imageSrc: pharmacologyImg,
  },
  {
    id: "microbiology",
    title: "Microbiology",
    description:
      "Studying the complex microbial ecosystems, pathogen evolution, and genomics to inform targeted public health responses.",
    focus: ["Pathogen genomics", "Microbial ecology", "Outbreak sequencing", "Laboratory capacity"],
    imageSrc: microbiologyImg,
  },
]
