# Kenya Booking App - Backend Server

Node.js/Express backend server for M-Pesa Lipana integration.

## Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```

4. **Update `.env` with your M-Pesa credentials:**
   - Get your Consumer Key and Consumer Secret from [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
   - Update the business short code and passkey
   - Set the callback URL (must be publicly accessible HTTPS)

## Running the Server

### Development Mode (with auto-reload)
```bash
npm run dev
```

### Production Mode
```bash
npm start
```

The server will run on `http://localhost:3000` by default.

## API Endpoints

### 1. STK Push (Initiate Payment)
```
POST /api/mpesa/stk-push
Content-Type: application/json

{
  "phoneNumber": "254712345678",
  "amount": 1000,
  "accountReference": "BOOKING123",
  "transactionDesc": "Payment for Safari Booking"
}
```

**Response:**
```json
{
  "success": true,
  "merchantRequestId": "29115-34620561-1",
  "checkoutRequestId": "ws_CO_191220191020363925",
  "responseCode": "0",
  "responseDescription": "Success. Request accepted for processing",
  "customerMessage": "Success. Request accepted for processing"
}
```

### 2. Query Transaction Status
```
POST /api/mpesa/query
Content-Type: application/json

{
  "checkoutRequestId": "ws_CO_191220191020363925"
}
```

**Response:**
```json
{
  "success": true,
  "merchantRequestId": "29115-34620561-1",
  "checkoutRequestId": "ws_CO_191220191020363925",
  "responseCode": "0",
  "resultCode": "0",
  "resultDesc": "The service request is processed successfully."
}
```

### 3. Get Transaction Details
```
GET /api/mpesa/transaction/:checkoutRequestId
```

**Response:**
```json
{
  "success": true,
  "transaction": {
    "merchantRequestId": "29115-34620561-1",
    "checkoutRequestId": "ws_CO_191220191020363925",
    "status": "success",
    "phoneNumber": "254712345678",
    "amount": 1000,
    "mpesaReceiptNumber": "NLJ7RT61SV",
    "transactionDate": "20191219102115",
    "createdAt": "2024-01-08T10:20:00.000Z",
    "updatedAt": "2024-01-08T10:21:15.000Z"
  }
}
```

### 4. M-Pesa Callback
```
POST /api/mpesa/callback
```

This endpoint receives callbacks from M-Pesa when a payment is completed.

### 5. Health Check
```
GET /api/mpesa/health
```

**Response:**
```json
{
  "success": true,
  "message": "M-Pesa service is running",
  "environment": "sandbox"
}
```

## Result Codes

- `0` - Success
- `1032` - Request cancelled by user
- `1037` - Transaction is pending
- Other codes - Various failure reasons

## Setting Up Callback URL

For production, you need a publicly accessible HTTPS URL for callbacks.

### Option 1: Use ngrok for testing
```bash
# Install ngrok
npm install -g ngrok

# Start ngrok tunnel
ngrok http 3000

# Use the HTTPS URL in your .env
MPESA_CALLBACK_URL=https://your-ngrok-url.ngrok.io/api/mpesa/callback
```

### Option 2: Deploy to a cloud service
- Deploy to platforms like Heroku, Railway, Render, etc.
- Use the deployment URL for callbacks

## Security Notes

- Never commit the `.env` file
- Keep your Consumer Key and Secret secure
- Use HTTPS for all production endpoints
- Implement proper request validation and rate limiting
- Add authentication for sensitive endpoints

## Troubleshooting

### Invalid Access Token
- Verify your Consumer Key and Secret
- Check if your app is active on the developer portal

### Timeout Errors
- Ensure your callback URL is publicly accessible
- Check if M-Pesa sandbox/production servers are operational

### Invalid Phone Number
- Phone numbers must be in format: 254XXXXXXXXX
- Must start with 254 followed by valid operator prefix (7XX or 1XX)

## Production Checklist

- [ ] Update environment to 'production'
- [ ] Use production credentials
- [ ] Set up proper database instead of in-memory storage
- [ ] Implement request logging
- [ ] Add rate limiting
- [ ] Set up monitoring and alerts
- [ ] Configure proper CORS settings
- [ ] Add authentication/authorization
- [ ] Set up SSL/TLS certificates
- [ ] Implement proper error handling
- [ ] Add input validation and sanitization