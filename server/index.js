import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import mpesaRoutes from './routes/mpesa.js'

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3002
const isProduction = process.env.NODE_ENV === 'production'

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// API Routes
app.use('/api/mpesa', mpesaRoutes)

// API health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

// Serve static files from React app in production
if (isProduction) {
  const frontendPath = path.join(__dirname, '../dist')
  app.use(express.static(frontendPath))
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'))
  })
} else {
  // Development mode - API info endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'Kenya Booking App - M-Pesa API Server',
      version: '1.0.0',
      mode: 'development',
      endpoints: {
        stkPush: 'POST /api/mpesa/stk-push',
        query: 'POST /api/mpesa/query',
        callback: 'POST /api/mpesa/callback',
        transaction: 'GET /api/mpesa/transaction/:checkoutRequestId',
        health: 'GET /api/mpesa/health'
      },
      note: 'Frontend is running separately on port 5173'
    })
  })
}


// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found'
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 M-Pesa API Server running on port ${PORT}`)
  console.log(`📱 Environment: ${process.env.MPESA_ENVIRONMENT || 'sandbox'}`)
  console.log(`🌐 CORS enabled for: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`)
})