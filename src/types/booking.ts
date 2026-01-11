// Payment method types
export enum PaymentMethod {
  MPESA = 'mpesa',
  BANK_TRANSFER = 'bank_transfer',
  CARD = 'card'
}

// Kenyan banks
export enum KenyanBank {
  EQUITY = 'equity',
  KCB = 'kcb',
  COOPERATIVE = 'cooperative',
  NCBA = 'ncba',
  STANBIC = 'stanbic',
  STANDARD_CHARTERED = 'standard_chartered'
}

// Package types
export enum PackageType {
  STANDARD = 'standard',
  DELUXE = 'deluxe',
  PREMIUM = 'premium'
}

// Booking status
export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

// Booking steps
export enum BookingStep {
  DATES = 'dates',
  GUESTS = 'guests',
  PACKAGE = 'package',
  SIGNING = 'signing',
  PAYMENT = 'payment',
  CONFIRMATION = 'confirmation'
}

export interface ItineraryDay {
  day: number
  title: string
  description: string
}

export interface DestinationDetail {
  id: number
  name: string
  location: string
  description: string
  longDescription: string
  price: number
  images: string[]
  rating: number
  reviewCount: number
  category: 'safari' | 'beach' | 'mountain' | 'cultural'
  duration: string
  difficulty: string
  bestTime: string
  included: string[]
  itinerary: ItineraryDay[]
  whatToBring: string[]
}

export interface GuestInfo {
  fullName: string
  email: string
  phone: string
  specialRequests: string
}

export interface BookingData {
  checkInDate: Date | null
  checkOutDate: Date | null
  adults: number
  children: number
  selectedPackage: PackageType
  guestInfo: GuestInfo
}

export interface PackageOption {
  type: PackageType
  name: string
  price: number
  features: string[]
}

export interface CardDetails {
  number: string
  expiry: string
  cvv: string
  name: string
}

export interface SigningData {
  agreedToTerms: boolean
  agreedToCancellationPolicy: boolean
  agreedToPrivacyPolicy: boolean
  signedAt?: Date
}

export interface PaymentData {
  selectedMethod: PaymentMethod
  mpesaNumber?: string
  mpesaReceiptNumber?: string
  selectedBank?: KenyanBank
  cardDetails?: CardDetails
}

export interface BookingConfirmation {
  bookingId: number
  reference: string
  status: BookingStatus
  destination: string
  checkIn: Date
  checkOut: Date
  guests: number
  totalAmount: number
  paymentMethod: PaymentMethod
}

export interface Review {
  id: number
  userName: string
  userAvatar: string
  rating: number
  date: Date
  comment: string
}