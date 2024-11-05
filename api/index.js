import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/userRoute.js';
import authrouter from './routes/authRoute.js'
import adminRouter from './routes/adminRoute.js'
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
  });

const app = express();

app.use(express.json())

app.use(cookieParser())

app.use(cors());

// Middleware and Routes
app.use('/api/user', userRouter);
app.use('/api/auth' , authrouter)
app.use('/api/admin' , adminRouter )

app.use ((err , req , res , next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal server error"
  return res.status(statusCode) .json({
    success: false ,
    message,
    statusCode
  })
})

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
