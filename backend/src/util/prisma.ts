import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { env } from './env';

const pool = new Pool({
  connectionString: env.DATABASE_URL,
  max: 5, // Reduced pool size to avoid overwhelming Neon
  idleTimeoutMillis: 30000, // Increased idle timeout to keep connections alive longer
  connectionTimeoutMillis: 60000, // Increased timeout to 60 seconds for database wake-up
  ssl: {
    rejectUnauthorized: false, // Allow SSL without strict verification
  },
});
const adapter = new PrismaPg(pool);

pool.on('error', (err) => {
  console.error('Unexpected pg pool error', err); // prevents an unhandled crash on a dropped idle client
});

export const prisma = new PrismaClient({
  adapter,
  log: ['error', 'warn'],
});
