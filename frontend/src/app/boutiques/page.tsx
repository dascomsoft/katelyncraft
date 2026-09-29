'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Sparkles,
  ShoppingBag,
  Heart,
  Gem,
  FolderTree,
  ChevronRight,
  Home,
  Store,
  ArrowRight,
  PlusCircle,
  Crown,
  Scissors,
  Gift,
} from 'lucide-react'
import { sectorService, Sector } from '@/services/sectorService'

const iconMap: Record<string, any> = {
  Sparkles,
  ShoppingBag,
  Heart,
  Gem,
  FolderTree,
}

export default function BoutiquesPage() {
  const [sectors, setSectors] = useState<Sector[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const data = await sectorService.getSectors({ active: true })
        setSectors(data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchSectors()
  }, [])

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
            Ouverture des boutiques…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FDFBF7] text-[#2A1520]">
      {/* ═══════════════════════════════════════
          HERO — Éditorial atelier
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FAF6EF]">
        {/* Motif perles décoratif */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-[280px] w-[280px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl sm:-top-40 sm:-right-40 sm:h-[500px] sm:w-[500px]" />
          <div className="absolute -bottom-24 -left-24 h-[260px] w-[260px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl sm:-bottom-40 sm:-left-40 sm:h-[420px] sm:w-[420px]" />
          <div className="absolute top-1/2 left-1/3 h-[200px] w-[200px] rounded-full bg-gradient-to-bl from-[#4A2540]/10 via-transparent to-transparent blur-3xl sm:h-[300px] sm:w-[300px]" />
        </div>

        <div className="container relative px-4 py-12 sm:py-16 md:py-20">
          {/* Fil d'Ariane */}
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#8B7B7F] md:text-xs">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition-colors hover:text-[#B8925A]"
            >
              <Home className="h-3 w-3" />
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3 text-[#B8925A]/50" />
            <span className="font-semibold text-[#B8925A]">Boutiques</span>
          </nav>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-8">
            <div className="max-w-2xl">
              {/* Eyebrow */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-3.5 py-1.5 backdrop-blur-sm sm:mb-6 sm:px-4">
                <Store className="h-3 w-3 text-[#B8925A] sm:h-3.5 sm:w-3.5" />
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#4A2540] sm:tracking-[0.28em]">
                  Marketplace · Partenaires
                </span>
              </div>

              <h1 className="break-words font-serif text-[1.75rem] leading-[1.08] tracking-tight text-[#2A1520] sm:text-5xl sm:leading-[1.05] md:text-6xl">
                Nos <span className="italic text-[#B8925A]">boutiques</span>
              </h1>

              <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-[#5B4A50] sm:mt-6 sm:text-base md:text-lg">
                Découvrez nos boutiques partenaires par secteur de ventes.
                Trouvez les meilleurs vendeurs du Cameroun.
              </p>
            </div>

            {/* CTA Devenir vendeur */}
            <Link
              href="/devenir-vendeur"
              className="group inline-flex flex-shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#2A1520] px-6 py-3.5 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] sm:px-7 md:self-end"
            >
              <PlusCircle className="h-4 w-4" />
              Devenir vendeur
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Liseré doré inférieur */}
        <div className="container relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BANDEAU INFO — Nombre de secteurs
      ═══════════════════════════════════════ */}
      {sectors.length > 0 && (
        <section className="container relative z-10 -mt-5 px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#B8925A]/15 bg-white p-4 shadow-[0_20px_50px_-25px_rgba(74,37,64,0.2)] sm:p-5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] sm:h-11 sm:w-11">
                <Store className="h-4 w-4 text-[#B8925A] sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-serif text-[14px] text-[#2A1520] sm:text-[15px]">
                  <span className="font-semibold text-[#B8925A]">
                    {sectors.length}
                  </span>{' '}
                  secteur{sectors.length > 1 ? 's' : ''} disponible
                  {sectors.length > 1 ? 's' : ''}
                </p>
                <p className="mt-0.5 text-[11px] text-[#8B7B7F] sm:text-xs">
                  Cliquez sur un secteur pour voir les boutiques
                </p>
              </div>
            </div>

            <Link
              href="/devenir-vendeur"
              className="group hidden items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-[#B8925A] transition-colors duration-300 hover:text-[#4A2540] sm:inline-flex"
            >
              Vous voulez vendre ? Rejoignez-nous
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          GRILLE SECTEURS
      ═══════════════════════════════════════ */}
      <section className="container px-4 py-10 sm:py-12 md:py-14">
        {sectors.length === 0 ? (
          /* ── État vide ── */
          <div className="rounded-3xl border border-[#B8925A]/15 bg-white px-6 py-16 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
              <Store className="h-7 w-7 text-[#B8925A]" />
            </div>
            <p className="mb-2 font-serif text-lg text-[#2A1520]">
              Aucun secteur disponible
            </p>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-[#5B4A50]">
              Soyez le premier à rejoindre notre marketplace et exposez vos
              créations.
            </p>
            <Link
              href="/devenir-vendeur"
              className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-6 py-3 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
            >
              <PlusCircle className="h-4 w-4" />
              Devenir le premier vendeur
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
            {sectors.map((sector) => {
              const Icon = iconMap[sector.icon] || FolderTree
              return (
                <Link
                  key={sector._id}
                  href={`/boutiques/${sector.slug}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.3)]"
                >
                  {/* Liseré doré au survol */}
                  <div className="absolute inset-x-6 top-0 z-10 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#B8925A] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                  {/* Visuel gradient du secteur */}
                  <div
                    className={`relative flex h-32 items-center justify-center bg-gradient-to-br ${sector.color} sm:h-36`}
                  >
                    {/* Décor perle */}
                    <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
                    <div className="pointer-events-none absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-white/[0.08] blur-2xl" />

                    {/* Icône dans cercle */}
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm transition-all duration-500 group-hover:scale-110 sm:h-20 sm:w-20">
                      <Icon className="h-7 w-7 text-white/95 sm:h-9 sm:w-9" />
                    </div>

                    {/* Micro-badge "secteur" */}
                    <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                      <Scissors className="h-2.5 w-2.5" />
                      Secteur
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h2 className="break-words font-serif text-lg leading-tight text-[#2A1520] transition-colors duration-300 group-hover:text-[#B8925A] sm:text-xl">
                      {sector.name}
                    </h2>

                    <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[#5B4A50] sm:text-sm">
                      {sector.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-[#B8925A]/15 pt-4">
                      <span className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                        <Gift className="h-3 w-3 text-[#B8925A]" />
                        {sector.shopCount || 0} boutique
                        {(sector.shopCount || 0) > 1 ? 's' : ''}                        
                        </span>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8925A]">
                        Découvrir
                        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════
          CTA BAS DE PAGE — Devenir vendeur
      ═══════════════════════════════════════ */}
      <section className="container px-4 pb-14 sm:pb-16 md:pb-20">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] px-5 py-12 text-center text-[#FAF6EF] sm:rounded-[2rem] sm:px-6 sm:py-16 md:px-12 md:py-20">
          {/* Perles lumineuses */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4B87A]/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#E8D5D0]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            {/* Icône */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10 backdrop-blur-sm sm:h-16 sm:w-16">
              <Crown className="h-6 w-6 text-[#D4B87A] sm:h-7 sm:w-7" />
            </div>

            {/* Titre */}
            <h2 className="mt-6 break-words font-serif text-[1.6rem] leading-tight text-[#FAF6EF] sm:mt-7 sm:text-3xl md:text-4xl">
              Vous avez une{' '}
              <span className="italic text-[#D4B87A]">boutique ?</span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-[#C4B5B8] sm:mt-5 sm:text-sm md:text-[15px]">
              Rejoignez notre marketplace et exposez vos produits à des
              milliers de clients au Cameroun. Inscription gratuite pendant
              3 mois.
            </p>

            {/* CTA */}
            <Link
              href="/devenir-vendeur"
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#D4B87A] px-7 py-3.5 text-sm font-semibold text-[#2A1520] transition-all duration-300 hover:bg-[#E8D5D0] hover:shadow-[0_20px_50px_-15px_rgba(212,184,122,0.5)] sm:mt-8 sm:px-8 sm:py-4"
            >
              <PlusCircle className="h-4 w-4" />
              Devenir vendeur
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            {/* Signature bas CTA */}
            <p className="mt-5 text-[10px] uppercase tracking-[0.22em] text-[#A89298] sm:mt-6 sm:text-[11px] sm:tracking-[0.28em]">
              Inscription gratuite · Aucun engagement
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}