export const formatPrice = (price: number): string => {
  return `$${price.toLocaleString()}`
}

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  return date.toLocaleDateString('en-US', options)
}

export const formatDateRange = (startDate: Date, endDate: Date): string => {
  const startOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' }
  const endOptions: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
  return `${startDate.toLocaleDateString('en-US', startOptions)} - ${endDate.toLocaleDateString('en-US', endOptions)}`
}

export const formatPhoneNumber = (phone: string): string => {
  // Format Kenyan phone number (e.g., +254 712 345 678)
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.startsWith('254')) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9)}`
  }
  return phone
}

export const formatBookingReference = (id: number): string => {
  return `KE-${String(id).padStart(6, '0')}`
}