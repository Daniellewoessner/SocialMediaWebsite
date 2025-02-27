import express from 'express';
import userRouter from './routes/api/userRoutes.js';
import thoughtRouter from './routes/api/thoughtRoutes.js';
import db from './config/connection.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/thoughts', thoughtRouter);

// Connect to database before starting the server
try {
  await db();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch (err) {
  console.error('Failed to connect to database', err);
}