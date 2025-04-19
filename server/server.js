import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import {clerkWebhooks} from './controllers/webhooks.js'
import User from './models/User.js'

//Initialize Express
const app = express()

// Error handling for uncaught exceptions
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled Rejection:', error);
});

//Connect to database
connectDB().catch(err => {
    console.error('Failed to connect to database:', err);
    process.exit(1);
});

//Middleware
app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

// Set timeout for all routes
app.use((req, res, next) => {
    res.setTimeout(8000, () => {
        res.status(504).json({ success: false, message: "Request timeout" });
    });
    next();
});

// Request logging middleware
app.use((req, res, next) => {
    console.log('=== Incoming Request ===');
    console.log('Method:', req.method);
    console.log('Path:', req.path);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    if (req.body) {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    next();
});

//Routes
app.get('/', (req, res) => res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

// Webhook route with detailed logging
app.post('/api/webhooks', async (req, res, next) => {
    try {
        console.log('=== Webhook Request Received ===');
        console.log('Method:', req.method);
        console.log('Path:', req.path);
        console.log('Headers:', JSON.stringify(req.headers, null, 2));
        console.log('Body:', JSON.stringify(req.body, null, 2));
        console.log('Webhook Secret Present:', !!process.env.CLERK_WEBHOOK_SECRET);
        next();
    } catch (error) {
        console.error('Error in webhook middleware:', error);
        next(error);
    }
}, clerkWebhooks);

// Route to check all users in database
app.get('/api/check-users', async (req, res) => {
    try {
        console.log('=== Checking All Users ===');
        const users = await User.find({});
        console.log('Found users:', users);
        res.json({
            success: true,
            count: users.length,
            users: users
        });
    } catch (error) {
        console.error('Error checking users:', error);
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Test endpoint to verify MongoDB connection and user creation
app.post('/api/test-user', async (req, res) => {
    try {
        console.log('=== Testing User Creation ===');
        const testUser = {
            clerkId: 'test_' + Date.now(),
            name: 'Test User',
            email: 'test@example.com',
            image: 'https://example.com/image.jpg',
            resume: ''
        };
        
        console.log('Creating test user:', testUser);
        const createdUser = await User.create(testUser);
        console.log('Test user created:', createdUser);
        
        // Verify user exists in database
        const foundUser = await User.findOne({ clerkId: testUser.clerkId });
        console.log('Found user in database:', foundUser);
        
        res.json({ 
            success: true, 
            message: 'Test user created successfully',
            user: createdUser
        });
    } catch (error) {
        console.error('Test user creation failed:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Test user creation failed',
            error: error.message
        });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('=== Error Handler ===');
    console.error('Error:', err);
    console.error('Stack:', err.stack);
    res.status(500).json({ 
        success: false, 
        message: "Internal Server Error",
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

//Port
const PORT = process.env.PORT || 5000

Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




