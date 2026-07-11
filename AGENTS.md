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
