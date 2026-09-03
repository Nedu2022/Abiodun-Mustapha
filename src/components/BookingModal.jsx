import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Send, Calendar, User, Mail, Phone, MessageSquare, Briefcase, Loader2 } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { site } from '../data/content'

const SERVICES = [
  'One-on-One Executive Coaching (90-min)',
  'Speaking Engagement / Keynote Talk',
  'Corporate Training & Workshop',
  'Purpose Mastery Masterclass',
  'Media / Podcast Interview',
  'General Enquiry',
]

export default function BookingModal() {
  const { isOpen, initialService, closeBookingModal } = useBooking()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: SERVICES[0],
    preferredDate: '',
    message: '',
  })

  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (initialService) {
      const match = SERVICES.find((s) => s.toLowerCase().includes(initialService.toLowerCase()))
      if (match) {
        setFormData((prev) => ({ ...prev, service: match }))
      }
    }
  }, [initialService])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      // Use FormSubmit AJAX endpoint for zero-backend email delivery to abiodunmustapha11@gmail.com
      const response = await fetch('https://formsubmit.co/ajax/abiodunmustapha11@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `New Booking Request from ${formData.name} - Dr. Abiodun Mustapha Website`,
          _template: 'table',
          _captcha: 'false',
          'Full Name': formData.name,
          'Email Address': formData.email,
          'Phone / WhatsApp': formData.phone,
          'Selected Service': formData.service,
          'Preferred Date': formData.preferredDate || 'Not specified',
          'Message / Objectives': formData.message,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: SERVICES[0],
          preferredDate: '',
          message: '',
        })
      } else {
        throw new Error('Failed to send email. Please try again.')
      }
    } catch (err) {
      // Fallback: Mailto link if offline or blocked
      console.error(err)
      setStatus('error')
      setErrorMessage(err.message || 'Something went wrong. Please try again or email directly.')
    }
  }

  const handleReset = () => {
    setStatus('idle')
    setErrorMessage('')
    closeBookingModal()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBookingModal}
            className="fixed inset-0 bg-charcoal/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-gold/30 bg-charcoal text-cream shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-cream/10 bg-charcoal-light px-6 py-5 sm:px-8">
              <div>
                <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold">
                  Reserve Your Spot
                </span>
                <h3 className="font-display text-2xl text-cream">Book a Session</h3>
              </div>
              <button
                type="button"
                onClick={closeBookingModal}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-colors hover:border-gold hover:text-cream"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20 text-gold">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="font-display text-3xl text-cream">Booking Request Sent!</h4>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-cream/80">
                    Thank you for reaching out. Your request has been delivered directly to{' '}
                    <strong className="text-gold">{site.email}</strong>. Dr. Abiodun Mustapha or his team will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 rounded-full bg-gold px-8 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-gold-bright"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <p className="text-[14px] leading-relaxed text-cream/70">
                    Fill out the form below to book a coaching session, invite Dr. Abiodun Mustapha to speak, or request custom corporate training.
                  </p>

                  {/* Name & Email */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70">
                        <User className="h-3.5 w-3.5 text-gold" /> Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className="w-full rounded-lg border border-cream/20 bg-charcoal-light px-4 py-3 text-[14px] text-cream outline-none transition-colors focus:border-gold"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70">
                        <Mail className="h-3.5 w-3.5 text-gold" /> Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                        className="w-full rounded-lg border border-cream/20 bg-charcoal-light px-4 py-3 text-[14px] text-cream outline-none transition-colors focus:border-gold"
                      />
                    </div>
                  </div>

                  {/* Phone & Service */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-1.5">
                      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70">
                        <Phone className="h-3.5 w-3.5 text-gold" /> Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+234..."
                        className="w-full rounded-lg border border-cream/20 bg-charcoal-light px-4 py-3 text-[14px] text-cream outline-none transition-colors focus:border-gold"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70">
                        <Briefcase className="h-3.5 w-3.5 text-gold" /> Session / Service Type *
                      </label>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full rounded-lg border border-cream/20 bg-charcoal-light px-4 py-3 text-[14px] text-cream outline-none transition-colors focus:border-gold"
                      >
                        {SERVICES.map((s) => (
                          <option key={s} value={s} className="bg-charcoal text-cream">
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preferred Date */}
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70">
                      <Calendar className="h-3.5 w-3.5 text-gold" /> Preferred Date (Optional)
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-cream/20 bg-charcoal-light px-4 py-3 text-[14px] text-cream outline-none transition-colors focus:border-gold"
                    />
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-cream/70">
                      <MessageSquare className="h-3.5 w-3.5 text-gold" /> Key Objectives / Message *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={3}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share a brief overview of your goals, event details, or what you wish to discuss..."
                      className="w-full rounded-lg border border-cream/20 bg-charcoal-light px-4 py-3 text-[14px] text-cream outline-none transition-colors focus:border-gold resize-none"
                    />
                  </div>

                  {/* Error Message */}
                  {status === 'error' && (
                    <div className="rounded-lg bg-red-900/40 p-3 text-[13px] text-red-200 border border-red-500/30">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="mt-2 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={closeBookingModal}
                      className="px-5 py-3 text-[12px] font-medium uppercase tracking-[0.12em] text-cream/70 transition-colors hover:text-cream"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gold px-7 py-3.5 text-[12px] font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-gold-bright disabled:opacity-50"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Booking Request
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
