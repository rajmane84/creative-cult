<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Project-Specific AI Agent Rules

## Stack Overview

- **Next.js**: 16.2.10 (latest major version with breaking changes)
- **React**: 19.2.4 (latest major version with new features)
- **Tailwind CSS**: 4.x (major rewrite from v3)
- **Shadcn**: 4.13.0 (latest version)
- **TypeScript**: 5.x
- **ESLint**: 10.x (root-level configuration with project-specific overrides)

## Critical Breaking Changes

### Next.js 16

- **NO** `tailwind.config.ts` file - configuration is done via CSS `@theme` directive
- **NO** traditional `@tailwind` directives - use `@import "tailwindcss"` instead
- Turbopack is the default bundler (not webpack)
- New App Router conventions and APIs
- Read `node_modules/next/dist/docs/` for current APIs

### Tailwind CSS 4

- **NO** `tailwind.config.js/ts` - configuration moved to CSS via `@theme` directive
- Use `@import "tailwindcss"` instead of `@tailwind base; @tailwind components; @tailwind utilities;`
- CSS variables are now the primary configuration method
- `@theme inline` is used for inline theme configuration
- Font system uses CSS variables, not traditional font-family arrays
- New color system with `oklch()` color space
- DO NOT create a tailwind config file - it will break the build

### React 19

- New Server Components features and APIs
- New hooks and component patterns
- Different handling of forms and actions
- DO NOT use deprecated React 18 patterns

### Shadcn 4

- Latest component patterns and APIs
- Different installation and usage patterns from v2/v3
- Uses new Tailwind 4 theming system

### ESLint 10

- Root-level configuration in `../eslint.config.mjs`
- Flat config format (not .eslintrc.js)
- Project-specific overrides for frontend and backend
- NO project-specific eslint.config files - use root config

## Configuration Files to Check Before Making Changes

- `app/globals.css` - Tailwind 4 configuration via `@theme` directive
- `app/layout.tsx` - Next.js 16 font configuration and metadata
- `next.config.ts` - Next.js 16 configuration
- `package.json` - Latest dependency versions
- `../eslint.config.mjs` - Root ESLint configuration

## DO NOT DO

- ❌ Create `tailwind.config.ts` or `tailwind.config.js` - breaks Tailwind 4
- ❌ Use `@tailwind` directives - use `@import "tailwindcss"` instead
- ❌ Apply old Next.js 13/14 patterns without checking documentation
- ❌ Use deprecated React 18 patterns
- ❌ Modify font configuration without understanding Tailwind 4 CSS variable system
- ❌ Assume traditional Tailwind v3 configuration methods work
- ❌ Create project-specific ESLint config files - use root config

## DO DO

- ✅ Read Next.js 16 docs in `node_modules/next/dist/docs/` before changes
- ✅ Use CSS `@theme` directive for Tailwind configuration
- ✅ Use `@import "tailwindcss"` for Tailwind imports
- ✅ Check current component patterns in existing files
- ✅ Use CSS variables for theming (`--color-primary`, `--font-inter`, etc.)
- ✅ Test changes with `npm run dev` before committing
- ✅ Run `bun run lint` from root to check code quality
- ✅ Run `bun run lint:fix` from root to auto-fix ESLint issues

## Font Configuration

- Fonts are configured in `app/layout.tsx` using `next/font/google`
- Font variables are mapped in `app/globals.css` via `@theme` directive
- CSS variables like `--font-inter` are used, not traditional font-family strings
- Apply fonts via Tailwind classes like `font-inter`, not custom CSS

## Build Commands

- `npm run dev` - Start development server (uses Turbopack)
- `npm run build` - Production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint from root (includes frontend)
- `bun run lint` - Run ESLint from root (preferred)
- `bun run lint:fix` - Auto-fix ESLint issues

## Package Management

- **IMPORTANT**: Always use `bun install` for all dependencies (both frontend and backend)
- Both frontend and backend use Bun as package manager
- Root-level dev tools also use Bun
- Bun automatically loads .env files

## When in Doubt

1. Check existing files for current patterns
2. Read the relevant documentation in `node_modules/`
3. Ask the user if you're unsure about breaking changes
4. Test your changes before considering them complete
