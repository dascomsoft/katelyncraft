'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ChevronRight,
  Home,
  Store,
  MapPin,
  Star,
  Phone,
  MessageCircle,
  Verified,
  Package,
  Gem,
  Crown,
  Sparkles,
  Gift,
  BadgeCheck,
  ArrowRight,
} from 'lucide-react'
import { shopService, Shop } from '@/services/shopService'
import { Product } from '@/types'
import ProductGrid from '@/components/products/ProductGrid'

export default function ShopPage() {
  const params = useParams()
  const sectorSlug = params.sector as string
  const shopSlug = params.shop as string
  const [shop, setShop] = useState<Shop | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await shopService.getShopBySlug(shopSlug)
        if (data) {
          setShop(data.shop)
          setProducts(data.products || [])
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    if (shopSlug) fetchData()
  }, [shopSlug])

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
            Ouverture de la boutique…
          </p>
        </div>
      </div>
    )
  }

  /* ═══════════════════════════════════════
     BOUTIQUE INTROUVABLE
  ═══════════════════════════════════════ */
  if (!shop) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FDFBF7] px-4 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
          <Gem className="h-9 w-9 text-[#B8925A]" />
        </div>
        <h2 className="mb-2 font-serif text-2xl text-[#2A1520]">
          Cette boutique est introuvable
        </h2>
        <p className="mb-6 max-w-md text-sm leading-relaxed text-[#5B4A50]">
          La boutique que vous recherchez n&apos;existe pas ou a été retirée
          de notre marketplace.
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
          HEADER BOUTIQUE
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FAF6EF]">
        {/* Motif perles décoratif */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-[380px] w-[380px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl sm:-top-40 sm:-right-40 sm:h-[500px] sm:w-[500px]" />
          <div className="absolute -bottom-32 -left-32 h-[320px] w-[320px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl sm:-bottom-40 sm:-left-40 sm:h-[420px] sm:w-[420px]" />
        </div>

        <div className="container relative px-4 py-8 sm:py-10 md:py-12">
          {/* Fil d'Ariane */}
          <nav className="mb-6 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#8B7B7F] md:text-xs">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition-colors hover:text-[#B8925A]"
            >
              <Home className="h-3 w-3" />
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3 text-[#B8925A]/50" />
            <Link
              href="/boutiques"
              className="transition-colors hover:text-[#B8925A]"
            >
              Boutiques
            </Link>
            <ChevronRight className="h-3 w-3 text-[#B8925A]/50" />
            <Link
              href={`/boutiques/${sectorSlug}`}
              className="capitalize transition-colors hover:text-[#B8925A]"
            >
              {sectorSlug}
            </Link>
            <ChevronRight className="h-3 w-3 text-[#B8925A]/50" />
            <span className="max-w-[180px] truncate font-semibold text-[#B8925A] sm:max-w-none">
              {shop.name}
            </span>
          </nav>

          {/* Carte boutique */}
          <div className="relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-5 shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)] sm:rounded-3xl sm:p-6 md:p-8">
            {/* Liseré doré supérieur */}
            <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

            {/* Décor perles */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4B87A]/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#E8D5D0]/20 blur-2xl" />
            </div>

            <div className="relative flex flex-col items-center gap-5 md:flex-row md:items-start md:gap-6">
              {/* ─── Logo ─── */}
              <div className="flex-shrink-0">
                {shop.logo ? (
                  <div className="relative h-28 w-28 overflow-hidden rounded-full border-4 border-[#FDFBF7] shadow-[0_20px_50px_-20px_rgba(74,37,64,0.4)] sm:h-32 sm:w-32 md:h-36 md:w-36">
                    <img
                      src={shop.logo}
                      alt={shop.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-full border-4 border-[#FDFBF7] bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/40 shadow-[0_20px_50px_-20px_rgba(74,37,64,0.4)] sm:h-32 sm:w-32 md:h-36 md:w-36">
                    <Gem className="h-10 w-10 text-[#B8925A]/50 sm:h-12 sm:w-12" />
                  </div>
                )}
              </div>

              {/* ─── Info ─── */}
              <div className="flex-1 text-center md:text-left">
                {/* Nom + badges */}
                <div className="mb-3 flex flex-wrap items-center justify-center gap-2 md:justify-start">
                  <h1 className="break-words font-serif text-[1.5rem] leading-tight text-[#2A1520] sm:text-3xl md:text-4xl">
                    {shop.name}
                  </h1>

                  {shop.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#B8925A]/40 bg-[#FAF6EF] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#B8925A] sm:text-[10px]">
                      <BadgeCheck className="h-3 w-3" />
                      Vérifiée
                    </span>
                  )}

                  {shop.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#2A1520] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#D4B87A] shadow-sm sm:text-[10px]">
                      <Crown className="h-3 w-3" />
                      Vedette
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="mb-4 text-[13px] leading-relaxed text-[#5B4A50] sm:text-sm md:text-[15px]">
                  {shop.description}
                </p>

                {/* Meta infos (adresse + produits) */}
                <div className="mb-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-[#8B7B7F] md:justify-start sm:text-xs">
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 flex-shrink-0 text-[#B8925A]" />
                    <span className="truncate">{shop.address}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Gift className="h-3.5 w-3.5 flex-shrink-0 text-[#B8925A]" />
                    <span>
                      <span className="font-serif text-sm font-semibold text-[#B8925A]">
                        {products.length}
                      </span>{' '}
                      produit{products.length > 1 ? 's' : ''}
                    </span>
                  </span>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center justify-center gap-2.5 md:justify-start">
                  <a
                    href={`https://wa.me/${shop.whatsappNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-5 py-3 text-xs font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] sm:px-6"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Contacter sur WhatsApp
                    <ArrowRight className="hidden h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:block" />
                  </a>

                  <a
                    href={`tel:${shop.ownerPhone}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-[#FDFBF7] px-5 py-3 text-xs font-semibold text-[#4A2540] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B8925A] hover:bg-[#FAF6EF] sm:px-6"
                  >
                    <Phone className="h-3.5 w-3.5 text-[#B8925A]" />
                    Appeler
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Liseré doré inférieur */}
        <div className="container relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUITS DE LA BOUTIQUE
      ═══════════════════════════════════════ */}
      <section className="container px-4 py-10 sm:py-12 md:py-14">
        {/* En-tête de section */}
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4 sm:mb-10">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B8925A]">
              <Sparkles className="h-3.5 w-3.5" />
              La sélection
            </span>
            <h2 className="break-words font-serif text-[1.6rem] leading-tight text-[#2A1520] sm:text-3xl md:text-4xl">
              Les produits de{' '}
              <span className="italic text-[#B8925A]">{shop.name}</span>
            </h2>
            {products.length > 0 && (
              <p className="mt-3 text-[13px] leading-relaxed text-[#5B4A50] sm:text-sm">
                <span className="font-serif text-sm font-semibold text-[#B8925A]">
                  {products.length}
                </span>{' '}
                produit{products.length > 1 ? 's' : ''} 
                {products.length > 1 ? 's' : ''} prêt
                {products.length > 1 ? 's' : ''} à rejoindre votre écrin.
              </p>
            )}
          </div>
        </div>

        {products.length === 0 ? (
          /* ── État vide ── */
          <div className="rounded-3xl border border-[#B8925A]/15 bg-white px-6 py-16 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
              <Package className="h-7 w-7 text-[#B8925A]" />
            </div>
            <p className="mb-1 font-serif text-lg text-[#2A1520]">
              Aucune création disponible
            </p>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-[#5B4A50]">
              Cette boutique n&apos;a pas encore publié de produit. Contactez
              directement la boutique pour découvrir leur catalogue.
            </p>
            <a
              href={`https://wa.me/${shop.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-6 py-3 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
            >
              <MessageCircle className="h-4 w-4" />
              Contacter la boutique
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        ) : (
          <ProductGrid products={products} loading={false} />
        )}
      </section>
    </div>
  )
}