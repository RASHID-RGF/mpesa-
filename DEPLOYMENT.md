# Deployment Guide - Unified Application

This guide explains how to deploy the Kenya Booking App as a unified application where the Express backend serves both the API and the React frontend.

## Architecture

```
┌─────────────────────────────────────────┐
│         Single Server (Node.js)         │
│                                         │
│  ┌───────────────────────────────────┐ │
│  │   Express Server (Port 3000)      │ │
│  │                                   │ │
│  │  API Routes (/api/*)              │ │
│  │  ├─ /api/mpesa/stk-push          │ │
│  │  ├─ /api/mpesa/query             │ │
│  │  └─ /api/mpesa/callback          │ │
│  │                                   │ │
│  │  Static Files (/* - React App)   │ │
│  │  └─ Serves built React files     │ │
│  └───────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Development Setup

### Run Development Server (Recommended)

Both frontend and backend run together with hot reload:

```bash
# Install all dependencies
npm install
npm run server:install

# Run both servers
npm run dev
```

- Frontend: http://localhost:5173 (Vite dev server)
- Backend: http://localhost:3000 (Express API)
- Vite proxies `/api/*` requests to backend

### Run Separately (Alternative)

```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend
npm run dev:frontend
```

## Production Build

### 1. Build the Application

```bash
# Build frontend and prepare backend
npm run build:all
```

This will:
1. Build React app to `dist/` folder
2. Install production dependencies in `server/`

### 2. Configure Environment

Create `server/.env` for production:

```env
# Server Configuration
PORT=3000
NODE_ENV=production

# M-Pesa Configuration
MPESA_CONSUMER_KEY=your_production_key
MPESA_CONSUMER_SECRET=your_production_secret
MPESA_BUSINESS_SHORT_CODE=your_paybill_number
MPESA_PASSKEY=your_production_passkey
MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
MPESA_ENVIRONMENT=production

# Frontend URL (not needed in unified deployment)
FRONTEND_URL=https://your-domain.com
```

### 3. Start Production Server

```bash
npm start
```

The server will:
- Serve API endpoints on `/api/*`
- Serve React app on all other routes
- Handle React Router navigation properly

## Deployment Platforms

### Option 1: Railway (Recommended)

1. **Install Railway CLI:**
```bash
npm install -g @railway/cli
```

2. **Login and Initialize:**
```bash
railway login
railway init
```

3. **Configure Build:**
Create `railway.json`:
```json
{
  "build": {
    "builder": "NIXPACKS",
    "buildCommand": "npm run build:all"
  },
  "deploy": {
    "startCommand": "npm start",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 10
  }
}
```

4. **Set Environment Variables:**
```bash
railway variables set MPESA_CONSUMER_KEY=your_key
railway variables set MPESA_CONSUMER_SECRET=your_secret
railway variables set MPESA_PASSKEY=your_passkey
railway variables set MPESA_BUSINESS_SHORT_CODE=your_code
railway variables set NODE_ENV=production
railway variables set MPESA_ENVIRONMENT=production
```

5. **Deploy:**
```bash
railway up
```

6. **Get Domain:**
```bash
railway domain
# Use this domain for MPESA_CALLBACK_URL
```

### Option 2: Render

1. **Create `render.yaml`:**
```yaml
services:
  - type: web
    name: kenya-booking-app
    env: node
    buildCommand: npm run build:all
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: MPESA_CONSUMER_KEY
        sync: false
      - key: MPESA_CONSUMER_SECRET
        sync: false
      - key: MPESA_PASSKEY
        sync: false
      - key: MPESA_BUSINESS_SHORT_CODE
        sync: false
      - key: MPESA_CALLBACK_URL
        sync: false
      - key: MPESA_ENVIRONMENT
        value: production
```

2. **Deploy:**
- Connect your GitHub repository
- Render will auto-deploy on push

### Option 3: Heroku

1. **Install Heroku CLI**

2. **Create app:**
```bash
heroku create your-app-name
```

3. **Set buildpacks:**
```bash
heroku buildpacks:set heroku/nodejs
```

4. **Configure environment:**
```bash
heroku config:set NODE_ENV=production
heroku config:set MPESA_CONSUMER_KEY=your_key
heroku config:set MPESA_CONSUMER_SECRET=your_secret
heroku config:set MPESA_PASSKEY=your_passkey
heroku config:set MPESA_BUSINESS_SHORT_CODE=your_code
heroku config:set MPESA_ENVIRONMENT=production
```

5. **Create `Procfile`:**
```
web: npm start
```

6. **Deploy:**
```bash
git push heroku main
```

### Option 4: DigitalOcean App Platform

1. **Create App:**
- Go to App Platform
- Connect repository
- Select branch

2. **Configure Build:**
- Build Command: `npm run build:all`
- Run Command: `npm start`

3. **Set Environment Variables** in the dashboard

4. **Deploy**

### Option 5: AWS / VPS (Manual)

1. **Provision Server** (Ubuntu/Debian)

2. **Install Node.js:**
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Clone Repository:**
```bash
git clone your-repo-url
cd kenya-booking-app
```

4. **Build and Configure:**
```bash
npm install
npm run build:all
cd server
nano .env  # Add production credentials
```

5. **Use PM2 for Process Management:**
```bash
sudo npm install -g pm2
pm2 start npm --name "kenya-booking" -- start
pm2 startup
pm2 save
```

6. **Setup Nginx Reverse Proxy:**
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. **Setup SSL with Certbot:**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Post-Deployment Checklist

- [ ] Application is accessible at your domain
- [ ] API endpoints respond correctly
- [ ] Frontend loads and navigates properly
- [ ] M-Pesa STK Push works
- [ ] M-Pesa callback receives notifications
- [ ] All environment variables are set correctly
- [ ] HTTPS is enabled
- [ ] Error logging is working
- [ ] Database connection (if using one) is stable

## Testing Production Build Locally

```bash
# Build the app
npm run build:all

# Set NODE_ENV
export NODE_ENV=production

# Start server
npm start

# Test at http://localhost:3000
```

## Monitoring & Maintenance

### Health Check Endpoint

```bash
curl https://your-domain.com/api/health
```

### View Logs

**Railway:**
```bash
railway logs
```

**Heroku:**
```bash
heroku logs --tail
```

**PM2 (VPS):**
```bash
pm2 logs kenya-booking
```

### Update Application

**Railway/Render/Heroku:**
- Push to connected branch
- Auto-deploys

**VPS:**
```bash
cd kenya-booking-app
git pull
npm run build:all
pm2 restart kenya-booking
```

## Scaling

### Horizontal Scaling

Most platforms auto-scale:
- Railway: Adjust replicas in settings
- Heroku: `heroku ps:scale web=2`
- Render: Adjust instance count

### Add Database

Replace in-memory storage with:
- MongoDB Atlas (recommended)
- PostgreSQL
- Redis for sessions

### Add Load Balancer

For high traffic, add load balancer to distribute requests across multiple instances.

## Troubleshooting

### Frontend Not Loading
- Check build completed: `ls dist/`
- Verify NODE_ENV=production
- Check server logs for errors

### API Not Responding
- Test: `curl https://your-domain.com/api/health`
- Check environment variables
- Verify M-Pesa credentials

### M-Pesa Callbacks Failing
- Ensure callback URL is HTTPS
- Verify URL is publicly accessible
- Check firewall settings

### 404 on Page Refresh
- Ensure Express serves React app for all routes
- Check `server/index.js` has `app.get('*')` handler

## Security Considerations

- [ ] Use HTTPS only
- [ ] Set secure environment variables
- [ ] Enable rate limiting
- [ ] Add request validation
- [ ] Implement authentication
- [ ] Use security headers (helmet)
- [ ] Enable CORS properly
- [ ] Monitor for suspicious activity
- [ ] Keep dependencies updated
- [ ] Regular security audits

## Support

- Check logs first
- Review environment variables
- Test M-Pesa credentials
- Verify callback URL is accessible
- Contact platform support if needed