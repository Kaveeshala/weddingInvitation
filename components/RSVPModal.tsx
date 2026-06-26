'use client'
import { useState } from 'react'

interface Props { onClose: () => void }

export default function RSVPModal({ onClose }: Props) {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', attending: 'yes', guests: '1', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      style={{ background: 'rgba(44, 28, 14, 0.7)', backdropFilter: 'blur(4px)' }}
      role="dialog"
      aria-modal="true"
      aria-label="RSVP Form"
    >
      <div
        className="w-full sm:max-w-md bg-[#fdf8f2] rounded-t-3xl sm:rounded-2xl overflow-hidden shadow-2xl animate-fade-up"
        style={{ maxHeight: '90svh', overflowY: 'auto' }}
      >
        <div className="h-1.5 bg-gradient-to-r from-[#b08d57] via-[#e8cc9a] to-[#b08d57]" />

        <div className="px-7 py-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="font-body tracking-[0.3em] text-[#b08d57] text-xs uppercase">Your Response</p>
              <h2 className="font-display italic text-[#2c2c2c]" style={{ fontSize: 'clamp(1.5rem, 5vw, 2rem)' }}>
                RSVP
              </h2>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center text-[#8a7a6d] hover:bg-[#f0e6d6] transition-colors"
              aria-label="Close RSVP form"
            >
              ✕
            </button>
          </div>

          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-[#f4e8d0] flex items-center justify-center text-2xl">
                🌸
              </div>
              <p className="font-display italic text-[#b08d57]" style={{ fontSize: 'clamp(1.3rem, 4vw, 1.8rem)' }}>
                Thank you, {form.name}!
              </p>
              <p className="font-body text-[#8a7a6d] text-sm">
                {form.attending === 'yes'
                  ? 'We are so excited to celebrate with you! See you on October 12th. 💛'
                  : 'We will miss you dearly. Thank you for letting us know.'}
              </p>
              <button
                onClick={onClose}
                className="mt-4 px-8 py-3 rounded-full font-body text-sm tracking-widest uppercase text-white"
                style={{ background: 'linear-gradient(135deg, #b08d57, #d4aa7d)' }}
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="rsvp-name" className="font-body text-xs tracking-widest uppercase text-[#8a7a6d]">
                  Your Full Name
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  placeholder="e.g. Emily Johnson"
                  value={form.name}
                  onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                  className="w-full rounded-xl border border-[#e8d5c4] bg-white px-4 py-3 font-body text-sm text-[#2c2c2c] placeholder:text-[#c4b8ae] focus:outline-none focus:border-[#b08d57] focus:ring-2 focus:ring-[#b08d57]/20 transition-all"
                />
              </div>

              <fieldset>
                <legend className="font-body text-xs tracking-widest uppercase text-[#8a7a6d] mb-2">
                  Will you attend?
                </legend>
                <div className="flex gap-3">
                  {[{ v: 'yes', l: '✓ Joyfully Accept' }, { v: 'no', l: '✗ Regretfully Decline' }].map(({ v, l }) => (
                    <label
                      key={v}
                      className={`flex-1 rounded-xl border py-3 px-4 text-center cursor-pointer font-body text-xs tracking-wide transition-all
                        ${form.attending === v
                          ? 'border-[#b08d57] bg-[#f4e8d0] text-[#b08d57]'
                          : 'border-[#e8d5c4] bg-white text-[#8a7a6d] hover:border-[#d4aa7d]'
                        }`}
                    >
                      <input
                        type="radio"
                        name="attending"
                        value={v}
                        checked={form.attending === v}
                        onChange={() => setForm(p => ({ ...p, attending: v }))}
                        className="sr-only"
                      />
                      {l}
                    </label>
                  ))}
                </div>
              </fieldset>

              {form.attending === 'yes' && (
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="rsvp-guests" className="font-body text-xs tracking-widest uppercase text-[#8a7a6d]">
                    Number of Guests
                  </label>
                  <select
                    id="rsvp-guests"
                    value={form.guests}
                    onChange={e => setForm(p => ({ ...p, guests: e.target.value }))}
                    className="w-full rounded-xl border border-[#e8d5c4] bg-white px-4 py-3 font-body text-sm text-[#2c2c2c] focus:outline-none focus:border-[#b08d57] focus:ring-2 focus:ring-[#b08d57]/20"
                  >
                    {['1', '2', '3', '4'].map(n => (
                      <option key={n} value={n}>{n} {n === '1' ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-col gap-1.5">
                <label htmlFor="rsvp-msg" className="font-body text-xs tracking-widest uppercase text-[#8a7a6d]">
                  Message to the Couple <span className="normal-case tracking-normal">(optional)</span>
                </label>
                <textarea
                  id="rsvp-msg"
                  rows={3}
                  placeholder="Share your wishes…"
                  value={form.message}
                  onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                  className="w-full rounded-xl border border-[#e8d5c4] bg-white px-4 py-3 font-body text-sm text-[#2c2c2c] placeholder:text-[#c4b8ae] focus:outline-none focus:border-[#b08d57] focus:ring-2 focus:ring-[#b08d57]/20 resize-none transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl font-body tracking-[0.2em] text-sm uppercase text-white font-medium hover:scale-[1.02] active:scale-[0.98] transition-transform"
                style={{ background: 'linear-gradient(135deg, #b08d57, #d4aa7d)' }}
              >
                Send RSVP
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}