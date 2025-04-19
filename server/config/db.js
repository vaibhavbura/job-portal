import mongoose from "mongoose";

//Function to connect the MongoDB database
const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('=== MongoDB Connection Status ===');
            console.log('Status: Connected');
            console.log('Database:', mongoose.connection.db.databaseName);
            console.log('Host:', mongoose.connection.host);
        });

        mongoose.connection.on('error', (err) => {
            console.error('=== MongoDB Connection Error ===');
            console.error('Error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.log('=== MongoDB Connection Status ===');
            console.log('Status: Disconnected');
        });

        const dbUri = `${process.env.MONGODB_URI}/job-portal`;
        console.log('=== Attempting MongoDB Connection ===');
        console.log('URI:', dbUri.replace(/\/\/.*@/, '//****:****@')); // Hide credentials in logs
        
        await mongoose.connect(dbUri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        
        console.log('=== MongoDB Connection Successful ===');
        console.log('Database:', mongoose.connection.db.databaseName);
        console.log('Collections:', await mongoose.connection.db.listCollections().toArray());
    } catch (error) {
        console.error('=== MongoDB Connection Failed ===');
        console.error('Error:', error);
        process.exit(1);
    }
}

export default connectDB;