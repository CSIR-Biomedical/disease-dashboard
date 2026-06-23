export interface Paper {
  title: string
  badge: string
  badgeColor: "indigo" | "emerald" | "amber" | "blue"
  journal: string
  time: string
  authors: string
  description: string
}

export function getRelatedPapers(diseaseName: string): Paper[] {
  return [
    {
      title: `Recent advances in ${diseaseName} surveillance methodologies in West Africa`,
      badge: "PEER REVIEWED",
      badgeColor: "indigo",
      journal: "Journal of Epidemiology",
      time: "2 months ago",
      authors: "Dr. Kwame Mensah et al.",
      description: `A comprehensive review of modernized digital surveillance techniques specifically implemented in sub-Saharan contexts for tracking ${diseaseName} outbreaks. The paper discusses the integration of community-based reporting with national health systems.`
    },
    {
      title: `Efficacy of targeted interventions against ${diseaseName} in urban centers`,
      badge: "CLINICAL STUDY",
      badgeColor: "emerald",
      journal: "The Lancet Global Health",
      time: "1 year ago",
      authors: "Prof. Abena Osei",
      description: `Evaluating the cost-effectiveness and outcome metrics of the top 3 recommended interventions in dense urban districts like Accra and Kumasi. The study highlights significant reductions in transmission rates when vector control is paired with early diagnostic testing.`
    },
    {
      title: `Climatic factors and seasonal mapping of ${diseaseName}`,
      badge: "META-ANALYSIS",
      badgeColor: "amber",
      journal: "Nature Medicine",
      time: "6 months ago",
      authors: "Dr. E. K. Agyeman",
      description: `Analyzing over a decade of meteorological data against outbreak occurrences, this meta-analysis provides a predictive framework for anticipating future hotspots based on shifting rainfall and temperature patterns in the region.`
    }
  ]
}
