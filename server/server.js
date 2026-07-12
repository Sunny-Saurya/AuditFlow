import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { clerkMiddleware } from '@clerk/express';
import healthRoutes from './routes/health.routes.js';
import researchRoutes from './routes/research.routes.js';
import authRoutes from './routes/auth.routes.js';
import { initPostgres } from './db/postgres.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';


app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());


app.use((req, res, next) => {
  clerkMiddleware()(req, res, (err) => {
    if (err) {
      console.warn("Clerk verification/handshake warning:", err.message);
      return next();
    }
    next();
  });
});


app.use('/api/health', healthRoutes);
app.use('/api/research', researchRoutes);
app.use('/api/auth', authRoutes);


initPostgres().then((connected) => {
  if (connected) {
    console.log('PostgreSQL (Neon DB) is active and tables are verified.');
  } else {
    console.warn('PostgreSQL initialization skipped or offline.');
  }
});


if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 3000 })
    .then(() => {
      console.log('Connected to MongoDB successfully.');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err.message);
      console.warn('Backend will continue running in PostgreSQL / in-memory mode.');
    });
} else {
  console.warn('WARNING: MONGODB_URI environment variable is missing. MongoDB connection skipped.');
}



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: err.message || 'Something went wrong on the server'
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


