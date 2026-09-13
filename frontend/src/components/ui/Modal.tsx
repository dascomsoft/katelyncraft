'use client'

import { ReactNode, useEffect } from 'react'
import { X, Gem } from 'lucide-react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
}: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* ═══════════════════════════════════════
          CENTRAGE
      ═══════════════════════════════════════ */}
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* ═══════════════════════════════════════
            BACKDROP — Verre prune + blur
        ═══════════════════════════════════════ */}
        <div
          className="fixed inset-0 bg-[#2A1520]/60 backdrop-blur-sm transition-opacity duration-300"
          onClick={onClose}
          aria-hidden="true"
        />

        {/* ═══════════════════════════════════════
            CONTENEUR MODALE
        ═══════════════════════════════════════ */}
        <div
          role="dialog"
          aria-modal="true"
          aria-label={title || 'Modale'}
          className={`group relative w-full ${sizes[size]} overflow-hidden rounded-2xl border border-[#B8925A]/25 bg-[#FDFBF7] shadow-[0_30px_80px_-20px_rgba(42,21,32,0.5)] transition-all duration-300`}
        >
          {/* Liseré doré supérieur */}
          <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#B8925A]/60 to-transparent" />

          {/* Décor perles */}
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4B87A]/10 blur-2xl" />
            <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#E8D5D0]/25 blur-2xl" />
          </div>

          {/* ═══════════════════════════════════════
              EN-TÊTE (si title)
          ═══════════════════════════════════════ */}
          {title && (
            <div className="relative flex items-center justify-between gap-3 border-b border-[#B8925A]/15 px-5 py-4 md:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF]">
                  <Gem className="h-4 w-4 text-[#B8925A]" />
                </div>
                <h3 className="truncate font-serif text-lg leading-tight text-[#2A1520]">
                  {title}
                </h3>
              </div>

              <button
                onClick={onClose}
                aria-label="Fermer la fenêtre"
                className="group/btn flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/25 bg-transparent text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] hover:text-[#B8925A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8925A]"
              >
                <X className="h-4 w-4 transition-transform duration-300 group-hover/btn:rotate-90" />
              </button>
            </div>
          )}

          {/* ═══════════════════════════════════════
              CONTENU
          ═══════════════════════════════════════ */}
          <div className="relative px-5 py-5 md:px-6 md:py-6">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}