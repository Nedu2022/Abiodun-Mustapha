import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, Send, Calendar, Clock, User, Mail, Phone, MessageSquare, Briefcase, Loader2, MapPin, Monitor, Users, Mic } from 'lucide-react'
import { useBooking } from '../context/BookingContext'
import { site } from '../data/content'

const DELIVERY_OPTIONS = ['Face-to-Face', 'Online', 'Live', 'Pre-recorded']

const inputClass =
  'w-full rounded-lg border border-line bg-white px-3.5 py-3 text-[14px] text-ink outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/15 placeholder:text-ink-faint'

const labelClass =
  'flex items-center gap-1.5 text-[10.5px] font-bold uppercase tracking-[0.12em] text-green-deep'

const legendClass =
  'text-[11px] font-bold uppercase tracking-[0.16em] text-gold'

const sectionClass =
  'space-y-4 border-t border-line/80 pt-5'

const optionClass = (isSelected) =>
  `cursor-pointer rounded-lg border px-3 py-2.5 text-[13px] font-bold transition-all ${
    isSelected
      ? 'border-green bg-green text-cream shadow-sm'
      : 'border-line bg-white text-ink-soft hover:border-gold hover:text-green-deep'
  }`

export default function BookingModal() {
  const { isOpen, closeBookingModal } = useBooking()

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

  const needsOnlineDetails = formData.deliveryMethods.some((method) =>
    ['Online', 'Pre-recorded'].includes(method),
  )
  const needsVenueDetails = formData.deliveryMethods.some((method) =>
    ['Face-to-Face', 'Live'].includes(method),
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-6 md:p-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeBookingModal}
            className="fixed inset-0 bg-green-deep/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative z-10 flex h-dvh w-full overflow-hidden bg-[#fbf8f1] shadow-2xl sm:h-auto sm:max-h-[90dvh] sm:max-w-4xl sm:rounded-lg md:min-h-[680px]"
          >
            <div className="hidden w-72 flex-none flex-col justify-between bg-green-deep px-6 py-6 text-cream md:flex">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold">Booking</span>
                <h3 className="mt-3 font-display text-4xl leading-[0.95] text-cream">
                  Session brief
                </h3>
                <p className="mt-4 text-[14px] leading-relaxed text-cream/70">
                  A quick note with the essentials for fit, availability, and preparation.
                </p>
              </div>

              <div className="space-y-4 border-t border-cream/15 pt-5">
                {['Speaking', 'Training', 'Coaching'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-[13px] font-bold text-cream/85">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex flex-none items-start justify-between gap-4 border-b border-line bg-[#fffdf8] px-5 py-4 sm:px-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-gold md:hidden">
                    Booking
                  </span>
                  <h3 className="font-display text-3xl leading-none text-ink">Book a session</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">
                    Share the essentials. We will take it from there.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="flex h-9 w-9 flex-none items-center justify-center rounded-full border border-line bg-white text-ink-faint transition-colors hover:border-gold hover:text-green-deep cursor-pointer"
                  aria-label="Close booking form"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {status === 'success' ? (
                <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green text-cream shadow-sm">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h4 className="font-display text-3xl text-ink">Invitation sent</h4>
                  <p className="mt-3 max-w-md text-[15px] leading-relaxed text-ink-soft">
                    Your request has been delivered to <strong className="text-gold">{site.email}</strong>.
                    Dr. Abiodun Mustapha or his team will respond shortly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-8 rounded-full bg-gold px-8 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-gold-bright cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
                  <div className="min-h-0 flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
                    <fieldset className="space-y-4">
                      <legend className={legendClass}>Your Details</legend>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>
                            <User className="h-3.5 w-3.5 text-gold" /> Organizer *
                          </label>
                          <input type="text" name="convenerName" required value={formData.convenerName} onChange={handleChange} placeholder="Name or organization" className={inputClass} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>
                            <Mail className="h-3.5 w-3.5 text-gold" /> Email *
                          </label>
                          <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputClass} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          <Phone className="h-3.5 w-3.5 text-gold" /> Phone *
                        </label>
                        <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+234..." className={inputClass} />
                      </div>
                    </fieldset>

                    <fieldset className={sectionClass}>
                      <legend className={legendClass}>Session</legend>

                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          <MessageSquare className="h-3.5 w-3.5 text-gold" /> Topic *
                        </label>
                        <input type="text" name="topic" required value={formData.topic} onChange={handleChange} placeholder="Topic or event theme" className={inputClass} />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>
                            <Calendar className="h-3.5 w-3.5 text-gold" /> Date *
                          </label>
                          <input type="date" name="sessionDate" required value={formData.sessionDate} onChange={handleChange} className={inputClass} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>
                            <Clock className="h-3.5 w-3.5 text-gold" /> Time *
                          </label>
                          <input type="time" name="sessionTime" required value={formData.sessionTime} onChange={handleChange} className={inputClass} />
                        </div>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>
                            <Users className="h-3.5 w-3.5 text-gold" /> Audience size
                          </label>
                          <input type="text" name="attendance" value={formData.attendance} onChange={handleChange} placeholder="e.g. 200" className={inputClass} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>
                            <Users className="h-3.5 w-3.5 text-gold" /> Age range
                          </label>
                          <input type="text" name="ageBracket" value={formData.ageBracket} onChange={handleChange} placeholder="e.g. 25-45" className={inputClass} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          <MessageSquare className="h-3.5 w-3.5 text-gold" /> Audience context
                        </label>
                        <textarea name="audienceKnowledge" rows={2} value={formData.audienceKnowledge} onChange={handleChange} placeholder="What do they already know?" className={`${inputClass} resize-none`} />
                      </div>
                    </fieldset>

                    <fieldset className={sectionClass}>
                      <legend className={legendClass}>Delivery</legend>

                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          <Monitor className="h-3.5 w-3.5 text-gold" /> Format *
                        </label>
                        <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
                          {DELIVERY_OPTIONS.map((option) => (
                            <button
                              key={option}
                              type="button"
                              onClick={() => toggleDelivery(option)}
                              className={optionClass(formData.deliveryMethods.includes(option))}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      {needsOnlineDetails && (
                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>
                            <Monitor className="h-3.5 w-3.5 text-gold" /> Online platform
                          </label>
                          <input type="text" name="onlinePlatform" value={formData.onlinePlatform} onChange={handleChange} placeholder="Zoom, Google Meet, Teams..." className={inputClass} />
                        </div>
                      )}

                      {needsVenueDetails && (
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>
                              <MapPin className="h-3.5 w-3.5 text-gold" /> Venue address
                            </label>
                            <textarea name="physicalAddress" rows={2} value={formData.physicalAddress} onChange={handleChange} placeholder="Full address" className={`${inputClass} resize-none`} />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className={labelClass}>
                              <Mic className="h-3.5 w-3.5 text-gold" /> Equipment
                            </label>
                            <textarea name="gadgets" rows={2} value={formData.gadgets} onChange={handleChange} placeholder="Mic, projector, laptop..." className={`${inputClass} resize-none`} />
                          </div>
                        </div>
                      )}
                    </fieldset>

                    <fieldset className={sectionClass}>
                      <legend className={legendClass}>Fit</legend>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>
                            <MessageSquare className="h-3.5 w-3.5 text-gold" /> Why Dr. Mustapha? *
                          </label>
                          <textarea name="whyMe" required rows={3} value={formData.whyMe} onChange={handleChange} placeholder="Why this session is a good fit" className={`${inputClass} resize-none`} />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className={labelClass}>
                            <MessageSquare className="h-3.5 w-3.5 text-gold" /> Desired outcome *
                          </label>
                          <textarea name="expectations" required rows={3} value={formData.expectations} onChange={handleChange} placeholder="What should people leave with?" className={`${inputClass} resize-none`} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className={labelClass}>
                          <Briefcase className="h-3.5 w-3.5 text-gold" /> Mention products?
                        </label>
                        <div className="mt-1 flex gap-3">
                          {['Yes', 'No'].map((opt) => (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, canPromote: opt }))}
                              className={optionClass(formData.canPromote === opt)}
                            >
                              {opt}
                            </button>
                          ))}
                        </div>
                      </div>
                    </fieldset>

                    {status === 'error' && (
                      <div className="rounded-lg bg-red-50 p-3 text-[13px] text-red-700 border border-red-200">
                        {errorMessage}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-none items-center justify-end gap-3 border-t border-line bg-[#fffdf8] px-5 py-4 sm:px-6">
                    <button
                      type="button"
                      onClick={closeBookingModal}
                      className="px-5 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-ink-faint transition-colors hover:text-green-deep cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={status === 'submitting' || formData.deliveryMethods.length === 0}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-green px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-cream shadow-sm transition-colors hover:bg-green-deep disabled:opacity-50 cursor-pointer"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin text-cream" />
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
