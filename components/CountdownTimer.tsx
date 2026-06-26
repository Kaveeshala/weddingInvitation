'use client'
import { useEffect, useState } from 'react'

interface Props { targetDate: Date }

function pad(n: number) { return String(n).padStart(2, '0') }

export default function CountdownTimer({ targetDate }: Props) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const calc = () => {
      const diff = targetDate.getTime() - Date.now()

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      })
    }

    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [targetDate])

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-3 sm:gap-5" role="timer" aria-live="polite" aria-label="Wedding countdown">
      {units.map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center bg-[#fdf8f2] rounded-xl border border-[#e8d5c4] shadow-sm"
          style={{ minWidth: 'clamp(60px, 15vw, 80px)', padding: 'clamp(12px, 3vw, 16px) clamp(8px, 2vw, 12px)' }}
        >
          <span
            className="font-display text-[#b08d57] tabular-nums leading-none"
            style={{ fontSize: 'clamp(1.5rem, 5vw, 2.2rem)' }}
          >
            {pad(value)}
          </span>
          <span
            className="font-body text-[#8a7a6d] uppercase tracking-widest mt-1"
            style={{ fontSize: 'clamp(0.6rem, 2vw, 0.7rem)' }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}