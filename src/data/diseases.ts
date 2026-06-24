export type AlertStatus = "High Alert" | "Active" | "Monitoring"
export type DiseaseType = "communicable" | "non-communicable"

export interface RiskFactor {
  factor: string
  impact: string
  level: "strong" | "high" | "medium" | "low"
}

export interface Intervention {
  name: string
  value: string | number
  percentage?: number
}

export interface Outbreak {
  id: string
  location: string
  startDate: string
  cases: number
  status: string
  risk: "High" | "Medium" | "Low"
}

export interface ForecastPoint {
  week: string
  observed?: number
  forecast: number
  upper: number
  lower: number
}

export interface DistrictData {
  name: string
  cases: number
}

export interface WeeklyTrendPoint {
  week: string
  cases2024: number
  cases2023: number
  threshold: number
}

export interface Disease {
  id: string
  name: string
  diseaseType: DiseaseType
  category: string
  pathogen: string
  color: string
  cfr: number
  alertStatus: AlertStatus
  // Mockup Redesign Properties
  totalCasesYTD: number
  newCases7Days: number
  incidenceRate: number
  deathsYTD: number
  activeOutbreaksCount: number
  outbreakRegionsCount: number
  weeklyTrend: WeeklyTrendPoint[]
  topDistricts: DistrictData[]
  riskFactors: RiskFactor[]
  interventions: Intervention[]
  outbreaks: Outbreak[]
  forecast: ForecastPoint[]
  forecastInsight: string
}

export const DISEASES: Disease[] = [
  // ── Communicable (NTD / Infectious) ────────────────────────────────────────
  {
    id: "malaria",
    name: "Malaria",
    diseaseType: "communicable",
    category: "Parasitic (NTD)",
    pathogen: "Plasmodium falciparum",
    color: "#ef4444",
    cfr: 0.62,
    alertStatus: "High Alert",
    totalCasesYTD: 24563,
    newCases7Days: 1243,
    incidenceRate: 79.4,
    deathsYTD: 152,
    activeOutbreaksCount: 3,
    outbreakRegionsCount: 2,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 900, cases2023: 750, threshold: 1700 },
      { week: "Jan W5", cases2024: 1150, cases2023: 820, threshold: 1700 },
      { week: "Feb W9", cases2024: 1000, cases2023: 780, threshold: 1700 },
      { week: "Mar W13", cases2024: 1350, cases2023: 950, threshold: 1700 },
      { week: "Apr W17", cases2024: 1100, cases2023: 880, threshold: 1700 },
      { week: "May W21", cases2024: 1400, cases2023: 1050, threshold: 1700 },
    ],
    topDistricts: [
      { name: "Kumasi Metro", cases: 2456 },
      { name: "Accra Metro", cases: 2123 },
      { name: "Tamale Metro", cases: 1876 },
      { name: "Sekondi-Takoradi", cases: 1543 },
      { name: "Cape Coast", cases: 1221 },
    ],
    riskFactors: [
      { factor: "Rainfall (High)", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "Stagnant Water Sites", impact: "High Impact", level: "high" },
      { factor: "Temperature (28-32°C)", impact: "Moderate Impact", level: "medium" },
      { factor: "Population Density", impact: "Low Impact", level: "low" },
    ],
    interventions: [
      { name: "ITN Distribution Coverage", value: "78%", percentage: 78 },
      { name: "Cases Treated (YTD)", value: "22,456", percentage: 0 },
      { name: "Treatment Success Rate", value: "93.2%", percentage: 93.2 },
      { name: "ACT Stock Availability", value: "82%", percentage: 82 },
      { name: "Indoor Residual Spraying", value: "65%", percentage: 65 },
    ],
    outbreaks: [
      { id: "MAL-2024-001", location: "West Mamprusi", startDate: "02 May 2024", cases: 232, status: "Active", risk: "High" },
      { id: "MAL-2024-002", location: "Asante Akim North", startDate: "18 Apr 2024", cases: 156, status: "Active", risk: "Medium" },
      { id: "MAL-2024-003", location: "Nadowli-Kaleo", startDate: "10 Apr 2024", cases: 98, status: "Active", risk: "Medium" },
    ],
    forecast: [
      { week: "May W2", observed: 1400, forecast: 1450, upper: 1600, lower: 1300 },
      { week: "May W4", observed: 1500, forecast: 1520, upper: 1750, lower: 1350 },
      { week: "Jun W2", observed: 1700, forecast: 1680, upper: 1950, lower: 1450 },
      { week: "Jun W4", observed: 1900, forecast: 1850, upper: 2200, lower: 1550 },
      { week: "Jul W2", forecast: 2050, upper: 2450, lower: 1650 },
      { week: "Jul W4", forecast: 2100, upper: 2500, lower: 1700 },
      { week: "Aug W2", forecast: 1850, upper: 2250, lower: 1450 },
      { week: "Aug W4", forecast: 1600, upper: 1950, lower: 1250 },
    ],
    forecastInsight: "Malaria cases are expected to increase in the coming weeks with a peak around July.",
  },
  {
    id: "tb",
    name: "TB",
    diseaseType: "communicable",
    category: "Bacterial (Infectious)",
    pathogen: "Mycobacterium tuberculosis",
    color: "#eab308",
    cfr: 4.8,
    alertStatus: "Active",
    totalCasesYTD: 8412,
    newCases7Days: 312,
    incidenceRate: 27.2,
    deathsYTD: 404,
    activeOutbreaksCount: 1,
    outbreakRegionsCount: 1,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 250, cases2023: 230, threshold: 550 },
      { week: "Jan W5", cases2024: 290, cases2023: 240, threshold: 550 },
      { week: "Feb W9", cases2024: 280, cases2023: 250, threshold: 550 },
      { week: "Mar W13", cases2024: 320, cases2023: 270, threshold: 550 },
      { week: "Apr W17", cases2024: 300, cases2023: 265, threshold: 550 },
      { week: "May W21", cases2024: 312, cases2023: 280, threshold: 550 },
    ],
    topDistricts: [
      { name: "Accra Metro", cases: 940 },
      { name: "Kumasi Metro", cases: 810 },
      { name: "Tamale Metro", cases: 540 },
      { name: "Sekondi-Takoradi", cases: 420 },
      { name: "Ashaiman", cases: 310 },
    ],
    riskFactors: [
      { factor: "Malnutrition", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "HIV Co-infection", impact: "High Impact", level: "high" },
      { factor: "Overcrowded Housing", impact: "High Impact", level: "high" },
      { factor: "Poor Ventilation", impact: "Moderate Impact", level: "medium" },
    ],
    interventions: [
      { name: "DOTS Treatment Success", value: "88%", percentage: 88 },
      { name: "BCG Vaccination Rate", value: "95%", percentage: 95 },
      { name: "GeneXpert Testing Sites", value: "24", percentage: 0 },
      { name: "Contact Tracing Coverage", value: "62%", percentage: 62 },
    ],
    outbreaks: [
      { id: "TBC-2024-001", location: "Ashaiman", startDate: "15 Apr 2024", cases: 48, status: "Active", risk: "Medium" },
    ],
    forecast: [
      { week: "May W2", observed: 310, forecast: 308, upper: 380, lower: 250 },
      { week: "May W4", observed: 312, forecast: 305, upper: 375, lower: 245 },
      { week: "Jun W2", forecast: 295, upper: 360, lower: 230 },
      { week: "Jun W4", forecast: 280, upper: 350, lower: 220 },
      { week: "Jul W2", forecast: 270, upper: 340, lower: 210 },
      { week: "Jul W4", forecast: 265, upper: 330, lower: 200 },
      { week: "Aug W2", forecast: 260, upper: 320, lower: 195 },
      { week: "Aug W4", forecast: 255, upper: 310, lower: 190 },
    ],
    forecastInsight: "Tuberculosis cases are showing a minor downward trajectory due to enhanced DOTS clinic reach and community screenings.",
  },
  {
    id: "cholera",
    name: "Cholera",
    diseaseType: "communicable",
    category: "Bacterial (Waterborne)",
    pathogen: "Vibrio cholerae",
    color: "#f97316",
    cfr: 1.8,
    alertStatus: "High Alert",
    totalCasesYTD: 1840,
    newCases7Days: 450,
    incidenceRate: 5.9,
    deathsYTD: 33,
    activeOutbreaksCount: 2,
    outbreakRegionsCount: 2,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 10, cases2023: 5, threshold: 50 },
      { week: "Jan W5", cases2024: 12, cases2023: 8, threshold: 50 },
      { week: "Feb W9", cases2024: 8, cases2023: 12, threshold: 50 },
      { week: "Mar W13", cases2024: 45, cases2023: 15, threshold: 50 },
      { week: "Apr W17", cases2024: 180, cases2023: 20, threshold: 50 },
      { week: "May W21", cases2024: 450, cases2023: 25, threshold: 50 },
    ],
    topDistricts: [
      { name: "Accra Metro", cases: 780 },
      { name: "La Dade-Kotopon", cases: 410 },
      { name: "Ledzokuku", cases: 290 },
      { name: "Ga West", cases: 180 },
      { name: "Gomoa East", cases: 120 },
    ],
    riskFactors: [
      { factor: "Contaminated Water Sources", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "Flooding / Poor Drainage", impact: "High Impact", level: "high" },
      { factor: "Inadequate Handwashing", impact: "High Impact", level: "high" },
      { factor: "Open Defecation Sites", impact: "Moderate Impact", level: "medium" },
    ],
    interventions: [
      { name: "Oral Rehydration Stations", value: "15 active", percentage: 0 },
      { name: "Chlorine Tablet Distribution", value: "85%", percentage: 85 },
      { name: "Clean Water Tankering", value: "92%", percentage: 92 },
      { name: "OCV Vaccination Coverage", value: "64%", percentage: 64 },
    ],
    outbreaks: [
      { id: "CHO-2024-001", location: "Accra Metro", startDate: "29 Apr 2024", cases: 280, status: "Active", risk: "High" },
      { id: "CHO-2024-002", location: "Gomoa East", startDate: "05 May 2024", cases: 90, status: "Active", risk: "Medium" },
    ],
    forecast: [
      { week: "May W2", observed: 420, forecast: 460, upper: 550, lower: 380 },
      { week: "May W4", observed: 450, forecast: 490, upper: 610, lower: 400 },
      { week: "Jun W2", forecast: 510, upper: 680, lower: 420 },
      { week: "Jun W4", forecast: 480, upper: 650, lower: 390 },
      { week: "Jul W2", forecast: 380, upper: 520, lower: 300 },
      { week: "Jul W4", forecast: 250, upper: 380, lower: 180 },
      { week: "Aug W2", forecast: 120, upper: 200, lower: 80 },
      { week: "Aug W4", forecast: 40, upper: 80, lower: 10 },
    ],
    forecastInsight: "Cholera is spiking due to early monsoon flooding. Case counts are projected to peak in mid-June before dropping significantly once municipal drainage repairs complete.",
  },
  {
    id: "hiv-aids",
    name: "HIV/AIDS",
    diseaseType: "communicable",
    category: "Viral (STI)",
    pathogen: "Human immunodeficiency virus",
    color: "#ec4899",
    cfr: 1.5,
    alertStatus: "Monitoring",
    totalCasesYTD: 9812,
    newCases7Days: 145,
    incidenceRate: 31.7,
    deathsYTD: 147,
    activeOutbreaksCount: 0,
    outbreakRegionsCount: 0,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 150, cases2023: 155, threshold: 300 },
      { week: "Jan W5", cases2024: 160, cases2023: 158, threshold: 300 },
      { week: "Feb W9", cases2024: 145, cases2023: 160, threshold: 300 },
      { week: "Mar W13", cases2024: 155, cases2023: 152, threshold: 300 },
      { week: "Apr W17", cases2024: 138, cases2023: 148, threshold: 300 },
      { week: "May W21", cases2024: 145, cases2023: 144, threshold: 300 },
    ],
    topDistricts: [
      { name: "Lower Manya Krobo", cases: 580 },
      { name: "Accra Metro", cases: 510 },
      { name: "Kumasi Metro", cases: 460 },
      { name: "Koforidua Metro", cases: 310 },
      { name: "Sunyani West", cases: 180 },
    ],
    riskFactors: [
      { factor: "Unprotected Contact", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "Vertical Transmission", impact: "Moderate Impact", level: "medium" },
      { factor: "Stigma Blocking Testing", impact: "High Impact", level: "high" },
      { factor: "Lack of PrEP Awareness", impact: "Moderate Impact", level: "medium" },
    ],
    interventions: [
      { name: "ART Adherence Rate", value: "84%", percentage: 84 },
      { name: "Viral Suppression Rate", value: "79%", percentage: 79 },
      { name: "PrEP Program Reach", value: "38%", percentage: 38 },
      { name: "PMTCT Program Coverage", value: "95%", percentage: 95 },
    ],
    outbreaks: [],
    forecast: [
      { week: "May W2", observed: 142, forecast: 144, upper: 180, lower: 110 },
      { week: "May W4", observed: 145, forecast: 143, upper: 178, lower: 108 },
      { week: "Jun W2", forecast: 141, upper: 175, lower: 105 },
      { week: "Jun W4", forecast: 139, upper: 172, lower: 102 },
      { week: "Jul W2", forecast: 138, upper: 170, lower: 100 },
      { week: "Jul W4", forecast: 136, upper: 168, lower: 98 },
      { week: "Aug W2", forecast: 135, upper: 165, lower: 95 },
      { week: "Aug W4", forecast: 133, upper: 162, lower: 92 },
    ],
    forecastInsight: "HIV case detection remains relatively stable. Outreach targets PMTCT and high-stigma zones to raise testing rates.",
  },
  {
    id: "covid19",
    name: "COVID-19",
    diseaseType: "communicable",
    category: "Viral",
    pathogen: "SARS-CoV-2",
    color: "#3b82f6",
    cfr: 1.2,
    alertStatus: "Monitoring",
    totalCasesYTD: 1452,
    newCases7Days: 42,
    incidenceRate: 4.7,
    deathsYTD: 17,
    activeOutbreaksCount: 0,
    outbreakRegionsCount: 0,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 120, cases2023: 450, threshold: 600 },
      { week: "Jan W5", cases2024: 95, cases2023: 380, threshold: 600 },
      { week: "Feb W9", cases2024: 70, cases2023: 320, threshold: 600 },
      { week: "Mar W13", cases2024: 55, cases2023: 280, threshold: 600 },
      { week: "Apr W17", cases2024: 48, cases2023: 190, threshold: 600 },
      { week: "May W21", cases2024: 42, cases2023: 150, threshold: 600 },
    ],
    topDistricts: [
      { name: "Accra Metro", cases: 684 },
      { name: "Kumasi Metro", cases: 412 },
      { name: "Tema Metropolitan", cases: 185 },
      { name: "Ledzokuku", cases: 92 },
      { name: "Ho Municipal", cases: 79 },
    ],
    riskFactors: [
      { factor: "Indoor Crowded Spaces", impact: "High Impact", level: "high" },
      { factor: "Low Vaccination Rates", impact: "Moderate Impact", level: "medium" },
      { factor: "Airborne/Droplet spread", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "Seasonal Temperature drops", impact: "Low Impact", level: "low" },
    ],
    interventions: [
      { name: "Booster Dose Coverage", value: "32%", percentage: 32 },
      { name: "Active PCR Labs Available", value: "12", percentage: 0 },
      { name: "Vaccine Stock (Pfizer)", value: "98%", percentage: 98 },
      { name: "Masking compliance", value: "15%", percentage: 15 },
    ],
    outbreaks: [],
    forecast: [
      { week: "May W2", observed: 45, forecast: 44, upper: 65, lower: 30 },
      { week: "May W4", observed: 42, forecast: 41, upper: 60, lower: 25 },
      { week: "Jun W2", forecast: 38, upper: 55, lower: 20 },
      { week: "Jun W4", forecast: 35, upper: 52, lower: 18 },
      { week: "Jul W2", forecast: 40, upper: 58, lower: 20 },
      { week: "Jul W4", forecast: 45, upper: 65, lower: 22 },
      { week: "Aug W2", forecast: 50, upper: 72, lower: 25 },
      { week: "Aug W4", forecast: 42, upper: 60, lower: 20 },
    ],
    forecastInsight: "COVID-19 remains stable with localized minor increases expected around late July due to cold weather/airborne spread patterns.",
  },

  // ── Non-Communicable (NCD) ─────────────────────────────────────────────────
  {
    id: "hypertension",
    name: "Hypertension",
    diseaseType: "non-communicable",
    category: "Cardiovascular (NCD)",
    pathogen: "Primary hypertension",
    color: "#8b5cf6",
    cfr: 2.1,
    alertStatus: "High Alert",
    totalCasesYTD: 34510,
    newCases7Days: 812,
    incidenceRate: 111.3,
    deathsYTD: 724,
    activeOutbreaksCount: 0,
    outbreakRegionsCount: 0,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 750, cases2023: 710, threshold: 1200 },
      { week: "Jan W5", cases2024: 790, cases2023: 730, threshold: 1200 },
      { week: "Feb W9", cases2024: 810, cases2023: 740, threshold: 1200 },
      { week: "Mar W13", cases2024: 840, cases2023: 780, threshold: 1200 },
      { week: "Apr W17", cases2024: 805, cases2023: 790, threshold: 1200 },
      { week: "May W21", cases2024: 812, cases2023: 800, threshold: 1200 },
    ],
    topDistricts: [
      { name: "Accra Metro", cases: 7820 },
      { name: "Kumasi Metro", cases: 6940 },
      { name: "Tema Metropolitan", cases: 4120 },
      { name: "Sekondi-Takoradi", cases: 3120 },
      { name: "Tamale Metro", cases: 2110 },
    ],
    riskFactors: [
      { factor: "High Dietary Sodium", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "Obesity / BMI > 30", impact: "High Impact", level: "high" },
      { factor: "Sedentary Lifestyle", impact: "High Impact", level: "high" },
      { factor: "Stress & Alcohol intake", impact: "Moderate Impact", level: "medium" },
    ],
    interventions: [
      { name: "Antihypertensive Availability", value: "91%", percentage: 91 },
      { name: "BP Screening Stations", value: "320 Nationwide", percentage: 0 },
      { name: "Patient Compliance Rate", value: "54%", percentage: 54 },
      { name: "Wellness Clinics Coverage", value: "48%", percentage: 48 },
    ],
    outbreaks: [],
    forecast: [
      { week: "May W2", observed: 808, forecast: 815, upper: 880, lower: 750 },
      { week: "May W4", observed: 812, forecast: 820, upper: 890, lower: 755 },
      { week: "Jun W2", forecast: 825, upper: 900, lower: 760 },
      { week: "Jun W4", forecast: 830, upper: 910, lower: 765 },
      { week: "Jul W2", forecast: 840, upper: 920, lower: 770 },
      { week: "Jul W4", forecast: 845, upper: 930, lower: 775 },
      { week: "Aug W2", forecast: 850, upper: 940, lower: 780 },
      { week: "Aug W4", forecast: 855, upper: 955, lower: 785 },
    ],
    forecastInsight: "Hypertension cases are projected to trend slightly upward over the next 12 weeks, matching urbanization and increased sedentary trends.",
  },
  {
    id: "diabetes",
    name: "Diabetes (Type 2)",
    diseaseType: "non-communicable",
    category: "Metabolic (NCD)",
    pathogen: "Insulin resistance",
    color: "#06b6d4",
    cfr: 1.4,
    alertStatus: "High Alert",
    totalCasesYTD: 21890,
    newCases7Days: 450,
    incidenceRate: 70.6,
    deathsYTD: 306,
    activeOutbreaksCount: 0,
    outbreakRegionsCount: 0,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 410, cases2023: 380, threshold: 800 },
      { week: "Jan W5", cases2024: 430, cases2023: 395, threshold: 800 },
      { week: "Feb W9", cases2024: 425, cases2023: 405, threshold: 800 },
      { week: "Mar W13", cases2024: 460, cases2023: 420, threshold: 800 },
      { week: "Apr W17", cases2024: 440, cases2023: 415, threshold: 800 },
      { week: "May W21", cases2024: 450, cases2023: 425, threshold: 800 },
    ],
    topDistricts: [
      { name: "Accra Metro", cases: 5410 },
      { name: "Kumasi Metro", cases: 4890 },
      { name: "Tema Metropolitan", cases: 2900 },
      { name: "Sekondi-Takoradi", cases: 1980 },
      { name: "Tamale Metro", cases: 1240 },
    ],
    riskFactors: [
      { factor: "Refined Sugar Intake", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "Lack of Exercise", impact: "High Impact", level: "high" },
      { factor: "Genetic Predisposition", impact: "Moderate Impact", level: "medium" },
      { factor: "Tobacco Usage", impact: "Low Impact", level: "low" },
    ],
    interventions: [
      { name: "Oral Hypoglycemics Stock", value: "88%", percentage: 88 },
      { name: "Insulin Supply (Free)", value: "76%", percentage: 76 },
      { name: "HBA1c Testing Centers", value: "48", percentage: 0 },
      { name: "Nutritional Advice Programs", value: "62%", percentage: 62 },
    ],
    outbreaks: [],
    forecast: [
      { week: "May W2", observed: 448, forecast: 452, upper: 510, lower: 400 },
      { week: "May W4", observed: 450, forecast: 455, upper: 515, lower: 405 },
      { week: "Jun W2", forecast: 460, upper: 520, lower: 410 },
      { week: "Jun W4", forecast: 465, upper: 528, lower: 415 },
      { week: "Jul W2", forecast: 470, upper: 535, lower: 420 },
      { week: "Jul W4", forecast: 475, upper: 540, lower: 425 },
      { week: "Aug W2", forecast: 480, upper: 548, lower: 430 },
      { week: "Aug W4", forecast: 485, upper: 555, lower: 435 },
    ],
    forecastInsight: "Metabolic screening expansions are likely to detect higher volumes of Type 2 diabetes cases over the next three months.",
  },
  {
    id: "cardiovascular",
    name: "Cardiovascular Disease",
    diseaseType: "non-communicable",
    category: "Cardiovascular (NCD)",
    pathogen: "Atherosclerosis",
    color: "#f43f5e",
    cfr: 3.8,
    alertStatus: "Active",
    totalCasesYTD: 18940,
    newCases7Days: 382,
    incidenceRate: 61.1,
    deathsYTD: 719,
    activeOutbreaksCount: 0,
    outbreakRegionsCount: 0,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 340, cases2023: 310, threshold: 650 },
      { week: "Jan W5", cases2024: 365, cases2023: 325, threshold: 650 },
      { week: "Feb W9", cases2024: 350, cases2023: 330, threshold: 650 },
      { week: "Mar W13", cases2024: 390, cases2023: 345, threshold: 650 },
      { week: "Apr W17", cases2024: 375, cases2023: 350, threshold: 650 },
      { week: "May W21", cases2024: 382, cases2023: 355, threshold: 650 },
    ],
    topDistricts: [
      { name: "Accra Metro", cases: 4850 },
      { name: "Kumasi Metro", cases: 4120 },
      { name: "Tema Metropolitan", cases: 2240 },
      { name: "Sekondi-Takoradi", cases: 1810 },
      { name: "Tamale Metro", cases: 980 },
    ],
    riskFactors: [
      { factor: "Uncontrolled Hypertension", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "High Cholesterol Levels", impact: "High Impact", level: "high" },
      { factor: "Tobacco / Smoking", impact: "High Impact", level: "high" },
      { factor: "Saturated Fat Diet", impact: "Moderate Impact", level: "medium" },
    ],
    interventions: [
      { name: "Cardiac Care Centers", value: "3 Sites Available", percentage: 0 },
      { name: "Statins Stock Availability", value: "84%", percentage: 84 },
      { name: "ECG/Echo Accessibility", value: "59%", percentage: 59 },
      { name: "Aspirin Therapy Outreach", value: "78%", percentage: 78 },
    ],
    outbreaks: [],
    forecast: [
      { week: "May W2", observed: 380, forecast: 385, upper: 440, lower: 330 },
      { week: "May W4", observed: 382, forecast: 388, upper: 445, lower: 335 },
      { week: "Jun W2", forecast: 392, upper: 450, lower: 340 },
      { week: "Jun W4", forecast: 395, upper: 455, lower: 345 },
      { week: "Jul W2", forecast: 400, upper: 462, lower: 350 },
      { week: "Jul W4", forecast: 405, upper: 468, lower: 355 },
      { week: "Aug W2", forecast: 410, upper: 475, lower: 360 },
      { week: "Aug W4", forecast: 415, upper: 482, lower: 365 },
    ],
    forecastInsight: "Cardiovascular cases exhibit a persistent baseline trend. Preventative education on lifestyle factors is being scaled to combat high CFR.",
  },
  {
    id: "sickle-cell",
    name: "Sickle Cell Disease",
    diseaseType: "non-communicable",
    category: "Haematological (NCD)",
    pathogen: "HBB gene mutation",
    color: "#10b981",
    cfr: 0.9,
    alertStatus: "Monitoring",
    totalCasesYTD: 12450,
    newCases7Days: 215,
    incidenceRate: 40.2,
    deathsYTD: 112,
    activeOutbreaksCount: 0,
    outbreakRegionsCount: 0,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 185, cases2023: 190, threshold: 400 },
      { week: "Jan W5", cases2024: 195, cases2023: 185, threshold: 400 },
      { week: "Feb W9", cases2024: 205, cases2023: 192, threshold: 400 },
      { week: "Mar W13", cases2024: 225, cases2023: 200, threshold: 400 },
      { week: "Apr W17", cases2024: 210, cases2023: 195, threshold: 400 },
      { week: "May W21", cases2024: 215, cases2023: 202, threshold: 400 },
    ],
    topDistricts: [
      { name: "Kumasi Metro", cases: 2950 },
      { name: "Accra Metro", cases: 2450 },
      { name: "Tamale Metro", cases: 1450 },
      { name: "Koforidua Metro", cases: 880 },
      { name: "Cape Coast", cases: 720 },
    ],
    riskFactors: [
      { factor: "Genetic Carrier Status", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "Dehydration (Crises)", impact: "High Impact", level: "high" },
      { factor: "Extreme Cold / Weather", impact: "Moderate Impact", level: "medium" },
      { factor: "Malaria Co-infection", impact: "High Impact", level: "high" },
    ],
    interventions: [
      { name: "Newborn Screening Rate", value: "68%", percentage: 68 },
      { name: "Hydroxyurea Availability", value: "72%", percentage: 72 },
      { name: "Penicillin Prophylaxis", value: "85%", percentage: 85 },
      { name: "Folic Acid Distribution", value: "91%", percentage: 91 },
    ],
    outbreaks: [],
    forecast: [
      { week: "May W2", observed: 212, forecast: 214, upper: 260, lower: 170 },
      { week: "May W4", observed: 215, forecast: 217, upper: 262, lower: 172 },
      { week: "Jun W2", forecast: 220, upper: 265, lower: 175 },
      { week: "Jun W4", forecast: 222, upper: 268, lower: 178 },
      { week: "Jul W2", forecast: 225, upper: 272, lower: 180 },
      { week: "Jul W4", forecast: 228, upper: 275, lower: 182 },
      { week: "Aug W2", forecast: 230, upper: 278, lower: 185 },
      { week: "Aug W4", forecast: 232, upper: 282, lower: 188 },
    ],
    forecastInsight: "Crisis episodes fluctuate with seasonal temperature swings. Hydration campaigns and Hydroxyurea scaling remain top clinical interventions.",
  },
  {
    id: "parkinsons",
    name: "Parkinson's Disease",
    diseaseType: "non-communicable",
    category: "Neurological (NCD)",
    pathogen: "Neurodegenerative",
    color: "#8b5cf6",
    cfr: 1.2,
    alertStatus: "Monitoring",
    totalCasesYTD: 2100,
    newCases7Days: 45,
    incidenceRate: 6.5,
    deathsYTD: 24,
    activeOutbreaksCount: 0,
    outbreakRegionsCount: 0,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 35, cases2023: 32, threshold: 60 },
      { week: "Jan W5", cases2024: 38, cases2023: 34, threshold: 60 },
      { week: "Feb W9", cases2024: 40, cases2023: 36, threshold: 60 },
      { week: "Mar W13", cases2024: 42, cases2023: 38, threshold: 60 },
      { week: "Apr W17", cases2024: 44, cases2023: 39, threshold: 60 },
      { week: "May W21", cases2024: 45, cases2023: 40, threshold: 60 },
    ],
    topDistricts: [
      { name: "Accra Metro", cases: 650 },
      { name: "Kumasi Metro", cases: 480 },
      { name: "Tema Metro", cases: 210 },
      { name: "Cape Coast", cases: 180 },
      { name: "Sekondi-Takoradi", cases: 150 },
    ],
    riskFactors: [
      { factor: "Age", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "Genetics", impact: "Moderate Impact", level: "medium" },
      { factor: "Environmental Toxins", impact: "Moderate Impact", level: "medium" },
    ],
    interventions: [
      { name: "Levodopa Availability", value: "78%", percentage: 78 },
      { name: "Neurology Clinics Access", value: "45%", percentage: 45 },
      { name: "Physical Therapy Reach", value: "62%", percentage: 62 },
    ],
    outbreaks: [],
    forecast: [
      { week: "May W2", observed: 43, forecast: 44, upper: 55, lower: 35 },
      { week: "May W4", observed: 45, forecast: 46, upper: 58, lower: 36 },
      { week: "Jun W2", forecast: 47, upper: 60, lower: 38 },
      { week: "Jun W4", forecast: 48, upper: 62, lower: 39 },
      { week: "Jul W2", forecast: 50, upper: 65, lower: 40 },
      { week: "Jul W4", forecast: 51, upper: 66, lower: 41 },
      { week: "Aug W2", forecast: 52, upper: 68, lower: 42 },
      { week: "Aug W4", forecast: 54, upper: 70, lower: 43 },
    ],
    forecastInsight: "Parkinson's cases show a slow, steady increase reflecting the aging demographic and improved diagnostic capacity.",
  },
  {
    id: "alzheimers",
    name: "Alzheimer's Disease",
    diseaseType: "non-communicable",
    category: "Neurological (NCD)",
    pathogen: "Neurodegenerative",
    color: "#6366f1",
    cfr: 1.5,
    alertStatus: "Monitoring",
    totalCasesYTD: 3400,
    newCases7Days: 62,
    incidenceRate: 11.2,
    deathsYTD: 45,
    activeOutbreaksCount: 0,
    outbreakRegionsCount: 0,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 55, cases2023: 50, threshold: 80 },
      { week: "Jan W5", cases2024: 58, cases2023: 52, threshold: 80 },
      { week: "Feb W9", cases2024: 56, cases2023: 54, threshold: 80 },
      { week: "Mar W13", cases2024: 60, cases2023: 55, threshold: 80 },
      { week: "Apr W17", cases2024: 61, cases2023: 57, threshold: 80 },
      { week: "May W21", cases2024: 62, cases2023: 58, threshold: 80 },
    ],
    topDistricts: [
      { name: "Accra Metro", cases: 950 },
      { name: "Kumasi Metro", cases: 720 },
      { name: "Tema Metro", cases: 340 },
      { name: "Cape Coast", cases: 280 },
      { name: "Sekondi-Takoradi", cases: 250 },
    ],
    riskFactors: [
      { factor: "Age", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "Family History", impact: "High Impact", level: "high" },
      { factor: "Cardiovascular Health", impact: "Moderate Impact", level: "medium" },
    ],
    interventions: [
      { name: "Memory Care Units", value: "25%", percentage: 25 },
      { name: "Caregiver Support Programs", value: "40%", percentage: 40 },
      { name: "Cognitive Screening Rate", value: "35%", percentage: 35 },
    ],
    outbreaks: [],
    forecast: [
      { week: "May W2", observed: 60, forecast: 62, upper: 75, lower: 50 },
      { week: "May W4", observed: 62, forecast: 64, upper: 78, lower: 52 },
      { week: "Jun W2", forecast: 65, upper: 80, lower: 53 },
      { week: "Jun W4", forecast: 67, upper: 82, lower: 55 },
      { week: "Jul W2", forecast: 69, upper: 85, lower: 56 },
      { week: "Jul W4", forecast: 71, upper: 88, lower: 58 },
      { week: "Aug W2", forecast: 73, upper: 90, lower: 60 },
      { week: "Aug W4", forecast: 75, upper: 92, lower: 62 },
    ],
    forecastInsight: "Alzheimer's diagnoses are increasing as life expectancy rises and awareness campaigns prompt earlier screening.",
  },
  {
    id: "cancer",
    name: "Cancer (All Types)",
    diseaseType: "non-communicable",
    category: "Oncology (NCD)",
    pathogen: "Cellular Mutation",
    color: "#ec4899",
    cfr: 15.4,
    alertStatus: "Active",
    totalCasesYTD: 18500,
    newCases7Days: 350,
    incidenceRate: 58.6,
    deathsYTD: 2850,
    activeOutbreaksCount: 0,
    outbreakRegionsCount: 0,
    weeklyTrend: [
      { week: "Jan W1", cases2024: 310, cases2023: 290, threshold: 450 },
      { week: "Jan W5", cases2024: 325, cases2023: 300, threshold: 450 },
      { week: "Feb W9", cases2024: 330, cases2023: 310, threshold: 450 },
      { week: "Mar W13", cases2024: 345, cases2023: 315, threshold: 450 },
      { week: "Apr W17", cases2024: 340, cases2023: 320, threshold: 450 },
      { week: "May W21", cases2024: 350, cases2023: 330, threshold: 450 },
    ],
    topDistricts: [
      { name: "Accra Metro", cases: 5200 },
      { name: "Kumasi Metro", cases: 4100 },
      { name: "Tamale Metro", cases: 1800 },
      { name: "Tema Metro", cases: 1500 },
      { name: "Sekondi-Takoradi", cases: 1200 },
    ],
    riskFactors: [
      { factor: "Tobacco / Smoking", impact: "Strong Positive Correlation", level: "strong" },
      { factor: "Diet & Obesity", impact: "High Impact", level: "high" },
      { factor: "Alcohol Consumption", impact: "Moderate Impact", level: "medium" },
      { factor: "Genetics / Family History", impact: "High Impact", level: "high" },
    ],
    interventions: [
      { name: "Oncology Treatment Centers", value: "8 Sites", percentage: 0 },
      { name: "Chemotherapy Access", value: "65%", percentage: 65 },
      { name: "Radiotherapy Facilities", value: "40%", percentage: 40 },
      { name: "Breast/Cervical Screening", value: "52%", percentage: 52 },
    ],
    outbreaks: [],
    forecast: [
      { week: "May W2", observed: 345, forecast: 348, upper: 400, lower: 300 },
      { week: "May W4", observed: 350, forecast: 352, upper: 405, lower: 305 },
      { week: "Jun W2", forecast: 358, upper: 410, lower: 310 },
      { week: "Jun W4", forecast: 365, upper: 418, lower: 315 },
      { week: "Jul W2", forecast: 370, upper: 425, lower: 320 },
      { week: "Jul W4", forecast: 375, upper: 432, lower: 325 },
      { week: "Aug W2", forecast: 380, upper: 440, lower: 330 },
      { week: "Aug W4", forecast: 388, upper: 448, lower: 335 },
    ],
    forecastInsight: "Cancer registrations maintain a steady upward trajectory. Priority is expanding access to radiotherapy and early screening programs.",
  },
]

export function getDiseasesByType(type: DiseaseType): Disease[] {
  return DISEASES.filter(d => d.diseaseType === type)
}
