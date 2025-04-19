import mongoose from "mongoose";

//Function to connect the MongoDB database
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('Database Connected'));
        mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));
        mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected'));

        const dbUri = `${process.env.MONGODB_URI}/job-portal`;
        console.log('Connecting to MongoDB at:', dbUri);
        
        await mongoose.connect(dbUri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

export default connectDB;