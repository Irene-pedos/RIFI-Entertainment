# Project Overview: RIFI-Entertainment

This is a modern web application built with a focus on performance and developer experience, specifically using the latest Next.js and React ecosystems.

## Technologies

- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (built on [Radix UI](https://www.radix-ui.com/))
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes) with dark mode support.

## Project Structure

The application is unified within the `frontend` directory (handling both client and server logic):

- `frontend/app/`: Application routes, layouts, global styles, and API handlers.
- `frontend/lib/server/`: Backend logic (Prisma, tRPC routers, server-side libs).
- `frontend/prisma/`: Database schema and migrations.
- `frontend/components/`: Reusable React components.
  - `ui/`: Standard UI components added via shadcn/ui.
- `frontend/hooks/`: Custom React hooks.
- `frontend/lib/`: Shared utilities and tRPC client.
- `frontend/public/`: Static assets.

## Building and Running

Commands should be executed within the `frontend` directory:

### Development
```bash
npm run dev
```
Starts the development server with Turbopack.

### Production
```bash
npm run build
npm run start
```
Builds the application for production and starts the production server.

### Maintenance
- **Linting:** `npm run lint`
- **Formatting:** `npm run format` (uses Prettier)
- **Type Checking:** `npm run typecheck` (runs `tsc`)

### Adding UI Components
To add new components from shadcn/ui:
```bash
npx shadcn@latest add [component-name]
```

## Development Conventions

- **Styling:** Use Tailwind CSS utility classes. For conditional class merging, use the `cn` utility: `import { cn } from "@/lib/utils"`.
- **UI Components:** Prefer using or extending components in `components/ui`.
- **Theme:** The application supports light and dark modes. A global hotkey `d` is implemented to toggle between themes.
- **Typography:**
  - Headings: Inter
  - Body: Noto Sans
  - Monospace: Geist Mono
- **Imports:** Use the `@` alias for the `frontend` root (e.g., `@/components/...`).
