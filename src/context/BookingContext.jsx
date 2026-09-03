import { createContext, useContext, useState } from 'react'

const BookingContext = createContext()

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialService, setInitialService] = useState('')

  const openBookingModal = (service = '') => {
    setInitialService(service)
    setIsOpen(true)
  }

  const closeBookingModal = () => {
    setIsOpen(false)
    setInitialService('')
  }

  return (
    <BookingContext.Provider
      value={{
        isOpen,
        initialService,
        openBookingModal,
        closeBookingModal,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
