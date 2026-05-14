# GEMINI.md - RiFi Entertainment Frontend

This file provides architectural context and development guidelines for the RiFi Entertainment frontend project.

## Project Overview

RiFi Entertainment is a Kigali-based entertainment and event company. This repository contains the frontend application, built with **Next.js 16 (App Router)** and **TypeScript**.

### Core Technologies
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4 (Beta)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (using Radix UI primitives)
- **Icons:** Lucide React
- **Theming:** next-themes (Light/Dark mode support)
- **Localization:** Custom i18n implementation (supporting English, Kinyarwanda, and French)

## Architecture

- `app/`: Contains the main application routes, root layout, global styles, and **API routes**.
  - `app/api/trpc/[trpc]/route.ts`: tRPC API entry point.
  - `app/api/upload/route.ts`: Media upload handler.
- `components/`: Organized into:
    - `layout/`: Global layout components like `SiteHeader`, `SiteFooter`, and `SiteShell`.
    - `marketing/`: Feature-specific components for the landing page and services.
    - `ui/`: Reusable primitive components (buttons, cards, etc.) managed via shadcn/ui.
- `lib/`:
    - `server/`: **Backend logic**, including Prisma database client, tRPC routers, and server-side utilities.
    - `site.ts`: Centralized configuration for site metadata, navigation, and service descriptions.
    - `utils.ts`: Utility functions, including the `cn` helper for Tailwind class merging.
    - `i18n.ts`: Localization logic and translations.
    - `trpc.ts`: tRPC client configuration.
- `hooks/`: Custom React hooks.
- `public/`: Static assets such as logos and images.
- `prisma/`: Database schema and migrations.

## Backend Integration

The application is now a unified Next.js project. Backend logic resides in `lib/server` and is exposed via Next.js API routes.

### Database
- **ORM:** Prisma
- **Client:** `@/lib/server/db.ts`
- **Schema:** `prisma/schema.prisma`

### API (tRPC)
- **Router:** `@/lib/server/trpc/root.ts`
- **Context:** `@/lib/server/trpc/trpc.ts`
- **Client:** `@/lib/trpc.ts`

### Media Upload
- Handled via `app/api/upload/route.ts` which integrates with Supabase Storage.

## Development Workflows

### Setup and Running
```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Quality Assurance
```bash
# Linting
npm run lint

# Formatting
npm run format

# Type checking
npm run typecheck
```

### Adding UI Components
This project uses shadcn/ui. To add new components, use the following command:
```bash
npx shadcn@latest add [component-name]
```

## Conventions

- **Styling:** Prefer Tailwind CSS utility classes. Use the `cn` utility from `@/lib/utils` for conditional classes.
- **Components:** Favor functional components with TypeScript interfaces for props.
- **Path Aliases:** Use `@/*` to refer to the project root (e.g., `@/components/ui/button`).
- **Icons:** Always use icons from `lucide-react`.
- **Localization:** Use the i18n utilities in `lib/i18n.ts` for any user-facing text.
- **Site Metadata:** Update `lib/site.ts` for any global configuration changes (navigation, contact info, etc.).
