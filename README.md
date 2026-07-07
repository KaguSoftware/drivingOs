# Driving School OS

Management platform for driving schools: student registry, instructor & vehicle scheduling, installment payments (taksit), and MEB exam/document tracking.

This repo is the **minimal base**. Only the student registry slice exists — it's the reference implementation for everything else. **Read [AGENTS.md](AGENTS.md) before writing any code.** All architectural conventions (colocation, file-length cap, OOP domain layer, repository pattern) are defined there and are mandatory.

## Stack

- [Next.js 16.2+](https://nextjs.org) — App Router, TypeScript, Tailwind 4
- [Supabase](https://supabase.com) — Postgres, auth, storage
- [Vercel](https://vercel.com) — deployment

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a Supabase project and run the migrations in `supabase/migrations/` in order via the SQL editor (or `supabase db push`). **To bring an existing 0001–0013 database up to date in one step, paste `supabase/combined_setup.sql` into the SQL editor and run it once** — read its preflight note about overlapping lessons first.
3. Copy `.env.example` to `.env.local` and fill in:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` (dashboard → Settings → API)
   - `SUPABASE_SERVICE_ROLE_KEY` — **required** for admins to create teacher/student login accounts (same page, "service_role" secret). Server-only; never expose it to the client.
4. Run the dev server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 — sign in at `/giris`; you land on the admin dashboard, teacher panel, or student panel by role.

## Deployment

Connect the repo to Vercel and set `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in the project settings.

**Before production:** enable CAPTCHA / auth rate limiting in the Supabase dashboard — the public national-ID lookup and login rely on it.

## Project structure

```
app/(dashboard)/students/   reference feature slice — copy this structure
lib/supabase/               server + browser client factories
supabase/migrations/        SQL migrations (append-only)
AGENTS.md                   the agent contract — read first
```

