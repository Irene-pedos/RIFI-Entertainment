# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 16 frontend using the App Router. Keep route files in `app/`, shared UI in `components/`, reusable hooks in `hooks/`, and utility helpers in `lib/`. Static assets belong in `public/`. Generated output such as `.next/` should not be edited or committed.

Examples:
- `app/layout.tsx` defines the root shell.
- `app/page.tsx` is the current home route.
- `components/ui/` contains shadcn-based primitives such as `button.tsx`.

## Product Scope & Content
Build for RiFi Entertainment, an event and entertainment company in Kigali, Rwanda. The site should cover these public pages: `Home`, `About Us`, `RiFi Models Management`, `RiFi Wedding Organization`, `RiFi Protocol & Services`, `RiFi Dance`, `RiFi Tours & Travel`, `Gallery`, `Testimonials`, and `Contact Us`.

Key requirements to preserve in implementation:
- Home tagline: `Creating unforgettable experiences with style and professionalism.`
- Booking and inquiry flows for services, weddings, tours, dance, and model applications
- Contact details: `0788878824`, `rifientertainment7@gmail.com`, `Kigali, Rwanda`
- WhatsApp, social links, newsletter, and English/Kinyarwanda support

## Build, Test, and Development Commands
Use npm scripts from the repository root:

- `npm run dev` starts the local Next.js dev server with Turbopack.
- `npm run build` creates a production build.
- `npm run start` serves the production build locally.
- `npm run lint` runs ESLint across the project.
- `npm run typecheck` runs TypeScript without emitting files.
- `npm run format` formats `*.ts` and `*.tsx` files with Prettier.

Run `npm run lint && npm run typecheck` before opening a PR.

## Coding Style & Naming Conventions
TypeScript is the default. Follow the existing Prettier config: 2-space indentation, no semicolons, double quotes, trailing commas where valid, and LF line endings. Tailwind class ordering is handled by `prettier-plugin-tailwindcss`.

Naming patterns:
- Components: `PascalCase`
- Hooks: `camelCase` prefixed with `use`
- Utility files: short, lowercase names such as `lib/utils.ts`

Use the `@/` path alias for imports when possible.

Favor clear section-based page composition and reusable service cards, galleries, forms, and CTA blocks. Keep copy professional and business-facing, not placeholder text.

## Testing Guidelines
There is no test framework configured yet. Until one is added, treat `npm run lint` and `npm run typecheck` as the required validation baseline. If you add tests, place them near the code they cover or in a dedicated `__tests__/` directory, and name them `*.test.ts` or `*.test.tsx`.

## Commit & Pull Request Guidelines
The current history uses Conventional Commit style (`feat: initial commit`). Continue with prefixes like `feat:`, `fix:`, `refactor:`, and `docs:` in the imperative mood.

PRs should include:
- A short description of the change and its purpose
- Linked issue or task when applicable
- Screenshots or recordings for UI changes
- Notes on validation performed (`npm run lint`, `npm run typecheck`, manual checks)

## UX, SEO, and Integration Requirements
All work should support mobile responsiveness, fast loading, modern professional UI, secure form handling, and SEO-friendly markup. Prefer accessible headings, descriptive metadata, optimized media, and server-safe form handling patterns.

Planned integrations include Google Maps, WhatsApp chat, online booking, gallery media management, and an admin dashboard for content, bookings, inquiries, and model application approval.

## UI & Component Workflow
This project uses shadcn/ui patterns. Add new primitives with `npx shadcn@latest add <component>` and keep generated UI building blocks under `components/ui/`.
