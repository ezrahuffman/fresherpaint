# Quick Deployment Guide

## 🚀 Deploy FresherPaint in 10 Minutes

### Backend on Render.com

1. **Create Database**:
   - Go to [render.com](https://render.com) → New → PostgreSQL
   - Name: `fresherpaint-db`, Database: `fresherpaint`, User: `fresherpaint`

2. **Deploy Backend**:
   - New → Web Service → Connect GitHub repo
   - Root directory: `fresherpaint/backend`
   - Build: `go build -o main .`
   - Start: `./main`
   - Environment: Add `DATABASE_URL` from database

3. **Test**: Visit `https://your-service.onrender.com/api/health`

### Frontend on Netlify

1. **Update Environment**:
   ```bash
   # Edit fresherpaint/frontend/.env.production
   VITE_API_BASE_URL=https://your-backend-service.onrender.com/api
   ```

2. **Deploy**:
   - Go to [netlify.com](https://netlify.com) → New site from Git
   - Base directory: `fresherpaint/frontend`
   - Build: `npm run build`
   - Publish: `fresherpaint/frontend/dist`
   - Environment: `VITE_API_BASE_URL=https://your-backend-service.onrender.com/api`

3. **Test**: Visit your Netlify URL and login

### Default Login
- Password: Check your backend authentication configuration

That's it! Your FresherPaint analytics app is now live! 🎉
