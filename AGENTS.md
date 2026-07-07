<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Driving School OS — Agent Contract

**Read this before writing any code. Every rule here is non-negotiable unless the head of tech says otherwise.**

## What this product is

An operating system for driving schools (Turkish market). All four pillars are built:

1. **Student registry** — multiple license classes, theory/practice progress, MEB paperwork ✅
2. **Instructor & vehicle scheduling** — weekly lesson calendar with DB-level overlap constraints ✅
3. **Payments & installments (taksit)** ✅
4. **Exam tracking + document generation** (MEB PDF via `@react-pdf/renderer`) ✅

Plus **role-based portals**: an admin dashboard, a teacher panel (`/egitmen`), and a student panel (`/ogrenci`) with self-service lesson booking.

The reference implementation is the Students slice at **`app/admin/(dashboard)/ogrenciler/`** (routes use Turkish folder names). When in doubt, copy its structure.

### Roles & auth
- Single login at **`/giris`** (`app/giris/`). After sign-in, `ROLE_HOME` (in `lib/roles.ts`) redirects by role.
- `profiles` table links `auth.users` → role (`admin`/`teacher`/`student`) + `instructor_id`/`student_id`.
- Route protection: `proxy.ts` (Next 16 middleware) enforces *authentication* only for `/admin`, `/egitmen`, `/ogrenci`; **role** is enforced in each area's layout via `requireRole()`. Do not add role queries to the proxy.
- RLS is role-aware (`is_admin()`, `current_student_id()`, `current_instructor_id()` helpers). Student booking/cancel go through SECURITY DEFINER RPCs (`book_lesson`, `cancel_lesson`, `list_open_slots`) — never raw table writes.
- Creating teacher/student login accounts uses the **service-role** client (`lib/supabase/admin.ts`, requires `SUPABASE_SERVICE_ROLE_KEY`) via `lib/accounts.ts`. This is the only place the service role is used; never import it into client code.

### HCI conventions
- Mutations that need inline feedback use `useActionState` returning `ActionResult` (`lib/action-result.ts`); on success they `redirect(withToast(path, msg))` and `QueryToast` shows the toast. Forms use `<SubmitButton>` (pending spinner) and `<FormFeedback>`.
- Confirmations use `<ConfirmDialog>` (never `window.confirm`). Toasts via `useToast()` / `<Toaster>` mounted in the root layout.
- Shared UI primitives live in `components/ui/`: `PageHeader`, `StatCard`/`StatGrid`, `Badge`, `EmptyState`, skeletons (for `loading.tsx`).

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

- Rate limiting: public national-ID lookup RPCs and `/giris` rely on Supabase's built-in auth limits. Enable CAPTCHA in the Supabase dashboard before production.
- `assigned_vehicle_id` on instructors is a single primary vehicle; multi-vehicle assignment would need a join table.
