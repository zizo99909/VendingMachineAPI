// app.js
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/UserRoutes.js';
import productRoutes from './routes/ProductRoutes.js';
import buyerRoutes from './routes/BuyerRoutes.js';

dotenv.config();

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);     // Register, login, user CRUD
app.use('/api/products', productRoutes); // Product CRUD
app.use('/api', buyerRoutes);           // /deposit, /buy, /reset

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Vending machine API is running' });
});

// error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Something went wrong' });
});

export default app;
