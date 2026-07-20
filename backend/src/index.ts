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

app.use(
  cors({
    origin(origin, callback) {
      // allow no-origin requests (curl, server-to-server, some mobile clients)
      if (!origin) return callback(null, true);

      if (env.CORS_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      console.warn('Blocked by CORS:', origin);
      return callback(new Error('Not allowed by CORS'));
    },
    methods: ['GET', 'POST', 'PATCH', 'PUT'],
    credentials: true,
  })
);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

// All v1 routes
app.use('/api/v1', V1Router);

// 404 handler - must be after all routes
app.use(notFoundHandler);

// Error handler - must be last
app.use(errorHandler);

async function startServer() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected');
  } catch (error) {
    console.error(`❌ Database connection failed:`, (error as Error).message);
    process.exit(1);
  }

  app.listen(port, () => {
    console.log(`✅ Server started on port ${port}`);
  });
}

startServer();
