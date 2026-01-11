const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export interface CreateBookingRequest {
  destination_id: number
  customer_name: string
  customer_email: string
  customer_phone: string
  adults: number
  children: number
  check_in_date: string
  check_out_date: string
  special_requests?: string
  payment_method: string
  transaction_id?: string
}

export interface CreateBookingResponse {
  success: boolean
  booking_id?: number
  reference?: string
  total_amount?: number
  error?: string
}

export interface Destination {
  id: number
  name: string
  description: string
  price: number
  image: string
  location: string
  duration: string
  rating: number
}

export class BookingApiClient {
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
   * Create a new booking
   */
  static async createBooking(request: CreateBookingRequest): Promise<CreateBookingResponse> {
    return this.request<CreateBookingResponse>('/api/bookings/', 'POST', request)
  }

  /**
   * Get all destinations
   */
  static async getDestinations(): Promise<Destination[]> {
    return this.request<Destination[]>('/api/destinations/')
  }

  /**
   * Get destination details
   */
  static async getDestination(id: number): Promise<Destination> {
    return this.request<Destination>(`/api/destinations/${id}/`)
  }
}