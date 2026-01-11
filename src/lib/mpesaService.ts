import type {
  MpesaAccessTokenResponse,
  MpesaStkPushRequest,
  MpesaStkPushResponse,
  MpesaQueryRequest,
  MpesaQueryResponse,
  MpesaTransaction
} from '../types/mpesa'
import { MpesaTransactionStatus } from '../types/mpesa'

export class MpesaService {
  private static readonly SANDBOX_URL = 'https://sandbox.safaricom.co.ke'
  private static readonly PRODUCTION_URL = 'https://api.safaricom.co.ke'
  
  private static getBaseUrl(): string {
    const env = import.meta.env.VITE_MPESA_ENVIRONMENT || 'sandbox'
    return env === 'production' ? this.PRODUCTION_URL : this.SANDBOX_URL
  }

  private static getConsumerKey(): string {
    return import.meta.env.VITE_MPESA_CONSUMER_KEY || ''
  }

  private static getConsumerSecret(): string {
    return import.meta.env.VITE_MPESA_CONSUMER_SECRET || ''
  }

  private static getBusinessShortCode(): string {
    return import.meta.env.VITE_MPESA_BUSINESS_SHORT_CODE || '174379'
  }

  private static getPassKey(): string {
    return import.meta.env.VITE_MPESA_PASSKEY || ''
  }

  private static getCallbackUrl(): string {
    return import.meta.env.VITE_MPESA_CALLBACK_URL || ''
  }

  private static generateTimestamp(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    return `${year}${month}${day}${hours}${minutes}${seconds}`
  }

  private static generatePassword(timestamp: string): string {
    const shortCode = this.getBusinessShortCode()
    const passKey = this.getPassKey()
    const str = `${shortCode}${passKey}${timestamp}`
    return btoa(str)
  }

  private static formatPhoneNumber(phone: string): string {
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
  static async getAccessToken(): Promise<string> {
    const url = `${this.getBaseUrl()}/oauth/v1/generate?grant_type=client_credentials`
    const auth = btoa(`${this.getConsumerKey()}:${this.getConsumerSecret()}`)

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        throw new Error(`Failed to get access token: ${response.statusText}`)
      }

      const data: MpesaAccessTokenResponse = await response.json()
      return data.access_token
    } catch (error) {
      console.error('Error getting M-Pesa access token:', error)
      throw new Error('Failed to authenticate with M-Pesa')
    }
  }

  /**
   * Initiate STK Push (Lipa Na M-Pesa Online)
   */
  static async initiateSTKPush(
    phoneNumber: string,
    amount: number,
    accountReference: string,
    transactionDesc: string
  ): Promise<MpesaStkPushResponse> {
    const accessToken = await this.getAccessToken()
    const timestamp = this.generateTimestamp()
    const password = this.generatePassword(timestamp)
    const formattedPhone = this.formatPhoneNumber(phoneNumber)

    const requestBody: MpesaStkPushRequest = {
      BusinessShortCode: this.getBusinessShortCode(),
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),
      PartyA: formattedPhone,
      PartyB: this.getBusinessShortCode(),
      PhoneNumber: formattedPhone,
      CallBackURL: this.getCallbackUrl(),
      AccountReference: accountReference,
      TransactionDesc: transactionDesc
    }

    try {
      const url = `${this.getBaseUrl()}/mpesa/stkpush/v1/processrequest`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        console.error('M-Pesa STK Push error:', errorData)
        throw new Error(`Failed to initiate M-Pesa payment: ${response.statusText}`)
      }

      const data: MpesaStkPushResponse = await response.json()
      
      // Check if the request was successful
      if (data.ResponseCode !== '0') {
        throw new Error(data.ResponseDescription || 'Failed to initiate payment')
      }

      return data
    } catch (error) {
      console.error('Error initiating STK push:', error)
      throw error instanceof Error ? error : new Error('Failed to initiate M-Pesa payment')
    }
  }

  /**
   * Query STK Push transaction status
   */
  static async queryTransactionStatus(checkoutRequestId: string): Promise<MpesaQueryResponse> {
    const accessToken = await this.getAccessToken()
    const timestamp = this.generateTimestamp()
    const password = this.generatePassword(timestamp)

    const requestBody: MpesaQueryRequest = {
      BusinessShortCode: this.getBusinessShortCode(),
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId
    }

    try {
      const url = `${this.getBaseUrl()}/mpesa/stkpushquery/v1/query`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`Failed to query transaction: ${response.statusText}`)
      }

      const data: MpesaQueryResponse = await response.json()
      return data
    } catch (error) {
      console.error('Error querying transaction status:', error)
      throw new Error('Failed to check payment status')
    }
  }

  /**
   * Save M-Pesa transaction to local storage
   */
  static saveTransaction(transaction: MpesaTransaction): void {
    const transactions = this.getTransactions()
    transactions.push(transaction)
    localStorage.setItem('mpesa_transactions', JSON.stringify(transactions))
  }

  /**
   * Get all M-Pesa transactions from local storage
   */
  static getTransactions(): MpesaTransaction[] {
    try {
      const stored = localStorage.getItem('mpesa_transactions')
      if (!stored) return []
      
      const transactions = JSON.parse(stored)
      return transactions.map((tx: any) => ({
        ...tx,
        createdAt: new Date(tx.createdAt),
        updatedAt: new Date(tx.updatedAt)
      }))
    } catch (error) {
      console.error('Error loading M-Pesa transactions:', error)
      return []
    }
  }

  /**
   * Get transaction by checkout request ID
   */
  static getTransactionByCheckoutId(checkoutRequestId: string): MpesaTransaction | null {
    const transactions = this.getTransactions()
    return transactions.find(tx => tx.checkoutRequestId === checkoutRequestId) || null
  }

  /**
   * Update transaction status
   */
  static updateTransactionStatus(
    checkoutRequestId: string,
    status: MpesaTransactionStatus,
    resultCode?: string,
    resultDesc?: string,
    mpesaReceiptNumber?: string
  ): void {
    const transactions = this.getTransactions()
    const index = transactions.findIndex(tx => tx.checkoutRequestId === checkoutRequestId)
    
    if (index !== -1) {
      transactions[index] = {
        ...transactions[index],
        status,
        resultCode,
        resultDesc,
        mpesaReceiptNumber,
        updatedAt: new Date()
      }
      localStorage.setItem('mpesa_transactions', JSON.stringify(transactions))
    }
  }

  /**
   * Poll transaction status with retry logic
   */
  static async pollTransactionStatus(
    checkoutRequestId: string,
    maxAttempts: number = 20,
    intervalMs: number = 3000
  ): Promise<MpesaTransaction> {
    let attempts = 0

    return new Promise((resolve, reject) => {
      const pollInterval = setInterval(async () => {
        attempts++

        try {
          const queryResponse = await this.queryTransactionStatus(checkoutRequestId)
          
          // ResultCode "0" means success
          if (queryResponse.ResultCode === '0') {
            clearInterval(pollInterval)
            this.updateTransactionStatus(
              checkoutRequestId,
              MpesaTransactionStatus.SUCCESS,
              queryResponse.ResultCode,
              queryResponse.ResultDesc
            )
            const transaction = this.getTransactionByCheckoutId(checkoutRequestId)
            if (transaction) {
              resolve(transaction)
            }
          }
          // ResultCode "1032" means user cancelled
          else if (queryResponse.ResultCode === '1032') {
            clearInterval(pollInterval)
            this.updateTransactionStatus(
              checkoutRequestId,
              MpesaTransactionStatus.CANCELLED,
              queryResponse.ResultCode,
              queryResponse.ResultDesc
            )
            const transaction = this.getTransactionByCheckoutId(checkoutRequestId)
            if (transaction) {
              reject(new Error('Payment cancelled by user'))
            }
          }
          // Other result codes mean failure
          else if (queryResponse.ResultCode && queryResponse.ResultCode !== '1037') {
            // 1037 means pending, continue polling
            clearInterval(pollInterval)
            this.updateTransactionStatus(
              checkoutRequestId,
              MpesaTransactionStatus.FAILED,
              queryResponse.ResultCode,
              queryResponse.ResultDesc
            )
            reject(new Error(queryResponse.ResultDesc || 'Payment failed'))
          }

          // Max attempts reached
          if (attempts >= maxAttempts) {
            clearInterval(pollInterval)
            this.updateTransactionStatus(
              checkoutRequestId,
              MpesaTransactionStatus.FAILED,
              'TIMEOUT',
              'Payment verification timeout'
            )
            reject(new Error('Payment verification timeout. Please check your phone and try again.'))
          }
        } catch (error) {
          console.error('Error polling transaction status:', error)
          // Continue polling on error unless max attempts reached
          if (attempts >= maxAttempts) {
            clearInterval(pollInterval)
            reject(error)
          }
        }
      }, intervalMs)
    })
  }
}