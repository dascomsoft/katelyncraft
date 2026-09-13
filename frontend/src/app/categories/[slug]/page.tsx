'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import {
  ArrowLeft,
  ChevronRight,
  Home,
  Mail,
  Send,
  Clock,
  MessageCircle,
  CheckCircle,
  Sparkles,
  SearchX,
  Gem,
  Crown,
  Gift,
  Scissors,
  ShieldCheck,
  Package,
  Heart,
} from 'lucide-react'
import ProductGrid from '@/components/products/ProductGrid'
import { categoryService } from '@/services/categoryService'
import { productService } from '@/services/productService'
import { useSettings } from '@/hooks/useSettings'
import { Category, Product } from '@/types'

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const { settings } = useSettings()

  const [category, setCategory] = useState<Category | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await categoryService.getCategories()
        const foundCategory = categories.find((c: Category) => c.slug === slug)
        setCategory(foundCategory || null)

        if (foundCategory) {
          const productsRes = await productService.getProducts({
            category: foundCategory._id,
            limit: 20,
            available: 'true',
          })
          setProducts(productsRes.products || [])
        }
      } catch (error) {
        console.error('Error fetching category:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [slug])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
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
            Ouverture de la collection…
          </p>
        </div>
      </div>
    )
  }

  /* ═══════════════════════════════════════
     CATÉGORIE INTROUVABLE
  ═══════════════════════════════════════ */
  if (!category) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-[#FDFBF7] px-4 text-center">
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
          <Gem className="h-9 w-9 text-[#B8925A]" />
        </div>
        <h2 className="mb-2 font-serif text-2xl text-[#2A1520]">
          Cette collection est introuvable
        </h2>
        <p className="mb-6 max-w-md text-sm leading-relaxed text-[#5B4A50]">
          La collection que vous recherchez n&apos;existe pas ou a été retirée
          de notre écrin.
        </p>
        <Link
          href="/categories"
          className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-6 py-3 text-sm font-semibold text-[#FAF6EF] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_15px_40px_-15px_rgba(74,37,64,0.5)]"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Voir toutes les collections
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A1520]">
      {/* ═══════════════════════════════════════
          HERO — Éditorial collection
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FAF6EF]">
        {/* Motif perles décoratif */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-[280px] w-[280px] rounded-full bg-gradient-to-bl from-[#4A2540]/10 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="container relative px-4 py-10 md:py-16">
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
            <Link
              href="/categories"
              className="transition-colors hover:text-[#B8925A]"
            >
              Collections
            </Link>
            <ChevronRight className="h-3 w-3 text-[#B8925A]/50" />
            <span className="font-semibold text-[#B8925A]">
              {category.name}
            </span>
          </nav>

          {/* Eyebrow signature */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
            <Gem className="h-3.5 w-3.5 text-[#B8925A]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
              Collection · Cousue main
            </span>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h1 className="mb-4 font-serif text-[2rem] leading-[1.1] tracking-tight text-[#2A1520] md:text-[2.75rem] lg:text-[3rem]">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-sm leading-relaxed text-[#5B4A50] md:text-base">
                  {category.description}
                </p>
              )}
            </div>

            {/* Compteur produits */}
            <div className="inline-flex items-center gap-3 rounded-full border border-[#B8925A]/30 bg-white/70 px-5 py-2.5 backdrop-blur-sm">
              <Gem className="h-4 w-4 text-[#B8925A]" />
              <span className="text-xs uppercase tracking-[0.15em] text-[#5B4A50]">
                <span className="font-serif text-base font-semibold text-[#2A1520]">
                  {products.length}
                </span>{' '}
                pièce{products.length > 1 ? 's' : ''}
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
          BANDEAU VALEURS
      ═══════════════════════════════════════ */}
      <section className="container relative z-10 -mt-5 px-4">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-[#B8925A]/15 shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)] md:flex md:items-stretch md:justify-between">
          {[
            { icon: Gift, text: 'Écrin signature' },
            { icon: ShieldCheck, text: 'Paiement sécurisé' },
            { icon: MessageCircle, text: 'Conseil WhatsApp' },
            { icon: Scissors, text: 'Fait main' },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="flex flex-1 items-center gap-2.5 bg-[#FDFBF7] px-4 py-3.5 text-xs text-[#5B4A50] transition-colors duration-300 hover:bg-[#FAF6EF] md:px-6 md:py-4 md:text-sm"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] md:h-9 md:w-9">
                  <Icon className="h-3.5 w-3.5 text-[#B8925A] md:h-4 md:w-4" />
                </div>
                <span className="font-medium whitespace-nowrap">
                  {item.text}
                </span>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CARTE DE PRÉSENTATION COLLECTION
      ═══════════════════════════════════════ */}
      <section className="container mt-8 px-4">
        <div className="flex flex-col gap-4 rounded-2xl border border-[#B8925A]/15 bg-[#FAF6EF] p-5 sm:flex-row sm:items-center md:p-6">
          {category.image && (
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border border-[#B8925A]/25 bg-white">
              <Image
                src={category.image}
                alt={category.name}
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <h2 className="mb-1 font-serif text-lg text-[#2A1520]">
              Parcourez nos créations{' '}
              <span className="italic text-[#B8925A]">
                {category.name.toLowerCase()}
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-[#5B4A50]">
              Chaque pièce est inspectée une à une avant expédition. Paiement
              à la livraison disponible.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-full border border-[#B8925A]/25 bg-white px-4 py-2.5 text-xs font-medium text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-white"
          >
            <Gem className="h-3.5 w-3.5" />
            Toute la boutique
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GRILLE PRODUITS
      ═══════════════════════════════════════ */}
      <section className="container px-4 py-8 md:py-12">
        {products.length === 0 ? (
          /* ── Empty state ── */
          <div className="rounded-3xl border border-[#B8925A]/15 bg-white px-6 py-16 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
              <SearchX className="h-7 w-7 text-[#B8925A]" />
            </div>
            <h3 className="mb-2 font-serif text-xl text-[#2A1520]">
              Aucune pièce dans cette collection
            </h3>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-[#5B4A50]">
              Cette collection est momentanément vide. Découvrez nos autres
              créations ou demandez-nous une pièce sur mesure.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-5 py-2.5 text-sm font-semibold text-[#FAF6EF] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_15px_40px_-15px_rgba(74,37,64,0.5)]"
              >
                <Gem className="h-4 w-4" />
                Explorer la boutique
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <a
                href={`https://wa.me/${
                  settings?.whatsappNumber || '237600000000'
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-[#B8925A]/40 bg-[#FAF6EF] px-5 py-2.5 text-sm font-semibold text-[#B8925A] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Demander une pièce
              </a>
            </div>
          </div>
        ) : (
          <ProductGrid products={products} loading={false} />
        )}
      </section>

      {/* ═══════════════════════════════════════
          LA SIGNATURE DE LA MAISON
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#2A1520] py-14 text-[#FAF6EF] md:py-20">
        {/* Décor perles */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#D4B87A] blur-3xl" />
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#E8D5D0] blur-3xl" />
        </div>

        <div className="container relative px-4">
          <div className="mx-auto max-w-2xl text-center">
            <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4B87A]">
              Notre promesse
            </span>
            <h2 className="font-serif text-3xl leading-tight text-[#FAF6EF] md:text-4xl">
              Votre satisfaction, notre{' '}
              <span className="italic text-[#D4B87A]">priorité absolue</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[#C4B5B8] md:text-[15px]">
              Chaque commande est traitée avec le même soin qu&apos;un
              écrin de haute joaillerie. De la sélection à la livraison,
              chaque détail compte.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Sparkles,
                title: 'Pièces vérifiées',
                desc: 'Chaque création est inspectée avant expédition. Zéro mauvaise surprise à la réception.',
              },
              {
                icon: ShieldCheck,
                title: 'Paiement à la livraison',
                desc: 'Réglez uniquement à la réception de votre écrin. Votre tranquillité avant tout.',
              },
              {
                icon: MessageCircle,
                title: 'Conseil d\'artisane',
                desc: 'Une artisane vous guide par WhatsApp pour choisir la pièce juste dans cette collection.',
              },
            ].map((item, i) => {
              const Icon = item.icon
              return (
                <div
                  key={i}
                  className="group relative overflow-hidden rounded-2xl border border-[#D4B87A]/15 bg-white/[0.03] p-7 text-center transition-all duration-500 hover:-translate-y-2 hover:border-[#D4B87A]/40 hover:bg-white/[0.05]"
                >
                  <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#D4B87A]/40 transition-colors duration-300 group-hover:bg-[#D4B87A]">
                    <Icon className="h-5 w-5 text-[#D4B87A] transition-colors duration-300 group-hover:text-[#2A1520]" />
                  </div>
                  <h3 className="font-serif text-lg text-[#FAF6EF]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#C4B5B8]">
                    {item.desc}
                  </p>
                  <div className="mx-auto mt-5 h-px w-10 bg-gradient-to-r from-transparent via-[#D4B87A] to-transparent transition-all duration-500 group-hover:w-20" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA WHATSAPP — Sur-mesure
      ═══════════════════════════════════════ */}
      <section className="container px-4 py-12 md:py-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] px-6 py-12 text-center text-[#FAF6EF] md:px-12 md:py-16">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4B87A]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#E8D5D0]/10 blur-3xl" />

          <div className="relative mx-auto max-w-xl">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10 backdrop-blur-sm">
              <MessageCircle className="h-6 w-6 text-[#D4B87A]" />
            </div>
            <h2 className="font-serif text-2xl leading-tight text-[#FAF6EF] md:text-3xl">
              Vous cherchez une{' '}
              <span className="italic text-[#D4B87A]">
                pièce spécifique ?
              </span>
            </h2>
            <p className="mx-auto mt-4 mb-8 max-w-md text-sm leading-relaxed text-[#C4B5B8] md:text-[15px]">
              Dites-nous ce que vous cherchez sur WhatsApp. Une artisane
              vous répond en moins de 15 minutes avec les meilleures options
              — ou vous propose une création sur mesure.
            </p>
            <a
              href={`https://wa.me/${
                settings?.whatsappNumber || '237600000000'
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D4B87A] px-8 py-3.5 text-sm font-semibold text-[#2A1520] transition-all duration-300 hover:bg-[#E8D5D0] hover:shadow-[0_20px_50px_-15px_rgba(212,184,122,0.5)]"
            >
              <MessageCircle className="h-4 w-4" />
              Discuter sur WhatsApp
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          NEWSLETTER — Cercle privé
      ═══════════════════════════════════════ */}
      <section className="container px-4 pb-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] px-6 py-10 md:px-12 md:py-14">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4B87A]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#E8D5D0]/10 blur-3xl" />

          <div className="relative mx-auto max-w-xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D4B87A]/30 bg-white/[0.05] px-4 py-1.5 backdrop-blur-sm">
              <Heart className="h-3.5 w-3.5 text-[#D4B87A]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#D4B87A]">
                Cercle privé
              </span>
            </div>

            <h2 className="mb-3 font-serif text-2xl leading-tight text-[#FAF6EF] md:text-3xl">
              Soyez avertie des{' '}
              <span className="italic text-[#D4B87A]">
                nouvelles pièces
              </span>
            </h2>
            <p className="mb-7 text-sm leading-relaxed text-[#C4B5B8] md:text-[15px]">
              Inscrivez-vous et recevez une alerte dès que de nouvelles
              créations arrivent dans la collection{' '}
              <span className="font-serif italic text-[#D4B87A]">
                {category.name.toLowerCase()}
              </span>
              .
            </p>

            {subscribed ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10 px-6 py-3.5 text-sm font-medium text-[#D4B87A]">
                <CheckCircle className="h-4 w-4" />
                <span>Bienvenue dans le cercle.</span>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
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

            <p className="mt-5 flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-[#A89298]">
              <Clock className="h-3 w-3" />
              +500 membres cette semaine · Aucun spam
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}