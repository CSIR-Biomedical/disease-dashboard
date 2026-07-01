export interface Paper {
  title: string
  badge: string
  badgeColor: "indigo" | "emerald" | "amber" | "blue"
  journal: string
  time: string
  authors: string
  description: string
  url?: string
}

export function getRelatedPapers(diseaseName: string): Paper[] {
  const papers = [
    {
      title: `Recent advances in ${diseaseName} surveillance methodologies in West Africa`,
      badge: "PEER REVIEWED",
      badgeColor: "indigo" as const,
      journal: "Journal of Epidemiology",
      time: "2 months ago",
      authors: "Dr. Kwame Mensah et al.",
      description: `A comprehensive review of modernized digital surveillance techniques specifically implemented in sub-Saharan contexts for tracking ${diseaseName} outbreaks. The paper discusses the integration of community-based reporting with national health systems.`
    },
    {
      title: `Efficacy of targeted interventions against ${diseaseName} in urban centers`,
      badge: "CLINICAL STUDY",
      badgeColor: "emerald" as const,
      journal: "The Lancet Global Health",
      time: "1 year ago",
      authors: "Prof. Abena Osei",
      description: `Evaluating the cost-effectiveness and outcome metrics of the top 3 recommended interventions in dense urban districts like Accra and Kumasi. The study highlights significant reductions in transmission rates when vector control is paired with early diagnostic testing.`
    },
    {
      title: `Climatic factors and seasonal mapping of ${diseaseName}`,
      badge: "META-ANALYSIS",
      badgeColor: "amber" as const,
      journal: "Nature Medicine",
      time: "6 months ago",
      authors: "Dr. E. K. Agyeman",
      description: `Analyzing over a decade of meteorological data against outbreak occurrences, this meta-analysis provides a predictive framework for anticipating future hotspots based on shifting rainfall and temperature patterns in the region.`
    }
  ];

  return papers.map(p => ({
    ...p,
    url: `https://scholar.google.com/scholar?q=${encodeURIComponent(p.title)}`
  }));
}

export function getPapersByResearcher(researcherName: string): Paper[] {
  const papers = [
    {
      title: `Longitudinal analysis of intervention efficacy by ${researcherName}`,
      badge: "PEER REVIEWED",
      badgeColor: "indigo" as const,
      journal: "Journal of Public Health",
      time: "3 months ago",
      authors: `${researcherName} et al.`,
      description: `A detailed 5-year longitudinal study tracking the effectiveness of regional health interventions, highlighting areas of improvement and success.`
    },
    {
      title: `Data-driven surveillance models for early outbreak detection`,
      badge: "METHODOLOGY",
      badgeColor: "amber" as const,
      journal: "Health Informatics Review",
      time: "8 months ago",
      authors: `${researcherName}, J. Doe`,
      description: `Proposes a novel computational framework integrating mobile health data and clinic reports to detect anomalous disease patterns faster than traditional methods.`
    },
    {
      title: `Impact of socio-economic factors on disease transmission in urban environments`,
      badge: "CLINICAL STUDY",
      badgeColor: "emerald" as const,
      journal: "Urban Health Journal",
      time: "1.5 years ago",
      authors: `${researcherName}`,
      description: `An in-depth analysis of how population density, sanitation access, and income levels correlate with transmission rates of communicable diseases.`
    }
  ];

  return papers.map(p => ({
    ...p,
    url: `https://scholar.google.com/scholar?q=${encodeURIComponent(p.title)}`
  }));
}
