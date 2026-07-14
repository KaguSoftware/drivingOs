# Product

## Register

product

## Platform

web

## Users

The primary user is the **back-office operator of a Turkish driving school** — an owner-admin or secretary who spends hours a day, often under harsh office light, reconciling taksit payments, chasing MEB paperwork, and juggling instructor and vehicle schedules. They are not "computer people"; they are running a business and need the software to be fast, legible, and unsurprising.

Two secondary users share the same product on their own portals: **instructors**, who check their lessons and set weekly availability, and **students**, who self-book lessons and view their payments. A third, distinct actor is the **platform operator** (the SaaS owner) who runs many schools from a super-admin console — a different surface with its own chrome.

## Product Purpose

The operating system a Turkish driving school runs on: a single place for the student registry (multiple license classes, theory/practice progress, MEB paperwork), instructor and vehicle scheduling with guaranteed no-double-booking, payments and installments, and exam tracking with document generation. It is delivered as a multi-tenant B2B SaaS — every school gets an isolated, branded workspace at its own subdomain and pays a subscription. Success is a school that stops running on paper and WhatsApp and instead trusts one system with every student, lesson, lira, and exam.

## Positioning

The system a driving school actually operates on — not a CRM bolted onto a spreadsheet, but the day-to-day instrument where the whole business lives, with each school's data provably sealed off from every other.

## Brand Personality

Calm, precise, trustworthy. The voice of a well-made professional instrument: quiet confidence, no theatrics. It should feel like software you can stare at all day without fatigue and hand your finances to without worry. Turkish domain terms (MEB, taksit) are kept because they are the real words the user thinks in; everything else is plain and direct.

## Anti-references

The user explicitly rejected all four of the obvious category lanes, so each is a hard "never":
- **Government / notary form** — the beige, tan-bordered, warm-brown municipal-paperwork look the product has today. The single thing being escaped.
- **Generic startup SaaS** — interchangeable purple-gradient, rounded-everything, hero-metric-with-gradient-accent template. Could-be-any-app.
- **Cluttered enterprise dashboard** — grey walls of tiny controls, endless tabs, SAP / legacy-CRM overwhelm.
- **Playful consumer app** — bubbly, emoji-heavy, cartoonish, over-animated. Too casual to trust with money.

The design must earn a distinct, quiet identity of its own rather than falling into any of these training-data reflexes.

## Design Principles

- **The tool disappears into the task.** Earned familiarity over novelty; no invented affordances for standard jobs. If the user notices the interface instead of the work, it has failed.
- **Legibility is the feature.** This is money-and-schedule software used for long stretches — high contrast, real hierarchy, tabular figures, locale-correct numbers (`₺12.345,00`). Nothing decorative competes with the data.
- **Colour carries meaning, never decoration.** The accent marks the current, the actionable, and the exceptional (overdue, at-risk, today). If it isn't saying something, it's neutral.
- **Density with air.** Show enough signal per screen that the operator rarely hunts or paginates, without tipping into the enterprise-clutter wall. Hierarchy and spacing do the sorting.
- **Trust is structural.** Isolation between schools, correct money, and honest empty/error states are part of the brand, not afterthoughts.

## Accessibility & Inclusion

Target WCAG 2.1 AA: body text ≥4.5:1 (including muted and placeholder text — no light-grey-for-elegance), visible focus states, full keyboard operability of tables, menus, and forms. Honour `prefers-reduced-motion` on every animation (crossfade or instant fallback). Full light and dark themes, both contrast-checked. Turkish (`tr-TR`) is the primary locale; number, currency, and date formatting must be correct for it.
