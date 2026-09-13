'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Crown, Gem, Sparkles, CheckCircle } from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/hooks/useCart'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const { addItem } = useCart()

  // Debug log
  console.log('🃏 ProductCard rendering:', product?.name, product?._id)

  if (!product) {
    console.warn('⚠️ ProductCard: product is null or undefined')
    return null
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!product.available || product.stock === 0) {
      toast.error('Ce produit est en rupture de stock')
      return
    }

    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: 1,
      image: product.images?.[0],
      stock: product.stock,
    })

    toast.success(`${product.name} ajouté au panier`)
  }

  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  const isOutOfStock = !product.available || product.stock === 0

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.3)]">
      <Link
        href={`/products/${product.slug}`}
        className="flex flex-1 flex-col"
        aria-label={`Voir ${product.name}`}
      >
        {/* ═══════════════════════════════════════
            IMAGE
        ═══════════════════════════════════════ */}
        <div className="relative aspect-square overflow-hidden bg-[#FAF6EF]">
          {product.images && product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/30">
              <Gem className="h-12 w-12 text-[#B8925A]/40" />
            </div>
          )}

          {/* ─── Badges haut-gauche ─── */}
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {featured && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#2A1520]/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#D4B87A] shadow-sm backdrop-blur-sm">
                <Crown className="h-2.5 w-2.5" />
                Vedette
              </span>
            )}
            {discount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#B8925A] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-white shadow-sm">
                <Sparkles className="h-2.5 w-2.5" />
                −{discount}%
              </span>
            )}
          </div>

          {/* ─── Badge "En stock" discret (bas-droite) ─── */}
          {!isOutOfStock && (
            <div className="absolute bottom-3 right-3 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="inline-flex items-center gap-1 rounded-full border border-[#B8925A]/40 bg-[#FDFBF7]/95 px-2 py-0.5 text-[9px] font-medium uppercase tracking-[0.12em] text-[#B8925A] backdrop-blur-sm">
                <CheckCircle className="h-2.5 w-2.5" />
                Dispo
              </span>
            </div>
          )}

          {/* ─── Overlay rupture de stock ─── */}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-[#2A1520]/60 backdrop-blur-[2px]">
              <span className="rounded-full border border-[#B8925A]/40 bg-[#FDFBF7]/95 px-4 py-2 font-serif text-xs font-semibold uppercase tracking-[0.18em] text-[#2A1520] shadow-lg">
                Épuisé
              </span>
            </div>
          )}

          {/* ─── Overlay "Ajouter à l'écrin" au survol ─── */}
          {!isOutOfStock && (
            <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
              <button
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2A1520]/95 py-2.5 text-xs font-semibold text-[#FAF6EF] backdrop-blur-sm transition-colors duration-300 hover:bg-[#B8925A] hover:text-white"
                aria-label={`Ajouter ${product.name} à l'écrin`}
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Ajouter à l&apos;écrin
              </button>
            </div>
          )}

          {/* ─── Liseré doré au survol ─── */}
          <div className="absolute inset-x-4 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#D4B87A] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
        </div>

        {/* ═══════════════════════════════════════
            INFOS PRODUIT
        ═══════════════════════════════════════ */}
        <div className="flex flex-1 flex-col p-4">
          {/* Nom */}
          <h3 className="mb-1 line-clamp-1 font-serif text-[15px] font-medium text-[#2A1520] transition-colors duration-300 group-hover:text-[#B8925A] md:text-base">
            {product.name}
          </h3>

          {/* Marque */}
          {product.brand && (
            <p className="mb-2 text-[11px] uppercase tracking-[0.15em] text-[#8B7B7F]">
              {product.brand}
            </p>
          )}

          {/* Prix */}
          <div className="mb-4 mt-auto flex flex-wrap items-baseline gap-2">
            <span className="font-serif text-base font-semibold text-[#2A1520] md:text-lg">
              {product.price?.toLocaleString() || 0} FCFA
            </span>
            {product.oldPrice && (
              <span className="text-xs text-[#8B7B7F] line-through">
                {product.oldPrice.toLocaleString()} FCFA
              </span>
            )}
          </div>

          {/* Bouton principal (mobile : toujours visible, desktop : toujours visible aussi) */}
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            className="group/btn flex w-full items-center justify-center gap-2 rounded-full border border-[#2A1520]/15 bg-transparent py-2.5 text-xs font-semibold text-[#2A1520] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-white disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#2A1520]/15 disabled:hover:bg-transparent disabled:hover:text-[#2A1520]"
          >
            <ShoppingBag className="h-3.5 w-3.5" />
            {!isOutOfStock ? 'Ajouter à l\'écrin' : 'Indisponible'}
          </button>
        </div>
      </Link>
    </article>
  )
}