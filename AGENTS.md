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
