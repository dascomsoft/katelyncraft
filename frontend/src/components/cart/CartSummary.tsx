'use client'

import { Gem, Gift, ShieldCheck, Crown, ArrowRight, Sparkles } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

interface CartSummaryProps {
  onCheckout: () => void
  isProcessing?: boolean
}

export default function CartSummary({
  onCheckout,
  isProcessing = false,
}: CartSummaryProps) {
  const { total, totalItems } = useCart()

  return (
    <div className="sticky top-24 overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)]">
      {/* ═══════════════════════════════════════
          DÉCOR PERLES
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#D4B87A]/10 blur-2xl" />
        <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-[#E8D5D0]/25 blur-2xl" />
      </div>

      {/* ═══════════════════════════════════════
          LISERÉ DORÉ SUPÉRIEUR
      ═══════════════════════════════════════ */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

      <div className="relative p-6">
        {/* ═══════════════ EN-TÊTE ═══════════════ */}
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF]">
            <Gem className="h-4.5 w-4.5 text-[#B8925A]" />
          </div>
          <div>
            <h2 className="font-serif text-lg leading-tight text-[#2A1520]">
              Votre écrin
            </h2>
            <p className="text-[10px] uppercase tracking-[0.22em] text-[#8B7B7F]">
              Récapitulatif
            </p>
          </div>
        </div>

        {/* ═══════════════ DÉTAIL ═══════════════ */}
        <div className="space-y-3 border-b border-[#B8925A]/15 pb-5">
          {/* Sous-total */}
          <div className="flex items-baseline justify-between gap-3">
            <span className="text-[13px] text-[#5B4A50]">
              Sous-total{' '}
              <span className="text-[#8B7B7F]">
                · {totalItems} pièce{totalItems > 1 ? 's' : ''}
              </span>
            </span>
            <span className="font-serif text-sm font-semibold tabular-nums text-[#2A1520]">
              {total.toLocaleString()} FCFA
            </span>
          </div>

          {/* Livraison */}
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[13px] text-[#5B4A50]">
              <Gift className="h-3.5 w-3.5 text-[#B8925A]" />
              Écrin signature
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8925A]">
              <Sparkles className="h-2.5 w-2.5" />
              Offert
            </span>
          </div>

          {/* Paiement sécurisé */}
          <div className="flex items-center justify-between gap-3">
            <span className="flex items-center gap-2 text-[13px] text-[#5B4A50]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#B8925A]" />
              Paiement à la livraison
            </span>
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
              Disponible
            </span>
          </div>
        </div>

        {/* ═══════════════ TOTAL ═══════════════ */}
        <div className="flex items-baseline justify-between gap-3 py-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8B7B7F]">
            Total estimé
          </span>
          <span className="font-serif text-2xl font-semibold text-[#2A1520]">
            {total.toLocaleString()}{' '}
            <span className="text-sm text-[#B8925A]">FCFA</span>
          </span>
        </div>

        {/* ═══════════════ BOUTON CHECKOUT ═══════════════ */}
        <button
          onClick={onCheckout}
          disabled={isProcessing || totalItems === 0}
          className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#2A1520] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#2A1520] disabled:hover:shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)]"
        >
          {isProcessing ? (
            <>
              <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#D4B87A]/40 border-t-[#D4B87A]" />
              Traitement…
            </>
          ) : (
            <>
              <Crown className="h-3.5 w-3.5" />
              Commander sur WhatsApp
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </>
          )}
        </button>

        {/* ═══════════════ SIGNATURE BAS ═══════════════ */}
        <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#B8925A]/15 pt-4 text-[10px] uppercase tracking-[0.24em] text-[#8B7B7F]">
          <Gift className="h-3 w-3 text-[#B8925A]" />
          <span>Fait main · Édition limitée</span>
          <Gem className="h-3 w-3 text-[#B8925A]" />
        </div>
      </div>
    </div>
  )
}