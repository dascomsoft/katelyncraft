'use client'

import { ButtonHTMLAttributes, ReactNode } from 'react'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  fullWidth?: boolean
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  /* ═══════════════════════════════════════
     VARIANTES — Palette KATHELYNCRAFT
  ═══════════════════════════════════════ */
  const variants = {
    /* CTA principal — prune profond & or */
    primary:
      'bg-[#2A1520] text-[#FAF6EF] border border-[#2A1520] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] hover:bg-[#4A2540] hover:border-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]',

    /* Secondaire — crème discret sur fond clair */
    secondary:
      'bg-[#FAF6EF] text-[#2A1520] border border-[#B8925A]/25 hover:border-[#B8925A]/50 hover:bg-white',

    /* Outline — bordure dorée, fond transparent */
    outline:
      'bg-transparent text-[#B8925A] border border-[#B8925A]/40 hover:border-[#B8925A] hover:bg-[#FAF6EF] hover:text-[#2A1520]',

    /* Danger — nuance mauve profonde, jamais criard */
    danger:
      'bg-[#5B4A50] text-[#FAF6EF] border border-[#5B4A50] hover:bg-[#4A2540] hover:border-[#4A2540] shadow-[0_15px_40px_-15px_rgba(91,74,80,0.5)]',

    /* Success — doré champagne signature */
    success:
      'bg-[#D4B87A] text-[#2A1520] border border-[#D4B87A] hover:bg-[#E8D5D0] hover:border-[#E8D5D0] shadow-[0_15px_40px_-15px_rgba(212,184,122,0.5)]',
  }

  /* ═══════════════════════════════════════
     TAILLES — Pilules KATHELYNCRAFT
  ═══════════════════════════════════════ */
  const sizes = {
    sm: 'px-4 py-2 text-[11px] tracking-[0.12em]',
    md: 'px-6 py-2.5 text-xs tracking-[0.12em]',
    lg: 'px-8 py-3.5 text-sm tracking-[0.12em]',
  }

  return (
    <button
      className={`
        group relative inline-flex items-center justify-center gap-2
        rounded-full font-semibold uppercase
        transition-all duration-300
        hover:-translate-y-0.5
        active:translate-y-0
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8925A]
        disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-current
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      {...props}
    >
      {/* ═══════════════════════════════════════
          SPINNER DORÉ PENDANT LE CHARGEMENT
      ═══════════════════════════════════════ */}
      {loading && (
        <Loader2
          className="h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}

      {/* ═══════════════════════════════════════
          CONTENU (children)
      ═══════════════════════════════════════ */}
      <span className="relative inline-flex items-center gap-2">
        {children}
      </span>
    </button>
  )
}