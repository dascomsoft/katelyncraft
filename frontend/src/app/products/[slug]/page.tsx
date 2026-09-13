'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ShoppingBag,
  Plus,
  Minus,
  ArrowLeft,
  CheckCircle,
  Star,
  MessageCircle,
  Heart,
  Share2,
  RotateCcw,
  ChevronRight,
  Home,
  Gem,
  Sparkles,
  Crown,
  Gift,
  Scissors,
  ShieldCheck,
  Clock,
  Package,
} from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { productService } from '@/services/productService'
import { Product } from '@/types'
import toast from 'react-hot-toast'

export default function ProductPage() {
  const params = useParams()
  const slug = params.slug as string
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [liked, setLiked] = useState(false)
  const { addItem } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productService.getProductBySlug(slug)
        if (data) {
          setProduct(data)
        } else {
          console.error('Product not found')
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchProduct()
    }
  }, [slug])

  const handleAddToCart = () => {
    if (!product) return

    addItem({
      productId: product._id,
      name: product.name,
      slug: product.slug,
      price: product.price || 0,
      quantity: quantity,
      image: product.images?.[0],
      stock: product.stock || 0,
    })

    toast.success(`${product.name} ajoute au panier`)
  }

  /* ═══════════════════════════════════════
     ÉTAT DE CHARGEMENT
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
            Ouverture de l&apos;écrin…
          </p>
        </div>
      </div>
    )
  }

  /* ═══════════════════════════════════════
     PRODUIT INTROUVABLE
  ═══════════════════════════════════════ */
  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FDFBF7] px-4 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
          <Gem className="h-9 w-9 text-[#B8925A]" />
        </div>
        <h2 className="mb-2 font-serif text-2xl text-[#2A1520]">
          Cette pièce est introuvable
        </h2>
        <p className="mb-6 max-w-md text-sm leading-relaxed text-[#5B4A50]">
          La création que vous recherchez n&apos;existe pas ou a été retirée
          de la collection.
        </p>
        <Link
          href="/products"
          className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-6 py-3 text-sm font-semibold text-[#FAF6EF] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_15px_40px_-15px_rgba(74,37,64,0.5)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Explorer la collection
        </Link>
      </div>
    )
  }

  const images = product.images || []
  const price = product.price || 0
  const oldPrice = product.oldPrice || 0
  const stock = product.stock || 0
  const isAvailable = product.available && stock > 0
  const discount = oldPrice > price ? Math.round((1 - price / oldPrice) * 100) : 0

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A1520]">
      {/* ═══════════════════════════════════════
          FIL D'ARIANE ÉDITORIAL
      ═══════════════════════════════════════ */}
      <div className="border-b border-[#B8925A]/15 bg-[#FAF6EF]">
        <div className="container py-4">
          <nav className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#8B7B7F] md:text-xs">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition-colors hover:text-[#B8925A]"
            >
              <Home className="h-3 w-3" />
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3 text-[#B8925A]/50" />
            <Link
              href="/products"
              className="transition-colors hover:text-[#B8925A]"
            >
              Boutique
            </Link>
            <ChevronRight className="h-3 w-3 text-[#B8925A]/50" />
            {product.category && typeof product.category === 'object' && (
              <>
                <Link
                  href={`/categories/${(product.category as any).slug}`}
                  className="transition-colors hover:text-[#B8925A]"
                >
                  {(product.category as any).name}
                </Link>
                <ChevronRight className="h-3 w-3 text-[#B8925A]/50" />
              </>
            )}
            <span className="max-w-[200px] truncate font-semibold text-[#B8925A]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          CORPS DE PAGE
      ═══════════════════════════════════════ */}
      <div className="container py-8 md:py-14">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ─────────── COLONNE IMAGES ─────────── */}
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
                  <Gem className="h-16 w-16 text-[#B8925A]/40" />
                </div>
              )}

              {/* Badges haut-gauche */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                {discount > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#2A1520] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#D4B87A] shadow-sm">
                    <Sparkles className="h-3 w-3" />
                    −{discount}%
                  </span>
                )}
                {product.featured && (
                  <span className="inline-flex items-center gap-1 rounded-full border border-[#B8925A]/40 bg-[#FDFBF7]/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#B8925A] backdrop-blur-sm">
                    <Crown className="h-3 w-3" />
                    Vedette
                  </span>
                )}
              </div>

              {/* Actions flottantes haut-droite */}
              <div className="absolute right-4 top-4 flex flex-col gap-2">
                <button
                  onClick={() => setLiked(!liked)}
                  aria-label="Ajouter aux favoris"
                  className={`flex h-10 w-10 items-center justify-center rounded-full border shadow-sm backdrop-blur-sm transition-all duration-300 ${
                    liked
                      ? 'border-[#B8925A] bg-[#B8925A] text-white'
                      : 'border-[#B8925A]/25 bg-[#FDFBF7]/90 text-[#4A2540] hover:border-[#B8925A] hover:text-[#B8925A]'
                  }`}
                >
                  <Heart
                    className={`h-4 w-4 ${liked ? 'fill-white' : ''}`}
                  />
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: product.name,
                        url: window.location.href,
                      })
                    } else {
                      navigator.clipboard.writeText(window.location.href)
                      toast.success('Lien copie !')
                    }
                  }}
                  aria-label="Partager la pièce"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FDFBF7]/90 text-[#4A2540] shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-[#B8925A] hover:text-[#B8925A]"
                >
                  <Share2 className="h-4 w-4" />
                </button>
              </div>

              {/* Liseré doré au survol */}
              <div className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#D4B87A] to-transparent transition-transform duration-700 group-hover:scale-x-100" />
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
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

          {/* ─────────── COLONNE INFOS ─────────── */}
          <div className="flex flex-col">
            {/* Catégorie */}
            {product.category && typeof product.category === 'object' && (
              <Link
                href={`/categories/${(product.category as any).slug}`}
                className="mb-3 inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B8925A] transition-colors hover:text-[#4A2540]"
              >
                {(product.category as any).name}
                <ChevronRight className="h-3 w-3" />
              </Link>
            )}

            {/* Nom */}
            <h1 className="mb-4 font-serif text-[1.9rem] leading-[1.15] tracking-tight text-[#2A1520] md:text-[2.5rem] lg:text-[2.75rem]">
              {product.name}
            </h1>

            {/* Notation */}
            <div className="mb-6 flex items-center gap-3">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i <= 4
                        ? 'fill-[#B8925A] text-[#B8925A]'
                        : 'text-[#E8D5D0]'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs uppercase tracking-[0.15em] text-[#8B7B7F]">
                4.0 · 12 avis
              </span>
            </div>

            {/* Prix */}
            <div className="mb-6 flex flex-wrap items-baseline gap-3 border-b border-[#B8925A]/15 pb-6">
              <span className="font-serif text-3xl font-semibold text-[#2A1520] md:text-4xl">
                {price.toLocaleString()} FCFA
              </span>
              {oldPrice > 0 && (
                <>
                  <span className="font-serif text-lg text-[#8B7B7F] line-through">
                    {oldPrice.toLocaleString()} FCFA
                  </span>
                  <span className="rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#B8925A]">
                    Économisez {(oldPrice - price).toLocaleString()} FCFA
                  </span>
                </>
              )}
            </div>

            {/* Stock */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {isAvailable ? (
                <>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] px-3 py-1.5 text-xs font-medium text-[#4A2540]">
                    <CheckCircle className="h-3.5 w-3.5 text-[#B8925A]" />
                    En stock ({stock} disponible{stock > 1 ? 's' : ''})
                  </div>
                  {stock <= 5 && stock > 0 && (
                    <div className="inline-flex animate-pulse items-center gap-1.5 rounded-full border border-[#B8925A]/40 bg-[#B8925A]/10 px-3 py-1.5 text-xs font-medium text-[#B8925A]">
                      <Sparkles className="h-3.5 w-3.5" />
                      Plus que {stock} en stock
                    </div>
                  )}
                </>
              ) : (
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#8B7B7F]/30 bg-[#FAF6EF] px-3 py-1.5 text-xs font-medium text-[#8B7B7F]">
                  <Package className="h-3.5 w-3.5" />
                  Épuisé temporairement
                </div>
              )}
            </div>

            {/* Description courte */}
            {product.description && (
              <p className="mb-6 font-serif text-[15px] leading-relaxed text-[#5B4A50]">
                {product.description.length > 200
                  ? product.description.slice(0, 200) + '…'
                  : product.description}
              </p>
            )}

            {/* Marque */}
            {product.brand && (
              <div className="mb-6 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#8B7B7F]">
                <span>Signé&nbsp;:</span>
                <span className="rounded-full border border-[#B8925A]/25 bg-[#FAF6EF] px-3 py-1 font-semibold text-[#B8925A]">
                  {product.brand}
                </span>
              </div>
            )}

            {/* Actions (si dispo) */}
            {isAvailable && (
              <div className="space-y-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  {/* Quantité */}
                  <div className="flex items-center overflow-hidden rounded-full border border-[#B8925A]/25 bg-[#FDFBF7]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                      aria-label="Réduire la quantité"
                      className="px-4 py-3 text-[#4A2540] transition-colors hover:bg-[#FAF6EF] disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="min-w-[3.5rem] px-2 py-3 text-center font-serif font-semibold tabular-nums text-[#2A1520]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(Math.min(stock, quantity + 1))}
                      disabled={quantity >= stock}
                      aria-label="Augmenter la quantité"
                      className="px-4 py-3 text-[#4A2540] transition-colors hover:bg-[#FAF6EF] disabled:opacity-30 disabled:hover:bg-transparent"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Ajout panier */}
                  <button
                    onClick={handleAddToCart}
                    className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2A1520] px-6 py-3.5 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Ajouter à l&apos;écrin
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Paiement livraison */}
                <div className="flex items-start gap-3 rounded-2xl border border-[#B8925A]/20 bg-[#FAF6EF] px-4 py-3 text-xs leading-relaxed text-[#5B4A50]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#B8925A]" />
                  <span>
                    Paiement à la livraison disponible. Réglez uniquement à
                    la réception de votre écrin.
                  </span>
                </div>
              </div>
            )}

            {/* Rupture de stock */}
            {!isAvailable && (
              <div className="rounded-2xl border border-[#B8925A]/20 bg-[#FAF6EF] p-6 text-center">
                <p className="mb-4 font-serif text-[15px] text-[#2A1520]">
                  Cette pièce est actuellement épuisée
                </p>
                <a
                  href="https://wa.me/237600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-5 py-2.5 text-xs font-semibold text-[#FAF6EF] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_15px_35px_-15px_rgba(74,37,64,0.5)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Me prévenir sur WhatsApp
                </a>
              </div>
            )}

            {/* Trust grid */}
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { icon: Gift, text: 'Écrin signature' },
                { icon: ShieldCheck, text: 'Paiement sécurisé' },
                { icon: RotateCcw, text: 'Retour sous 7 jours' },
                { icon: MessageCircle, text: 'Conseil WhatsApp' },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="group flex items-center gap-2.5 rounded-2xl border border-[#B8925A]/15 bg-[#FAF6EF] p-3 transition-all duration-300 hover:border-[#B8925A]/40 hover:bg-white"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/30 bg-white transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A]">
                      <Icon className="h-3.5 w-3.5 text-[#B8925A] transition-colors duration-300 group-hover:text-white" />
                    </div>
                    <span className="text-[11px] font-medium text-[#4A2540]">
                      {item.text}
                    </span>
                  </div>
                )
              })}
            </div>

            {/* CTA WhatsApp — questions */}
            <div className="relative mt-6 overflow-hidden rounded-2xl bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] p-5 text-[#FAF6EF]">
              <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-[#D4B87A]/15 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-10 -left-10 h-24 w-24 rounded-full bg-[#E8D5D0]/10 blur-2xl" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10">
                  <MessageCircle className="h-5 w-5 text-[#D4B87A]" />
                </div>
                <div className="flex-1">
                  <div className="font-serif text-sm text-[#FAF6EF]">
                    Une question sur cette pièce ?
                  </div>
                  <div className="mt-0.5 text-xs text-[#C4B5B8]">
                    Une artisane vous répond en moins de 15 min
                  </div>
                </div>
                <a
                  href="https://wa.me/237600000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[#D4B87A] px-4 py-2 text-xs font-semibold text-[#2A1520] transition-all duration-300 hover:bg-[#E8D5D0] hover:shadow-[0_10px_25px_-10px_rgba(212,184,122,0.6)]"
                >
                  Écrire
                </a>
              </div>
            </div>

            {/* Retour */}
            <Link
              href="/products"
              className="group mt-8 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[#8B7B7F] transition-colors hover:text-[#B8925A]"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Retour à la collection
            </Link>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            DESCRIPTION DÉTAILLÉE
        ═══════════════════════════════════════ */}
        {product.description && product.description.length > 200 && (
          <div className="mt-12 md:mt-16">
            <div className="relative overflow-hidden rounded-[2rem] border border-[#B8925A]/15 bg-[#FAF6EF] p-6 md:p-10">
              {/* Décor perles */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4B87A]/15 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#E8D5D0]/25 blur-2xl" />

              <div className="relative">
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B8925A]/40 bg-white">
                    <Scissors className="h-4 w-4 text-[#B8925A]" />
                  </div>
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B8925A]">
                      Détails de la création
                    </div>
                    <h2 className="mt-1 font-serif text-xl text-[#2A1520] md:text-2xl">
                      Description
                    </h2>
                  </div>
                </div>

                <div className="prose prose-sm max-w-none font-serif text-[15px] leading-relaxed text-[#5B4A50] prose-strong:text-[#2A1520] prose-headings:font-serif prose-headings:text-[#2A1520] prose-a:text-[#B8925A]">
                  <p>{product.description}</p>
                </div>

                {/* Détails artisanaux */}
                <div className="mt-8 grid gap-4 border-t border-[#B8925A]/15 pt-6 sm:grid-cols-3">
                  {[
                    {
                      icon: Gem,
                      title: 'Perles premium',
                      desc: 'Sélectionnées une à une',
                    },
                    {
                      icon: Crown,
                      title: 'Pièce unique',
                      desc: 'Signée à la main',
                    },
                    {
                      icon: Clock,
                      title: 'Fabrication lente',
                      desc: '40 à 80 h de travail',
                    },
                  ].map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-2xl border border-[#B8925A]/15 bg-white p-4"
                      >
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF]">
                          <Icon className="h-4 w-4 text-[#B8925A]" />
                        </div>
                        <div>
                          <div className="font-serif text-sm text-[#2A1520]">
                            {item.title}
                          </div>
                          <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}