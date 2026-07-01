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
    id: "kwame-mensah",
    name: "Dr. Kwame Mensah",
    role: "Lead Epidemiologist",
    department: "Infectious Disease Surveillance",
    specialties: ["Malaria", "Vector Control", "Digital Surveillance"],
    bio: "Dr. Mensah leads the digital surveillance initiative for vector-borne diseases in West Africa. His recent work focuses on integrating community-based reporting with national health systems.",
    email: "k.mensah@csir.example.com",
    publicationsCount: 42,
  },
  {
    id: "abena-osei",
    name: "Prof. Abena Osei",
    role: "Senior Research Scientist",
    department: "Public Health Interventions",
    specialties: ["Urban Health", "Cholera", "Diagnostic Testing"],
    bio: "Prof. Osei specializes in evaluating the cost-effectiveness and outcome metrics of health interventions in dense urban districts like Accra and Kumasi.",
    email: "a.osei@csir.example.com",
    publicationsCount: 87,
  },
  {
    id: "ek-agyeman",
    name: "Dr. E. K. Agyeman",
    role: "Climate & Health Analyst",
    department: "Environmental Health",
    specialties: ["Climate Modeling", "Dengue", "Predictive Analytics"],
    bio: "Dr. Agyeman analyzes meteorological data against outbreak occurrences to build predictive frameworks for anticipating future disease hotspots.",
    email: "e.agyeman@csir.example.com",
    publicationsCount: 29,
  }
]

export function getResearcherById(id: string | null): Researcher | undefined {
  if (!id) return undefined
  return RESEARCHERS.find(r => r.id === id)
}
