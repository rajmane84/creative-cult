# Project-Specific AI Agent Rules

## Package Management

**CRITICAL**: This project uses Bun for all package management:

- **Root-level dev tools**: Use `bun install`
- **Frontend (Next.js)**: Use `bun install`
- **Backend (Bun)**: Use `bun install`

**NEVER use npm or yarn** - always use Bun.

## Project Structure

- `frontend/` - Next.js 16 application (uses Bun)
- `backend/` - Bun application (uses Bun)
- Root-level shared tooling: Husky, Prettier, ESLint (uses Bun)

## Monorepo Guidelines

- Root-level configs are shared (ESLint, Prettier, Husky)
- Project-specific configs should be in respective directories
- Always check existing patterns before adding new dependencies
- Use Bun for all package management operations

## Shadcn Configuration

- **cn utility location**: `@/lib/cn` (frontend/lib/cn.ts)
- When installing shadcn components, the cn utility is expected to be at `@/lib/utils` by default
- Update the import path in installed components from `@/lib/utils` to `@/lib/cn`
- Install components using: `bunx --bun shadcn@latest add <component_name>`

## SVG Usage Guidelines

- **NEVER create custom SVG components** - Always use icons from the `lucide-react` library
- Import icons from `lucide-react` for all UI iconography needs
- If a desired SVG is not available in `lucide-react`, inform the user and ask for guidance
- This ensures consistent iconography and reduces maintenance overhead

## Code Organization Standards

Follow proper code organization patterns - do not shove everything into a single file:

### Frontend Structure

- **Hooks**: Place custom React hooks in `frontend/hooks/` with appropriate subdirectories (e.g., `hooks/auth/`, `hooks/api/`)
- **Services**: Place API service functions in `frontend/services/`
- **Zod Schemas**: Place validation schemas in `frontend/schemas/` or `frontend/lib/schemas/`
- **Types**: Place TypeScript types and interfaces in `frontend/types/`
- **Components**: Place UI components in `frontend/components/` with appropriate subdirectories

### Backend Structure

- **Controllers**: Place route controllers in `backend/src/controllers/`
- **Services**: Place business logic in `backend/src/services/`
- **Zod Schemas**: Place validation schemas in `backend/src/schemas/` or `backend/src/lib/schemas/`
- **Types**: Place shared TypeScript types in `backend/src/types/`
- **Middlewares**: Place Express middleware in `backend/src/middlewares/`
- **Routes**: Place route definitions in `backend/src/routes/`

### File Organization Principles

1. **Separation of concerns**: Each file should have a single, well-defined responsibility
2. **Modular architecture**: Break down complex logic into smaller, reusable modules
3. **Consistent naming**: Use clear, descriptive file and directory names
4. **Proper imports**: Import from appropriate locations based on the above structure
5. **Avoid monolithic files**: If a file becomes too large (>300 lines), consider splitting it

### Data Fetching & State Management Flow (TanStack Query)

When building new features, always adhere to the following strictly separated flow:

1. **Types (`frontend/types/`)**: Define TS interfaces and enums (e.g. `JoinAs`) to ensure the frontend shares the exact same data structures and constraints as the backend (Prisma schemas).
2. **Services (`frontend/services/`)**: Pure async functions utilizing the configured `axiosInstance`. They handle the raw HTTP requests and extract the exact payload (`response.data.data`), remaining completely independent of React state.
3. **Hooks (`frontend/hooks/`)**: Wrap service calls in TanStack Query (`useQuery` / `useMutation`). This layer manages all `isLoading`/`isPending` states, UI cache invalidation/optimistic updates (`queryClient.setQueryData`), and unified error handling. **ALWAYS** use the `handleApiError` utility from `@/lib/handle-error` inside `onError` callbacks to properly parse Zod validation errors and automatically display them via Sonner toasts.
4. **Components (`frontend/components/`)**: Only interact with the custom hooks to retrieve state and dispatch mutations. No direct `axios` calls or raw `useEffect` fetches should live in the UI layer.

## Validation & Zod (v4) Rules

- **API Request Validation**: In the backend, any endpoint controller that receives data via `req.body`, `req.query`, or `req.params` MUST have a dedicated Zod validation schema defined. Incoming data must be validated against this schema (e.g., using `.safeParse()`) before any business logic is executed.
- **Zod v4 Compliance**: Both frontend and backend must strictly adhere to **Zod v4** syntax and best practices:
  - Avoid deprecated methods like `z.nativeEnum`.
  - For native Prisma enums or standard enums, use `z.enum(EnumObject, { error: (issue) => ... })`.
  - Use inline error strings where supported (e.g., `z.string('Custom error message')`).
  - Implement comprehensive error handling and utilize the `ValidationError` class when returning schema validation errors to the client.
  - **Always reference the official Zod v4 documentation** if you are uncertain about schema methods, validation types, or specific error formatting to avoid hallucinating deprecated APIs.

## Styling & Design Rules

- **No Dark Mode**: Do NOT use or support dark mode (`dark:` variants, dark mode toggles, or dark theme overrides). All components and styles must strictly target the standard light design system.
- **Text Selection Highlight**: The global selection color is set to primary (orange). Therefore, whenever you apply `text-primary` to any text or icon, you MUST also add the classes `selection:text-background selection:bg-primary` so that if the user selects that text, the highlight color inverses correctly instead of disappearing (orange on orange).

## Code Quality & Cleanup

- **Remove Unused Code**: If you find any unused variables, imports, components, or functions while working in a file, proactively remove them to keep the codebase clean. Never leave dead code behind.
