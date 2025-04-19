import mongoose from "mongoose";

//Function to connect the MongoDB database
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database Connected'));
        mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
        mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));

        await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectDB;