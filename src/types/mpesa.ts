// M-Pesa Transaction Status
export enum MpesaTransactionStatus {
  PENDING = 'pending',
  SUCCESS = 'success',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

// M-Pesa Response Codes
export enum MpesaResponseCode {
  SUCCESS = '0',
  INSUFFICIENT_FUNDS = '1',
  LESS_THAN_MINIMUM = '2',
  MORE_THAN_MAXIMUM = '3',
  WOULD_EXCEED_DAILY_LIMIT = '4',
  WOULD_EXCEED_MINIMUM_BALANCE = '5',
  UNRESOLVED_PRIMARY_PARTY = '6',
  RECONCILIATION_ERROR = '7',
  INTERNAL_FAILURE = '8',
  UNRESOLVED_RECEIVER_PARTY = '9',
  WOULD_EXCEED_MAXIMUM_BALANCE = '10',
  INVALID_DEBIT_ACCOUNT = '11',
  INVALID_CREDIT_ACCOUNT = '12',
  UNRESOLVED_DEBIT_ACCOUNT = '13',
  UNRESOLVED_CREDIT_ACCOUNT = '14',
  DUPLICATE_DETECTED = '15',
  INTERNAL_FAILURE_16 = '16',
  UNRESOLVED_INITIATOR = '17',
  TRAFFIC_BLOCKING = '26',
  USER_CANCELLED = '1032',
  INVALID_PHONE_NUMBER = '2001',
  INVALID_ACCESS_TOKEN = '404.001.03'
}

export interface MpesaAccessTokenResponse {
  access_token: string
  expires_in: string
}

export interface MpesaStkPushRequest {
  BusinessShortCode: string
  Password: string
  Timestamp: string
  TransactionType: 'CustomerPayBillOnline'
  Amount: number
  PartyA: string
  PartyB: string
  PhoneNumber: string
  CallBackURL: string
  AccountReference: string
  TransactionDesc: string
}

export interface MpesaStkPushResponse {
  MerchantRequestID: string
  CheckoutRequestID: string
  ResponseCode: string
  ResponseDescription: string
  CustomerMessage: string
}

export interface MpesaQueryRequest {
  BusinessShortCode: string
  Password: string
  Timestamp: string
  CheckoutRequestID: string
}

export interface MpesaQueryResponse {
  ResponseCode: string
  ResponseDescription: string
  MerchantRequestID: string
  CheckoutRequestID: string
  ResultCode: string
  ResultDesc: string
}

export interface MpesaCallbackResponse {
  Body: {
    stkCallback: {
      MerchantRequestID: string
      CheckoutRequestID: string
      ResultCode: number
      ResultDesc: string
      CallbackMetadata?: {
        Item: Array<{
          Name: string
          Value: string | number
        }>
      }
    }
  }
}

export interface MpesaTransaction {
  merchantRequestId: string
  checkoutRequestId: string
  phoneNumber: string
  amount: number
  status: MpesaTransactionStatus
  resultCode?: string
  resultDesc?: string
  mpesaReceiptNumber?: string
  transactionDate?: string
  createdAt: Date
  updatedAt: Date
}