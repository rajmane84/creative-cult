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
