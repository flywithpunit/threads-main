import mongoose from 'mongoose';

let isConnected = false; // Variable to track the connection status

export const connectToDB = async () => {
  // Set strict query mode for Mongoose to prevent unknown field queries.
  mongoose.set('strictQuery', true);

  // Check if the MongoDB URL is provided
  if (!process.env.MONGODB_URL) {
    console.log('Missing MongoDB URL');
    return;
  }

  // If the connection is already established, return without creating a new connection.
  if (isConnected) {
    console.log('MongoDB connection already established');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5 seconds
    });

    isConnected = true; // Set the connection status to true
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error); // Improved error logging
  }
};
