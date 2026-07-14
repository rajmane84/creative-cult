import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth';
import { prisma } from './util/prisma';
import { env } from './util/env';

const app = express();
const port = env.PORT;

app.use(
  cors({
    origin: env.CORS_ORIGINS,
    methods: ['GET', 'POST', 'PATCH', 'PUT'],
    credentials: true,
  })
);

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

// Custom route to update user role
app.post('/api/user/role', async (req, res) => {
  try {
    const session = await auth.api.getSession({
      headers: req.headers,
    });

    if (!session) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const { role } = req.body;

    if (!role || !['CLIENT', 'CREATIVE', 'ADMIN'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: { role },
    });

    return res.json({ data: updatedUser });
  } catch (error) {
    console.error('Error updating role:', error);
    return res.status(500).json({ error: 'Failed to update role' });
  }
});

app.get('/health', (req, res) => {
  return res.status(200).json({ message: 'API is healthy', status: 'OK' });
});

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
