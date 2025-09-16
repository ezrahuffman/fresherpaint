# FresherPaint Deployment Guide

This guide covers deploying the FresherPaint analytics application with the backend on Render.com and frontend on Netlify.

## Architecture Overview

- **Backend**: Go server with PostgreSQL database hosted on Render.com
- **Frontend**: React TypeScript SPA hosted on Netlify
- **Database**: PostgreSQL managed database on Render.com

## Prerequisites

1. GitHub repository with your code
2. Render.com account
3. Netlify account

## Part 1: Backend Deployment on Render.com

### Step 1: Create PostgreSQL Database

1. Log into [Render.com](https://render.com)
2. Click "New +" → "PostgreSQL"
3. Configure database:
   - **Name**: `fresherpaint-db`
   - **Database**: `fresherpaint`
   - **User**: `fresherpaint`
   - **Region**: Choose closest to your users
   - **Plan**: Free tier is sufficient for testing
4. Click "Create Database"
5. Note the connection details (you'll need the External Database URL)

### Step 2: Deploy Backend Service

1. In Render dashboard, click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `fresherpaint-backend`
   - **Environment**: `Go`
   - **Build Command**: `go build -o main .`
   - **Start Command**: `./main`
   - **Instance Type**: Free tier
4. Set Environment Variables:
   - `DATABASE_URL`: Use the External Database URL from Step 1
   - `PORT`: `8080` (Render will override this automatically)
5. Click "Create Web Service"

### Step 3: Verify Backend Deployment

1. Wait for deployment to complete
2. Visit your backend URL: `https://your-service-name.onrender.com/api/health`
3. You should see: `{"status": "ok"}`

## Part 2: Frontend Deployment on Netlify

### Step 1: Prepare Frontend Environment

1. Create a production environment file in the frontend directory:
   ```bash
   # In fresherpaint/frontend/.env.production
   VITE_API_BASE_URL=https://your-backend-service.onrender.com/api
   ```
   Replace `your-backend-service` with your actual Render service name.

### Step 2: Deploy to Netlify

#### Option A: Drag and Drop (Quick Test)

1. Build the frontend locally:
   ```bash
   cd fresherpaint/frontend
   npm install
   npm run build
   ```
2. Drag the `dist` folder to Netlify's deploy area
3. Set environment variables in Netlify dashboard

#### Option B: Git Integration (Recommended)

1. Log into [Netlify](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect to your GitHub repository
4. Configure build settings:
   - **Base directory**: `fresherpaint/frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `fresherpaint/frontend/dist`
5. Set Environment Variables:
   - `VITE_API_BASE_URL`: `https://your-backend-service.onrender.com/api`
6. Click "Deploy site"

### Step 3: Configure Custom Domain (Optional)

1. In Netlify dashboard, go to "Domain settings"
2. Add your custom domain
3. Configure DNS records as instructed

## Part 3: Post-Deployment Configuration

### Update CORS Settings

Ensure your backend allows requests from your Netlify domain. The current CORS middleware should handle this, but verify in your Go code that it accepts your frontend domain.

### Test Authentication

1. Visit your deployed frontend
2. Try logging in with the configured password
3. Verify that analytics data loads correctly

## Environment Variables Summary

### Backend (Render.com)
- `DATABASE_URL`: Automatically provided by Render PostgreSQL
- `PORT`: Automatically set by Render

### Frontend (Netlify)
- `VITE_API_BASE_URL`: Your Render backend URL + `/api`

## Troubleshooting

### Backend Issues

1. **Database Connection Errors**:
   - Verify DATABASE_URL is correctly set
   - Check database is running and accessible

2. **CORS Errors**:
   - Ensure frontend domain is allowed in CORS settings
   - Check that API endpoints are accessible

3. **Build Failures**:
   - Verify Go version compatibility
   - Check all dependencies are properly declared in go.mod

### Frontend Issues

1. **API Connection Errors**:
   - Verify VITE_API_BASE_URL is correctly set
   - Check backend is deployed and accessible
   - Ensure API endpoints return expected responses

2. **Build Failures**:
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check for TypeScript errors

### Common Issues

1. **Authentication Not Working**:
   - Verify JWT secret is consistent
   - Check token expiration settings
   - Ensure HTTPS is used in production

2. **Data Not Loading**:
   - Check database migrations ran successfully
   - Verify sample data was inserted
   - Check API authentication headers

## Monitoring and Maintenance

### Render.com
- Monitor service logs in Render dashboard
- Set up health checks and alerts
- Monitor database performance

### Netlify
- Monitor build logs and deploy status
- Set up form handling if needed
- Monitor bandwidth usage

## Security Considerations

1. **Environment Variables**: Never commit sensitive data to Git
2. **HTTPS**: Both services provide HTTPS by default
3. **Database**: Use strong passwords and restrict access
4. **Authentication**: Consider implementing rate limiting
5. **CORS**: Restrict to specific domains in production

## Scaling Considerations

1. **Database**: Upgrade to paid plan for production workloads
2. **Backend**: Consider upgrading Render instance for better performance
3. **Frontend**: Netlify's CDN handles scaling automatically
4. **Monitoring**: Implement proper logging and monitoring solutions

## Cost Optimization

1. **Free Tiers**: Both services offer generous free tiers
2. **Database**: Monitor usage to avoid unexpected charges
3. **Bandwidth**: Optimize assets and enable compression
4. **Compute**: Monitor backend resource usage

## Backup Strategy

1. **Database**: Set up regular backups on Render
2. **Code**: Ensure Git repository is backed up
3. **Environment**: Document all configuration settings
4. **Monitoring**: Set up alerts for service availability
