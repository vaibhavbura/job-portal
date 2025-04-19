import './config/instrument.js'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import * as Sentry from "@sentry/node";
import {clerkWebhooks} from './controllers/webhooks.js'

//Initialize Express
const app = express()

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

//Routes
app.get('/', (req, res) => res.send("API Working"))
app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

app.post('/webhhoks', clerkWebhooks)

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
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




