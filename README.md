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
2. Create a Supabase project, then run the migration in `supabase/migrations/0001_init.sql` (via the SQL editor or `supabase db push` with the CLI).
3. Copy `.env.example` to `.env.local` and fill in your project URL and anon key (Supabase dashboard → Settings → API).
4. Run the dev server:
   ```bash
   npm run dev
   ```
   Open http://localhost:3000 — it redirects to `/students`.

## Deployment

Connect the repo to Vercel and set the two `NEXT_PUBLIC_SUPABASE_*` env vars in the project settings. Nothing else is required.

## Project structure

```
app/(dashboard)/students/   reference feature slice — copy this structure
lib/supabase/               server + browser client factories
supabase/migrations/        SQL migrations (append-only)
AGENTS.md                   the agent contract — read first
```

