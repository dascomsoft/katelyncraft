import Link from 'next/link'
import Image from 'next/image'
import { Gem, ArrowRight, Crown } from 'lucide-react'
import { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      aria-label={`Voir la collection ${category.name}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.35)] md:p-7"
    >
      {/* ═══════════════════════════════════════
          DÉCOR PERLES EN ARRIÈRE-PLAN
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D4B87A]/10 blur-2xl" />
        <div className="absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#E8D5D0]/20 blur-2xl" />
      </div>

      {/* ═══════════════════════════════════════
          LISERÉ DORÉ SUPÉRIEUR (au survol)
      ═══════════════════════════════════════ */}
      <div className="absolute inset-x-6 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#B8925A] to-transparent transition-transform duration-700 group-hover:scale-x-100" />

      <div className="relative flex flex-1 flex-col">
        {/* ═══════════ AVATAR CIRCULAIRE ═══════════ */}
        <div className="relative mx-auto mb-5">
          {/* Halo doré externe */}
          <div className="absolute -inset-2 rounded-full border border-[#B8925A]/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Anneau doré principal */}
          <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#B8925A]/30 bg-[#FAF6EF] transition-all duration-500 group-hover:border-[#B8925A] group-hover:shadow-[0_15px_35px_-15px_rgba(184,146,90,0.5)] md:h-28 md:w-28">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                width={112}
                height={112}
                className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/40">
                <Gem className="h-9 w-9 text-[#B8925A] md:h-10 md:w-10" />
              </div>
            )}
          </div>

          {/* Micro-badge couronne flottant (haut-droite) */}
          <div className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FDFBF7] opacity-0 shadow-sm transition-all duration-500 group-hover:opacity-100 group-hover:-translate-y-0.5">
            <Crown className="h-3.5 w-3.5 text-[#B8925A]" />
          </div>
        </div>

        {/* ═══════════ NOM ═══════════ */}
        <h3 className="mb-2 font-serif text-lg leading-tight text-[#2A1520] transition-colors duration-300 group-hover:text-[#B8925A] md:text-xl">
          {category.name}
        </h3>

        {/* ═══════════ DESCRIPTION ═══════════ */}
        {category.description && (
          <p className="mb-5 line-clamp-2 text-xs leading-relaxed text-[#5B4A50] md:text-[13px]">
            {category.description}
          </p>
        )}

        {/* ═══════════ CTA ═══════════ */}
        <div className="mt-auto inline-flex items-center justify-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#B8925A] transition-colors duration-300 group-hover:text-[#4A2540]">
          <span>Découvrir</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* ═══════════════════════════════════════
          LISERÉ DORÉ INFÉRIEUR (au survol)
      ═══════════════════════════════════════ */}
      <div className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#B8925A]/60 to-transparent transition-transform duration-700 group-hover:scale-x-100" />
    </Link>
  )
}