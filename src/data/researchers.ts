export interface Researcher {
  id: string
  name: string
  role: string
  department: string
  specialties: string[]
  bio: string
  email: string
  publicationsCount: number
  imageUrl?: string
}

export const RESEARCHERS: Researcher[] = [
  {
    id: "researcher-1",
    name: "Researcher 1",
    role: "Lead Epidemiologist",
    department: "Infectious Disease Surveillance",
    specialties: ["Malaria", "Vector Control", "Digital Surveillance"],
    bio: "Researcher 1 leads the digital surveillance initiative for vector-borne diseases in West Africa. Recent work focuses on integrating community-based reporting with national health systems.",
    email: "researcher1@csir.example.com",
    publicationsCount: 42,
  },
  {
    id: "researcher-2",
    name: "Researcher 2",
    role: "Senior Research Scientist",
    department: "Public Health Interventions",
    specialties: ["Urban Health", "Cholera", "Diagnostic Testing"],
    bio: "Researcher 2 specializes in evaluating the cost-effectiveness and outcome metrics of health interventions in dense urban districts like Accra and Kumasi.",
    email: "researcher2@csir.example.com",
    publicationsCount: 87,
  },
  {
    id: "researcher-3",
    name: "Researcher 3",
    role: "Climate & Health Analyst",
    department: "Environmental Health",
    specialties: ["Climate Modeling", "Dengue", "Predictive Analytics"],
    bio: "Researcher 3 analyzes meteorological data against outbreak occurrences to build predictive frameworks for anticipating future disease hotspots.",
    email: "researcher3@csir.example.com",
    publicationsCount: 29,
  }
]

export function getResearcherById(id: string | null): Researcher | undefined {
  if (!id) return undefined
  return RESEARCHERS.find(r => r.id === id)
}
