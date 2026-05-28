# Contributing to the CSIR Disease Dashboard

## Branch strategy

```
main
 └── develop
      └── feature/your-feature-name
      └── fix/your-bug-fix
      └── data/supabase-connection
```

| Branch | Purpose |
|---|---|
| `main` | Production — only receives merges from `develop` after review |
| `develop` | Integration branch — all features merge here first |
| `feature/*` | New pages, charts, or UI components |
| `fix/*` | Bug fixes |
| `data/*` | Supabase queries, schema changes, dummy data updates |

## Workflow

```bash
# 1. Always branch off develop
git checkout develop
git pull origin develop
git checkout -b feature/your-feature-name

# 2. Make your changes, commit often
git add .
git commit -m "feat: add weekly case trend chart to Overview"

# 3. Push and open a PR into develop (not main)
git push origin feature/your-feature-name
```

Then open a Pull Request from your branch → `develop` on GitHub.

**Never push directly to `main` or `develop`.** All changes go through a PR.

## Commit message format

```
type: short description

Types:
  feat     — new feature
  fix      — bug fix
  data     — data layer / Supabase change
  style    — UI / CSS only
  refactor — code change with no behaviour change
  docs     — documentation only
  chore    — config, dependencies, tooling
```

Examples:
```
feat: add onchocerciasis regional breakdown chart
fix: prevent active cases going negative on real data
data: replace malaria trends dummy data with Supabase query
```

## Branch protection (set these in GitHub → Settings → Branches)

For `main`:
- Require PR before merging
- Require at least 1 approving review
- Require status checks to pass
- Block direct pushes

For `develop`:
- Require PR before merging
- Block direct pushes

## Running locally

```bash
pnpm install
pnpm dev       # http://localhost:5173
pnpm build     # must pass before any PR
```

## Environment variables

Copy `.env.example` to `.env` and fill in your Supabase credentials.
Never commit `.env` — it is in `.gitignore`.
