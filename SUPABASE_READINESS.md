# Supabase Readiness Review — Disease Dashboard

> **Reviewed:** July 2025  
> **Verdict:** Partially Ready — good foundations, several structural gaps to address before connecting

---

## ✅ What's Already Done Well

### 1. Supabase Client is Pre-wired
- `src/lib/supabase.ts` has a working `createClient` singleton using env vars (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`)
- `.env.example` documents the required variables
- `@supabase/supabase-js` is already in `package.json`

### 2. Data is Separated from UI
- All data lives in `src/data/` files, not inline in components — good separation of concerns
- Data accessor functions (`getDiseasesByType`, `getRegionalData`, `getCaseTrends`, etc.) act as a data access layer

### 3. Swap Comments are Documented
- Each data file has comments like `// Swap with: await supabase.from("case_trends")...` showing the intended migration path

### 4. Strong TypeScript Interfaces
- `Disease`, `Researcher`, `RegionData`, `TrendPoint`, `Paper` — all well-defined
- These can be reused as Supabase `Database` type definitions

---

## 🔴 Critical Issues to Fix Before Adding Supabase

### 1. The `Disease` Type is a Deeply Nested "God Object" — Not DB-Friendly

The `Disease` interface (`src/data/diseases.ts`) packs **everything** into a single object:

```typescript
export interface Disease {
  id: string
  weeklyTrend: WeeklyTrendPoint[]    // nested array
  topDistricts: DistrictData[]        // nested array
  riskFactors: RiskFactor[]           // nested array
  interventions: Intervention[]       // nested array
  outbreaks: Outbreak[]               // nested array
  forecast: ForecastPoint[]           // nested array
  // ... 15+ more fields
}
```

**Problem:** Relational databases don't store nested arrays. Each of these arrays needs to become its own table with a `disease_id` foreign key. Trying to store this as-is in a single Supabase table would mean using `jsonb` columns, which defeats the purpose of a relational DB (no indexing, no querying, no RLS on nested data).

**Required table decomposition:**

| Current nested field | → Supabase Table | Foreign Key |
|---|---|---|
| `Disease` (scalar fields) | `diseases` | — |
| `weeklyTrend[]` | `weekly_trends` | `disease_id` |
| `topDistricts[]` | `district_cases` | `disease_id` |
| `riskFactors[]` | `risk_factors` | `disease_id` |
| `interventions[]` | `interventions` | `disease_id` |
| `outbreaks[]` | `outbreaks` | `disease_id` |
| `forecast[]` | `forecasts` | `disease_id` |

---

### 2. All Data Functions are Synchronous — Components Will Break

Every data function is synchronous and called directly in render:

```typescript
// Overview.tsx line 90:
// TODO: replace with useEffect + useState when swapping to Supabase async queries
const diseases = getDiseasesByType(diseaseType)
```

Supabase queries are **async** (`await supabase.from(...).select(...)`). Every page that calls these functions will need:
- `useState` + `useEffect` (or `useSuspenseQuery` / React Query)
- Loading states
- Error handling

**The codebase currently has zero loading/error states.** Every page assumes data is immediately available. This is the biggest migration effort.

**Affected pages:**
- `src/pages/Overview.tsx` — uses `getDiseasesByType`, `getOverallTrends`, `getRegionalData`, `computeOutcomes`
- `src/pages/DiseaseDetail.tsx` — uses `getDiseasesByType`, `getRegionalData`, `getAgeDistribution`, `getSexBreakdown`, `getRiskGroups`, `getRelatedPapers`
- `src/pages/Demographics.tsx` — uses `getAgeDistribution`, `getRiskGroups`, `getSexBreakdown`, `getDiseasesByType`
- `src/pages/ResearcherDetail.tsx` — uses `getResearcherById`, `getPapersByResearcher`

---

### 3. No Data Fetching Layer / Caching Strategy

There's no React Query, SWR, or any caching abstraction. When you switch to Supabase:
- Every page transition will re-fetch all data
- No stale-while-revalidate pattern
- No deduplication of identical requests
- No optimistic updates if you add write operations later

---

### 4. `Paper` Data is Template-Generated, Not Relational

`src/data/papers.ts` generates papers dynamically using string interpolation:

```typescript
export function getRelatedPapers(diseaseName: string): Paper[] {
  return [
    { title: `Recent advances in ${diseaseName} surveillance...` }
  ]
}
```

This is purely synthetic data — there's no real relationship between papers and diseases. In a Supabase schema, you'd need a proper many-to-many join table: `papers ↔ paper_diseases ↔ diseases`, and `papers ↔ paper_authors ↔ researchers`.

---

### 5. `Paper` Interface Lacks an `id` Field

The `Paper` type has no primary key. Every Supabase table needs one.

---

### 6. No Row-Level Security (RLS) Planning

Supabase uses RLS by default. There's no auth context, no user roles, and no policies planned. For a public dashboard this may be fine (read-only with anon key), but if researchers will log in to edit data, this needs planning now.

---

### 7. Filter Context Doesn't Connect to Data Queries

`src/context/FilterContext.tsx` stores `region`, `district`, and `timePeriod` as React state strings, but **none of the data functions accept these as parameters**. When Supabase is wired up, filter values need to flow into query `.eq()` / `.gte()` clauses.

---

## 🟡 Moderate Concerns

### 8. DiseaseType Duplicated
`DiseaseType` is defined in both `src/data/diseases.ts` and `src/context/DiseaseTypeContext.tsx`. Should be a single source of truth from a shared types file (or generated from Supabase schema).

### 9. No Database Types Generation
Supabase can auto-generate TypeScript types from your schema via `supabase gen types typescript`. You should plan to use that instead of manually maintaining interfaces.

### 10. `charCodeAt` Seeding for Fake Data
`src/data/trends.ts` and `src/data/demographics.ts` use `diseaseId.charCodeAt(0)` as a seed factor. This is fine for mock data but highlights that these functions have no real query logic — they'll need complete rewrites, not just "swap the return."

---

## Recommended Supabase Schema

Based on the current data model, here's the normalized schema to create:

```sql
-- Core entities
create table diseases (
  id text primary key,
  name text not null,
  disease_type text not null check (disease_type in ('communicable', 'non-communicable')),
  category text not null,
  pathogen text not null,
  color text,
  cfr numeric,
  alert_status text check (alert_status in ('High Alert', 'Active', 'Monitoring')),
  total_cases_ytd integer default 0,
  new_cases_7days integer default 0,
  incidence_rate numeric,
  deaths_ytd integer default 0,
  active_outbreaks_count integer default 0,
  outbreak_regions_count integer default 0,
  forecast_insight text
);

create table weekly_trends (
  id uuid primary key default gen_random_uuid(),
  disease_id text references diseases(id) on delete cascade,
  week text not null,
  cases_current_year integer,
  cases_previous_year integer,
  threshold integer
);

create table district_cases (
  id uuid primary key default gen_random_uuid(),
  disease_id text references diseases(id) on delete cascade,
  district_name text not null,
  cases integer not null
);

create table risk_factors (
  id uuid primary key default gen_random_uuid(),
  disease_id text references diseases(id) on delete cascade,
  factor text not null,
  impact text not null,
  level text check (level in ('strong', 'high', 'medium', 'low'))
);

create table interventions (
  id uuid primary key default gen_random_uuid(),
  disease_id text references diseases(id) on delete cascade,
  name text not null,
  value text not null,
  percentage numeric
);

create table outbreaks (
  id text primary key,  -- e.g. "MAL-2024-001"
  disease_id text references diseases(id) on delete cascade,
  location text not null,
  start_date date not null,
  cases integer not null,
  status text not null,
  risk text check (risk in ('High', 'Medium', 'Low'))
);

create table forecasts (
  id uuid primary key default gen_random_uuid(),
  disease_id text references diseases(id) on delete cascade,
  week text not null,
  observed integer,
  forecast integer not null,
  upper_bound integer not null,
  lower_bound integer not null
);

create table researchers (
  id text primary key,
  name text not null,
  role text,
  department text,
  specialties text[],
  bio text,
  email text,
  publications_count integer default 0,
  image_url text
);

create table papers (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  badge text,
  badge_color text,
  journal text,
  published_at timestamptz,
  description text
);

-- Many-to-many joins
create table paper_authors (
  paper_id uuid references papers(id) on delete cascade,
  researcher_id text references researchers(id) on delete cascade,
  primary key (paper_id, researcher_id)
);

create table paper_diseases (
  paper_id uuid references papers(id) on delete cascade,
  disease_id text references diseases(id) on delete cascade,
  primary key (paper_id, disease_id)
);

-- Regional / geographic data
create table regional_cases (
  id uuid primary key default gen_random_uuid(),
  disease_id text references diseases(id) on delete cascade,
  region text not null,
  region_code text not null,
  cases integer not null,
  deaths integer default 0,
  risk_level text check (risk_level in ('low', 'medium', 'high', 'critical'))
);

-- Demographics
create table demographics_age (
  id uuid primary key default gen_random_uuid(),
  disease_id text references diseases(id) on delete cascade,
  age_group text not null,
  male integer not null,
  female integer not null
);

create table demographics_risk_groups (
  id uuid primary key default gen_random_uuid(),
  disease_id text references diseases(id) on delete cascade,
  group_name text not null,
  count integer not null,
  percentage numeric
);

-- Case trends (monthly)
create table case_trends (
  id uuid primary key default gen_random_uuid(),
  disease_id text references diseases(id) on delete cascade,
  date text not null,
  cases integer not null,
  deaths integer default 0,
  recovered integer default 0
);
```

---

## Action Items — Prioritized

| Priority | Action | Effort |
|---|---|---|
| 🔴 P0 | Decompose the `Disease` god-object into normalized tables | Medium |
| 🔴 P0 | Add async data fetching (React Query or `useEffect`+`useState`) to all pages | High |
| 🔴 P0 | Add loading skeletons and error states to every page | Medium |
| 🟡 P1 | Add primary keys to `Paper` interface | Low |
| 🟡 P1 | Wire `FilterContext` values into data query parameters | Medium |
| 🟡 P1 | Consolidate duplicated `DiseaseType` into one shared types file | Low |
| 🟡 P1 | Set up `supabase gen types` for auto-generated TypeScript types | Low |
| 🟢 P2 | Add React Query / SWR for caching and deduplication | Medium |
| 🟢 P2 | Plan RLS policies (even if read-only for now) | Low |
| 🟢 P2 | Rewrite `papers.ts` to use real relational data with join tables | Medium |
