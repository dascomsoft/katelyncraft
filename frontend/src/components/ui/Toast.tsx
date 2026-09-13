'use client'

import { useEffect } from 'react'
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Gem,
} from 'lucide-react'

interface ToastProps {
  message: string
  type?: 'success' | 'error' | 'info' | 'warning'
  onClose: () => void
  duration?: number
}

export default function Toast({
  message,
  type = 'info',
  onClose,
  duration = 4000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, duration)
    return () => clearTimeout(timer)
  }, [duration, onClose])

  /* ═══════════════════════════════════════
     ICÔNES PAR TYPE (logique préservée)
  ═══════════════════════════════════════ */
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
    warning: AlertTriangle,
  }

  /* ═══════════════════════════════════════
     COULEURS PAR TYPE (palette KATHELYNCRAFT)
  ═══════════════════════════════════════ */
  const colors = {
    success: 'border-[#B8925A]/40 bg-[#FAF6EF]',
    error: 'border-[#5B4A50]/40 bg-[#E8D5D0]/40',
    info: 'border-[#B8925A]/30 bg-[#FDFBF7]',
    warning: 'border-[#D4B87A]/50 bg-[#FAF6EF]',
  }

  /* Couleur de l'icône selon le type */
  const iconColors = {
    success: 'text-[#B8925A]',
    error: 'text-[#5B4A50]',
    info: 'text-[#B8925A]',
    warning: 'text-[#D4B87A]',
  }

  /* Accent latéral gauche selon le type */
  const accentColors = {
    success: 'bg-[#B8925A]',
    error: 'bg-[#5B4A50]',
    info: 'bg-[#B8925A]',
    warning: 'bg-[#D4B87A]',
  }

  const Icon = icons[type]

  return (
    <div
      role="alert"
      aria-live="polite"
      className={`animate-slideDown fixed right-4 top-4 z-50 w-full max-w-sm overflow-hidden rounded-2xl border shadow-[0_25px_60px_-30px_rgba(74,37,64,0.35)] backdrop-blur-md ${colors[type]}`}
    >
      {/* ═══════════════════════════════════════
          ACCENT LATÉRAL GAUCHE (couleur selon type)
      ═══════════════════════════════════════ */}
      <div
        className={`absolute inset-y-0 left-0 w-0.5 ${accentColors[type]}`}
        aria-hidden="true"
      />

      {/* Décor perle subtil */}
      <div className="pointer-events-none absolute inset-0 opacity-50">
        <div className="absolute -right-8 -top-8 h-20 w-20 rounded-full bg-[#D4B87A]/15 blur-2xl" />
        <div className="absolute -bottom-8 left-1/3 h-20 w-20 rounded-full bg-[#E8D5D0]/20 blur-2xl" />
      </div>

      <div className="relative flex items-start gap-3 p-4 pl-5">
        {/* ═══════════════════════════════════════
            ICÔNE DANS CERCLE BORDÉ
        ═══════════════════════════════════════ */}
        <div
          className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border bg-white/70 ${colors[type]}`}
        >
          <Icon className={`h-4 w-4 ${iconColors[type]}`} />
        </div>

        {/* ═══════════════════════════════════════
            MESSAGE
        ═══════════════════════════════════════ */}
        <div className="min-w-0 flex-1 pt-1">
          <p className="font-serif text-[13px] leading-relaxed text-[#2A1520]">
            {message}
          </p>
          {/* Signature typographique */}
          <div className="mt-1 flex items-center gap-1.5 text-[9px] uppercase tracking-[0.24em] text-[#8B7B7F]">
            <Gem className="h-2.5 w-2.5 text-[#B8925A]" />
            <span>KATHELYNCRAFT</span>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            BOUTON FERMER
        ═══════════════════════════════════════ */}
        <button
          onClick={onClose}
          aria-label="Fermer la notification"
          className="group/btn flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-transparent text-[#8B7B7F] transition-all duration-300 hover:border-[#B8925A]/30 hover:bg-white/70 hover:text-[#B8925A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8925A]"
        >
          <X className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:rotate-90" />
        </button>
      </div>
    </div>
  )
}