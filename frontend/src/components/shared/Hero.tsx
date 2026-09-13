import Link from 'next/link'
import { ArrowRight, Gem, Sparkles, Crown, Scissors } from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'

interface HeroProps {
  title?: string
  subtitle?: string
  ctaText?: string
  ctaLink?: string
}

export default function Hero({
  title,
  subtitle,
  ctaText = 'Découvrir nos produits',
  ctaLink = '/products',
}: HeroProps) {
  const { settings } = useSettings()

  return (
    <section className="relative overflow-hidden bg-[#FAF6EF]">
      {/* ═══════════════════════════════════════
          DÉCOR PERLES EN ARRIÈRE-PLAN
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-[340px] w-[340px] rounded-full bg-gradient-to-bl from-[#4A2540]/10 via-transparent to-transparent blur-3xl" />
      </div>

      {/* ═══════════════════════════════════════
          MOTIF PERLES SUBTIL (grille de cercles)
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="hero-pearls"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="24" cy="24" r="1.5" fill="#B8925A" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hero-pearls)" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════
          CONTENU
      ═══════════════════════════════════════ */}
      <div className="container relative py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl" data-aos="fade-up">
          {/* Eyebrow signature */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#B8925A]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
              Fait main · Pièces uniques
            </span>
          </div>

          {/* Titre */}
          <h1 className="mb-6 font-serif text-[2.4rem] leading-[1.05] tracking-tight text-[#2A1520] sm:text-5xl md:text-6xl lg:text-[4rem]">
            {title ||
              `Bienvenue chez ${settings?.businessName || 'KATHELYNCRAFT'}`}
          </h1>

          {/* Sous-titre */}
          <p className="mb-9 max-w-xl text-base leading-relaxed text-[#5B4A50] md:text-lg">
            {subtitle ||
              'Maison de maroquinerie artisanale — sacs de luxe en perles, façonnés à la main dans notre atelier.'}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href={ctaLink}
              className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-7 py-3.5 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
            >
              {ctaText}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link
              href="/categories"
              className="inline-flex items-center gap-2 rounded-full border border-[#2A1520]/20 bg-transparent px-7 py-3.5 text-sm font-medium text-[#2A1520] transition-all duration-300 hover:border-[#B8925A] hover:bg-white/60"
            >
              Parcourir les catégories
            </Link>
          </div>

          {/* Signatures artisanales */}
          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.24em] text-[#8B7B7F]">
            <div className="flex items-center gap-2">
              <Gem className="h-3 w-3 text-[#B8925A]" />
              <span>Perles cousues main</span>
            </div>
            <span className="hidden h-3 w-px bg-[#B8925A]/30 sm:block" />
            <div className="flex items-center gap-2">
              <Scissors className="h-3 w-3 text-[#B8925A]" />
              <span>Atelier Yaoundé</span>
            </div>
            <span className="hidden h-3 w-px bg-[#B8925A]/30 sm:block" />
            <div className="flex items-center gap-2">
              <Crown className="h-3 w-3 text-[#B8925A]" />
              <span>Édition limitée</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          BANDEAU DÉFILANT — SIGNATURE MAISON
      ═══════════════════════════════════════ */}
      <div className="relative border-t border-[#B8925A]/15 bg-[#FDFBF7]">
        <div className="container flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#8B7B7F] sm:text-[11px]">
          <span className="flex items-center gap-2">
            <Gem className="h-3.5 w-3.5 text-[#B8925A]" /> Perles premium
          </span>
          <span className="hidden h-3 w-px bg-[#B8925A]/25 sm:block" />
          <span className="flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5 text-[#B8925A]" /> Fait main
          </span>
          <span className="hidden h-3 w-px bg-[#B8925A]/25 sm:block" />
          <span className="flex items-center gap-2">
            <Crown className="h-3.5 w-3.5 text-[#B8925A]" /> Édition limitée
          </span>
          <span className="hidden h-3 w-px bg-[#B8925A]/25 sm:block" />
          <span className="flex items-center gap-2">
            <Scissors className="h-3.5 w-3.5 text-[#B8925A]" /> Atelier
          </span>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          LISERÉ DORÉ INFÉRIEUR (transition)
      ═══════════════════════════════════════ */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />
    </section>
  )
}