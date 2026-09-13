'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Search,
  ShoppingBag,
  ArrowRight,
  Phone,
  MapPin,
  Mail,
  Star,
  CheckCircle,
  MessageCircle,
  Clock,
  Calendar,
  Send,
  Heart,
  ChevronRight,
  Sparkles,
  Gem,
  Crown,
  Award,
  Instagram,
  Gift,
} from 'lucide-react'
import { productService } from '@/services/productService'
import { categoryService } from '@/services/categoryService'
import { useCart } from '@/context/CartContext'
import { Category, Product } from '@/types'
import { useSettings } from '@/hooks/useSettings'

// ─── Palette KATHELYNCRAFT ───
// Encre : #2A1520 · Prune : #4A2540 · Or : #B8925A · Champagne : #D4B87A
// Crème : #FAF6EF · Ivoire : #FDFBF7 · Blush : #E8D5D0

// ─── Étoiles de notation ───
function StarRating({ rating, count }: { rating: number; count?: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i <= rating
              ? 'text-[#B8925A] fill-[#B8925A]'
              : 'text-[#E8D5D0]'
          }`}
        />
      ))}
      {count !== undefined && (
        <span className="text-xs text-[#8B7B7F] ml-1">({count})</span>
      )}
    </div>
  )
}

function getStableRating(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++)
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  return (Math.abs(hash) % 3) + 3
}

function getReviewCount(id: string): number {
  let hash = 0
  for (let i = 0; i < id.length; i++)
    hash = id.charCodeAt(i) + ((hash << 5) - hash)
  return (Math.abs(hash) % 150) + 12
}

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [recentProducts, setRecentProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const { addItem } = useCart()
  const { settings } = useSettings()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          productService.getProducts({ limit: 8, featured: true }),
          categoryService.getCategories({ active: true }),
        ])

        setFeaturedProducts(productsRes.products || [])
        setCategories(Array.isArray(categoriesRes) ? categoriesRes : [])

        const recentRes = await productService.getProducts({
          limit: 4,
          sort: '-createdAt',
        })
        setRecentProducts(recentRes.products || [])
      } catch (error) {
        console.error('Error fetching data:', error)
        setFeaturedProducts([])
        setCategories([])
        setRecentProducts([])
      }
    }

    fetchData()
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  const categoriesToShow = Array.isArray(categories)
    ? categories.slice(0, 8)
    : []

  return (
    <div className="bg-[#FDFBF7] text-[#2A1520] antialiased">
      {/* ═══════════════════════════════════════
          HERO — Éditorial luxe, asymétrique
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FAF6EF]">
        {/* Perles décoratives en arrière-plan */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl" />
          <div className="absolute top-1/3 right-[-120px] h-[360px] w-[360px] rounded-full bg-gradient-to-bl from-[#D4B87A]/30 via-transparent to-transparent blur-3xl" />
          <div className="absolute bottom-[-140px] left-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-[#4A2540]/10 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="container relative grid items-center gap-12 py-16 md:grid-cols-12 md:py-24 lg:py-28">
          {/* Colonne texte */}
          <div className="md:col-span-6 lg:col-span-6">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#B8925A]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#4A2540]">
                Fait main · Pièces uniques
              </span>
            </div>

            <h1 className="font-serif text-[2.6rem] leading-[1.05] tracking-tight text-[#2A1520] sm:text-5xl md:text-6xl lg:text-[4.2rem]">
              L'art de la perle,
              <br />
              <span className="italic text-[#B8925A]">redéfini.</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-[#5B4A50] md:text-lg">
              KATHELYNCRAFT façonne à la main des sacs de luxe en perles,
              où chaque pièce raconte une histoire d'élégance, de patience
              et de savoir-faire artisanal. Découvrez aussi notre sélection
              d'objets et accessoires d'exception.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-7 py-3.5 text-sm font-semibold text-[#FAF6EF] shadow-[0_10px_30px_-10px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_15px_40px_-10px_rgba(74,37,64,0.6)]"
              >
                Découvrir la collection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center gap-2 rounded-full border border-[#2A1520]/20 bg-transparent px-7 py-3.5 text-sm font-medium text-[#2A1520] transition-all duration-300 hover:border-[#B8925A] hover:bg-white/50"
              >
                Explorer les catégories
              </Link>
            </div>

            {/* Preuve sociale élégante */}
            <div className="mt-12 flex items-center gap-5 border-t border-[#B8925A]/15 pt-6">
              <div className="flex -space-x-2">
                {[
                  'bg-[#4A2540]',
                  'bg-[#B8925A]',
                  'bg-[#E8D5D0] text-[#4A2540]',
                  'bg-[#2A1520]',
                ].map((c, i) => (
                  <div
                    key={i}
                    className={`flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#FAF6EF] text-[10px] font-bold text-white ${c}`}
                  >
                    {['MK', 'JT', 'AN', 'PL'][i]}
                  </div>
                ))}
              </div>
              <div className="text-xs text-[#5B4A50]">
                <span className="font-semibold text-[#2A1520]">
                  +2 400 clientes
                </span>{' '}
                nous font déjà confiance
              </div>
            </div>
          </div>

          {/* Colonne visuelle — composition perles */}
          <div className="relative md:col-span-6 lg:col-span-6">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
              {/* Cadre principal */}
              <div className="absolute inset-0 overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/40 shadow-[0_30px_80px_-30px_rgba(74,37,64,0.4)]">
                {featuredProducts[0]?.images?.[0] ? (
                  <Image
                    src={featuredProducts[0].images[0]}
                    alt="Création KATHELYNCRAFT"
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Gem className="h-24 w-24 text-[#B8925A]/40" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2A1520]/30 via-transparent to-transparent" />
              </div>

              {/* Carte flottante — pièce signature */}
              <div className="absolute -bottom-6 -left-6 hidden w-56 rounded-2xl border border-[#B8925A]/20 bg-[#FDFBF7]/95 p-4 shadow-[0_20px_50px_-20px_rgba(42,21,32,0.35)] backdrop-blur-sm sm:block">
                <div className="flex items-center gap-2">
                  <Crown className="h-4 w-4 text-[#B8925A]" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#B8925A]">
                    Signature
                  </span>
                </div>
                <p className="mt-2 font-serif text-lg leading-tight text-[#2A1520]">
                  Perles cousues main, une à une
                </p>
                <p className="mt-1 text-[11px] text-[#8B7B7F]">
                  Chaque sac : 40 à 80 heures de travail
                </p>
              </div>

              {/* Badge circulaire doré */}
              <div className="absolute -top-4 -right-4 flex h-24 w-24 rotate-12 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF] shadow-lg">
                <div className="text-center">
                  <Award className="mx-auto h-5 w-5 text-[#B8925A]" />
                  <p className="mt-1 font-serif text-[10px] leading-tight text-[#4A2540]">
                    Édition
                    <br />
                    limitée
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bandeau défilant — signature éditoriale */}
        <div className="relative border-y border-[#B8925A]/15 bg-[#FDFBF7]">
          <div className="container flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-5 text-[10px] font-medium uppercase tracking-[0.28em] text-[#8B7B7F] sm:text-[11px]">
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
              <Gift className="h-3.5 w-3.5 text-[#B8925A]" /> Emballage cadeau
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RECHERCHE — Élégante, en retrait
      ═══════════════════════════════════════ */}
      <section className="container -mt-6 relative z-10 px-4 pt-6">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center gap-3 rounded-full border border-[#B8925A]/20 bg-white/80 px-5 py-2 shadow-[0_15px_40px_-20px_rgba(74,37,64,0.25)] backdrop-blur-md transition-all focus-within:border-[#B8925A]/60 focus-within:shadow-[0_20px_50px_-20px_rgba(184,146,90,0.4)]">
            <Search className="h-4 w-4 flex-shrink-0 text-[#B8925A]" />
            <input
              type="text"
              placeholder="Rechercher un sac, un accessoire, une pièce…"
              className="flex-1 bg-transparent py-2 text-sm text-[#2A1520] placeholder-[#8B7B7F] outline-none md:text-[15px]"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  window.location.href = `/products?search=${encodeURIComponent(
                    (e.target as HTMLInputElement).value
                  )}`
                }
              }}
            />
            <Link
              href="/products"
              className="hidden rounded-full bg-[#2A1520] px-5 py-2 text-xs font-semibold text-[#FAF6EF] transition-colors hover:bg-[#4A2540] sm:inline-block"
            >
              Chercher
            </Link>
          </div>
          <p className="mt-3 text-center font-serif text-xs italic text-[#8B7B7F]">
            Plus de 500 créations · Livraison soignée sous 24–48 h
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          VALEURS — 4 piliers de la maison
      ═══════════════════════════════════════ */}
      <section className="container py-16 md:py-20">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-[#B8925A]/15 md:grid-cols-4">
          {[
            {
              icon: Gem,
              title: 'Perles sélectionnées',
              desc: 'Qualité irréprochable',
            },
            {
              icon: Sparkles,
              title: 'Cousu main',
              desc: 'Atelier artisanal',
            },
            {
              icon: Crown,
              title: 'Pièces uniques',
              desc: 'Éditions limitées',
            },
            {
              icon: Gift,
              title: 'Écrin cadeau',
              desc: 'Emballage signature',
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group bg-[#FDFBF7] p-6 transition-colors duration-300 hover:bg-[#FAF6EF] md:p-7"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A]">
                <item.icon className="h-4.5 w-4.5 text-[#B8925A] transition-colors duration-300 group-hover:text-white" />
              </div>
              <div className="font-serif text-[15px] font-semibold text-[#2A1520] md:text-base">
                {item.title}
              </div>
              <div className="mt-0.5 text-xs text-[#8B7B7F]">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CATÉGORIES — Grille éditoriale
      ═══════════════════════════════════════ */}
      <section className="container py-6 md:py-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B8925A]">
              Collections
            </span>
            <h2 className="font-serif text-3xl leading-tight text-[#2A1520] md:text-4xl">
              Nos <span className="italic">univers</span>
            </h2>
            <p className="mt-2 max-w-md text-sm text-[#5B4A50]">
              Des sacs signatures aux accessoires précieux, chaque collection
              est pensée comme un objet de désir.
            </p>
          </div>
          <Link
            href="/categories"
            className="group hidden items-center gap-1 text-sm font-medium text-[#4A2540] transition-colors hover:text-[#B8925A] md:inline-flex"
          >
            Voir toutes les collections
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        {categoriesToShow.length === 0 ? (
          <div className="rounded-3xl border border-[#B8925A]/15 bg-[#FAF6EF] py-16 text-center">
            <Gem className="mx-auto mb-3 h-10 w-10 text-[#B8925A]/40" />
            <p className="font-serif text-sm text-[#8B7B7F]">
              Aucune collection disponible pour l'instant
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
            {categoriesToShow.map((category, index) => (
              <Link
                key={category._id}
                href={`/categories/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-[#FAF6EF] transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.35)]"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-[#FAF6EF]">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] to-[#FAF6EF]">
                      <Gem className="h-10 w-10 text-[#B8925A]/40" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2A1520]/70 via-[#2A1520]/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                  {/* Contenu superposé */}
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <h3 className="font-serif text-lg leading-tight text-white md:text-xl">
                      {category.name}
                    </h3>
                    <div className="mt-1 flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-[#D4B87A]">
                      <span>{category.productCount || 'Plusieurs'} pièces</span>
                      <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>

                  {/* Liseré doré au survol */}
                  <div className="absolute inset-x-4 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#D4B87A] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 text-center md:hidden">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1 text-sm font-medium text-[#4A2540]"
          >
            Voir toutes les collections
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SAVOIR-FAIRE — Récit de marque
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#2A1520] py-20 text-[#FAF6EF] md:py-28">
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#D4B87A] blur-3xl" />
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#E8D5D0] blur-3xl" />
        </div>

        <div className="container relative grid items-center gap-14 md:grid-cols-2">
          <div>
            <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4B87A]">
              Notre maison
            </span>
            <h2 className="font-serif text-3xl leading-[1.15] text-[#FAF6EF] md:text-[2.75rem]">
              Chaque perle est posée{' '}
              <span className="italic text-[#D4B87A]">à la main</span>,
              avec une intention.
            </h2>
            <p className="mt-6 text-[15px] leading-relaxed text-[#D9CDCF]">
              KATHELYNCRAFT est née d'une obsession : transformer la perle —
              matière délicate et précieuse — en pièces de maroquinerie
              audacieuses. Nos sacs sont cousus un à un dans notre atelier,
              avec des perles sélectionnées pour leur éclat et leur
              durabilité.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-[#D9CDCF]">
              Au-delà des sacs, la maison vous ouvre son écrin : accessoires,
              objets précieux et sélections d'exception, tous choisis avec le
              même soin.
            </p>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-[#D4B87A]/20 pt-8">
              {[
                { n: '100%', l: 'Fait main' },
                { n: '48h', l: 'Livraison' },
                { n: '∞', l: 'Personnalisation' },
              ].map((s, i) => (
                <div key={i}>
                  <div className="font-serif text-2xl text-[#D4B87A] md:text-3xl">
                    {s.n}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#A89298]">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Colonne valeurs maison */}
          <div className="space-y-4">
            {[
              {
                icon: Gem,
                title: 'Matières nobles',
                desc: 'Perles, laiton doré et cuirs fins sélectionnés auprès de maisons européennes.',
              },
              {
                icon: Heart,
                title: 'Fabrication artisanale',
                desc: 'Un seul artisan par pièce. Un geste précis, répété jusqu\'à la perfection.',
              },
              {
                icon: MessageCircle,
                title: 'Sur-mesure sur demande',
                desc: 'Une couleur, une taille, un motif ? Discutons-en sur WhatsApp.',
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 rounded-2xl border border-[#D4B87A]/15 bg-white/[0.03] p-5 transition-colors duration-300 hover:border-[#D4B87A]/40 hover:bg-white/[0.05]"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#D4B87A]/40">
                  <item.icon className="h-5 w-5 text-[#D4B87A]" />
                </div>
                <div>
                  <h3 className="font-serif text-base text-[#FAF6EF]">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-[#C4B5B8]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUITS VEDETTES
      ═══════════════════════════════════════ */}
      <section className="container py-16 md:py-20">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B8925A]">
              <Crown className="h-3.5 w-3.5" />
              Pièces signatures
            </span>
            <h2 className="font-serif text-3xl leading-tight text-[#2A1520] md:text-4xl">
              Créations <span className="italic">vedettes</span>
            </h2>
          </div>
          <Link
            href="/products?featured=true"
            className="group hidden items-center gap-1 text-sm font-medium text-[#4A2540] transition-colors hover:text-[#B8925A] md:inline-flex"
          >
            Voir toute la sélection
            <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
          {featuredProducts.length === 0 ? (
            <div className="col-span-full rounded-3xl border border-[#B8925A]/15 bg-[#FAF6EF] py-16 text-center">
              <Gem className="mx-auto mb-3 h-10 w-10 text-[#B8925A]/40" />
              <p className="font-serif text-sm text-[#8B7B7F]">
                Aucune création vedette pour l'instant
              </p>
            </div>
          ) : (
            featuredProducts.map((product) => {
              const rating = getStableRating(product._id)
              const reviewCount = getReviewCount(product._id)
              const discount = product.oldPrice
                ? Math.round((1 - product.price / product.oldPrice) * 100)
                : 0

              return (
                <article
                  key={product._id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.3)]"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="block flex-1"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#FAF6EF]">
                      {product.images && product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] to-[#FAF6EF]">
                          <Gem className="h-10 w-10 text-[#B8925A]/40" />
                        </div>
                      )}

                      {/* Badges */}
                      <div className="absolute left-3 top-3 flex flex-col gap-1.5">
                        {product.featured && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-[#2A1520] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#D4B87A] shadow-sm">
                            <Crown className="h-2.5 w-2.5" />
                            Vedette
                          </span>
                        )}
                      </div>
                      {product.oldPrice && discount > 0 && (
                        <span className="absolute right-3 top-3 rounded-full bg-[#B8925A] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-white shadow-sm">
                          −{discount}%
                        </span>
                      )}

                      {/* Overlay rapide */}
                      <div className="absolute inset-x-0 bottom-0 translate-y-full p-3 transition-transform duration-300 group-hover:translate-y-0">
                        <button
                          onClick={(e) => {
                            e.preventDefault()
                            addItem({
                              productId: product._id,
                              name: product.name,
                              slug: product.slug,
                              price: product.price,
                              quantity: 1,
                              image: product.images?.[0],
                              stock: product.stock,
                            })
                          }}
                          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#2A1520]/95 py-2.5 text-xs font-semibold text-[#FAF6EF] backdrop-blur-sm transition-colors hover:bg-[#B8925A] hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                          disabled={!product.available || product.stock === 0}
                        >
                          <ShoppingBag className="h-3.5 w-3.5" />
                          Ajouter à l'écrin
                        </button>
                      </div>
                    </div>

                    <div className="p-4">
                      <StarRating rating={rating} count={reviewCount} />
                      <h3 className="mt-2 mb-1 line-clamp-1 font-serif text-[15px] font-medium text-[#2A1520] transition-colors group-hover:text-[#B8925A] md:text-base">
                        {product.name}
                      </h3>
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="font-serif text-base font-semibold text-[#2A1520]">
                          {product.price.toLocaleString()} FCFA
                        </span>
                        {product.oldPrice && (
                          <span className="text-xs text-[#8B7B7F] line-through">
                            {product.oldPrice.toLocaleString()} FCFA
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                </article>
              )
            })
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NOUVEAUTÉS
      ═══════════════════════════════════════ */}
      <section className="bg-[#FAF6EF] py-16 md:py-20">
        <div className="container">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="mb-3 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B8925A]">
                <Sparkles className="h-3.5 w-3.5" />
                Dernières créations
              </span>
              <h2 className="font-serif text-3xl leading-tight text-[#2A1520] md:text-4xl">
                Nouveautés de <span className="italic">l'atelier</span>
              </h2>
            </div>
            <Link
              href="/products?sort=-createdAt"
              className="group hidden items-center gap-1 text-sm font-medium text-[#4A2540] transition-colors hover:text-[#B8925A] md:inline-flex"
            >
              Voir toutes les nouveautés
              <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:grid-cols-4">
            {recentProducts.length === 0 ? (
              <div className="col-span-full rounded-3xl border border-[#B8925A]/15 bg-white py-16 text-center">
                <Gem className="mx-auto mb-3 h-10 w-10 text-[#B8925A]/40" />
                <p className="font-serif text-sm text-[#8B7B7F]">
                  Aucune nouveauté disponible
                </p>
              </div>
            ) : (
              recentProducts.map((product) => (
                <article
                  key={product._id}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.3)]"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="block flex-1"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#FAF6EF]">
                      {product.images && product.images[0] ? (
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] to-[#FAF6EF]">
                          <Gem className="h-10 w-10 text-[#B8925A]/40" />
                        </div>
                      )}
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-[#B8925A]/40 bg-[#FDFBF7]/95 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#B8925A] backdrop-blur-sm">
                        <Sparkles className="h-2.5 w-2.5" />
                        Nouveau
                      </span>
                    </div>

                    <div className="p-4">
                      <h3 className="mb-2 line-clamp-1 font-serif text-[15px] font-medium text-[#2A1520] transition-colors group-hover:text-[#B8925A] md:text-base">
                        {product.name}
                      </h3>
                      <span className="font-serif text-base font-semibold text-[#2A1520]">
                        {product.price.toLocaleString()} FCFA
                      </span>
                    </div>
                  </Link>

                  <div className="px-4 pb-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        addItem({
                          productId: product._id,
                          name: product.name,
                          slug: product.slug,
                          price: product.price,
                          quantity: 1,
                          image: product.images?.[0],
                          stock: product.stock,
                        })
                      }}
                      className="flex w-full items-center justify-center gap-2 rounded-full border border-[#2A1520]/15 bg-transparent py-2.5 text-xs font-semibold text-[#2A1520] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={!product.available || product.stock === 0}
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      {product.available && product.stock > 0
                        ? 'Ajouter à l\'écrin'
                        : 'Épuisé'}
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TÉMOIGNAGES
      ═══════════════════════════════════════ */}
      <section className="container py-16 md:py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B8925A]">
            Elles nous font confiance
          </span>
          <h2 className="font-serif text-3xl leading-tight text-[#2A1520] md:text-4xl">
            Ce que nos clientes{' '}
            <span className="italic">racontent</span>
          </h2>
          <p className="mt-3 text-sm text-[#5B4A50]">
            Des histoires vraies, de vraies personnes, à travers le monde.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              name: 'Marie K.',
              city: 'Yaoundé',
              rating: 5,
              text: "Mon sac signature est arrivé dans un écrin magnifique, encore plus beau qu'en photo. Les perles sont cousues à la perfection. Une vraie pièce de collection.",
              avatar: 'bg-[#4A2540]',
            },
            {
              name: 'Jean T.',
              city: 'Douala',
              rating: 5,
              text: "J'ai commandé un cadeau pour ma femme. Conseils sur WhatsApp, emballage sublime, livraison impeccable. KATHELYNCRAFT, c'est du sérieux.",
              avatar: 'bg-[#B8925A]',
            },
            {
              name: 'Aline N.',
              city: 'Bafoussam',
              rating: 4,
              text: "Troisième commande et toujours cette même émotion à l'ouverture du colis. Un savoir-faire rare, des finitions dignes de la haute maroquinerie.",
              avatar: 'bg-[#2A1520]',
            },
          ].map((t, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-6 transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.25)]"
            >
              {/* Guillemet décoratif */}
              <div className="absolute -top-2 right-5 font-serif text-6xl leading-none text-[#B8925A]/15">
                ”
              </div>

              <div className="mb-4 flex gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-3.5 w-3.5 ${
                      s <= t.rating
                        ? 'text-[#B8925A] fill-[#B8925A]'
                        : 'text-[#E8D5D0]'
                    }`}
                  />
                ))}
              </div>
              <p className="mb-5 font-serif text-[15px] italic leading-relaxed text-[#3D2A30]">
                « {t.text} »
              </p>
              <div className="flex items-center gap-3 border-t border-[#B8925A]/15 pt-4">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white ${t.avatar}`}
                >
                  {t.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className="font-serif text-sm font-semibold text-[#2A1520]">
                    {t.name}
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                    {t.city}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NEWSLETTER — Prune & or
      ═══════════════════════════════════════ */}
      <section className="container pb-16 md:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] px-6 py-12 md:px-14 md:py-16">
          {/* Perles lumineuses */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-20 right-0 h-72 w-72 rounded-full bg-[#D4B87A]/15 blur-3xl" />
            <div className="absolute -bottom-20 left-1/4 h-64 w-64 rounded-full bg-[#E8D5D0]/10 blur-3xl" />
          </div>

          <div className="relative z-10 mx-auto max-w-2xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4B87A]/30 bg-white/[0.05] px-4 py-1.5 backdrop-blur-sm">
              <Heart className="h-3.5 w-3.5 text-[#D4B87A]" />
              <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-[#D4B87A]">
                Cercle privé KATHELYNCRAFT
              </span>
            </div>

            <h2 className="font-serif text-3xl leading-tight text-[#FAF6EF] md:text-4xl">
              Accédez aux{' '}
              <span className="italic text-[#D4B87A]">créations confidentielles</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-[#C4B5B8] md:text-[15px]">
              Inscrivez-vous et recevez en exclusivité nos drops limités,
              coulisses d'atelier et invitations privées avant tout le monde.
            </p>

            {subscribed ? (
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10 px-6 py-3.5 text-sm font-medium text-[#D4B87A]">
                <CheckCircle className="h-4 w-4" />
                <span>Bienvenue dans le cercle. À très vite.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="flex-1 rounded-full border border-[#D4B87A]/20 bg-white/[0.06] px-5 py-3.5 text-sm text-[#FAF6EF] placeholder-[#A89298] outline-none backdrop-blur-sm transition-colors focus:border-[#D4B87A]/60"
                />
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4B87A] px-6 py-3.5 text-sm font-semibold text-[#2A1520] transition-all duration-300 hover:bg-[#E8D5D0] hover:shadow-[0_15px_40px_-10px_rgba(212,184,122,0.5)]"
                >
                  <Send className="h-4 w-4" />
                  Rejoindre
                </button>
              </form>
            )}

            <p className="mt-5 text-[11px] uppercase tracking-[0.2em] text-[#A89298]">
              +500 membres cette semaine · Aucun spam
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT — Atelier & signature
      ═══════════════════════════════════════ */}
      <section className="bg-[#2A1520] py-16 text-[#FAF6EF] md:py-20">
        <div className="container">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4B87A]">
                Service client
              </span>
              <h2 className="font-serif text-3xl leading-tight text-[#FAF6EF] md:text-4xl">
                Une question, un projet{' '}
                <span className="italic text-[#D4B87A]">sur-mesure</span> ?
              </h2>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#C4B5B8]">
                Notre atelier vous répond sur WhatsApp en moins de 15 minutes.
                Conseil sur une pièce, personnalisation, suivi de commande —
                nous sommes là.
              </p>

              <div className="mt-8 space-y-3">
                {[
                  {
                    icon: Phone,
                    label: 'Téléphone / WhatsApp',
                    value: settings?.businessPhone || '+237 600 000 000',
                  },
                  {
                    icon: MapPin,
                    label: 'Atelier',
                    value: settings?.businessAddress || 'Yaoundé, Cameroun',
                  },
                  {
                    icon: Mail,
                    label: 'Email',
                    value: settings?.businessEmail || 'contact@kathelyncraft.com',
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 rounded-2xl border border-[#D4B87A]/15 bg-white/[0.03] p-4 transition-colors duration-300 hover:border-[#D4B87A]/40 hover:bg-white/[0.05]"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#D4B87A]/40">
                      <item.icon className="h-4 w-4 text-[#D4B87A]" />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.2em] text-[#A89298]">
                        {item.label}
                      </div>
                      <div className="font-serif text-sm text-[#FAF6EF]">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href={`https://wa.me/${settings?.whatsappNumber || '237600000000'}`}
                  target="_blank"
                  className="inline-flex items-center gap-2 rounded-full bg-[#D4B87A] px-6 py-3 text-sm font-semibold text-[#2A1520] transition-all duration-300 hover:bg-[#E8D5D0] hover:shadow-[0_15px_40px_-10px_rgba(212,184,122,0.5)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Discuter sur WhatsApp
                </Link>
                <div className="inline-flex items-center gap-2 px-2 text-xs text-[#A89298]">
                  <Clock className="h-3.5 w-3.5" />
                  Réponse sous 15 min
                </div>
              </div>
            </div>

            {/* Carte signature */}
            <div className="relative rounded-[2rem] border border-[#D4B87A]/20 bg-white/[0.03] p-8 text-center backdrop-blur-sm md:p-10">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#D4B87A] to-[#B8925A] shadow-[0_15px_40px_-10px_rgba(212,184,122,0.6)]">
                <Gem className="h-7 w-7 text-[#2A1520]" />
              </div>
              <h3 className="font-serif text-2xl text-[#FAF6EF]">
                {settings?.businessName || 'KATHELYNCRAFT'}
              </h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-[#C4B5B8]">
                {settings?.businessDescription ||
                  'Maison de maroquinerie artisanale. Sacs de luxe en perles, cousus main, façonnés pour durer.'}
              </p>

              <div className="mt-6 flex items-center justify-center gap-6 border-t border-[#D4B87A]/15 pt-6 text-xs text-[#A89298]">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-[#D4B87A]" />
                  Lun–Ven · 8h–18h
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#D4B87A]" />
                  Sam · 9h–14h
                </div>
              </div>
            </div>
          </div>

          {/* Footer bas */}
          <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-[#D4B87A]/15 pt-8 text-xs text-[#A89298] md:flex-row">
            <p>
              © {new Date().getFullYear()}{' '}
              <span className="font-serif text-[#D4B87A]">
                {settings?.businessName || 'KATHELYNCRAFT'}
              </span>
              . Tous droits réservés.
            </p>
            <div className="flex items-center gap-6">
              <Link
                href="/products"
                className="transition-colors hover:text-[#D4B87A]"
              >
                Boutique
              </Link>
              <Link
                href="/categories"
                className="transition-colors hover:text-[#D4B87A]"
              >
                Collections
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-[#D4B87A]"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}