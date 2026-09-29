'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import {
  ChevronRight,
  Home,
  Store,
  MapPin,
  Star,
  Phone,
  ArrowRight,
  Verified,
  Gem,
  Crown,
  Sparkles,
  Gift,
  BadgeCheck,
} from 'lucide-react'
import { sectorService, Sector } from '@/services/sectorService'
import { shopService, Shop } from '@/services/shopService'

export default function SectorPage() {
  const params = useParams()
  const slug = params.sector as string
  const [sector, setSector] = useState<Sector | null>(null)
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await sectorService.getSectorBySlug(slug)
        if (data) {
          setSector(data.sector)
          setShops(data.shops || [])
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchData()
  }, [slug])

  /* ═══════════════════════════════════════
     CHARGEMENT
  ═══════════════════════════════════════ */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FDFBF7]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-2 border-[#B8925A]/20" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#B8925A]" />
          </div>
          <p className="font-serif text-sm italic text-[#8B7B7F]">
            Ouverture du secteur…
          </p>
        </div>
      </div>
    )
  }

  /* ═══════════════════════════════════════
     SECTEUR INTROUVABLE
  ═══════════════════════════════════════ */
  if (!sector) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FDFBF7] px-4 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
          <Gem className="h-9 w-9 text-[#B8925A]" />
        </div>
        <h2 className="mb-2 font-serif text-2xl text-[#2A1520]">
          Ce secteur est introuvable
        </h2>
        <p className="mb-6 max-w-md text-sm leading-relaxed text-[#5B4A50]">
          Le secteur que vous recherchez n&apos;existe pas ou a été retiré
          de notre sélection.
        </p>
        <Link
          href="/boutiques"
          className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-6 py-3 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
        >
          <ArrowRight className="h-4 w-4 rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
          Retour aux boutiques
        </Link>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FDFBF7] text-[#2A1520]">
      {/* ═══════════════════════════════════════
          HERO — Éditorial avec gradient du secteur
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden  bg-[rgb(48,42,33)]">
        {/* Bandeau gradient du secteur (haut) */}
        <div
          className={`relative overflow-hidden bg-gradient-to-br ${sector.color}`}
        >
          {/* Décor perles */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/15 blur-3xl sm:h-80 sm:w-80" />
            <div className="absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-white/10 blur-3xl sm:h-72 sm:w-72" />
          </div>

          <div className="container relative px-4 py-10 text-white sm:py-14 md:py-16">
            {/* Fil d'Ariane */}
            <nav className="mb-5 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/75 md:text-xs">
              <Link
                href="/"
                className="flex items-center gap-1.5 transition-colors hover:text-white"
              >
                <Home className="h-3 w-3" />
                Accueil
              </Link>
              <ChevronRight className="h-3 w-3 text-white/50" />
              <Link
                href="/boutiques"
                className="transition-colors hover:text-white"
              >
                Boutiques
              </Link>
              <ChevronRight className="h-3 w-3 text-white/50" />
              <span className="font-semibold text-white">{sector.name}</span>
            </nav>

            {/* Icône du secteur */}
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/30 bg-white/10 backdrop-blur-sm sm:mb-6 sm:h-16 sm:w-16">
              <Store className="h-6 w-6 text-white sm:h-7 sm:w-7" />
            </div>

            {/* Titre */}
            <h1 className="break-words font-serif text-[1.75rem] leading-[1.1] tracking-tight text-white sm:text-4xl sm:leading-[1.05] md:text-5xl">
              {sector.name}
            </h1>

            {/* Description */}
            <p className="mt-4 max-w-2xl text-[14px] leading-relaxed text-white/85 sm:mt-5 sm:text-base">
              {sector.description}
            </p>

            {/* Compteur boutiques */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-sm sm:mt-7 sm:px-5">
              <Sparkles className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
              <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-white sm:text-xs">
                <span className="font-serif text-base font-semibold normal-case tracking-normal">
                  {shops.length}
                </span>{' '}
                boutique{shops.length > 1 ? 's' : ''} disponible
                {shops.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Liseré doré inférieur */}
        <div className="container relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GRILLE BOUTIQUES
      ═══════════════════════════════════════ */}
      <section className="container px-4 py-10 sm:py-12 md:py-14">
        {shops.length === 0 ? (
          /* ── État vide ── */
          <div className="rounded-3xl border border-[#B8925A]/15 bg-white px-6 py-16 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
              <Store className="h-7 w-7 text-[#B8925A]" />
            </div>
            <p className="mb-1 font-serif text-lg text-[#2A1520]">
              Aucune boutique dans ce secteur
            </p>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-[#5B4A50]">
              Revenez bientôt — de nouvelles boutiques partenaires rejoignent
              notre marketplace chaque semaine.
            </p>
            <Link
              href="/boutiques"
              className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-6 py-3 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
            >
              <Gem className="h-4 w-4" />
              Explorer tous les secteurs
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {shops.map((shop) => (
              <Link
                key={shop._id}
                href={`/boutiques/${sector.slug}/${shop.slug}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.3)]"
              >
                {/* Liseré doré supérieur au survol */}
                <div className="absolute inset-x-6 top-0 z-10 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#B8925A] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                {/* ═══════════ EN-TÊTE AVEC LOGO ═══════════ */}
                <div className="relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br from-[#FAF6EF] via-[#FDFBF7] to-[#E8D5D0]/30 sm:h-36">
                  {/* Décor perles */}
                  <div className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-[#D4B87A]/15 blur-2xl" />
                  <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-[#E8D5D0]/30 blur-2xl" />

                  {/* Logo ou fallback */}
                  {shop.logo ? (
                    <div className="relative h-20 w-20 overflow-hidden rounded-full border-4 border-[#FDFBF7] shadow-[0_10px_30px_-10px_rgba(74,37,64,0.4)] transition-transform duration-500 group-hover:scale-105 sm:h-24 sm:w-24">
                      <img
                        src={shop.logo}
                        alt={shop.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#FDFBF7] bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/40 shadow-[0_10px_30px_-10px_rgba(74,37,64,0.4)] transition-transform duration-500 group-hover:scale-105 sm:h-24 sm:w-24">
                      <Gem className="h-8 w-8 text-[#B8925A]/50 sm:h-9 sm:w-9" />
                    </div>
                  )}

                  {/* Badge vedette */}
                  {shop.featured && (
                    <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#2A1520] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#D4B87A] shadow-sm">
                      <Crown className="h-2.5 w-2.5" />
                      Vedette
                    </span>
                  )}
                </div>

                {/* ═══════════ CONTENU ═══════════ */}
                <div className="flex flex-1 flex-col p-5 text-center sm:p-6">
                  {/* Nom + badge vérifié */}
                  <div className="mb-2 flex flex-wrap items-center justify-center gap-1.5">
                    <h3 className="break-words font-serif text-lg leading-tight text-[#2A1520] transition-colors duration-300 group-hover:text-[#B8925A] sm:text-xl">
                      {shop.name}
                    </h3>
                    {shop.verified && (
                      <span
                        title="Boutique vérifiée"
                        className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF]"
                      >
                        <BadgeCheck className="h-3 w-3 text-[#B8925A]" />
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="mb-4 line-clamp-2 text-[13px] leading-relaxed text-[#5B4A50] sm:text-sm">
                    {shop.description}
                  </p>

                  {/* Adresse */}
                  <div className="mb-4 flex flex-wrap items-center justify-center gap-3 text-[11px] text-[#8B7B7F] sm:text-xs">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-3 w-3 text-[#B8925A]" />
                      {shop.address?.split(',')[0]}
                    </span>
                  </div>

                  {/* Séparateur + CTA */}
                  <div className="mt-auto flex items-center justify-between border-t border-[#B8925A]/15 pt-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                      <Gift className="h-3 w-3 text-[#B8925A]" />
                      {shop.totalProducts || 0} produit
                      {shop.totalProducts > 1 ? 's' : ''}
                    </span>

                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8925A]">
                      Visiter
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}