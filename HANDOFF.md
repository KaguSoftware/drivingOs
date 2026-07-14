# Handoff — SaaS rebuild, Phase 1 (2026-07-14)

Pick-up notes so you can continue at work. Everything below is **pushed to `main`**.

**North-star plan** (the full rebuild strategy, all phases, decisions):
`C:\Users\MnS\.claude\plans\i-think-this-entire-encapsulated-patterson.md`
**Design DNA:** `PRODUCT.md` (repo root). **Tokens:** `app/globals.css`.

## Run it
```bash
npm run dev        # http://localhost:3000  (theme toggle is bottom of the admin sidebar)
npm test           # vitest (5/5 green)
npm run lint       # eslint (clean)
npm run build      # production build (passes)
```

---

## ✅ Done this session (all verified: build ✓ · typecheck ✓ · lint ✓ · tests 5/5 ✓)

**Fixed a blocker:** `recharts` was declared but missing from `node_modules` — broke the payments page and any prod build. Restored (`npm install`).

**Phase 1 — design system overhaul (the "kill the cream" work):**
- New **OKLCH token system** in `app/globals.css` — cool graphite neutrals + a restrained **signal-teal** accent, **full light + dark themes**. Every existing token *name* preserved, so no className churn. *(You were skeptical of the teal — it's a single variable, `--brand-accent` → `--primary`; trivially swappable. Revisit once it's across full dashboards.)*
- **Dark mode** wired: no-flash inline script (`app/layout.tsx`), cookie-persisted, CSS-driven `ThemeToggle` (`components/ui/theme-toggle.tsx`). IBM Plex Mono added for numerics; `tabular-nums` globally.
- **Persistent labeled sidebar** (replaced the hover-to-reveal-labels pattern), real `BrandMark` (steering-wheel glyph, replaced the "DO" placeholder), removed the banned side-stripe active indicator.
- **Money fixed everywhere**: `₺12345.00` → `₺12.345,00` via `lib/format.ts` (`formatCurrency`/`formatCurrencyCompact`/`formatNumber`) across 11 files.
- **StatCard redesigned**: icon chip, trend/delta with *meaning*-based color (rising expense = red, rising income = green), optional hand-rolled `Sparkline`. Finance page (`odemeler`) now shows real month-over-month deltas + sparklines.
- Removed hardcoded cream/`bg-white` from `row-actions-menu` (now dark-mode-safe).

**Phase 0 — test safety net:** Vitest installed + `vitest.config.ts` + `lib/format.test.ts` (5 tests) + `test`/`test:watch` scripts.

**Phase 2 — started:** built the reusable **`components/ui/data-table/`** primitive (search + sortable headers + pagination + mobile-card fallback) and **migrated the students list** to it (`ogrenciler/`). Key pattern: the table is a client component, so the page maps `Student` class instances → plain `StudentRowView` (`student-view.ts`) because methods don't cross the RSC boundary. **Copy this pattern for the other lists.**

**Security + audit fixes applied** (from the agent fleet, below): the `row-actions-menu` scroll-positioning bug, the light-mode semantic-color contrast failure, and `text-emerald-600`/`text-amber-600` → tokens.

---

## 🔒 RUN THIS FIRST — security hotfix (one query)

Live hole: `expenses` + `payment_transactions` had **anonymous full read/write**. Fix is committed as **`supabase/migrations/0027_financial_rls_hotfix.sql`** (runs with your migrations). Confirmed safe — only the admin payments feature touches these tables. If you'd rather paste it directly into the Supabase SQL editor, it's that file's contents verbatim.

> Note: this bumped the migration numbering — **the Phase-3 multi-tenancy migrations now start at `0028`** (the plan says 0027; treat as 0028+).

---

## 🔧 Next up — audit backlog (fleet #1, all adversarially verified)

Already fixed: row-actions scroll bug, contrast tokens, emerald/amber. **Remaining (all P2 polish):**

1. `components/ui/stat-card.tsx:69` — big value can overflow next to the sparkline on the 4-up grid with 7-figure ₺. Add `min-w-0` to the value column + `truncate` (or use `formatCurrencyCompact`).
2. `app/globals.css` `--faint` — 3.6:1, below AA for the StatCard hint/delta-label caption text. Darken light `--faint` toward `oklch(0.52 0.016 255)`, lighten dark toward `oklch(0.62 …)`, or stop using it for real text.
3. `odemeler/income-expense-chart.tsx:31,39` — the Önceki/Sonraki buttons use `hover:bg-surface` but sit **on** `bg-surface` → invisible hover. Use `hover:bg-surface-strong`.
4. `components/ui/button.tsx:11` — the `danger` variant is styled as a text link, not a button (inconsistent affordance). Give it button chrome (e.g. soft-danger bordered).
5. `odemeler/damage-cost-table.tsx:26` (+ `maintenance-dates-table.tsx:28`, `araclar/[id]/damage-record-table.tsx:30`) — `cost ? … : "-"` hides a **real ₺0** (0 is falsy). Use `cost != null ? … : "-"`.
6. `odemeler/finance-stats.tsx:7` — `pct()`'s `if (!prev)` renders a real loss-from-a-zero-month as a neutral "→ —". Make direction sign-aware for nonzero `curr`.
7. `ogrenciler/[id]/student-lessons-card.tsx:29,42` — uppercase-tracked eyebrow (banned + Turkish-locale-fragile). Use normal-case labels.
8. StatCard enrichment (icon/intent/delta/sparkline) is used **only** on the finance page — every other `StatGrid` is flat. Either enrich the main dashboard (`app/admin/(dashboard)/page.tsx:60`) too, or document that finance is deliberately the only rich grid.

**Fleet #2 (whole-app: functional bugs, security, UX/features, a11y) was still running at handoff.** Its results land in:
`C:\Users\MnS\AppData\Local\Temp\claude\c--Users-MnS-Kagu-drivingOs\84f6d352-3d3b-4f79-933a-66c27b8ddd42\tasks\wj6b9152f.output`
(and per-agent detail under `…/subagents/workflows/wf_f0274fd4-6ab/journal.jsonl`). It already **confirmed the P0** above and was surfacing UX/feature gaps. Skim it before starting new work.

---

## ✨ Feature backlog (from the plan + audit)

- **Theme toggle everywhere** — currently only in the desktop admin sidebar. Add to `mobile-nav.tsx`, the login pages (`/giris`, `/admin/giris`, `app/(public)`), and the `/egitmen` + `/ogrenci` portal layouts.
- **Finish the DataTable rollout** — migrate the remaining hand-rolled tables (vehicles `araclar`, instructors `egitmenler`, payments tables, exams `sinavlar`) using the students pattern; then retire `components/ui/table-classes.ts`.
- **Accent color** — revisit the teal across full dashboards; offer alternatives (deeper petrol / slate-blue / amber). One-line change in `globals.css`.

## 🧭 Roadmap (big phases ahead — see the plan file)

- **Phase 2** — finish DataTable across all lists.
- **Phase 3 — multi-tenancy foundation** (the real SaaS turn): `org_id` on every table + `current_org_id()` RLS + subdomain proxy + role rewrite + per-tenant branding + self-serve signup. Migrations **0028+**. This is a security boundary — do it with review, and lean on the pgTAP isolation tests described in the plan. **Do not** set the Supabase auth cookie `domain` to `.app.com` (would break tenant isolation).
- **Phase 4** — iyzico subscription billing (flat tiers) + entitlements + platform super-admin console.

## 📁 Orientation
- Reference feature slice (the pattern to copy): `app/admin/(dashboard)/ogrenciler/`
- New shared UI: `components/ui/{data-table/,stat-card,sparkline,brand-mark,theme-toggle}.tsx`
- Memory (cross-session context): `C:\Users\MnS\.claude\projects\c--Users-MnS-Kagu-drivingOs\memory\`
- Agent-contract rules still apply: repository pattern, 150-line cap, colocation, new numbered migrations.
