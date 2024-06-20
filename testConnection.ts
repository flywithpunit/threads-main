import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
  console.error('Missing MongoDB URL');
  process.exit(1);
}

mongoose.set('strictQuery', true);

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log('MongoDB connected');
    mongoose.connection.close();
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
};

connectToDB();