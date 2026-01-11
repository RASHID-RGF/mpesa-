# M-Pesa Integration Setup Guide

## Step 1: Get M-Pesa Credentials (Sandbox)

### A. Register on Safaricom Developer Portal

1. **Go to:** https://developer.safaricom.co.ke/
2. **Click "Sign Up"** and create an account
3. **Verify your email** address

### B. Create a New App

1. **Login** to the developer portal
2. **Click "My Apps"** in the top menu
3. **Click "Create New App"**
4. **Fill in the details:**
   - App Name: `Kenya Booking App`
   - Description: `Booking application with M-Pesa payments`
5. **Select APIs:**
   - ✅ Check "Lipa Na M-Pesa Online" (STK Push)
6. **Click "Create App"**

### C. Get Your Credentials

After creating the app, you'll see:
- **Consumer Key** - Copy this
- **Consumer Secret** - Click "Show" and copy this

### D. Get Sandbox Test Credentials

1. **Go to:** https://developer.safaricom.co.ke/test_credentials
2. You'll find:
   - **Business Short Code:** `174379` (Paybill)
   - **Lipa Na M-Pesa Online Passkey:** (Long string - copy this)
   - **Test MSISDN (Phone Numbers):** `254708374149` or similar

---

## Step 2: Install Backend Dependencies

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Return to root
cd ..
```

---

## Step 3: Configure Backend Environment

```bash
# Navigate to server directory
cd server

# Copy environment template
cp .env.example .env

# Open .env in your editor
```

**Update `server/.env` with your credentials:**

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# M-Pesa Daraja API Configuration
MPESA_CONSUMER_KEY=paste_your_consumer_key_here
MPESA_CONSUMER_SECRET=paste_your_consumer_secret_here
MPESA_BUSINESS_SHORT_CODE=174379
MPESA_PASSKEY=paste_your_passkey_here
MPESA_ENVIRONMENT=sandbox

# Callback URL (we'll set this up next)
MPESA_CALLBACK_URL=http://localhost:3000/api/mpesa/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

---

## Step 4: Set Up Callback URL with ngrok (Important!)

M-Pesa requires a **publicly accessible HTTPS URL** for callbacks. Use ngrok for local testing:

### A. Install ngrok

**Option 1: Using npm**
```bash
npm install -g ngrok
```

**Option 2: Download from website**
- Go to: https://ngrok.com/download
- Download and install for your OS

### B. Create ngrok Account (Optional but recommended)

1. Sign up at: https://dashboard.ngrok.com/signup
2. Get your auth token
3. Configure ngrok:
```bash
ngrok config add-authtoken your_auth_token_here
```

### C. Start Backend Server First

```bash
# In terminal 1, start your backend
cd server
npm run dev
```

You should see:
```
🚀 M-Pesa API Server running on port 3000
📱 Environment: sandbox
🌐 CORS enabled for: http://localhost:5173
```

### D. Start ngrok Tunnel

```bash
# In terminal 2, create tunnel to port 3000
ngrok http 3000
```

You'll see output like:
```
Session Status                online
Forwarding                    https://abc123.ngrok.io -> http://localhost:3000
```

### E. Update Callback URL

Copy the **HTTPS URL** (e.g., `https://abc123.ngrok.io`) and update `server/.env`:

```env
MPESA_CALLBACK_URL=https://abc123.ngrok.io/api/mpesa/callback
```

**Restart your backend server** after updating the callback URL.

---

## Step 5: Configure Frontend

```bash
# In root directory, copy environment template
cp .env.example .env
```

**Update root `.env`:**
```env
VITE_API_BASE_URL=http://localhost:3000
```

---

## Step 6: Install Frontend Dependencies

```bash
# In root directory
npm install

# Or install concurrently for running both servers
npm install
```

---

## Step 7: Run the Application

### Option A: Run Both Together (Recommended)

```bash
# From root directory
npm run dev:all
```

This will start:
- Frontend on `http://localhost:5173`
- Backend on `http://localhost:3000`

### Option B: Run Separately

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```

**Terminal 2 (Frontend):**
```bash
npm run dev
```

**Terminal 3 (ngrok):**
```bash
ngrok http 3000
```

---

## Step 8: Test the Integration

1. **Open your browser:** http://localhost:5173
2. **Browse destinations** and click on one
3. **Click "Book Now"** to start booking flow
4. **Complete the booking steps:**
   - Select dates
   - Enter guest information
   - Choose package
   - Sign agreements
5. **Select "M-Pesa" payment method**
6. **Enter a test phone number:** `254708374149` (or your own Kenyan number)
7. **Click "Confirm Booking"**
8. **Wait for STK Push** (check your phone if using real number)

### Testing Tips

**For Sandbox Testing:**
- Use test phone number: `254708374149`
- No actual money will be deducted
- You can use any PIN to "approve" the payment in sandbox

**Check Backend Logs:**
```bash
# You should see logs like:
POST /api/mpesa/stk-push
M-Pesa STK Push initiated
POST /api/mpesa/query
Transaction status: pending
POST /api/mpesa/callback
M-Pesa Callback received
```

**Test API Directly:**
```bash
# Test health endpoint
curl http://localhost:3000/api/mpesa/health

# Test STK Push
curl -X POST http://localhost:3000/api/mpesa/stk-push \
  -H "Content-Type: application/json" \
  -d '{
    "phoneNumber": "254708374149",
    "amount": 1000,
    "accountReference": "TEST123",
    "transactionDesc": "Test payment"
  }'
```

---

## Step 9: Verify M-Pesa Callback

### Check Callback in ngrok

1. **Open ngrok web interface:** http://localhost:4040
2. **Click on "Inspect"** tab
3. You'll see all HTTP requests including M-Pesa callbacks
4. **Check the callback payload** to see payment details

### Check Backend Logs

Look for:
```
M-Pesa Callback received: {
  Body: {
    stkCallback: {
      MerchantRequestID: "...",
      CheckoutRequestID: "...",
      ResultCode: 0,
      ResultDesc: "The service request is processed successfully."
    }
  }
}
```

---

## Common Issues & Solutions

### 1. "Failed to authenticate with M-Pesa"
**Solution:** 
- Verify your Consumer Key and Consumer Secret are correct
- Make sure there are no extra spaces in the .env file
- Restart the backend server after updating .env

### 2. "Invalid Access Token"
**Solution:**
- Check if your app is active on the developer portal
- Verify you're using the correct environment (sandbox/production)

### 3. "Timeout Error" or "No STK Push Received"
**Solution:**
- Ensure ngrok is running and callback URL is correct
- Check ngrok logs for incoming requests
- Verify phone number format is correct (254XXXXXXXXX)
- Check backend logs for errors

### 4. "Transaction Pending Forever"
**Solution:**
- In sandbox, the callback might not always work
- Use query endpoint manually to check status
- Check ngrok is still running (free tier has 2-hour sessions)

### 5. "CORS Error"
**Solution:**
- Make sure FRONTEND_URL in server/.env matches your frontend URL
- Restart backend after updating CORS settings

---

## Production Deployment

### Backend Deployment (Choose one)

**Railway:**
```bash
# Install Railway CLI
npm install -g railway

# Login and deploy
railway login
railway init
railway up
```

**Heroku:**
```bash
# Install Heroku CLI
# Then:
cd server
heroku create your-app-name
git push heroku main
```

**Render/DigitalOcean/AWS:**
- Follow platform-specific deployment guides
- Set environment variables in platform dashboard

### Update Environment for Production

**Backend (.env):**
```env
MPESA_ENVIRONMENT=production
MPESA_BUSINESS_SHORT_CODE=your_actual_paybill
MPESA_PASSKEY=your_production_passkey
MPESA_CALLBACK_URL=https://your-backend-domain.com/api/mpesa/callback
```

**Frontend (.env):**
```env
VITE_API_BASE_URL=https://your-backend-domain.com
```

---

## Next Steps

1. **Add Database:** Replace in-memory storage with MongoDB/PostgreSQL
2. **Add Authentication:** Implement user authentication
3. **Add Logging:** Set up proper logging (Winston, Pino)
4. **Add Monitoring:** Use services like Sentry for error tracking
5. **Add Rate Limiting:** Protect your API from abuse
6. **Add Tests:** Write unit and integration tests

---

## Support Resources

- **Safaricom Developer Portal:** https://developer.safaricom.co.ke/
- **M-Pesa API Docs:** https://developer.safaricom.co.ke/Documentation
- **ngrok Documentation:** https://ngrok.com/docs
- **This Project's README:** See main README.md and server/README.md

---

## Quick Reference

### Start Everything
```bash
# Terminal 1: ngrok
ngrok http 3000

# Terminal 2: Backend  
cd server && npm run dev

# Terminal 3: Frontend
npm run dev
```

### Test Credentials (Sandbox)
- Business Short Code: `174379`
- Test Phone: `254708374149`
- Amount Range: 1 - 150,000 KSh

### Key URLs
- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- ngrok Inspector: http://localhost:4040
- Developer Portal: https://developer.safaricom.co.ke/