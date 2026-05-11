# Repository Guidelines

## Project Structure & Module Organization
The active application lives in `frontend/`. Use `frontend/app/` for App Router routes, layouts, and global styles, `frontend/components/` for reusable React components, `frontend/components/ui/` for shadcn/ui primitives, and `frontend/lib/` for shared utilities such as `cn`. Static assets should go in `frontend/public/`. Root-level files such as `GEMINI.md` and this guide document repository conventions.

## Build, Test, and Development Commands
Run commands from `frontend/`.

- `npm install` installs dependencies from `package-lock.json`.
- `npm run dev` starts the Next.js 16 dev server with Turbopack.
- `npm run build` creates a production build.
- `npm run start` serves the production build locally.
- `npm run lint` runs ESLint with Next.js core web vitals and TypeScript rules.
- `npm run typecheck` runs `tsc --noEmit`.
- `npm run format` formats `*.ts` and `*.tsx` with Prettier.

## Coding Style & Naming Conventions
Write TypeScript with strict typing enabled and prefer functional React components. Follow the existing style: 2-space indentation, double quotes, and grouped imports with the `@/*` alias for local modules. Use `PascalCase` for components (`ThemeProvider.tsx`), `camelCase` for functions and variables, and lowercase route segment names in `app/`. Prefer Tailwind utilities for styling and extend `components/ui/` before adding one-off UI patterns.

## Testing Guidelines
There is no automated test suite configured yet. Until one is added, treat `npm run lint`, `npm run typecheck`, and a successful `npm run build` as the minimum verification set before opening a PR. When adding tests later, place them near the feature or under a dedicated `frontend/tests/` directory and use clear names such as `page.test.tsx`.

## Commit & Pull Request Guidelines
The repository has no commit history yet, so use concise imperative commit subjects, for example `Add hero section layout` or `Fix theme toggle hydration`. Keep commits focused on one change. PRs should include a short summary, testing notes, linked issue or task if applicable, and screenshots or recordings for visible UI changes.

## Configuration & Component Notes
Use `npx shadcn@latest add <component>` from `frontend/` when introducing new shadcn/ui building blocks. Do not commit `.next/` output. Keep secrets in local environment files such as `frontend/.env.local`, and document any new variables in the PR description.
