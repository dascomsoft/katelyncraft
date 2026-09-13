'use client'

import { MessageCircle, Crown, ArrowRight } from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'

interface WhatsAppButtonProps {
  text?: string
  className?: string
  message?: string
}

export default function WhatsAppButton({
  text = 'WhatsApp',
  className = '',
  message = '',
}: WhatsAppButtonProps) {
  const { settings } = useSettings()
  const phone = settings?.whatsappNumber || '237600000000'

  const handleClick = () => {
    const url = `https://wa.me/${phone}${
      message ? `?text=${encodeURIComponent(message)}` : ''
    }`
    window.open(url, '_blank')
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Contacter KATHELYNCRAFT sur WhatsApp : ${text}`}
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#B8925A]/30 bg-[#2A1520] px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4B87A] hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8925A] ${className}`}
    >
      {/* ═══════════════════════════════════════
          DÉCOR PERLE AU SURVOL
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#D4B87A]/20 blur-xl" />
        <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-[#E8D5D0]/15 blur-xl" />
      </div>

      {/* ═══════════════════════════════════════
          ICÔNE WHATSAPP DANS CERCLE DORÉ
      ═══════════════════════════════════════ */}
      <span className="relative flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10 transition-colors duration-300 group-hover:border-[#D4B87A] group-hover:bg-[#D4B87A]">
        <MessageCircle className="h-3.5 w-3.5 text-[#D4B87A] transition-colors duration-300 group-hover:text-[#2A1520]" />
      </span>

      {/* ═══════════════════════════════════════
          TEXTE
      ═══════════════════════════════════════ */}
      <span className="relative">{text}</span>

      {/* ═══════════════════════════════════════
          FLÈCHE ANIMÉE (desktop uniquement)
      ═══════════════════════════════════════ */}
      <ArrowRight className="relative hidden h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:block" />

      {/* ═══════════════════════════════════════
          LISERÉ DORÉ INFÉRIEUR (au survol)
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-x-4 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#D4B87A] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
    </button>
  )
}