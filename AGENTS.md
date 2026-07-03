<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Driving School OS — Agent Contract

**Read this before writing any code. Every rule here is non-negotiable unless the head of tech says otherwise.**

## What this product is

An operating system for driving schools (Turkish market). Four pillars:

1. **Student registry** — license class, theory/practice progress, MEB paperwork status ✅ *base exists*
2. **Instructor & vehicle scheduling** — which car, which instructor, which student, which hour ❌ *not built*
3. **Payments & installments (taksit)** — schools sell lessons in installments ❌ *not built*
4. **Exam tracking + document generation** — ministry-required enrollment forms, attendance sheets ❌ *not built*

Only the registry base exists. Your job is to build the rest — this repo shows *how*, not *what*. The Students slice (`app/(dashboard)/students/`) is the reference implementation; when in doubt, copy its structure.

## Stack (fixed — do not substitute)

- **Next.js 16.2+** — App Router, TypeScript, Server Components by default, Server Actions for mutations
- **Supabase** — database, auth, storage. SQL migrations live in `supabase/migrations/`
- **Vercel** — deployment target
- **Tailwind CSS 4** — no CSS-in-JS, no component libraries without approval

No ORMs (no Prisma/Drizzle), no other databases, no other hosting.

## Architecture rules

### 1. Colocation
Everything a feature needs lives inside its route folder:

```
app/(dashboard)/<feature>/
├── page.tsx                  route: list/overview
├── new/page.tsx              sub-routes as folders
├── actions.ts                server actions ("use server")
├── <entity>.model.ts         domain class
├── <entity>.repository.ts    data access class
├── <entity>-form.tsx         colocated components
├── <entity>-table.tsx
└── types.ts                  DB row types + enums for this feature
```

Code graduates to a shared location (`lib/`, `components/ui/`) **only after 2+ features need it**. Do not pre-emptively build shared abstractions.

### 2. File length — hard cap 150 lines
If a file approaches 150 lines, split it *before* committing. No exceptions for "just this once."

### 3. OOP-style domain layer
- **Domain logic lives in classes**, not loose functions scattered through components. `Student` has `isTheoryComplete()`, `licenseLabel()` — components call these, they never re-derive logic from raw rows.
- **Repository pattern**: all Supabase access goes through a repository class per entity (e.g. `StudentRepository`). **Never call `supabase.from()` inside a component, page, or action directly.** Actions instantiate a repository; repositories return domain model instances, not raw rows.
- Components stay thin: render + call domain/repository methods. If a component contains business logic, move it into the model class.

### 4. Data flow
```
page.tsx (Server Component) → Repository → Supabase
form component (Client) → Server Action → Repository → Supabase → revalidatePath
```
- Server Components fetch; Client Components (`"use client"`) only where interactivity requires it.
- Every schema change is a new numbered file in `supabase/migrations/` — never edit an existing migration.

## Conventions

- Types for DB rows and enums live in the feature's `types.ts`, mirroring the migration exactly.
- Enum values in the DB are `snake_case` strings; display labels come from model class methods.
- Turkish domain terms are kept where they are the real term (MEB, taksit); code identifiers stay English.
- Supabase clients come from `lib/supabase/` factories only — never instantiate `createClient` elsewhere.

## Known TODOs (deliberately left for the team)

- Auth: client factories are wired but there is no login flow; RLS policies are permissive placeholders (`authenticated` role). Whoever builds the first real feature should tighten this.
- Scheduling, payments, exams: greenfield — design them well. This is where your creativity is being evaluated.
