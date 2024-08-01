// src/app.ts

import express from 'express';
import authRoutes from './routes/authRoutes'; // Ensure this path is correct

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Define routes
app.use('/api/auth', authRoutes);

export default app;
