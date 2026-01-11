import axios from 'axios'

class MpesaService {
  constructor() {
    this.consumerKey = process.env.MPESA_CONSUMER_KEY
    this.consumerSecret = process.env.MPESA_CONSUMER_SECRET
    this.businessShortCode = process.env.MPESA_BUSINESS_SHORT_CODE
    this.passKey = process.env.MPESA_PASSKEY
    this.callbackUrl = process.env.MPESA_CALLBACK_URL
    this.environment = process.env.MPESA_ENVIRONMENT || 'sandbox'
    
    this.baseUrl = this.environment === 'production' 
      ? 'https://api.safaricom.co.ke'
      : 'https://sandbox.safaricom.co.ke'
  }

  /**
   * Generate timestamp in the format YYYYMMDDHHmmss
   */
  generateTimestamp() {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${year}${month}${day}${hours}${minutes}${seconds}`
  }

  /**
   * Generate password for STK Push
   */
  generatePassword(timestamp) {
    const str = `${this.businessShortCode}${this.passKey}${timestamp}`
    return Buffer.from(str).toString('base64')
  }

  /**
   * Format phone number to international format (254XXXXXXXXX)
   */
  formatPhoneNumber(phone) {
    // Remove spaces, dashes, and plus signs
    let cleaned = phone.replace(/[\s\-+]/g, '')
    
    // If starts with 0, replace with 254
    if (cleaned.startsWith('0')) {
      cleaned = '254' + cleaned.substring(1)
    }
    
    // If doesn't start with 254, add it
    if (!cleaned.startsWith('254')) {
      cleaned = '254' + cleaned
    }
    
    return cleaned
  }

  /**
   * Get OAuth access token from M-Pesa API
   */
  async getAccessToken() {
    try {
      const auth = Buffer.from(`${this.consumerKey}:${this.consumerSecret}`).toString('base64')
      const url = `${this.baseUrl}/oauth/v1/generate?grant_type=client_credentials`

      const response = await axios.get(url, {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      })

      return response.data.access_token
    } catch (error) {
      console.error('Error getting M-Pesa access token:', error.response?.data || error.message)
      throw new Error('Failed to authenticate with M-Pesa')
    }
  }

  /**
   * Initiate STK Push (Lipa Na M-Pesa Online)
   */
  async initiateSTKPush(phoneNumber, amount, accountReference, transactionDesc) {
    try {
      const accessToken = await this.getAccessToken()
      const timestamp = this.generateTimestamp()
      const password = this.generatePassword(timestamp)
      const formattedPhone = this.formatPhoneNumber(phoneNumber)

      const requestBody = {
        BusinessShortCode: this.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        TransactionType: 'CustomerPayBillOnline',
        Amount: Math.round(amount),
        PartyA: formattedPhone,
        PartyB: this.businessShortCode,
        PhoneNumber: formattedPhone,
        CallBackURL: this.callbackUrl,
        AccountReference: accountReference,
        TransactionDesc: transactionDesc
      }

      const url = `${this.baseUrl}/mpesa/stkpush/v1/processrequest`
      const response = await axios.post(url, requestBody, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      // Check if the request was successful
      if (response.data.ResponseCode !== '0') {
        throw new Error(response.data.ResponseDescription || 'Failed to initiate payment')
      }

      return {
        success: true,
        merchantRequestId: response.data.MerchantRequestID,
        checkoutRequestId: response.data.CheckoutRequestID,
        responseCode: response.data.ResponseCode,
        responseDescription: response.data.ResponseDescription,
        customerMessage: response.data.CustomerMessage
      }
    } catch (error) {
      console.error('Error initiating STK push:', error.response?.data || error.message)
      
      if (error.response?.data) {
        return {
          success: false,
          error: error.response.data.errorMessage || error.response.data.ResponseDescription || 'Failed to initiate payment',
          errorCode: error.response.data.errorCode || error.response.data.ResponseCode
        }
      }
      
      throw new Error(error.message || 'Failed to initiate M-Pesa payment')
    }
  }

  /**
   * Query STK Push transaction status
   */
  async queryTransactionStatus(checkoutRequestId) {
    try {
      const accessToken = await this.getAccessToken()
      const timestamp = this.generateTimestamp()
      const password = this.generatePassword(timestamp)

      const requestBody = {
        BusinessShortCode: this.businessShortCode,
        Password: password,
        Timestamp: timestamp,
        CheckoutRequestID: checkoutRequestId
      }

      const url = `${this.baseUrl}/mpesa/stkpushquery/v1/query`
      const response = await axios.post(url, requestBody, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      return {
        success: true,
        merchantRequestId: response.data.MerchantRequestID,
        checkoutRequestId: response.data.CheckoutRequestID,
        responseCode: response.data.ResponseCode,
        responseDescription: response.data.ResponseDescription,
        resultCode: response.data.ResultCode,
        resultDesc: response.data.ResultDesc
      }
    } catch (error) {
      console.error('Error querying transaction status:', error.response?.data || error.message)
      
      if (error.response?.data) {
        return {
          success: false,
          error: error.response.data.errorMessage || 'Failed to query transaction',
          errorCode: error.response.data.errorCode
        }
      }
      
      throw new Error('Failed to check payment status')
    }
  }

  /**
   * Process M-Pesa callback
   */
  async processCallback(callbackData) {
    try {
      const { Body } = callbackData
      const { stkCallback } = Body

      const result = {
        merchantRequestId: stkCallback.MerchantRequestID,
        checkoutRequestId: stkCallback.CheckoutRequestID,
        resultCode: stkCallback.ResultCode,
        resultDesc: stkCallback.ResultDesc
      }

      // If payment was successful, extract metadata
      if (stkCallback.ResultCode === 0 && stkCallback.CallbackMetadata) {
        const metadata = {}
        stkCallback.CallbackMetadata.Item.forEach(item => {
          metadata[item.Name] = item.Value
        })

        result.amount = metadata.Amount
        result.mpesaReceiptNumber = metadata.MpesaReceiptNumber
        result.transactionDate = metadata.TransactionDate
        result.phoneNumber = metadata.PhoneNumber
      }

      return result
    } catch (error) {
      console.error('Error processing callback:', error)
      throw new Error('Failed to process M-Pesa callback')
    }
  }
}

export default new MpesaService()