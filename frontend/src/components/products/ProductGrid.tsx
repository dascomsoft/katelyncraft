import ProductCard from './ProductCard'
import { Product } from '@/types'
import {
  Gem,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Crown,
} from 'lucide-react'

interface ProductGridProps {
  products: Product[]
  loading?: boolean
  pagination?: {
    page: number
    limit: number
    total: number
    pages: number
  }
  onPageChange?: (page: number) => void
}

export default function ProductGrid({
  products,
  loading = false,
  pagination,
  onPageChange,
}: ProductGridProps) {
  /* ═══════════════════════════════════════
     CHARGEMENT — SQUELETTES
  ═══════════════════════════════════════ */
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white"
          >
            {/* Image skeleton avec décor */}
            <div className="relative aspect-square overflow-hidden bg-[#FAF6EF]">
              <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-[#E8D5D0]/60 via-[#FAF6EF] to-[#D4B87A]/20" />
              {/* Petit sceau doré central */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-10 w-10 animate-pulse rounded-full border border-[#B8925A]/20 bg-[#FDFBF7]/60" />
              </div>
            </div>
            <div className="space-y-2.5 p-4">
              <div className="h-3 w-3/4 animate-pulse rounded-full bg-[#E8D5D0]/50" />
              <div className="h-4 w-1/2 animate-pulse rounded-full bg-[#D4B87A]/30" />
              <div className="mt-3 h-9 animate-pulse rounded-full bg-[#FAF6EF]" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  /* ═══════════════════════════════════════
     ÉTAT VIDE
  ═══════════════════════════════════════ */
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-[#B8925A]/15 bg-white px-6 py-16 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
          <Gem className="h-7 w-7 text-[#B8925A]" />
        </div>
        <p className="mb-1 font-serif text-lg text-[#2A1520]">
          Aucune pièce trouvée
        </p>
        <p className="text-sm leading-relaxed text-[#5B4A50]">
          Essayez d&apos;ajuster vos filtres ou parcourez d&apos;autres
          collections.
        </p>
      </div>
    )
  }

  /* ═══════════════════════════════════════
     NUMÉROS DE PAGES À AFFICHER (DESKTOP)
  ═══════════════════════════════════════ */
  const getPageNumbers = (): (number | '...')[] => {
    if (!pagination) return []
    const { page, pages } = pagination
    if (pages <= 5) return Array.from({ length: pages }, (_, i) => i + 1)

    const nums: (number | '...')[] = []
    if (page > 2) nums.push(1)
    if (page > 3) nums.push('...')
    for (let i = Math.max(1, page - 1); i <= Math.min(pages, page + 1); i++) {
      nums.push(i)
    }
    if (page < pages - 2) nums.push('...')
    if (page < pages - 1) nums.push(pages)
    return nums
  }

  return (
    <div>
      {/* ═══════════════════════════════════════
          GRILLE PRODUITS
      ═══════════════════════════════════════ */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            featured={product.featured}
          />
        ))}
      </div>

      {/* ═══════════════════════════════════════
          PAGINATION
      ═══════════════════════════════════════ */}
      {pagination && pagination.pages > 1 && (
        <div className="mt-10 md:mt-12">
          {/* ─── Liseré doré supérieur ─── */}
          <div className="mx-auto mb-6 h-px w-full max-w-md bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

          {/* ─── MOBILE : Précédent / Suivant ─── */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page === 1}
              aria-label="Page précédente"
              className="group inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] text-xs font-semibold uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#B8925A]/25 disabled:hover:bg-[#FDFBF7]"
            >
              <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
              Précédent
            </button>

            <span className="whitespace-nowrap px-1 font-serif text-sm italic text-[#8B7B7F]">
              <span className="not-italic font-semibold text-[#B8925A]">
                {pagination.page}
              </span>{' '}
              / {pagination.pages}
            </span>

            <button
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              aria-label="Page suivante"
              className="group inline-flex h-11 flex-1 items-center justify-center gap-1.5 rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] text-xs font-semibold uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#B8925A]/25 disabled:hover:bg-[#FDFBF7]"
            >
              Suivant
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* ─── DESKTOP : Pagination numérotée ─── */}
          <div className="hidden items-center justify-center gap-2 md:flex">
            {/* Précédent */}
            <button
              onClick={() => onPageChange?.(pagination.page - 1)}
              disabled={pagination.page === 1}
              aria-label="Page précédente"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#B8925A]/25 disabled:hover:bg-[#FDFBF7]"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Numéros */}
            {getPageNumbers().map((num, i) =>
              num === '...' ? (
                <span
                  key={`dots-${i}`}
                  aria-hidden="true"
                  className="inline-flex items-center justify-center px-1.5 font-serif text-sm text-[#8B7B7F]"
                >
                  ⋯
                </span>
              ) : (
                <button
                  key={num}
                  onClick={() => onPageChange?.(num)}
                  aria-label={`Aller à la page ${num}`}
                  aria-current={num === pagination.page ? 'page' : undefined}
                  className={`relative inline-flex h-9 min-w-[36px] items-center justify-center rounded-full px-3 font-serif text-sm transition-all duration-300 ${
                    num === pagination.page
                      ? 'border border-[#2A1520] bg-[#2A1520] font-semibold text-[#D4B87A] shadow-[0_10px_25px_-10px_rgba(42,21,32,0.5)]'
                      : 'border border-[#B8925A]/25 bg-[#FDFBF7] text-[#4A2540] hover:border-[#B8925A] hover:bg-[#FAF6EF]'
                  }`}
                >
                  {num}
                </button>
              )
            )}

            {/* Suivant */}
            <button
              onClick={() => onPageChange?.(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              aria-label="Page suivante"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#B8925A]/25 disabled:hover:bg-[#FDFBF7]"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          {/* ─── Signature finale ─── */}
          <div className="mt-8 hidden items-center justify-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#8B7B7F] md:flex">
            <Sparkles className="h-3 w-3 text-[#B8925A]" />
            <span>Page</span>
            <span className="font-serif text-xs font-semibold normal-case tracking-normal text-[#B8925A]">
              {pagination.page}
            </span>
            <span>sur</span>
            <span className="font-serif text-xs font-semibold normal-case tracking-normal text-[#B8925A]">
              {pagination.pages}
            </span>
            <Crown className="h-3 w-3 text-[#B8925A]" />
          </div>
        </div>
      )}
    </div>
  )
}