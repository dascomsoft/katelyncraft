'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  Truck,
  ShieldCheck,
  MessageCircle,
  CheckCircle,
  Sparkles,
  ChevronRight,
  Home,
  SlidersHorizontal,
  Mail,
  Send,
  ArrowRight,
  Gem,
  SearchX,
  Crown,
  Gift,
  Scissors,
  Clock,
  Heart,
} from 'lucide-react'
import ProductGrid from '@/components/products/ProductGrid'
import ProductFilters from '@/components/products/ProductFilters'
import ProductSearch from '@/components/products/ProductSearch'
import { productService } from '@/services/productService'
import { categoryService } from '@/services/categoryService'
import { useSettings } from '@/hooks/useSettings'
import { Product, Category } from '@/types'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const { settings } = useSettings()

  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [showFilters, setShowFilters] = useState(false) // UI state uniquement

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 1,
  })

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    available: '',
    sort: '-createdAt',
  })

  // FONCTION CLE : nettoie les filtres vides avant envoi API
  // Un filtre vide ne doit JAMAIS etre envoye au backend
  const buildQueryParams = useCallback(() => {
    const raw: Record<string, any> = {
      ...filters,
      page: pagination.page,
      limit: pagination.limit,
    }

    const cleaned: Record<string, any> = {}
    Object.entries(raw).forEach(([key, value]) => {
      // On garde seulement les valeurs non-vides
      if (value !== '' && value !== null && value !== undefined) {
        cleaned[key] = value
      }
    })

    // Debug
    console.log('🔧 Filtres bruts:', filters)
    console.log('🔧 Filtres nettoyes envoyes a l API:', cleaned)

    return cleaned
  }, [filters, pagination.page, pagination.limit])

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true)
      const queryParams = buildQueryParams()

      const response = await productService.getProducts(queryParams)

      console.log('📦 API response:', response)
      console.log('📦 Nombre de produits:', response.products?.length)

      setProducts(response.products || [])
      setPagination(
        response.pagination || { page: 1, limit: 12, total: 0, pages: 1 }
      )
    } catch (error) {
      console.error('❌ Error fetching products:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [buildQueryParams])

  const fetchCategories = useCallback(async () => {
    try {
      const data = await categoryService.getCategories({ active: true })
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      setCategories([])
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleFilterChange = useCallback((newFilters: any) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
    setPagination((prev) => ({ ...prev, page: 1 }))
  }, [])

  const handlePageChange = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page }))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  const progressPercent =
    pagination.total > 0
      ? Math.min(
          100,
          ((pagination.page * pagination.limit) / pagination.total) * 100
        )
      : 0

  const hasActiveFilters =
    filters.search ||
    filters.category ||
    filters.brand ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.available

  const resetFilters = () => {
    setFilters({
      search: '',
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      available: '',
      sort: '-createdAt',
    })
    setPagination((prev) => ({ ...prev, page: 1 }))
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#2A1520]">
      {/* ═══════════════════════════════════════
          HERO — Éditorial atelier
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FAF6EF]">
        {/* Motif perles décoratif */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-[280px] w-[280px] rounded-full bg-gradient-to-bl from-[#4A2540]/10 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="container relative px-4 py-8 md:py-14">
          {/* Fil d'Ariane éditorial */}
          <nav className="mb-5 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-[#8B7B7F] md:text-xs">
            <Link
              href="/"
              className="flex flex-shrink-0 items-center gap-1.5 transition-colors hover:text-[#B8925A]"
            >
              <Home className="h-3 w-3" />
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0 text-[#B8925A]/50" />
            <span className="flex-shrink-0 font-semibold text-[#B8925A]">
              Boutique
            </span>
            {filters.search && (
              <>
                <ChevronRight className="h-3 w-3 flex-shrink-0 text-[#B8925A]/50" />
                <span className="truncate text-[#5B4A50]">
                  «&nbsp;{filters.search}&nbsp;»
                </span>
              </>
            )}
          </nav>

          {/* Eyebrow signature */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
            <Gem className="h-3.5 w-3.5 text-[#B8925A]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
              Collection · Cousue main
            </span>
          </div>

          <h1 className="mb-3 font-serif text-[2rem] leading-[1.1] tracking-tight text-[#2A1520] md:text-[2.75rem] lg:text-[3rem]">
            {filters.search ? (
              <>
                Résultats pour{' '}
                <span className="italic text-[#B8925A] break-words">
                  «&nbsp;{filters.search}&nbsp;»
                </span>
              </>
            ) : (
              <>
                Trouvez votre{' '}
                <span className="italic text-[#B8925A]">
                  pièce signature.
                </span>
              </>
            )}
          </h1>
          <p className="max-w-xl text-sm leading-relaxed text-[#5B4A50] md:text-base">
            {pagination.total > 0
              ? `${pagination.total} création${
                  pagination.total > 1 ? 's' : ''
                } sélectionnée${
                  pagination.total > 1 ? 's' : ''
                } avec soin. Livraison soignée sous 24–48 h.`
              : 'Explorez la collection et laissez-vous porter par une pièce cousue pour vous.'}
          </p>
        </div>

        {/* Liseré doré inférieur */}
        <div className="container relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BANDEAU VALEURS — 4 piliers
      ═══════════════════════════════════════ */}
      <section className="container relative z-10 -mt-5 px-4">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-[#B8925A]/15 shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)] md:flex md:items-stretch md:justify-between">
          {[
            { icon: Gift, text: 'Écrin signature' },
            { icon: ShieldCheck, text: 'Paiement sécurisé' },
            { icon: MessageCircle, text: 'Conseil WhatsApp' },
            { icon: Scissors, text: 'Fait main' },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-1 items-center gap-2.5 bg-[#FDFBF7] px-4 py-3.5 text-xs text-[#5B4A50] transition-colors duration-300 hover:bg-[#FAF6EF] md:px-6 md:py-4 md:text-sm"
            >
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] md:h-9 md:w-9">
                <item.icon className="h-3.5 w-3.5 text-[#B8925A] md:h-4 md:w-4" />
              </div>
              <span className="font-medium whitespace-nowrap">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROMO — Drops confidentiels
      ═══════════════════════════════════════ */}
      {!filters.search && !hasActiveFilters && (
        <section className="container mt-5 px-4">
          <div className="relative overflow-hidden rounded-2xl border border-[#B8925A]/25 bg-gradient-to-r from-[#FAF6EF] via-[#FDFBF7] to-[#FAF6EF] p-4 md:p-5">
            {/* Perles décoratives */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D4B87A]/15 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-[#E8D5D0]/30 blur-2xl" />

            <div className="relative flex flex-col justify-between gap-3.5 sm:flex-row sm:items-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#B8925A] shadow-[0_10px_25px_-10px_rgba(184,146,90,0.5)]">
                  <Crown className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-serif text-[15px] text-[#2A1520] md:text-base">
                    Édition limitée en cours
                  </div>
                  <div className="text-xs text-[#8B7B7F]">
                    Jusqu&apos;à −30% sur une sélection de créations
                    confidentielles cette semaine.
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleFilterChange({ sort: '-price' })}
                className="group relative flex w-full items-center justify-center gap-2 rounded-full bg-[#2A1520] px-5 py-3 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_35px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] active:shadow-md sm:w-auto sm:py-2.5"
              >
                Voir les offres
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════
          RECHERCHE
      ═══════════════════════════════════════ */}
      <section className="container mt-5 px-4">
        <ProductSearch
          value={filters.search}
          onChange={(value: string) => handleFilterChange({ search: value })}
        />
      </section>

      {/* ═══════════════════════════════════════
          CONTENU PRINCIPAL
      ═══════════════════════════════════════ */}
      <section className="container px-4 py-6 md:py-8">
        <div className="grid gap-5 lg:grid-cols-4 lg:gap-6">
          {/* ─────────── Sidebar ─────────── */}
          <div className="space-y-4 lg:col-span-1">
            {/* Bouton filtres mobile */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex w-full items-center justify-between rounded-2xl border border-[#B8925A]/20 bg-white px-4 py-3 text-sm font-semibold text-[#2A1520] transition-colors active:bg-[#FAF6EF] lg:hidden"
            >
              <span className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#B8925A]" />
                Affiner
                {hasActiveFilters && (
                  <span className="h-2 w-2 rounded-full bg-[#B8925A]" />
                )}
              </span>
              <ChevronRight
                className={`h-4 w-4 text-[#8B7B7F] transition-transform duration-300 ${
                  showFilters ? 'rotate-90' : ''
                }`}
              />
            </button>

            <div
              className={`space-y-4 ${
                showFilters ? 'block' : 'hidden'
              } lg:block`}
            >
              <div className="mb-2 hidden items-center gap-2 lg:flex">
                <SlidersHorizontal className="h-4 w-4 text-[#B8925A]" />
                <span className="font-serif text-sm text-[#2A1520]">
                  Affiner la sélection
                </span>
                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="ml-auto text-xs font-medium text-[#B8925A] transition-colors hover:text-[#4A2540]"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              <div className="overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white shadow-[0_20px_50px_-25px_rgba(74,37,64,0.15)]">
                <ProductFilters
                  categories={categories}
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>

              {/* Reset mobile */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="w-full py-2 text-center text-xs font-medium text-[#B8925A] transition-colors hover:text-[#4A2540] lg:hidden"
                >
                  Réinitialiser les filtres
                </button>
              )}

              {/* ─── CTA WhatsApp — desktop ─── */}
              <div className="relative hidden overflow-hidden rounded-2xl bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] p-5 text-[#FAF6EF] lg:block">
                <div className="pointer-events-none absolute -right-5 -top-5 h-28 w-28 rounded-full bg-[#D4B87A]/15 blur-2xl" />
                <div className="pointer-events-none absolute -bottom-5 -left-5 h-24 w-24 rounded-full bg-[#E8D5D0]/10 blur-2xl" />

                <div className="relative">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10">
                    <MessageCircle className="h-4 w-4 text-[#D4B87A]" />
                  </div>
                  <h3 className="font-serif text-base text-[#FAF6EF]">
                    Besoin d&apos;un conseil ?
                  </h3>
                  <p className="mt-1.5 mb-4 text-xs leading-relaxed text-[#C4B5B8]">
                    Une artisane vous guide pour choisir la pièce juste.
                    Réponse en moins de 15 min.
                  </p>
                  <a
                    href={`https://wa.me/${
                      settings?.whatsappNumber || '237600000000'
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#D4B87A] px-4 py-2.5 text-xs font-semibold text-[#2A1520] transition-all duration-300 hover:bg-[#E8D5D0] hover:shadow-[0_15px_35px_-10px_rgba(212,184,122,0.5)]"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    Discuter sur WhatsApp
                    <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </a>
                </div>
              </div>

              {/* ─── Pourquoi nous choisir — desktop ─── */}
              <div className="hidden rounded-2xl border border-[#B8925A]/15 bg-[#FAF6EF] p-5 lg:block">
                <h3 className="mb-3 flex items-center gap-2 font-serif text-sm text-[#2A1520]">
                  <Sparkles className="h-4 w-4 text-[#B8925A]" />
                  La signature KATHELYNCRAFT
                </h3>
                <ul className="space-y-2.5">
                  {[
                    'Perles cousues main, une à une',
                    'Inspection pièce par pièce',
                    'Écrin signature offert',
                    'Sur-mesure sur demande',
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-xs text-[#5B4A50]"
                    >
                      <CheckCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-[#B8925A]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ─────────── Grille produits ─────────── */}
          <div className="lg:col-span-3">
            {/* Barre de résultats */}
            <div className="mb-5 flex flex-col gap-3 rounded-2xl border border-[#B8925A]/15 bg-white p-3.5 shadow-[0_15px_40px_-25px_rgba(74,37,64,0.15)] sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Gem className="h-4 w-4 flex-shrink-0 text-[#B8925A]" />
                <p className="whitespace-nowrap text-sm text-[#5B4A50]">
                  <span className="font-serif font-semibold text-[#2A1520]">
                    {pagination.total}
                  </span>{' '}
                  création{pagination.total > 1 ? 's' : ''} trouvée
                  {pagination.total > 1 ? 's' : ''}
                </p>
                {hasActiveFilters && (
                  <span className="hidden text-xs text-[#8B7B7F] sm:inline">
                    · filtres actifs
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <label className="whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-[#8B7B7F]">
                  Trier
                </label>
                <select
                  value={filters.sort}
                  onChange={(e) =>
                    handleFilterChange({ sort: e.target.value })
                  }
                  className="flex-1 cursor-pointer rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-3 py-2.5 text-sm text-[#2A1520] outline-none transition-colors hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:ring-2 focus:ring-[#B8925A]/20 sm:flex-none"
                >
                  <option value="-createdAt">Nouveautés</option>
                  <option value="price">Prix croissant</option>
                  <option value="-price">Prix décroissant</option>
                  <option value="-views">Les plus vues</option>
                </select>
              </div>
            </div>

            {/* Barre de progression — desktop */}
            {pagination.total > 0 && (
              <div className="mb-4 hidden sm:block">
                <div className="mb-1.5 flex items-center justify-between text-[11px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                  <span>
                    {Math.min(
                      (pagination.page - 1) * pagination.limit + 1,
                      pagination.total
                    )}{' '}
                    –{' '}
                    {Math.min(
                      pagination.page * pagination.limit,
                      pagination.total
                    )}{' '}
                    sur {pagination.total}
                  </span>
                  <span>{Math.round(progressPercent)}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-[#E8D5D0]/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#B8925A] to-[#D4B87A] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}

            {/* Empty state */}
            {!loading && products.length === 0 && (
              <div className="rounded-3xl border border-[#B8925A]/15 bg-white px-4 py-14 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
                  <SearchX className="h-7 w-7 text-[#B8925A]" />
                </div>
                <h3 className="mb-2 font-serif text-lg text-[#2A1520]">
                  Aucune pièce trouvée
                </h3>
                <p className="mx-auto mb-6 max-w-sm text-sm leading-relaxed text-[#5B4A50]">
                  Essayez d&apos;ajuster vos filtres ou d&apos;utiliser
                  d&apos;autres mots-clés. Une artisane peut aussi vous
                  guider personnellement.
                </p>
                <div className="mx-auto flex max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center">
                  <button
                    onClick={resetFilters}
                    className="rounded-full bg-[#2A1520] px-5 py-3 text-sm font-semibold text-[#FAF6EF] transition-all duration-300 hover:bg-[#4A2540] active:shadow-md"
                  >
                    Réinitialiser
                  </button>
                  <a
                    href={`https://wa.me/${
                      settings?.whatsappNumber || '237600000000'
                    }`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#B8925A]/40 bg-[#FAF6EF] px-5 py-3 text-sm font-semibold text-[#B8925A] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Demander un conseil
                  </a>
                </div>
              </div>
            )}

            <ProductGrid
              products={products}
              loading={loading}
              pagination={pagination}
              onPageChange={handlePageChange}
            />

            {/* Progression — mobile */}
            {pagination.total > 0 && (
              <div className="mt-4 lg:hidden">
                <div className="h-1 overflow-hidden rounded-full bg-[#E8D5D0]/60">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#B8925A] to-[#D4B87A] transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-center text-[11px] uppercase tracking-[0.18em] text-[#8B7B7F]">
                  Page {pagination.page} sur {pagination.pages}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA WhatsApp — Mobile
      ═══════════════════════════════════════ */}
      <section className="container px-4 pb-8 lg:hidden">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] p-6 text-center text-[#FAF6EF]">
          <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#D4B87A]/15 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-10 -left-10 h-32 w-32 rounded-full bg-[#E8D5D0]/10 blur-2xl" />

          <div className="relative">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10">
              <MessageCircle className="h-5 w-5 text-[#D4B87A]" />
            </div>
            <h3 className="mb-2 font-serif text-lg">
              Besoin d&apos;un conseil ?
            </h3>
            <p className="mx-auto mb-5 max-w-sm text-sm leading-relaxed text-[#C4B5B8]">
              Une artisane vous répond sur WhatsApp en moins de 15 minutes.
              Gratuit, sans engagement.
            </p>
            <a
              href={`https://wa.me/${
                settings?.whatsappNumber || '237600000000'
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4B87A] px-6 py-3.5 font-semibold text-[#2A1520] shadow-[0_15px_40px_-15px_rgba(212,184,122,0.5)] transition-all duration-300 hover:bg-[#E8D5D0]"
            >
              <MessageCircle className="h-5 w-5" />
              Discuter sur WhatsApp
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
              Accédez aux{' '}
              <span className="italic text-[#D4B87A]">
                créations confidentielles
              </span>
            </h2>
            <p className="mb-7 text-sm leading-relaxed text-[#C4B5B8] md:text-[15px]">
              Inscrivez-vous et recevez nos drops limités, coulisses
              d&apos;atelier et invitations privées avant tout le monde.
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
                  className="flex-1 rounded-full border border-[#D4B87A]/20 bg-white/[0.06] px-5 py-3.5 text-[16px] text-[#FAF6EF] placeholder-[#A89298] outline-none backdrop-blur-sm transition-colors focus:border-[#D4B87A]/60 sm:text-sm"
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