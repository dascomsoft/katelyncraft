'use client'

export const dynamic = 'force-dynamic'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingBag,
  Tag,
  Gem,
  Crown,
  Sparkles,
  ArrowRight,
  Gift,
  AlertCircle,
} from 'lucide-react'
import { productService } from '@/services/productService'
import { Product } from '@/types'

/* =========================================================
   SOUS-COMPOSANTS
========================================================= */

function ProductCard({ product }: { product: Product }) {
  const discount = Math.round((1 - product.price / product.oldPrice!) * 100)

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.35)]"
    >
      {/* Liseré doré au survol */}
      <div className="absolute inset-x-6 top-0 z-10 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#B8925A] to-transparent transition-transform duration-500 group-hover:scale-x-100" />

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-[#FAF6EF]">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/30">
            <Gem className="h-12 w-12 text-[#B8925A]/40" />
          </div>
        )}

        {/* Badge réduction */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#2A1520]/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D4B87A] shadow-sm backdrop-blur-sm">
          <Sparkles className="h-2.5 w-2.5" />
          −{discount}%
        </span>

        {/* Badge "Offre" haut-gauche */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#B8925A]/40 bg-[#FDFBF7]/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#B8925A] backdrop-blur-sm">
          <Crown className="h-2.5 w-2.5" />
          Offre
        </span>
      </div>

      {/* Infos */}
      <div className="p-4">
        <h3 className="mb-2 line-clamp-1 font-serif text-[15px] font-medium text-[#2A1520] transition-colors duration-300 group-hover:text-[#B8925A]">
          {product.name}
        </h3>

        <div className="flex flex-wrap items-baseline gap-2">
          <span className="font-serif text-base font-semibold text-[#B8925A]">
            {product.price.toLocaleString()}{' '}
            <span className="text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
              FCFA
            </span>
          </span>
          {product.oldPrice && (
            <span className="text-xs text-[#8B7B7F] line-through">
              {product.oldPrice.toLocaleString()} FCFA
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}

function EmptyState() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#B8925A]/15 bg-white px-6 py-16 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
      {/* Décor perles */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4B87A]/10 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#E8D5D0]/20 blur-2xl" />
      </div>

      <div className="relative">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF]">
          <Tag className="h-9 w-9 text-[#B8925A]" />
        </div>

        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-[#B8925A]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
            En préparation
          </span>
        </span>

        <h2 className="mb-3 font-serif text-2xl leading-tight text-[#2A1520] md:text-3xl">
          Aucune offre <span className="italic text-[#B8925A]">en cours</span>
        </h2>
        <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[#5B4A50]">
          Revenez bientôt — de nouvelles éditions limitées se préparent dans
          notre atelier.
        </p>

        <Link
          href="/products"
          className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-6 py-3 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
        >
          <Gem className="h-4 w-4" />
          Explorer la collection
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

function LoadingSpinner() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-[#FDFBF7]">
      <div className="flex flex-col items-center gap-4">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-2 border-[#B8925A]/20" />
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#B8925A]" />
        </div>
        <p className="font-serif text-sm italic text-[#8B7B7F]">
          Ouverture des offres…
        </p>
      </div>
    </div>
  )
}

/* =========================================================
   PAGE PRINCIPALE
========================================================= */

export default function PromotionsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await productService.getProducts({
          available: 'true',
          minPrice: '0',
          sort: '-createdAt',
        })
        const promoProducts = response.products.filter(
          (p) => p.oldPrice && p.oldPrice > p.price
        )
        setProducts(promoProducts)
      } catch (error) {
        console.error('Error fetching promotions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPromotions()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FDFBF7] text-[#2A1520]">
      {/* Décor perles global */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#E8D5D0]/30 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#D4B87A]/15 via-transparent to-transparent blur-3xl" />
      </div>

      {/* ═══════════════════════════════════════
          HERO — Éditorial offres
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FAF6EF]">
        {/* Motif perles décoratif */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-[280px] w-[280px] rounded-full bg-gradient-to-bl from-[#4A2540]/10 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="container relative px-4 py-16 text-center md:py-24">
          {/* Eyebrow signature */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
            <Crown className="h-3.5 w-3.5 text-[#B8925A]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
              Édition limitée · Prix réduits
            </span>
          </div>

          <h1 className="mx-auto mb-4 max-w-3xl font-serif text-[2.4rem] leading-[1.05] tracking-tight text-[#2A1520] sm:text-5xl md:text-6xl">
            Offres{' '}
            <span className="italic text-[#B8925A]">
              confidentielles.
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#5B4A50] md:text-lg">
            Une sélection de créations signatures à prix d&apos;atelier.
            Quantités limitées, pièces uniques — premières arrivées,
            premières servies.
          </p>

          {/* Signatures artisanales */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.24em] text-[#8B7B7F]">
            <div className="flex items-center gap-2">
              <Sparkles className="h-3 w-3 text-[#B8925A]" />
              <span>Perles premium</span>
            </div>
            <span className="hidden h-3 w-px bg-[#B8925A]/30 sm:block" />
            <div className="flex items-center gap-2">
              <Gift className="h-3 w-3 text-[#B8925A]" />
              <span>Écrin offert</span>
            </div>
            <span className="hidden h-3 w-px bg-[#B8925A]/30 sm:block" />
            <div className="flex items-center gap-2">
              <Crown className="h-3 w-3 text-[#B8925A]" />
              <span>Édition limitée</span>
            </div>
          </div>
        </div>

        {/* Liseré doré inférieur */}
        <div className="container relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUITS EN PROMOTION
      ═══════════════════════════════════════ */}
      <section className="container px-4 py-12 md:py-16">
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* En-tête de section */}
            <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
              <div>
                <span className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B8925A]">
                  <Sparkles className="h-3.5 w-3.5" />
                  Offres en cours
                </span>
                <h2 className="font-serif text-2xl leading-tight text-[#2A1520] md:text-3xl">
                  {products.length} pièce
                  {products.length > 1 ? 's' : ''} à prix{' '}
                  <span className="italic text-[#B8925A]">d&apos;atelier</span>
                </h2>
              </div>

              <div className="flex items-center gap-2 rounded-full border border-[#B8925A]/25 bg-[#FAF6EF] px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#B8925A]">
                <AlertCircle className="h-3 w-3" />
                Stock limité
              </div>
            </div>

            {/* Grille produits */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Signature bas de grille */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-[10px] uppercase tracking-[0.24em] text-[#8B7B7F]">
              <div className="flex items-center gap-2">
                <Gem className="h-3 w-3 text-[#B8925A]" />
                <span>Pièces uniques · cousues main</span>
              </div>
              <span className="hidden h-3 w-px bg-[#B8925A]/30 sm:block" />
              <div className="flex items-center gap-2">
                <Gift className="h-3 w-3 text-[#B8925A]" />
                <span>Écrin signature inclus</span>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  )
}