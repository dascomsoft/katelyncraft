'use client'

import { LucideIcon, TrendingUp, TrendingDown, Minus, Sparkles } from 'lucide-react'

interface DashboardStatsProps {
  title: string
  value: number | string
  icon: LucideIcon
  color: string
  change?: string
  changeType?: 'increase' | 'decrease'
}

export default function DashboardStats({
  title,
  value,
  icon: Icon,
  color,
  change,
  changeType,
}: DashboardStatsProps) {
  const isIncrease = changeType === 'increase'
  const isDecrease = changeType === 'decrease'

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-6 shadow-[0_20px_50px_-25px_rgba(74,37,64,0.15)] transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.3)]">
      {/* ═══════════════════════════════════════
          DÉCOR PERLES EN ARRIÈRE-PLAN
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D4B87A]/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#E8D5D0]/20 blur-2xl" />
      </div>

      {/* ═══════════════════════════════════════
          LISERÉ DORÉ SUPÉRIEUR (au survol)
      ═══════════════════════════════════════ */}
      <div className="absolute inset-x-6 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#B8925A] to-transparent transition-transform duration-700 group-hover:scale-x-100" />

      <div className="relative">
        {/* ═══════════════════════════════════════
            LIGNE PRINCIPALE : TITRE + ICÔNE
        ═══════════════════════════════════════ */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            {/* Titre */}
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 flex-shrink-0 text-[#B8925A]" />
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]">
                {title}
              </p>
            </div>

            {/* Valeur */}
            <p className="mt-3 font-serif text-3xl font-semibold leading-none text-[#2A1520] md:text-[2rem]">
              {value}
            </p>
          </div>

          {/* Icône */}
          <div
            className={`relative flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF] transition-all duration-500 group-hover:border-[#B8925A] group-hover:bg-[#B8925A] group-hover:shadow-[0_15px_35px_-15px_rgba(184,146,90,0.5)] ${color} bg-opacity-10`}
          >
            <Icon
              className={`h-5 w-5 ${color.replace('bg-', 'text-')} transition-colors duration-500 group-hover:text-white`}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════
            LIGNE SECONDAIRE : ÉVOLUTION
        ═══════════════════════════════════════ */}
        {change && (
          <div className="mt-5 flex items-center gap-2 border-t border-[#B8925A]/15 pt-4">
            {/* Badge d'évolution */}
            <span
              className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-colors duration-300 ${
                isIncrease
                  ? 'border-[#B8925A]/40 bg-[#B8925A]/10 text-[#B8925A]'
                  : isDecrease
                  ? 'border-[#8B7B7F]/40 bg-[#FAF6EF] text-[#8B7B7F]'
                  : 'border-[#8B7B7F]/25 bg-[#FAF6EF] text-[#8B7B7F]'
              }`}
            >
              {isIncrease ? (
                <TrendingUp className="h-3 w-3" />
              ) : isDecrease ? (
                <TrendingDown className="h-3 w-3" />
              ) : (
                <Minus className="h-3 w-3" />
              )}
              {change}
            </span>

            {/* Contexte */}
            <span className="truncate text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
              vs mois dernier
            </span>
          </div>
        )}
      </div>
    </div>
  )
}