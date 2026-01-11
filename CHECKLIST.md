# M-Pesa Integration Checklist

## ✅ Pre-Setup (5 minutes)

- [ ] Create account on https://developer.safaricom.co.ke/
- [ ] Verify your email address
- [ ] Create a new app on the portal
- [ ] Copy Consumer Key
- [ ] Copy Consumer Secret  
- [ ] Go to Test Credentials page
- [ ] Copy Lipa Na M-Pesa Passkey

## ✅ Backend Setup (10 minutes)

- [ ] Navigate to `server` directory
- [ ] Run `npm install`
- [ ] Copy `server/.env.example` to `server/.env`
- [ ] Paste Consumer Key in `server/.env`
- [ ] Paste Consumer Secret in `server/.env`
- [ ] Paste Passkey in `server/.env`
- [ ] Set Business Short Code to `174379`
- [ ] Set Environment to `sandbox`
- [ ] Run `npm run test:config` to verify credentials

## ✅ ngrok Setup (5 minutes)

- [ ] Install ngrok: `npm install -g ngrok`
- [ ] (Optional) Sign up at https://ngrok.com/
- [ ] (Optional) Add auth token: `ngrok config add-authtoken YOUR_TOKEN`
- [ ] Start backend: `cd server && npm run dev`
- [ ] In new terminal, run: `ngrok http 3000`
- [ ] Copy the HTTPS URL (e.g., `https://abc123.ngrok.io`)
- [ ] Update `MPESA_CALLBACK_URL` in `server/.env`
- [ ] Restart backend server

## ✅ Frontend Setup (5 minutes)

- [ ] Return to root directory
- [ ] Run `npm install`
- [ ] Copy `.env.example` to `.env`
- [ ] Verify `VITE_API_BASE_URL=http://localhost:3000`

## ✅ Test Everything (5 minutes)

### Test 1: Backend Health
```bash
curl http://localhost:3000/api/mpesa/health
```
Expected: `{"success": true, "message": "M-Pesa service is running"}`

### Test 2: STK Push
```bash
curl -X POST http://localhost:3000/api/mpesa/stk-push \
  -H "Content-Type: application/json" \
  -d '{"phoneNumber":"254708374149","amount":10}'
```
Expected: `{"success": true, "checkoutRequestId": "..."}`

### Test 3: Full Application
- [ ] Start application: `npm run dev:all`
- [ ] Open browser: http://localhost:5173
- [ ] Browse to a destination
- [ ] Click "Book Now"
- [ ] Complete booking flow
- [ ] Select M-Pesa payment
- [ ] Enter phone: `254708374149`
- [ ] Click "Confirm Booking"
- [ ] Wait for payment modal
- [ ] Check backend logs for "STK Push initiated"
- [ ] Check ngrok inspector: http://localhost:4040

## ✅ Verification

- [ ] Payment modal appears
- [ ] Status changes from "initiating" to "pending"
- [ ] Backend logs show successful STK Push
- [ ] ngrok shows callback received (if applicable)
- [ ] Payment completes (or times out in sandbox)

## 🎉 Success!

If all checks pass, your M-Pesa integration is working!

## 🆘 Troubleshooting

### "Failed to authenticate with M-Pesa"
→ Run `cd server && npm run test:config` to verify credentials

### "Invalid phone number"
→ Use format `254XXXXXXXXX` (Kenyan numbers only)

### "No STK Push received"
→ Check ngrok is running and callback URL is updated

### "CORS error"
→ Verify `FRONTEND_URL` in `server/.env` matches frontend URL

### Still stuck?
→ See SETUP_GUIDE.md for detailed troubleshooting

---

**Quick Commands Reference:**

```bash
# Test backend configuration
cd server && npm run test:config

# Start everything at once
npm run dev:all

# Or start separately:
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend  
npm run dev

# Terminal 3: ngrok
ngrok http 3000
```