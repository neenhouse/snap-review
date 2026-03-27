# SnapReview

Visual QA platform with screenshot comparison, diff annotation, team assignments, and approval workflows.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 19, TypeScript, Vite 8 |
| Styling | CSS custom properties |
| Deploy | Cloudflare Pages via GitHub Actions |
| Testing | Vitest + React Testing Library |
| Tooling | pnpm (package manager), mise (runtime versions) |

## Dev Commands

```bash
pnpm dev           # Start dev server
pnpm build         # TypeScript check + Vite production build
pnpm test          # Run Vitest
pnpm lint          # ESLint
```

## Conventions

- Use **pnpm** as package manager (never npm or yarn)
- Use **mise** for runtime versions (see `.mise.toml`)
- CSS custom properties for theming (defined in `src/index.css`)
- React.lazy + Suspense for route-level code splitting
- Tests live next to source files (`Component.test.tsx`)

## Documentation Hierarchy

```
CLAUDE.md                  (this file -- root authority)
  docs/vision.md           (north star vision and design principles)
  docs/prd.md              (product requirements)
  .claude/agents/          (agent definitions)
```

## Project Structure

```
src/
  pages/           Route-level components
  components/
    ui/            Reusable UI components
  hooks/           Custom React hooks
  lib/             Utilities
docs/
  vision.md        Vision document
  prd.md           Product requirements
public/
  assets/          Static assets
```

## Agent Team

| Agent | Role | Scope | Writes Code |
|-------|------|-------|-------------|
| `frontend-dev` | React, CSS, components, pages | `src/` | Yes |
| `qa` | Testing, accessibility, performance | Tests + read-only | Yes (tests) |

## Single Source of Truth

| Concern | Source File |
|---------|------------|
| Vision and design principles | `docs/vision.md` |
| Product requirements | `docs/prd.md` |
| Runtime versions | `.mise.toml` |
| CSS design tokens (live) | `src/index.css` |
