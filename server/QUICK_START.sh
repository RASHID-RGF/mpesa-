#!/bin/bash

echo "================================================"
echo "  Kenya Booking App - M-Pesa Quick Start"
echo "================================================"
echo ""

# Check if .env exists
if [ ! -f "server/.env" ]; then
    echo "⚠️  Environment file not found!"
    echo "Creating server/.env from template..."
    cp server/.env.example server/.env
    echo "✅ Created server/.env"
    echo ""
    echo "📝 IMPORTANT: Edit server/.env and add your M-Pesa credentials:"
    echo "   - MPESA_CONSUMER_KEY"
    echo "   - MPESA_CONSUMER_SECRET"
    echo "   - MPESA_PASSKEY"
    echo ""
    echo "Get credentials from: https://developer.safaricom.co.ke/"
    echo ""
    read -p "Press Enter after updating server/.env to continue..."
fi

if [ ! -f ".env" ]; then
    echo "Creating frontend .env from template..."
    cp .env.example .env
    echo "✅ Created .env"
fi

# Check if node_modules exists in server
if [ ! -d "server/node_modules" ]; then
    echo ""
    echo "📦 Installing backend dependencies..."
    cd server && npm install && cd ..
    echo "✅ Backend dependencies installed"
fi

# Check if node_modules exists in root
if [ ! -d "node_modules" ]; then
    echo ""
    echo "📦 Installing frontend dependencies..."
    npm install
    echo "✅ Frontend dependencies installed"
fi

echo ""
echo "================================================"
echo "  Setup Complete! Now follow these steps:"
echo "================================================"
echo ""
echo "1️⃣  Start ngrok (in a new terminal):"
echo "   ngrok http 3000"
echo ""
echo "2️⃣  Copy the ngrok HTTPS URL and update server/.env:"
echo "   MPESA_CALLBACK_URL=https://your-ngrok-url.ngrok.io/api/mpesa/callback"
echo ""
echo "3️⃣  Start the application:"
echo "   npm run dev:all"
echo ""
echo "4️⃣  Open browser:"
echo "   http://localhost:5173"
echo ""
echo "================================================"
echo "  Quick Test Commands"
echo "================================================"
echo ""
echo "Test backend health:"
echo "  curl http://localhost:3000/api/mpesa/health"
echo ""
echo "Test M-Pesa credentials:"
echo "  curl -X POST http://localhost:3000/api/mpesa/stk-push \\"
echo "    -H 'Content-Type: application/json' \\"
echo "    -d '{\"phoneNumber\":\"254708374149\",\"amount\":100}'"
echo ""

