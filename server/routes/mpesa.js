import express from 'express'
import mpesaService from '../services/mpesaService.js'

const router = express.Router()

// In-memory storage for transaction status (use database in production)
const transactions = new Map()

/**
 * POST /api/mpesa/stk-push
 * Initiate STK Push payment
 */
router.post('/stk-push', async (req, res) => {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc } = req.body

    // Validate input
    if (!phoneNumber || !amount) {
      return res.status(400).json({
        success: false,
        error: 'Phone number and amount are required'
      })
    }

    // Validate phone number format
    const phoneRegex = /^(\+254|254|0)[17]\d{8}$/
    if (!phoneRegex.test(phoneNumber.replace(/\s/g, ''))) {
      return res.status(400).json({
        success: false,
        error: 'Invalid phone number format. Use format: 0712345678 or 254712345678'
      })
    }

    // Validate amount
    if (amount < 1 || amount > 150000) {
      return res.status(400).json({
        success: false,
        error: 'Amount must be between KSh 1 and KSh 150,000'
      })
    }

    const result = await mpesaService.initiateSTKPush(
      phoneNumber,
      amount,
      accountReference || 'Booking Payment',
      transactionDesc || 'Payment for booking'
    )

    if (result.success) {
      // Store transaction with pending status
      transactions.set(result.checkoutRequestId, {
        ...result,
        status: 'pending',
        phoneNumber,
        amount,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }

    res.json(result)
  } catch (error) {
    console.error('STK Push error:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to initiate payment'
    })
  }
})

/**
 * POST /api/mpesa/query
 * Query transaction status
 */
router.post('/query', async (req, res) => {
  try {
    const { checkoutRequestId } = req.body

    if (!checkoutRequestId) {
      return res.status(400).json({
        success: false,
        error: 'Checkout request ID is required'
      })
    }

    const result = await mpesaService.queryTransactionStatus(checkoutRequestId)

    // Update transaction status if stored
    if (transactions.has(checkoutRequestId)) {
      const transaction = transactions.get(checkoutRequestId)
      transaction.resultCode = result.resultCode
      transaction.resultDesc = result.resultDesc
      transaction.updatedAt = new Date()

      // Update status based on result code
      if (result.resultCode === '0') {
        transaction.status = 'success'
      } else if (result.resultCode === '1032') {
        transaction.status = 'cancelled'
      } else if (result.resultCode && result.resultCode !== '1037') {
        transaction.status = 'failed'
      }

      transactions.set(checkoutRequestId, transaction)
    }

    res.json(result)
  } catch (error) {
    console.error('Query error:', error)
    res.status(500).json({
      success: false,
      error: error.message || 'Failed to query transaction status'
    })
  }
})

/**
 * POST /api/mpesa/callback
 * M-Pesa callback endpoint
 */
router.post('/callback', async (req, res) => {
  try {
    console.log('M-Pesa Callback received:', JSON.stringify(req.body, null, 2))

    const result = await mpesaService.processCallback(req.body)

    // Update transaction status
    if (transactions.has(result.checkoutRequestId)) {
      const transaction = transactions.get(result.checkoutRequestId)

      transaction.resultCode = result.resultCode
      transaction.resultDesc = result.resultDesc
      transaction.updatedAt = new Date()

      if (result.resultCode === 0) {
        transaction.status = 'success'
        transaction.mpesaReceiptNumber = result.mpesaReceiptNumber
        transaction.transactionDate = result.transactionDate
      } else if (result.resultCode === 1032) {
        transaction.status = 'cancelled'
      } else {
        transaction.status = 'failed'
      }

      transactions.set(result.checkoutRequestId, transaction)
    }

    // Acknowledge receipt
    res.json({
      ResultCode: 0,
      ResultDesc: 'Accepted'
    })
  } catch (error) {
    console.error('Callback processing error:', error)
    res.status(500).json({
      ResultCode: 1,
      ResultDesc: 'Failed to process callback'
    })
  }
})

/**
 * GET /api/mpesa/transaction/:checkoutRequestId
 * Get transaction details
 */
router.get('/transaction/:checkoutRequestId', (req, res) => {
  try {
    const { checkoutRequestId } = req.params

    if (!transactions.has(checkoutRequestId)) {
      return res.status(404).json({
        success: false,
        error: 'Transaction not found'
      })
    }

    const transaction = transactions.get(checkoutRequestId)
    res.json({
      success: true,
      transaction
    })
  } catch (error) {
    console.error('Get transaction error:', error)
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve transaction'
    })
  }
})

/**
 * GET /api/mpesa/health
 * Health check endpoint
 */
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'M-Pesa service is running',
    environment: process.env.MPESA_ENVIRONMENT || 'sandbox'
  })
})

export default router