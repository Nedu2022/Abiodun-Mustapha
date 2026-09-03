import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Send, Calendar, Clock, User, Mail, Phone, MessageSquare, Briefcase, Loader2, MapPin, Monitor, Users, Mic } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { site } from '../data/content'

const DELIVERY_OPTIONS = ['Face-to-Face', 'Online', 'Live', 'Pre-recorded']

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-[14px] text-slate-800 outline-none transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500/20 placeholder:text-slate-400'

const labelClass =
  'flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500'

export default function BookingModal() {
  const { isOpen, initialService, closeBookingModal } = useBooking()

  const [formData, setFormData] = useState({
    email: '',
    convenerName: '',
    phone: '',
    topic: '',
    sessionDate: '',
    sessionTime: '',
    attendance: '',
    ageBracket: '',
    audienceKnowledge: '',
    deliveryMethods: [],
    onlinePlatform: '',
    physicalAddress: '',
    gadgets: '',
    whyMe: '',
    expectations: '',
    canPromote: '',
  })

  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('')

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

  const toggleDelivery = (option) => {
    setFormData((prev) => {
      const current = prev.deliveryMethods
      const updated = current.includes(option)
        ? current.filter((o) => o !== option)
        : [...current, option]
      return { ...prev, deliveryMethods: updated }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMessage('')

    try {
      const response = await fetch('https://formsubmit.co/ajax/abiodunmustapha11@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Speaking Invitation from ${formData.convenerName} — Dr. Abiodun Mustapha Website`,
          _template: 'table',
          _captcha: 'false',
          'Email': formData.email,
          'Name of Convener/Organizer': formData.convenerName,
          'Phone Number of Contact Person': formData.phone,
          'What would I be speaking on?': formData.topic,
          'When is this session expected to hold?': formData.sessionDate,
          'What time am I expected to come up?': formData.sessionTime,
          'How many people expected?': formData.attendance || 'Not specified',
          'Age bracket of audience': formData.ageBracket || 'Not specified',
          'What do your audience know about the subject?': formData.audienceKnowledge || 'Not specified',
          'Delivery Method': formData.deliveryMethods.join(', ') || 'Not specified',
          'If online, platform(s)': formData.onlinePlatform || 'N/A',
          'If physical, address': formData.physicalAddress || 'N/A',
          'If physical, gadgets available': formData.gadgets || 'N/A',
          'Why have you considered me?': formData.whyMe,
          'Expectations at the end of the session': formData.expectations,
          'Can I talk about my products/services?': formData.canPromote || 'Not answered',
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({
          email: '',
          convenerName: '',
          phone: '',
          topic: '',
          sessionDate: '',
          sessionTime: '',
          attendance: '',
          ageBracket: '',
          audienceKnowledge: '',
          deliveryMethods: [],
          onlinePlatform: '',
          physicalAddress: '',
          gadgets: '',
          whyMe: '',
          expectations: '',
          canPromote: '',
        })
      } else {
        throw new Error('Failed to send. Please try again.')
      }
    } catch (err) {
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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-6 py-5 sm:px-8">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-600">
                  Speaking Invitation
                </span>
                <h3 className="font-display text-2xl text-slate-900">Invite Abiodun Mustapha</h3>
              </div>
              <button
                type="button"
                onClick={closeBookingModal}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-400 transition-colors hover:border-slate-300 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="max-h-[80vh] overflow-y-auto p-6 sm:p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="font-display text-3xl text-slate-900">Invitation Sent!</h4>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-slate-600">
                    Thank you for your invitation. Your request has been delivered directly to{' '}
                    <strong className="text-amber-600">{site.email}</strong>. Dr. Abiodun Mustapha or his team will get back to you shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 rounded-full bg-amber-600 px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-amber-700 cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  <p className="rounded-lg bg-amber-50 px-4 py-3 text-[14px] leading-relaxed text-amber-900 border border-amber-100">
                    Thank you for choosing to invite me to speak at your event. As a means to aid an excellent delivery and proper preparation, kindly help fill this form. I celebrate you.
                  </p>

                  {/* ── Section 1: Contact Information ── */}
                  <fieldset className="flex flex-col gap-4">
                    <legend className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-600 mb-2">Contact Information</legend>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        <Mail className="h-3.5 w-3.5 text-amber-500" /> Email *
                      </label>
                      <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          <User className="h-3.5 w-3.5 text-amber-500" /> Name of Convener/Organizer *
                        </label>
                        <input type="text" name="convenerName" required value={formData.convenerName} onChange={handleChange} placeholder="e.g. John Doe" className={inputClass} />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          <Phone className="h-3.5 w-3.5 text-amber-500" /> Phone Number of Contact Person *
                        </label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+234..." className={inputClass} />
                      </div>
                    </div>
                  </fieldset>

                  {/* ── Section 2: Event Details ── */}
                  <fieldset className="flex flex-col gap-4 border-t border-slate-100 pt-5">
                    <legend className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-600 mb-2">Event Details</legend>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        <MessageSquare className="h-3.5 w-3.5 text-amber-500" /> What would I be speaking on? *
                      </label>
                      <input type="text" name="topic" required value={formData.topic} onChange={handleChange} placeholder="Topic or theme of your event" className={inputClass} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          <Calendar className="h-3.5 w-3.5 text-amber-500" /> When is this session expected to hold? *
                        </label>
                        <input type="date" name="sessionDate" required value={formData.sessionDate} onChange={handleChange} className={inputClass} />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          <Clock className="h-3.5 w-3.5 text-amber-500" /> What time am I expected to come up? *
                        </label>
                        <input type="time" name="sessionTime" required value={formData.sessionTime} onChange={handleChange} className={inputClass} />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          <Users className="h-3.5 w-3.5 text-amber-500" /> How many people are expected?
                        </label>
                        <input type="text" name="attendance" value={formData.attendance} onChange={handleChange} placeholder="e.g. 200" className={inputClass} />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          <Users className="h-3.5 w-3.5 text-amber-500" /> Age bracket of the audience?
                        </label>
                        <input type="text" name="ageBracket" value={formData.ageBracket} onChange={handleChange} placeholder="e.g. 25-45" className={inputClass} />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        <MessageSquare className="h-3.5 w-3.5 text-amber-500" /> What do your audience know about the subject?
                      </label>
                      <textarea name="audienceKnowledge" rows={2} value={formData.audienceKnowledge} onChange={handleChange} placeholder="Brief background of the audience's familiarity..." className={`${inputClass} resize-none`} />
                    </div>
                  </fieldset>

                  {/* ── Section 3: Delivery Method ── */}
                  <fieldset className="flex flex-col gap-4 border-t border-slate-100 pt-5">
                    <legend className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-600 mb-2">Delivery Method</legend>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        <Monitor className="h-3.5 w-3.5 text-amber-500" /> What will be the means of delivering my presentation? *
                      </label>
                      <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {DELIVERY_OPTIONS.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => toggleDelivery(option)}
                            className={`cursor-pointer rounded-lg border px-3 py-2.5 text-[13px] font-medium transition-all ${
                              formData.deliveryMethods.includes(option)
                                ? 'border-amber-500 bg-amber-50 text-amber-700'
                                : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        <Monitor className="h-3.5 w-3.5 text-amber-500" /> If online, what platform(s) would I be using?
                      </label>
                      <input type="text" name="onlinePlatform" value={formData.onlinePlatform} onChange={handleChange} placeholder="e.g. Zoom, Google Meet, Teams" className={inputClass} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        <MapPin className="h-3.5 w-3.5 text-amber-500" /> If physical, type the detailed address of your event
                      </label>
                      <textarea name="physicalAddress" rows={2} value={formData.physicalAddress} onChange={handleChange} placeholder="Full address and description of the venue..." className={`${inputClass} resize-none`} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        <Mic className="h-3.5 w-3.5 text-amber-500" /> If physical, what gadgets are available for my session?
                      </label>
                      <input type="text" name="gadgets" value={formData.gadgets} onChange={handleChange} placeholder="e.g. Microphone, wireless mic, projector, laptop, etc." className={inputClass} />
                    </div>
                  </fieldset>

                  {/* ── Section 4: Purpose & Expectations ── */}
                  <fieldset className="flex flex-col gap-4 border-t border-slate-100 pt-5">
                    <legend className="text-[11px] font-bold uppercase tracking-[0.18em] text-amber-600 mb-2">Purpose & Expectations</legend>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        <MessageSquare className="h-3.5 w-3.5 text-amber-500" /> Why have you considered me to speak on this subject? *
                      </label>
                      <textarea name="whyMe" required rows={2} value={formData.whyMe} onChange={handleChange} placeholder="Share your reason..." className={`${inputClass} resize-none`} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        <MessageSquare className="h-3.5 w-3.5 text-amber-500" /> What is/are your expectation(s) at the end of my session? *
                      </label>
                      <textarea name="expectations" required rows={2} value={formData.expectations} onChange={handleChange} placeholder="What should the audience take away?" className={`${inputClass} resize-none`} />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className={labelClass}>
                        <Briefcase className="h-3.5 w-3.5 text-amber-500" /> Can I talk about my products/services during my session?
                      </label>
                      <div className="mt-1 flex gap-3">
                        {['Yes', 'No'].map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, canPromote: opt }))}
                            className={`cursor-pointer rounded-lg border px-6 py-2.5 text-[13px] font-medium transition-all ${
                              formData.canPromote === opt
                                ? 'border-amber-500 bg-amber-50 text-amber-700'
                                : 'border-slate-200 text-slate-500 hover:border-slate-300 hover:text-slate-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </fieldset>

                  {/* Error Message */}
                  {status === 'error' && (
                    <div className="rounded-lg bg-red-50 p-3 text-[13px] text-red-700 border border-red-200">
                      {errorMessage}
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="mt-2 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
                    <button
                      type="button"
                      onClick={closeBookingModal}
                      className="px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-slate-400 transition-colors hover:text-slate-600 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'submitting' || formData.deliveryMethods.length === 0}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-600 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-amber-700 disabled:opacity-50 cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-white" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          Submit Invitation
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
