import express from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth';

const app = express();
const port = process.env.PORT || 3000;

app.all('/api/auth/{*any}', toNodeHandler(auth));

app.use(express.json());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
