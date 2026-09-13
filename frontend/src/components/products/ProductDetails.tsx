'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ShoppingBag,
  Plus,
  Minus,
  CheckCircle,
  Gift,
  ShieldCheck,
  Gem,
  Crown,
  Sparkles,
  Package,
  ArrowRight,
} from 'lucide-react'
import { Product } from '@/types'
import { useCart } from '@/hooks/useCart'
import toast from 'react-hot-toast'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const { addItem } = useCart()

  const handleAddToCart = () => {
    if (!product.available || product.stock === 0) {
      toast.error('Ce produit est en rupture de stock')
      return
    }

    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      quantity: quantity,
      image: product.images?.[0],
      stock: product.stock,
    })

    toast.success(`${product.name} ajouté au panier`)
  }

  const images = product.images || []
  const discount = product.oldPrice
    ? Math.round((1 - product.price / product.oldPrice) * 100)
    : 0

  const isAvailable = product.available && product.stock > 0

  return (
    <div className="grid gap-10 md:grid-cols-2 md:gap-12 lg:gap-16">
      {/* ═══════════════════════════════════════
          COLONNE IMAGES
      ═══════════════════════════════════════ */}
      <div className="space-y-4">
        {/* Image principale */}
        <div className="group relative aspect-square overflow-hidden rounded-[2rem] border border-[#B8925A]/15 bg-[#FAF6EF] shadow-[0_30px_80px_-40px_rgba(74,37,64,0.3)]">
          {images.length > 0 ? (
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
              priority
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/30">
              <Gem className="h-20 w-20 text-[#B8925A]/40" />
            </div>
          )}

          {/* Badge discount */}
          {discount > 0 && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-[#2A1520]/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D4B87A] shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3 w-3" />
              −{discount}%
            </span>
          )}

          {/* Liseré doré au survol */}
          <div className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#D4B87A] to-transparent transition-transform duration-700 group-hover:scale-x-100" />
        </div>

        {/* Miniatures */}
        {images.length > 1 && (
          <div className="grid grid-cols-4 gap-2.5">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                aria-label={`Voir l'image ${index + 1}`}
                className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-[#FAF6EF] transition-all duration-300 ${
                  selectedImage === index
                    ? 'border-[#B8925A] shadow-[0_10px_25px_-10px_rgba(184,146,90,0.5)]'
                    : 'border-transparent opacity-70 hover:border-[#B8925A]/40 hover:opacity-100'
                }`}
              >
                <Image
                  src={img}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ═══════════════════════════════════════
          COLONNE INFOS
      ═══════════════════════════════════════ */}
      <div className="flex flex-col">
        {/* Eyebrow signature */}
        <div className="mb-4 inline-flex items-center gap-2 self-start rounded-full border border-[#B8925A]/30 bg-white/60 px-3.5 py-1.5 backdrop-blur-sm">
          <Crown className="h-3 w-3 text-[#B8925A]" />
          <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-[#4A2540]">
            Création signature
          </span>
        </div>

        {/* Nom */}
        <h1 className="mb-4 font-serif text-[1.9rem] leading-[1.15] tracking-tight text-[#2A1520] md:text-[2.5rem]">
          {product.name}
        </h1>

        {/* Prix */}
        <div className="mb-6 flex flex-wrap items-baseline gap-3 border-b border-[#B8925A]/15 pb-6">
          <span className="font-serif text-3xl font-semibold text-[#2A1520] md:text-4xl">
            {product.price.toLocaleString()} FCFA
          </span>
          {product.oldPrice && (
            <>
              <span className="font-serif text-lg text-[#8B7B7F] line-through">
                {product.oldPrice.toLocaleString()} FCFA
              </span>
              <span className="rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#B8925A]">
                Économisez {(product.oldPrice - product.price).toLocaleString()} FCFA
              </span>
            </>
          )}
        </div>

        {/* Stock + marque */}
        <div className="mb-6 space-y-3">
          <div className="flex items-center gap-2.5">
            {isAvailable ? (
              <>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF]">
                  <CheckCircle className="h-3.5 w-3.5 text-[#B8925A]" />
                </div>
                <span className="text-sm font-medium text-[#4A2540]">
                  En stock ·{' '}
                  <span className="font-serif text-[#B8925A]">
                    {product.stock}
                  </span>{' '}
                  pièce{product.stock > 1 ? 's' : ''} disponible
                  {product.stock > 1 ? 's' : ''}
                </span>
              </>
            ) : (
              <>
                <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#8B7B7F]/30 bg-[#FAF6EF]">
                  <Package className="h-3.5 w-3.5 text-[#8B7B7F]" />
                </div>
                <span className="text-sm font-medium text-[#8B7B7F]">
                  Épuisé temporairement
                </span>
              </>
            )}
          </div>

          {product.brand && (
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-[#8B7B7F]">
              <span>Signé&nbsp;:</span>
              <span className="rounded-full border border-[#B8925A]/25 bg-[#FAF6EF] px-2.5 py-1 font-semibold text-[#B8925A]">
                {product.brand}
              </span>
            </p>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <div className="mb-6 border-l-2 border-[#B8925A]/30 pl-4">
            <p className="font-serif text-[15px] leading-relaxed text-[#5B4A50]">
              {product.description}
            </p>
          </div>
        )}

        {/* ═══════════ ACTIONS ═══════════ */}
        {isAvailable && (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* Sélecteur de quantité */}
              <div className="flex items-center overflow-hidden rounded-full border border-[#B8925A]/25 bg-[#FDFBF7]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  aria-label="Réduire la quantité"
                  className="px-4 py-3 text-[#4A2540] transition-colors duration-300 hover:bg-[#FAF6EF] disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="min-w-[3.5rem] px-2 py-3 text-center font-serif font-semibold tabular-nums text-[#2A1520]">
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  disabled={quantity >= product.stock}
                  aria-label="Augmenter la quantité"
                  className="px-4 py-3 text-[#4A2540] transition-colors duration-300 hover:bg-[#FAF6EF] disabled:opacity-30 disabled:hover:bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              {/* Ajouter à l'écrin */}
              <button
                onClick={handleAddToCart}
                className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2A1520] px-6 py-3.5 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
              >
                <ShoppingBag className="h-4 w-4" />
                Ajouter à l&apos;écrin
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Info paiement */}
            <div className="flex items-start gap-3 rounded-2xl border border-[#B8925A]/20 bg-[#FAF6EF] px-4 py-3 text-xs leading-relaxed text-[#5B4A50]">
              <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#B8925A]" />
              <span>
                Paiement à la livraison disponible. Réglez uniquement à la
                réception de votre écrin.
              </span>
            </div>
          </div>
        )}

        {/* ═══════════ CARACTÉRISTIQUES ═══════════ */}
        <div className="mt-8 grid grid-cols-2 gap-3">
          {[
            { icon: Gift, text: 'Écrin signature' },
            { icon: ShieldCheck, text: 'Qualité garantie' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="group flex items-center gap-3 rounded-2xl border border-[#B8925A]/15 bg-[#FAF6EF] p-4 transition-all duration-300 hover:border-[#B8925A]/40 hover:bg-white"
              >
                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/30 bg-white transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A]">
                  <Icon className="h-4 w-4 text-[#B8925A] transition-colors duration-300 group-hover:text-white" />
                </div>
                <span className="text-[12px] font-medium text-[#4A2540]">
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>

        {/* Micro-signature finale */}
        <div className="mt-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#8B7B7F]">
          <Gem className="h-3 w-3 text-[#B8925A]" />
          <span>Fait main · Pièce unique</span>
          <Crown className="h-3 w-3 text-[#B8925A]" />
        </div>
      </div>
    </div>
  )
}