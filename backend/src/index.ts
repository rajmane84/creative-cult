import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth';

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

app.get('/health', (req, res) => {
  return res.status(200).json({ message: 'API is healthy', status: 'OK' });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
