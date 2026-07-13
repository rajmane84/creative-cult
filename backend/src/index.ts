import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');

import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth';
import { prisma, warmUpDatabase } from './util/prisma';

const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
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

// Start server with database warm-up
async function startServer() {
  console.log('🚀 Starting server...');

  const dbConnected = await warmUpDatabase();
  if (!dbConnected) {
    console.error(
      '⚠️  Starting server without database connection (will retry on requests)'
    );
  }

  app.listen(port, () => {
    console.log(`✅ Server started on port ${port}`);
  });
}

startServer();
