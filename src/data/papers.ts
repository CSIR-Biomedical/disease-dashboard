export interface Paper {
  id: string
  title: string
  badge: string
  badgeColor: "indigo" | "emerald" | "amber" | "blue"
  journal: string
  time: string
  authors: string
  description: string
  abstract: string
  url?: string
}

export const PUBLICATIONS: Paper[] = [
  {
    id: "malaria-surveillance-west-africa",
    title: "Recent advances in malaria surveillance methodologies in West Africa",
    badge: "PEER REVIEWED",
    badgeColor: "indigo",
    journal: "Journal of Epidemiology",
    time: "2 months ago",
    authors: "Researcher 1 et al.",
    description:
      "A comprehensive review of modernized digital surveillance techniques specifically implemented in sub-Saharan contexts for tracking malaria outbreaks.",
    abstract:
      "Reliable malaria surveillance remains a cornerstone of national control strategies across West Africa. This review synthesizes recent advances in digital case reporting, community-based signal capture, and integration with national health information systems. We evaluate implementation outcomes from district deployments, document barriers to data completeness, and propose a staged framework for scaling surveillance platforms where connectivity and workforce capacity vary widely. Findings indicate that hybrid paper-to-digital workflows and feedback loops to frontline workers substantially improve reporting timeliness without requiring immediate full system replacement.",
    url: "https://scholar.google.com/scholar?q=malaria+surveillance+West+Africa",
  },
  {
    id: "cholera-interventions-urban",
    title: "Efficacy of targeted cholera interventions in urban centers",
    badge: "CLINICAL STUDY",
    badgeColor: "emerald",
    journal: "The Lancet Global Health",
    time: "4 months ago",
    authors: "Researcher 2",
    description:
      "Evaluating cost-effectiveness and outcomes of recommended interventions in dense urban districts, highlighting gains when vector control pairs with early diagnostics.",
    abstract:
      "This clinical and operational study assesses the relative effectiveness of targeted cholera response packages in high-density urban districts. Using matched intervention–comparison clusters, we measure attack rates, time-to-detection, and cost per case averted across water, sanitation, and rapid diagnostic strategies. Results show strongest impact when early diagnostic access is paired with localized water-point interventions and household hygiene support. The paper discusses implications for municipal preparedness planning and equitable resource allocation during seasonal transmission peaks.",
    url: "https://scholar.google.com/scholar?q=cholera+interventions+urban",
  },
  {
    id: "dengue-climate-mapping",
    title: "Climatic factors and seasonal mapping of dengue risk",
    badge: "META-ANALYSIS",
    badgeColor: "amber",
    journal: "Nature Medicine",
    time: "6 months ago",
    authors: "Researcher 3",
    description:
      "A predictive framework linking meteorological trends to outbreak hotspots based on rainfall and temperature patterns across the region.",
    abstract:
      "We consolidate multi-year meteorological and dengue incidence datasets to quantify how rainfall anomalies, temperature thresholds, and humidity interact with outbreak timing. A meta-analytic model and district-level risk surface are developed to support anticipatory deployment of vector control resources. The framework improves hotspot prediction lead time relative to incidence-only baselines and identifies climate-sensitive districts where adaptive surveillance intensity would yield the greatest public health return.",
    url: "https://scholar.google.com/scholar?q=dengue+climate+mapping",
  },
  {
    id: "outbreak-detection-models",
    title: "Data-driven surveillance models for early outbreak detection",
    badge: "METHODOLOGY",
    badgeColor: "amber",
    journal: "Health Informatics Review",
    time: "8 months ago",
    authors: "Researcher 1, J. Doe",
    description:
      "A computational framework integrating mobile health data and clinic reports to detect anomalous disease patterns faster than traditional methods.",
    abstract:
      "This methodology paper introduces an anomaly-detection pipeline that fuses clinic encounter volume, syndromic signals, and optional mobile health reports. We describe feature construction, baseline estimation, and alert thresholding designed for intermittent reporting environments. In retrospective validation, the model reduced median detection lag compared with traditional weekly threshold rules while maintaining an acceptable false-alert burden for district epidemiology teams.",
    url: "https://scholar.google.com/scholar?q=outbreak+detection+models",
  },
  {
    id: "socioeconomic-transmission",
    title: "Impact of socio-economic factors on disease transmission in urban environments",
    badge: "CLINICAL STUDY",
    badgeColor: "emerald",
    journal: "Urban Health Journal",
    time: "10 months ago",
    authors: "Researcher 2",
    description:
      "Analysis of how population density, sanitation access, and income levels correlate with transmission rates of communicable diseases.",
    abstract:
      "Urban transmission dynamics are shaped as much by living conditions as by pathogen biology. Using multi-district surveillance and household survey covariates, we estimate associations between density, sanitation access, income, and communication disease incidence. Results highlight clustered risk in informal settlements and quantify how infrastructure gaps amplify outbreak size. Policy recommendations emphasize place-based investment complementary to clinical response.",
    url: "https://scholar.google.com/scholar?q=socio-economic+disease+transmission",
  },
  {
    id: "community-based-reporting",
    title: "Community-based reporting for national health system integration",
    badge: "PEER REVIEWED",
    badgeColor: "indigo",
    journal: "Journal of Public Health",
    time: "1 year ago",
    authors: "Researcher 1 et al.",
    description:
      "Demonstrates how community reporting pipelines improve completeness of notifiable disease data at district and national levels.",
    abstract:
      "Community health volunteers and local clinicians generate valuable early signals that often never reach national databases. This study evaluates a structured community-reporting pipeline linked to district surveillance units and national notifiable disease registers. Completeness and timeliness improved across participating districts, with strongest gains for under-reported syndromes. We outline governance, training, and data-quality controls required for sustainable national integration.",
    url: "https://scholar.google.com/scholar?q=community+based+reporting+health+systems",
  },
  {
    id: "amr-primary-care",
    title: "Antimicrobial resistance monitoring in primary care laboratories",
    badge: "PEER REVIEWED",
    badgeColor: "blue",
    journal: "Clinical Microbiology Reviews",
    time: "14 months ago",
    authors: "CSIR Pharmacology Unit",
    description:
      "Describes a scalable AMR sentinel protocol suitable for resource-constrained primary laboratories.",
    abstract:
      "Antimicrobial resistance surveillance is often concentrated in tertiary centers, leaving primary care invisible. We present a sentinel protocol adapted for primary laboratories, including specimen prioritization, simplified susceptibility panels, and upward reporting standards. Pilot laboratories achieved stable monthly reporting with modest incremental cost. The protocol is intended as a practical bridge toward broader One Health AMR monitoring.",
    url: "https://scholar.google.com/scholar?q=antimicrobial+resistance+primary+care",
  },
  {
    id: "vaccine-coverage-dashboards",
    title: "Vaccine coverage dashboards for equitable delivery planning",
    badge: "UPDATE",
    badgeColor: "blue",
    journal: "CSIR Policy Brief",
    time: "16 months ago",
    authors: "CSIR CHRI",
    description:
      "Practical guidance for ministries using shared data infrastructure to identify coverage gaps and prioritize outreach.",
    abstract:
      "This policy brief translates dashboard analytics into operational guidance for immunization programs. It covers indicator definitions, equity stratifiers, and workflows for identifying persistently under-covered communities. Recommended practices emphasize shared ministry–partner data infrastructure, routine review cadences, and safeguards against misinterpretation of incomplete administrative data.",
    url: "https://scholar.google.com/scholar?q=vaccine+coverage+dashboard",
  },
  {
    id: "genomic-surveillance-preparedness",
    title: "Genomic surveillance expansion for emerging pathogen preparedness",
    badge: "PEER REVIEWED",
    badgeColor: "indigo",
    journal: "Genome Medicine",
    time: "18 months ago",
    authors: "Researcher 3 et al.",
    description:
      "Documents sequencing capacity growth and turnaround improvements supporting regional outbreak response.",
    abstract:
      "Genomic capacity is increasingly central to outbreak characterization and importation detection. We document a regional expansion of sequencing throughput, turnaround time improvements, and linkage to epidemiologic investigations. Case studies illustrate how genomic signals informed response decisions. Remaining gaps include sample transport logistics, workforce retention, and sustainable financing beyond emergency grants.",
    url: "https://scholar.google.com/scholar?q=genomic+surveillance+preparedness",
  },
]

export function getPublicationById(id: string | null): Paper | undefined {
  if (!id) return undefined
  return PUBLICATIONS.find((p) => p.id === id)
}

export function getRelatedPapers(diseaseName: string): Paper[] {
  const lower = diseaseName.toLowerCase()
  const matched = PUBLICATIONS.filter(
    (p) =>
      p.title.toLowerCase().includes(lower) ||
      p.description.toLowerCase().includes(lower) ||
      p.abstract.toLowerCase().includes(lower)
  )
  return matched.length > 0 ? matched.slice(0, 3) : PUBLICATIONS.slice(0, 3)
}

export function getPapersByResearcher(researcherName: string): Paper[] {
  const key = researcherName.toLowerCase()
  return PUBLICATIONS.filter((p) => p.authors.toLowerCase().includes(key)).slice(0, 3)
}
