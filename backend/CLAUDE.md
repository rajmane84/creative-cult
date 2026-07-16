Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Use `bunx <package> <command>` instead of `npx <package> <command>`
- Bun automatically loads .env, so don't use dotenv.

## APIs

**NOTE**: This backend uses Express.js with Bun runtime, not Bun.serve().

- Use `express` for HTTP server and routing (already configured)
- Use `cors` for CORS middleware (already configured)
- Use `better-auth` for authentication (already configured)
- Use `prisma` with PostgreSQL for database (already configured)
- Prefer standard Node.js APIs for file operations when needed
- Use existing middleware patterns (asyncHandler, errorHandler, notFoundHandler)

## Testing

Use `bun test` to run tests.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

## Project Structure

This backend is part of a monorepo with:

- `frontend/` - Next.js 16 application
- `backend/` - Bun application with Express.js (this directory)
- Root-level shared tooling: Husky, Prettier, ESLint

### Current Backend Stack

- **Runtime**: Bun (instead of Node.js)
- **Server**: Express.js (HTTP server and routing)
- **Authentication**: better-auth (configured with `/api/auth/*` routes)
- **Database**: PostgreSQL with Prisma ORM
- **CORS**: Configured with allowed origins from environment
- **Middleware**: asyncHandler, errorHandler, notFoundHandler

### Directory Structure

- `src/` - Main source code
  - `auth/` - Authentication configuration
  - `controllers/` - Route controllers
  - `middlewares/` - Express middleware
  - `routes/` - API route definitions
  - `util/` - Utility functions (ApiResponse, errors, env, prisma)

### Server Setup

The server is configured in `src/index.ts`:

```typescript
import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth';
import { prisma } from './util/prisma';
import { env } from './util/env';
import V1Router from './routes/v1/index';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const port = env.PORT;

// CORS configuration
app.use(
  cors({
    origin: env.CORS_ORIGINS,
    methods: ['GET', 'POST', 'PATCH', 'PUT'],
    credentials: true,
  })
);

// Better-auth routes
app.all('/api/auth/{*any}', toNodeHandler(auth));

// Body parsing middleware
app.use(express.json());

// API routes
app.use('/api/v1', V1Router);

// 404 handler (must be after all routes)
app.use(notFoundHandler);

// Error handler (must be last)
app.use(errorHandler);

// Start server with database connection
async function startServer() {
  await prisma.$connect();
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
```

## Package Management

- **IMPORTANT**: Always use `bun install` for all dependencies (both frontend and backend)
- Bun automatically loads .env files, no need for dotenv
- Use `bun run <script>` instead of `npm run <script>`

## Environment Configuration

- Environment variables are managed through `src/util/env.ts`
- Bun automatically loads `.env` files from the project root
- The env utility provides type-safe environment variable access
- Required environment variables will cause the app to fail fast if missing

## Database (Prisma)

- **ORM**: Prisma with PostgreSQL
- **Schema location**: `prisma/schema.prisma`
- **Client location**: `src/util/prisma.ts`
- **Migration commands**:
  - `bun run prisma:migrate` - Create and apply migrations in development
  - `bun run prisma:generate` - Generate Prisma client after schema changes
  - `bun run prisma:studio` - Open Prisma Studio for database inspection
  - `bun run prisma:reset` - Reset database (use with caution)

### Database Connection

The database client is initialized in `src/util/prisma.ts` and automatically connects on server startup. The connection is established in `src/index.ts` before the server starts listening.

## Development Scripts

- `bun run dev` - Start development server with hot reload (uses `bun --watch src/index.ts`)
- `bun run start` - Start production server
- `bun run typecheck` - Run TypeScript type checking (used in pre-commit hooks)
- `bun run prisma:generate` - Generate Prisma client
- `bun run prisma:migrate` - Run Prisma migrations in development
- `bun run prisma:studio` - Open Prisma Studio for database inspection
- `bun run prisma:reset` - Reset database (force reset)

## Pre-commit Hooks

Shared pre-commit hooks at the root level (`.husky/`):

- **Prettier**: Auto-format all staged files (both frontend and backend)
- **ESLint**: Auto-fix linting issues in staged files
- **Backend typecheck**: Run `tsc --noEmit` on backend TypeScript files when backend files change
- **Frontend build**: Run frontend build when frontend files change
- Error logs are written to:
  - `.husky/logs/backend-typecheck.log` for backend type errors
  - `.husky/logs/frontend-build.log` for frontend build errors

Note: These hooks ensure code quality and catch type errors before commits are finalized.

## TypeScript Configuration

- Strict mode enabled with additional type safety flags
- ESNext target with bundler module resolution
- JSX support for React (react-jsx)
- No emit (type checking only)
- Include patterns: `src/**/*`
- Additional safety: `noUncheckedIndexedAccess`, `noImplicitOverride`, `noFallthroughCasesInSwitch`

## Backend API Response Patterns

**CRITICAL**: Always use the `ApiResponse` utility for consistent API responses. Never use direct `res.status().json()` calls.

### Response Utility Location

- **ApiResponse class**: `backend/src/util/response/ApiResponse.ts`

### Available Response Methods

#### Success Response

```typescript
import { ApiResponse } from '../util/response/ApiResponse';

// Basic success response (200)
return ApiResponse.success(res, data, 'Optional success message');

// Success response with custom status code
return ApiResponse.success(res, data, 'Message', 201);
```

#### Created Response (201)

```typescript
return ApiResponse.created(res, data, 'Resource created successfully');
```

#### No Content Response (204)

```typescript
return ApiResponse.noContent(res);
```

#### Paginated Response

```typescript
const pagination = ApiResponse.calculatePagination(page, limit, total);
return ApiResponse.paginated(res, data, pagination, 'Optional message');
```

#### Error Response

```typescript
return ApiResponse.error(res, 'Error message', 400, {
  context: 'optional context',
});
```

### Response Structure

#### Success Response

```typescript
{
  success: true,
  data: T,
  message?: string,
  meta: {
    timestamp: string,
    path: string,
    method: string,
    statusCode: number
  },
  pagination?: {
    page: number,
    limit: number,
    total: number,
    totalPages: number,
    hasNext: boolean,
    hasPrev: boolean
  }
}
```

#### Error Response

```typescript
{
  success: false,
  error: string,
  statusCode?: number,
  context?: Record<string, unknown>,
  stack?: string // Only in development
}
```

### Error Handling Patterns

#### Use AppError for Custom Errors

```typescript
import { AppError } from '../util/errors/AppError';

// Throw custom errors in controllers
throw new AppError('Not found', 404, { resourceId: id });
```

#### Use asyncHandler for Route Wrapping

```typescript
import { asyncHandler } from '../middlewares/asyncHandler';
import { ApiResponse } from '../util/response/ApiResponse';

router.get(
  '/users/:id',
  asyncHandler(async (req, res) => {
    // Async logic here
    return ApiResponse.success(res, user);
  })
);
```

### Key Principles

1. **Always use ApiResponse methods** - Never use `res.status().json()` directly
2. **Consistent structure** - All responses follow the same format
3. **Automatic metadata** - Responses include timestamp, path, method, and status code
4. **Error context** - Include relevant context in error responses for debugging
5. **Development stack traces** - Stack traces are only included in development mode
