# Job Portal Application

A full-stack job portal application built with React, Node.js, Express, and MongoDB.

## Project Structure

```
job-portal/
├── client/          # Frontend React application
└── server/          # Backend Node.js/Express application
```

## Deployment Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account
- Vercel account
- Clerk account (for authentication)

### Backend Deployment

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Deploy to Vercel:
```bash
vercel
```

### Frontend Deployment

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.production` file with the following variables:
```
VITE_API_URL=https://job-portal-api.vercel.app
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

4. Deploy to Vercel:
```bash
vercel
```

### Environment Variables Setup in Vercel

#### Backend (job-portal-api)
- MONGODB_URI: Your MongoDB Atlas connection string
- JWT_SECRET: Your JWT secret key
- PORT: 5000

#### Frontend (job-portal)
- VITE_API_URL: https://job-portal-api.vercel.app
- VITE_CLERK_PUBLISHABLE_KEY: Your Clerk publishable key

## API Endpoints

### Authentication
- POST /api/users/register - Register a new user
- POST /api/users/login - Login user
- GET /api/users/profile - Get user profile

### Jobs
- GET /api/jobs - Get all jobs
- GET /api/jobs/search - Search jobs
- GET /api/jobs/:id - Get job by ID
- POST /api/jobs - Create a new job
- PUT /api/jobs/:id - Update job
- DELETE /api/jobs/:id - Delete job

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 