'use client'

import { InputHTMLAttributes, forwardRef, useId } from 'react'
import { AlertCircle } from 'lucide-react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  fullWidth?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className = '', id, ...props }, ref) => {
    const generatedId = useId()
    const inputId = id || generatedId

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {/* ═══════════════════════════════════════
            LABEL
        ═══════════════════════════════════════ */}
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
          >
            {label}
          </label>
        )}

        {/* ═══════════════════════════════════════
            INPUT
        ═══════════════════════════════════════ */}
        <input
          id={inputId}
          ref={ref}
          aria-invalid={Boolean(error) || undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={`
            w-full rounded-xl border bg-[#FDFBF7] px-4 py-3
            font-serif text-sm text-[#2A1520] placeholder-[#A89298]
            outline-none transition-all duration-300
            hover:border-[#B8925A]/40
            disabled:cursor-not-allowed disabled:bg-[#FAF6EF] disabled:opacity-60
            ${error
              ? 'border-[#B8925A]/60 bg-[#E8D5D0]/20 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/30'
              : 'border-[#B8925A]/20 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15'
            }
            ${fullWidth ? 'w-full' : ''}
            ${className}
          `}
          {...props}
        />

        {/* ═══════════════════════════════════════
            MESSAGE D'ERREUR
        ═══════════════════════════════════════ */}
        {error && (
          <div
            id={`${inputId}-error`}
            role="alert"
            className="mt-2 flex items-center gap-1.5"
          >
            <AlertCircle className="h-3 w-3 flex-shrink-0 text-[#B8925A]" />
            <p className="text-[11px] font-medium text-[#B8925A]">
              {error}
            </p>
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'
export default Input