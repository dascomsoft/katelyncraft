'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Package,
  Store,
  Gem,
  Crown,
  Sparkles,
  AlertCircle,
  Gift,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from 'lucide-react'
import { productService } from '@/services/productService'
import { shopService, Shop } from '@/services/shopService'
import { Product } from '@/types'
import toast from 'react-hot-toast'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [shopFilter, setShopFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params: any = {
        search: search || undefined,
        page: currentPage,
        limit: 10,
      }
      if (shopFilter) params.shop = shopFilter

      const response = await productService.getProducts(params)
      setProducts(response.products || [])
      setTotalPages(response.pagination?.pages || 1)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }

  const fetchShops = async () => {
    try {
      const data = await shopService.getShops()
      setShops(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    fetchShops()
  }, [])
  useEffect(() => {
    fetchProducts()
  }, [currentPage, search, shopFilter])

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return
    try {
      await productService.deleteProduct(id)
      toast.success('Produit supprimé')
      fetchProducts()
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    }
  }

  const handleToggleAvailability = async (id: string) => {
    try {
      const result = await productService.toggleProductAvailability(id)
      if (result) {
        toast.success(
          `Produit ${result.available ? 'disponible' : 'indisponible'}`
        )
        fetchProducts()
      }
    } catch (error) {
      toast.error('Erreur')
    }
  }

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
            Chargement des créations…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* ═══════════════════════════════════════
          EN-TÊTE
      ═══════════════════════════════════════ */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-end">
        <div className="min-w-0">
          <div className="mb-2 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B8925A] sm:flex">
            <Gem className="h-3 w-3" />
            <span>Atelier · Gestion</span>
          </div>
          <h1 className="truncate font-serif text-2xl leading-tight text-[#2A1520] sm:text-3xl">
            Nos <span className="italic text-[#B8925A]">créations</span>
          </h1>
          <p className="mt-1.5 text-[13px] text-[#5B4A50]">
            {products.length} pièce{products.length > 1 ? 's' : ''}{' '}
            à gérer dans votre catalogue
          </p>
        </div>

        <Link
          href="/admin/products/create"
          aria-label="Ajouter une création"
          className="group inline-flex h-11 flex-shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#2A1520] px-5 text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] sm:self-auto"
        >
          <Plus className="h-4 w-4" />
          <span className="text-xs font-semibold uppercase tracking-[0.12em]">
            Nouvelle pièce
          </span>
          <ArrowRight className="hidden h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 sm:block" />
        </Link>
      </div>

      {/* ═══════════════════════════════════════
          FILTRES
      ═══════════════════════════════════════ */}
      <div className="mb-6 grid gap-3 md:mb-8 md:grid-cols-2 md:gap-4">
        {/* Recherche */}
        <div className="group relative overflow-hidden rounded-full border border-[#B8925A]/20 bg-white shadow-[0_15px_40px_-25px_rgba(74,37,64,0.2)] transition-all duration-300 focus-within:border-[#B8925A] focus-within:shadow-[0_20px_50px_-20px_rgba(184,146,90,0.35)]">
          <div className="pointer-events-none absolute left-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF] transition-colors duration-300 group-focus-within:border-[#B8925A] group-focus-within:bg-[#B8925A]">
            <Search className="h-3.5 w-3.5 text-[#B8925A] transition-colors duration-300 group-focus-within:text-white" />
          </div>
          <input
            type="text"
            placeholder="Rechercher une création…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent py-3.5 pl-14 pr-4 font-serif text-[15px] text-[#2A1520] placeholder-[#A89298] outline-none sm:text-sm"
          />
        </div>

        {/* Filtre boutique */}
        <div className="group relative overflow-hidden rounded-full border border-[#B8925A]/20 bg-white shadow-[0_15px_40px_-25px_rgba(74,37,64,0.2)] transition-all duration-300 focus-within:border-[#B8925A] focus-within:shadow-[0_20px_50px_-20px_rgba(184,146,90,0.35)]">
          <div className="pointer-events-none absolute left-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF] transition-colors duration-300 group-focus-within:border-[#B8925A] group-focus-within:bg-[#B8925A]">
            <Store className="h-3.5 w-3.5 text-[#B8925A] transition-colors duration-300 group-focus-within:text-white" />
          </div>
          <select
            value={shopFilter}
            onChange={(e) => {
              setShopFilter(e.target.value)
              setCurrentPage(1)
            }}
            className="w-full cursor-pointer appearance-none bg-transparent py-3.5 pl-14 pr-10 font-serif text-[15px] text-[#2A1520] outline-none sm:text-sm"
          >
            <option value="">Toutes les boutiques</option>
            <option value="null">KATELYNCRAFT (principale)</option>
            {shops.map((shop) => (
              <option key={shop._id} value={shop._id}>
                {shop.name}
              </option>
            ))}
          </select>
          <Crown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#B8925A]" />
        </div>
      </div>

      {/* ═══════════════════════════════════════
          LISTE PRODUITS
      ═══════════════════════════════════════ */}
      {products.length === 0 ? (
        /* ── État vide ── */
        <div className="rounded-3xl border border-[#B8925A]/15 bg-white px-6 py-16 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
            <Package className="h-7 w-7 text-[#B8925A]" />
          </div>
          <p className="mb-1 font-serif text-lg text-[#2A1520]">
            Aucune création trouvée
          </p>
          <p className="mx-auto max-w-md text-sm leading-relaxed text-[#5B4A50]">
            {search || shopFilter
              ? 'Essayez de modifier vos filtres ou votre recherche.'
              : 'Commencez par ajouter votre première pièce.'}
          </p>
        </div>
      ) : (
        <>
          {/* ═══════════ MOBILE : CARTES ═══════════ */}
          <div className="space-y-3 md:hidden">
            {products.map((product: any) => (
              <article
                key={product._id}
                className="group relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-4 transition-all duration-300 hover:border-[#B8925A]/40 hover:shadow-[0_20px_50px_-25px_rgba(74,37,64,0.2)]"
              >
                {/* Ligne 1 : image + infos */}
                <div className="flex gap-3.5">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-[#B8925A]/15 bg-[#FAF6EF]">
                    {product.images?.[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/30">
                        <Gem className="h-6 w-6 text-[#B8925A]/50" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-serif text-[14px] font-medium leading-snug text-[#2A1520]">
                      {product.name}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-[#8B7B7F]">
                      {product.description?.substring(0, 60)}
                    </p>
                    <div className="mt-2 flex flex-wrap items-baseline gap-2">
                      <span className="font-serif text-[15px] font-semibold text-[#B8925A]">
                        {product.price.toLocaleString()}{' '}
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                          FCFA
                        </span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ligne 2 : boutique + stock */}
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  {/* Badge boutique */}
                  {product.shop ? (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#B8925A]/40 bg-[#FAF6EF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8925A]">
                      <Store className="h-2.5 w-2.5" />
                      {product.shop.name}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#B8925A]/40 bg-[#2A1520] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D4B87A]">
                      <Crown className="h-2.5 w-2.5" />
                      Principale
                    </span>
                  )}

                  {/* Badge stock */}
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      product.stock > 10
                        ? 'border-[#B8925A]/40 bg-[#FAF6EF] text-[#B8925A]'
                        : product.stock > 0
                        ? 'border-[#D4B87A]/50 bg-[#FAF6EF] text-[#D4B87A]'
                        : 'border-[#5B4A50]/30 bg-[#E8D5D0]/30 text-[#5B4A50]'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        product.stock > 10
                          ? 'bg-[#B8925A]'
                          : product.stock > 0
                          ? 'bg-[#D4B87A]'
                          : 'bg-[#5B4A50]'
                      }`}
                    />
                    {product.stock > 0 ? `${product.stock} en stock` : 'Rupture'}
                  </span>
                </div>

                {/* Ligne 3 : toggle dispo */}
                <div className="mt-3">
                  <button
                    onClick={() => handleToggleAvailability(product._id)}
                    aria-label={`Marquer comme ${
                      product.available && product.stock > 0
                        ? 'indisponible'
                        : 'disponible'
                    }`}
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                      product.available && product.stock > 0
                        ? 'border-[#B8925A]/40 bg-[#B8925A]/10 text-[#B8925A] active:bg-[#B8925A]/20'
                        : 'border-[#8B7B7F]/30 bg-[#FAF6EF] text-[#8B7B7F] active:bg-[#E8D5D0]/40'
                    }`}
                  >
                    {product.available && product.stock > 0 ? (
                      <>
                        <Sparkles className="h-2.5 w-2.5" />
                        Disponible
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-2.5 w-2.5" />
                        Indisponible
                      </>
                    )}
                  </button>
                </div>

                {/* Ligne 4 : actions */}
                <div className="mt-4 flex items-center gap-1.5 border-t border-[#B8925A]/15 pt-3">
                  <Link
                    href={`/products/${product.slug}`}
                    target="_blank"
                    aria-label={`Voir ${product.name}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5B4A50] transition-all duration-300 active:border-[#B8925A]/30 active:bg-[#FAF6EF]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Voir
                  </Link>

                  <Link
                    href={`/admin/products/${product._id}/edit`}
                    aria-label={`Modifier ${product.name}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8925A] transition-all duration-300 active:border-[#B8925A]/30 active:bg-[#FAF6EF]"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Modifier
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    aria-label={`Supprimer ${product.name}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5B4A50] transition-all duration-300 active:border-[#5B4A50]/30 active:bg-[#E8D5D0]/30"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Suppr.
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* ═══════════ DESKTOP : TABLEAU ═══════════ */}
          <div className="hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)]">
              {/* Liseré doré supérieur */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-[#B8925A]/15 bg-[#FAF6EF]">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                        <span className="inline-flex items-center gap-1.5">
                          <Gem className="h-3 w-3 text-[#B8925A]" />
                          Création
                        </span>
                      </th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                        Boutique
                      </th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                        Prix
                      </th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                        Stock
                      </th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                        Statut
                      </th>
                      <th className="px-5 py-3.5 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#B8925A]/10">
                    {products.map((product: any) => (
                      <tr
                        key={product._id}
                        className="group transition-colors duration-300 hover:bg-[#FAF6EF]/60"
                      >
                        {/* Produit */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3.5">
                            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-[#B8925A]/15 bg-[#FAF6EF]">
                              {product.images?.[0] ? (
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/30">
                                  <Gem className="h-5 w-5 text-[#B8925A]/50" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-serif text-[14px] font-medium text-[#2A1520]">
                                {product.name}
                              </p>
                              <p className="mt-0.5 max-w-xs truncate text-[11px] text-[#8B7B7F]">
                                {product.description?.substring(0, 50)}...
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Boutique */}
                        <td className="px-5 py-4">
                          {product.shop ? (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#B8925A]/40 bg-[#FAF6EF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8925A]">
                              <Store className="h-2.5 w-2.5" />
                              {product.shop.name}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full border border-[#B8925A]/40 bg-[#2A1520] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#D4B87A]">
                              <Crown className="h-2.5 w-2.5" />
                              Principale
                            </span>
                          )}
                        </td>

                        {/* Prix */}
                        <td className="px-5 py-4">
                          <span className="font-serif text-[14px] font-semibold text-[#B8925A]">
                            {product.price.toLocaleString()}
                            <span className="ml-1 text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                              FCFA
                            </span>
                          </span>
                        </td>

                        {/* Stock */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                              product.stock > 10
                                ? 'border-[#B8925A]/40 bg-[#FAF6EF] text-[#B8925A]'
                                : product.stock > 0
                                ? 'border-[#D4B87A]/50 bg-[#FAF6EF] text-[#D4B87A]'
                                : 'border-[#5B4A50]/30 bg-[#E8D5D0]/30 text-[#5B4A50]'
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                product.stock > 10
                                  ? 'bg-[#B8925A]'
                                  : product.stock > 0
                                  ? 'bg-[#D4B87A]'
                                  : 'bg-[#5B4A50]'
                              }`}
                            />
                            {product.stock > 0
                              ? `${product.stock}`
                              : 'Rupture'}
                          </span>
                        </td>

                        {/* Statut */}
                        <td className="px-5 py-4">
                          <button
                            onClick={() =>
                              handleToggleAvailability(product._id)
                            }
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                              product.available && product.stock > 0
                                ? 'border-[#B8925A]/40 bg-[#B8925A]/10 text-[#B8925A] hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-white'
                                : 'border-[#8B7B7F]/30 bg-[#FAF6EF] text-[#8B7B7F] hover:border-[#8B7B7F]/60 hover:bg-[#E8D5D0]/40'
                            }`}
                          >
                            {product.available && product.stock > 0 ? (
                              <>
                                <Sparkles className="h-2.5 w-2.5" />
                                Disponible
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-2.5 w-2.5" />
                                Indisponible
                              </>
                            )}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/products/${product.slug}`}
                              target="_blank"
                              title="Voir la création"
                              aria-label={`Voir ${product.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B8925A]/20 text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] hover:text-[#B8925A]"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Link>
                            <Link
                              href={`/admin/products/${product._id}/edit`}
                              title="Modifier la création"
                              aria-label={`Modifier ${product.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B8925A]/20 text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] hover:text-[#B8925A]"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(product._id)}
                              title="Supprimer la création"
                              aria-label={`Supprimer ${product.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B8925A]/20 text-[#8B7B7F] transition-all duration-300 hover:border-[#5B4A50]/60 hover:bg-[#E8D5D0]/30 hover:text-[#5B4A50]"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ═══════════════ PAGINATION ═══════════════ */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between gap-3 border-t border-[#B8925A]/15 px-5 py-4">
                  <span className="flex items-center gap-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B7B7F]">
                    <Crown className="h-3 w-3 text-[#B8925A]" />
                    Page
                    <span className="font-serif text-sm font-semibold normal-case tracking-normal text-[#B8925A]">
                      {currentPage}
                    </span>
                    <span>sur</span>
                    <span className="font-serif text-sm font-semibold normal-case tracking-normal text-[#B8925A]">
                      {totalPages}
                    </span>
                  </span>

                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.max(1, p - 1))
                      }
                      disabled={currentPage === 1}
                      aria-label="Page précédente"
                      className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#B8925A]/25 disabled:hover:bg-[#FDFBF7]"
                    >
                      <ChevronLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                      Précédent
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      aria-label="Page suivante"
                      className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#B8925A]/25 disabled:hover:bg-[#FDFBF7]"
                    >
                      Suivant
                      <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ═══════════ PAGINATION MOBILE ═══════════ */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl border border-[#B8925A]/15 bg-white px-4 py-3 shadow-[0_15px_40px_-25px_rgba(74,37,64,0.15)] md:hidden">
              <span className="flex items-center gap-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B7B7F]">
                <Crown className="h-3 w-3 text-[#B8925A]" />
                <span className="font-serif text-sm font-semibold normal-case tracking-normal text-[#B8925A]">
                  {currentPage}
                </span>
                /
                <span className="font-serif text-sm font-semibold normal-case tracking-normal text-[#B8925A]">
                  {totalPages}
                </span>
              </span>

              <div className="flex flex-1 justify-end gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Page précédente"
                  className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#B8925A]/25 disabled:hover:bg-[#FDFBF7]"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  Préc.
                </button>
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  aria-label="Page suivante"
                  className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#B8925A]/25 disabled:hover:bg-[#FDFBF7]"
                >
                  Suiv.
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}