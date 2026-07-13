import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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

// Database warm-up function with retry logic
export async function warmUpDatabase() {
  const maxRetries = 5;
  const initialDelay = 2000;

  for (let i = 0; i < maxRetries; i++) {
    try {
      console.log(
        `Attempting database connection (attempt ${i + 1}/${maxRetries})...`
      );
      await prisma.$connect();
      console.log('✅ Database connection successful');
      return true;
    } catch (error) {
      console.error(
        `❌ Database connection attempt ${i + 1} failed:`,
        (error as Error).message
      );
      if (i < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, i);
        console.log(`⏳ Retrying in ${delay}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  console.error('💥 Failed to connect to database after all retries');
  return false;
}
