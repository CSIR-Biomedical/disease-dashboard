# CSIR Disease Dashboard

A Vite + React + shadcn/ui infectious disease surveillance dashboard for biomedical research.

## Quick Start

```bash
# Install deps (pnpm preferred)
pnpm install
# or: npm install --legacy-peer-deps

# Run dev server
pnpm dev
# or: npm run dev
```

Open http://localhost:5173

## Pages

| Route | Description |
|---|---|
| `/` | Overview — KPI cards, trend chart, regional map, disease table |
| `/disease?id=malaria` | Disease drill-down — trends, outcomes, regional, bars |
| `/demographics` | Age pyramid, sex split, risk groups, radar chart |

## Connecting to Supabase

1. Create a project at https://supabase.com
2. Add a `.env` file at the project root:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

3. Each data file in `src/data/` has a commented-out Supabase query stub — swap the dummy arrays for those queries. The `supabase` client is already configured in `src/lib/supabase.ts`.

### Suggested Supabase Schema

```sql
-- Regional case counts per disease
create table regional_cases (
  id uuid primary key default gen_random_uuid(),
  disease_id text not null,
  region text not null,
  code text,
  cases int,
  deaths int,
  risk_level text,
  recorded_at date default current_date
);

-- Monthly trend data per disease
create table case_trends (
  id uuid primary key default gen_random_uuid(),
  disease_id text not null,
  date date not null,
  cases int,
  deaths int,
  recovered int
);

-- Demographics
create table demographics (
  id uuid primary key default gen_random_uuid(),
  disease_id text,
  age_group text,
  sex text,
  count int,
  recorded_at date default current_date
);
```

## Tech Stack

- **Vite** — build tool
- **React 19 + TypeScript** — UI
- **Tailwind CSS v3** — styling
- **shadcn/ui** (Radix primitives + CVA) — components
- **Recharts** — charts
- **React Router v7** — routing
- **Supabase JS** — database client (stub, ready to connect)

## Project Structure

```
src/
├── components/
│   ├── ui/         # shadcn/ui primitives (card, badge, button, separator)
│   ├── StatCard    # KPI card widget
│   └── GeoMap      # Regional bar/heatmap
├── data/           # Dummy data (swap for Supabase queries)
│   ├── diseases.ts
│   ├── trends.ts
│   ├── geography.ts
│   └── demographics.ts
├── hooks/
│   └── useTheme.ts # Dark/light toggle
├── layouts/
│   └── AppLayout   # Sidebar + topbar shell
├── lib/
│   ├── supabase.ts # Supabase client
│   └── utils.ts    # cn() helper
└── pages/
    ├── Overview.tsx
    ├── DiseaseDetail.tsx
    └── Demographics.tsx
```
