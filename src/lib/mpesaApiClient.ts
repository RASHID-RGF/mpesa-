// Use relative URL in production (same domain), or configured URL in development
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || ''

export interface STKPushRequest {
  phoneNumber: string
  amount: number
  accountReference?: string
  transactionDesc?: string
}

export interface STKPushResponse {
  success: boolean
  merchantRequestId?: string
  checkoutRequestId?: string
  responseCode?: string
  responseDescription?: string
  customerMessage?: string
  error?: string
  errorCode?: string
}

export interface QueryTransactionRequest {
  checkoutRequestId: string
}

export interface QueryTransactionResponse {
  success: boolean
  merchantRequestId?: string
  checkoutRequestId?: string
  responseCode?: string
  responseDescription?: string
  resultCode?: string
  resultDesc?: string
  error?: string
}

export interface TransactionDetails {
  success: boolean
  transaction?: {
    merchantRequestId: string
    checkoutRequestId: string
    status: string
    phoneNumber: string
    amount: number
    resultCode?: string
    resultDesc?: string
    mpesaReceiptNumber?: string
    transactionDate?: string
    createdAt: string
    updatedAt: string
  }
  error?: string
}

export class MpesaApiClient {
  private static async request<T>(
    endpoint: string,
    method: string = 'GET',
    body?: any
  ): Promise<T> {
    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      }

      if (body && method !== 'GET') {
        options.body = JSON.stringify(body)
      }

      const response = await fetch(`${API_BASE_URL}${endpoint}`, options)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Request failed')
      }

      return data as T
    } catch (error) {
      console.error('API request error:', error)
      throw error instanceof Error ? error : new Error('Request failed')
    }
  }

  /**
   * Initiate STK Push payment
   */
  static async initiateSTKPush(request: STKPushRequest): Promise<STKPushResponse> {
    return this.request<STKPushResponse>('/api/mpesa/stk-push', 'POST', request)
  }

  /**
   * Query transaction status
   */
  static async queryTransaction(request: QueryTransactionRequest): Promise<QueryTransactionResponse> {
    return this.request<QueryTransactionResponse>('/api/mpesa/query', 'POST', request)
  }

  /**
   * Get transaction details
   */
  static async getTransactionDetails(checkoutRequestId: string): Promise<TransactionDetails> {
    return this.request<TransactionDetails>(`/api/mpesa/transaction/${checkoutRequestId}`)
  }

  /**
   * Check API health
   */
  static async healthCheck(): Promise<{ success: boolean; message: string; environment: string }> {
    return this.request('/api/mpesa/health')
  }

  /**
   * Poll transaction status with retry logic
   */
  static async pollTransactionStatus(
    checkoutRequestId: string,
    maxAttempts: number = 20,
    intervalMs: number = 3000
  ): Promise<QueryTransactionResponse> {
    let attempts = 0

    return new Promise((resolve, reject) => {
      const pollInterval = setInterval(async () => {
        attempts++

        try {
          const result = await this.queryTransaction({ checkoutRequestId })

          if (!result.success) {
            clearInterval(pollInterval)
            reject(new Error(result.error || 'Query failed'))
            return
          }

          // ResultCode "0" means success
          if (result.resultCode === '0') {
            clearInterval(pollInterval)
            resolve(result)
          }
          // ResultCode "1032" means user cancelled
          else if (result.resultCode === '1032') {
            clearInterval(pollInterval)
            reject(new Error('Payment cancelled by user'))
          }
          // Other result codes mean failure (except 1037 which is pending)
          else if (result.resultCode && result.resultCode !== '1037') {
            clearInterval(pollInterval)
            reject(new Error(result.resultDesc || 'Payment failed'))
          }

          // Max attempts reached
          if (attempts >= maxAttempts) {
            clearInterval(pollInterval)
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