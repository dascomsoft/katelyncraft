import CategoryCard from './CategoryCard'
import { Category } from '@/types'
import { Gem, Sparkles, Crown } from 'lucide-react'

interface CategoryGridProps {
  categories: Category[]
  loading?: boolean
}

export default function CategoryGrid({
  categories,
  loading = false,
}: CategoryGridProps) {
  /* ═══════════════════════════════════════
     CHARGEMENT — SQUELETTES "ÉCRIN"
  ═══════════════════════════════════════ */
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-6 md:p-7"
          >
            {/* Avatar circulaire skeleton */}
            <div className="relative mx-auto mb-5">
              <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#B8925A]/20 bg-[#FAF6EF] md:h-28 md:w-28">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#E8D5D0]/60 via-[#FAF6EF] to-[#D4B87A]/30" />
                {/* Sceau doré central */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-8 w-8 animate-pulse rounded-full border border-[#B8925A]/25 bg-[#FDFBF7]/70" />
                </div>
              </div>
            </div>

            {/* Titre skeleton */}
            <div className="mx-auto mb-3 h-4 w-3/5 animate-pulse rounded-full bg-[#E8D5D0]/50" />

            {/* Description skeleton (2 lignes) */}
            <div className="mx-auto mb-2 h-3 w-4/5 animate-pulse rounded-full bg-[#FAF6EF]" />
            <div className="mx-auto mb-5 h-3 w-3/5 animate-pulse rounded-full bg-[#FAF6EF]" />

            {/* CTA skeleton */}
            <div className="mx-auto h-3 w-1/3 animate-pulse rounded-full bg-[#D4B87A]/30" />
          </div>
        ))}
      </div>
    )
  }

  /* ═══════════════════════════════════════
     ÉTAT VIDE
  ═══════════════════════════════════════ */
  if (categories.length === 0) {
    return (
      <div className="rounded-3xl border border-[#B8925A]/15 bg-white px-6 py-16 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
          <Gem className="h-7 w-7 text-[#B8925A]" />
        </div>
        <p className="mb-1 font-serif text-lg text-[#2A1520]">
          Aucune collection disponible
        </p>
        <p className="text-sm leading-relaxed text-[#5B4A50]">
          De nouvelles créations arrivent bientôt à l&apos;atelier.
        </p>
      </div>
    )
  }

  /* ═══════════════════════════════════════
     GRILLE DE CATÉGORIES
  ═══════════════════════════════════════ */
  return (
    <div>
      {/* Bandeau signature (desktop) */}
      <div className="mb-8 hidden items-center justify-center gap-3 text-[10px] uppercase tracking-[0.28em] text-[#8B7B7F] md:flex">
        <Sparkles className="h-3 w-3 text-[#B8925A]" />
        <span>Collection</span>
        <span className="font-serif text-xs font-semibold normal-case tracking-normal text-[#B8925A]">
          {categories.length}
        </span>
        <span>
          univers à explorer
        </span>
        <Crown className="h-3 w-3 text-[#B8925A]" />
      </div>

      {/* Grille */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {categories.map((category) => (
          <CategoryCard key={category._id} category={category} />
        ))}
      </div>
    </div>
  )
}