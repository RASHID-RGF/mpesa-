# Kenya Booking App

A modern booking application for Kenyan safaris, beaches, and cultural experiences with integrated M-Pesa payment processing using Lipana (Lipa Na M-Pesa Online).

## Features

- 🏞️ Browse and book various destinations (Safari, Beach, Mountain, Cultural)
- 📱 M-Pesa payment integration via Lipana/Daraja API
- 💳 Multiple payment methods (M-Pesa, Bank Transfer, Card)
- 📅 Date selection and guest management
- 📦 Multiple package options (Standard, Deluxe, Premium)
- 📄 Digital signing of agreements
- 🧾 Booking confirmation and management
- 📱 Responsive design for mobile and desktop

## Tech Stack

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v6
- **Styling:** Tailwind CSS v3
- **Icons:** Lucide React
- **Payment:** M-Pesa Daraja API (Lipana)

## M-Pesa Integration Setup

This application uses a **Node.js backend** to securely handle M-Pesa Lipana (Lipa Na M-Pesa Online) payments.

### Prerequisites

1. **M-Pesa Developer Account:**
   - Sign up at [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
   - Create a new app to get your Consumer Key and Consumer Secret

2. **M-Pesa Paybill/Till Number:**
   - For sandbox testing, use the provided test credentials
   - For production, you need an active M-Pesa Paybill or Till number

### Backend Setup

1. **Install backend dependencies:**
   ```bash
   npm run server:install
   # Or manually:
   cd server && npm install && cd ..
   ```

2. **Configure backend environment:**
   ```bash
   cd server
   cp .env.example .env
   ```

3. **Update `server/.env` with your M-Pesa credentials:**
   ```env
   PORT=3000
   MPESA_CONSUMER_KEY=your_consumer_key_here
   MPESA_CONSUMER_SECRET=your_consumer_secret_here
   MPESA_BUSINESS_SHORT_CODE=174379  # Sandbox test number
   MPESA_PASSKEY=your_passkey_here
   MPESA_CALLBACK_URL=https://your-ngrok-url.ngrok.io/api/mpesa/callback
   MPESA_ENVIRONMENT=sandbox
   FRONTEND_URL=http://localhost:5173
   ```

### Frontend Setup

1. **Configure frontend environment:**
   ```bash
   cp .env.example .env
   ```

2. **Update root `.env`:**
   ```env
   VITE_API_BASE_URL=http://localhost:3000
   ```

### Sandbox Testing Credentials

For sandbox testing, use these credentials:

- **Consumer Key & Secret:** Get from your app on the developer portal
- **Business Short Code:** 174379 (Sandbox Paybill)
- **Passkey:** Provided in the test credentials section
- **Test Phone Number:** Use any Kenyan phone number in the format `254XXXXXXXXX`

### Setting Up Callback URL (Important!)

M-Pesa requires a publicly accessible HTTPS URL for callbacks. For local development:

**Using ngrok (Recommended for testing):**
```bash
# Install ngrok
npm install -g ngrok

# Start your backend server first
cd server && npm run dev

# In another terminal, start ngrok
ngrok http 3000

# Copy the HTTPS URL and update server/.env
MPESA_CALLBACK_URL=https://your-ngrok-url.ngrok.io/api/mpesa/callback
```

## Installation & Running

### Quick Start (Development)

```bash
# 1. Install all dependencies
npm install
npm run server:install

# 2. Configure M-Pesa credentials
cd server
cp .env.example .env
# Edit .env and add your M-Pesa credentials

# 3. Start the application (both frontend and backend)
cd ..
npm run dev
```

**What this does:**
- Frontend runs on `http://localhost:5173` (Vite dev server)
- Backend runs on `http://localhost:3000` (Express API)
- API requests are proxied from frontend to backend
- Both servers restart automatically on code changes

### Production Build & Deployment

```bash
# Build everything
npm run build:all

# Start in production mode
npm start
```

This creates a unified application where Express serves both the API and the React frontend on port 3000.

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions to Railway, Render, Heroku, or VPS.

## Project Structure

```
# Frontend
src/
├── components/
│   ├── booking/
│   │   ├── BookingModal.tsx          # Main booking flow modal
│   │   ├── MpesaPaymentModal.tsx     # M-Pesa payment UI
│   │   ├── PriceBreakdown.tsx        # Booking price summary
│   │   ├── ProgressIndicator.tsx     # Booking step indicator
│   │   └── steps/
│   │       ├── DateSelection.tsx
│   │       ├── GuestInformation.tsx
│   │       ├── PackageSelection.tsx
│   │       ├── SigningAgreement.tsx
│   │       ├── PaymentMethodStep.tsx
│   │       └── BookingConfirmation.tsx
│   └── ...other components
├── lib/
│   ├── bookingService.ts             # Booking management
│   ├── mpesaApiClient.ts             # API client for backend
│   └── utils.ts
├── types/
│   └── booking.ts                    # Type definitions
├── data/
│   └── destinations.ts               # Mock destination data
└── pages/
    ├── HomePage.tsx
    ├── DestinationDetailPage.tsx
    └── BookingsPage.tsx

# Backend
server/
├── index.js                           # Express server entry point
├── routes/
│   └── mpesa.js                      # M-Pesa API routes
├── services/
│   └── mpesaService.js               # M-Pesa Daraja integration
├── .env.example                      # Environment template
└── package.json                      # Backend dependencies
```

## M-Pesa Payment Flow

1. **User selects M-Pesa payment method**
2. **Enters phone number and confirms**
3. **STK Push initiated:**
   - Application sends payment request to M-Pesa API
   - User receives prompt on their phone
4. **User completes payment:**
   - Enters M-Pesa PIN on phone
   - Confirms transaction
5. **Payment verification:**
   - Application polls for payment status
   - Updates booking status on success
6. **Booking confirmation:**
   - Shows receipt and booking details
   - Sends confirmation email

## Backend API Endpoints

### M-Pesa Endpoints
- `POST /api/mpesa/stk-push` - Initiate STK Push payment
- `POST /api/mpesa/query` - Query transaction status
- `POST /api/mpesa/callback` - M-Pesa callback handler
- `GET /api/mpesa/transaction/:id` - Get transaction details
- `GET /api/mpesa/health` - Health check

See [server/README.md](server/README.md) for detailed API documentation.

## Important Notes

### Security Best Practices

✅ **Backend Implementation**
- API credentials are stored securely on the backend
- Frontend never exposes sensitive M-Pesa credentials
- All M-Pesa API calls go through your backend

⚠️ **Important**
- Never commit `.env` files
- Use HTTPS for all production endpoints
- Implement rate limiting on API endpoints
- Add authentication for sensitive operations

### Production Deployment

1. **Deploy Backend:**
   - Deploy to platforms like Heroku, Railway, Render, DigitalOcean, AWS, etc.
   - Set environment variables on your hosting platform
   - Use production M-Pesa credentials
   - Ensure HTTPS is enabled for callback URL

2. **Update Backend Environment:**
   ```env
   MPESA_ENVIRONMENT=production
   MPESA_BUSINESS_SHORT_CODE=your_paybill_number
   MPESA_CALLBACK_URL=https://your-domain.com/api/mpesa/callback
   ```

3. **Deploy Frontend:**
   - Update `VITE_API_BASE_URL` to your backend URL
   - Deploy to Vercel, Netlify, or any static hosting
   
4. **Database:**
   - Replace in-memory storage with proper database (MongoDB, PostgreSQL, etc.)
   - Implement transaction logging and audit trails

### Architecture

```
┌─────────────┐      HTTPS      ┌─────────────┐      HTTPS      ┌─────────────┐
│   Frontend  │ ←──────────────→ │   Backend   │ ←──────────────→ │   M-Pesa    │
│   (React)   │   API Calls     │  (Node.js)  │   Daraja API    │     API     │
└─────────────┘                 └─────────────┘                 └─────────────┘
                                       ↓
                                  Callbacks
                                       ↓
                                 ┌─────────────┐
                                 │  Database   │
                                 └─────────────┘
```

**Benefits:**
- Secure: API credentials never exposed to frontend
- Scalable: Backend handles all payment processing
- Reliable: Proper callback handling and transaction tracking

## Development

### Running Tests

```bash
npm run test
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For M-Pesa integration support:
- [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
- [M-Pesa API Documentation](https://developer.safaricom.co.ke/Documentation)

For application support:
- Create an issue in the repository
- Contact the development team

## Acknowledgments

- Safaricom for the M-Pesa Daraja API
- React and Vite communities
- All contributors to this project