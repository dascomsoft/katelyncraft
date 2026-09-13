'use client'

import { useState } from 'react'
import { SlidersHorizontal, ChevronDown, ChevronUp, X, Gem, Sparkles } from 'lucide-react'
import { Category } from '@/types'

interface ProductFiltersProps {
  categories: Category[] | any
  filters: {
    category: string
    brand: string
    minPrice: string
    maxPrice: string
    available: string
    sort: string
  }
  onFilterChange: (filters: any) => void
}

export default function ProductFilters({
  categories,
  filters,
  onFilterChange,
}: ProductFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const handleChange = (key: string, value: string) => {
    onFilterChange({ [key]: value })
  }

  const clearFilters = () => {
    onFilterChange({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      available: '',
    })
  }

  const hasActiveFilters =
    filters.category ||
    filters.brand ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.available

  const extractCategories = (data: any): Category[] => {
    if (Array.isArray(data)) {
      return data.filter(
        (item): item is Category =>
          item && typeof item === 'object' && item._id && item.name
      )
    }
    if (data && typeof data === 'object') {
      if (data.categories && Array.isArray(data.categories)) {
        return data.categories.filter(
          (item: any): item is Category =>
            item && typeof item === 'object' && item._id && item.name
        )
      }
      if (data.data && Array.isArray(data.data)) {
        return data.data.filter(
          (item: any): item is Category =>
            item && typeof item === 'object' && item._id && item.name
        )
      }
      const values = Object.values(data)
      const foundArray = values.find((val) => Array.isArray(val))
      if (foundArray) {
        return (foundArray as any[]).filter(
          (item: any): item is Category =>
            item && typeof item === 'object' && item._id && item.name
        )
      }
    }
    return []
  }

  const categoriesArray = extractCategories(categories)

  return (
    <div className="bg-white p-5">
      {/* ═══════════════════════════════════════
          TOGGLE MOBILE
      ═══════════════════════════════════════ */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        aria-expanded={isExpanded}
        aria-controls="product-filters-panel"
        className="flex w-full items-center justify-between lg:hidden"
      >
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF]">
            <SlidersHorizontal className="h-3.5 w-3.5 text-[#B8925A]" />
          </div>
          <span className="font-serif text-[15px] text-[#2A1520]">
            Affiner
          </span>
          {hasActiveFilters && (
            <span className="rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-[#B8925A]">
              Actifs
            </span>
          )}
        </div>
        <div className="flex h-7 w-7 items-center justify-center rounded-full border border-[#B8925A]/25 bg-transparent">
          {isExpanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-[#B8925A]" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-[#B8925A]" />
          )}
        </div>
      </button>

      {/* ═══════════════════════════════════════
          PANNEAU DES FILTRES
      ═══════════════════════════════════════ */}
      <div
        id="product-filters-panel"
        className={`${
          isExpanded ? 'block' : 'hidden'
        } mt-5 space-y-5 lg:mt-0 lg:block`}
      >
        {/* Bouton effacer (si filtres actifs) */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="group inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#B8925A] transition-colors duration-300 hover:text-[#4A2540]"
          >
            <X className="h-3 w-3 transition-transform duration-300 group-hover:rotate-90" />
            Effacer les filtres
          </button>
        )}

        {/* ─────── Catégorie ─────── */}
        <div>
          <label
            htmlFor="filter-category"
            className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
          >
            <Gem className="h-3 w-3 text-[#B8925A]" />
            Collection
          </label>
          <div className="relative">
            <select
              id="filter-category"
              value={filters.category}
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 pr-10 font-serif text-sm text-[#2A1520] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15"
            >
              <option value="">Toutes les collections</option>
              {categoriesArray.length > 0 ? (
                categoriesArray.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option value="" disabled>
                  Aucune collection disponible
                </option>
              )}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#B8925A]" />
          </div>
        </div>

        {/* ─────── Prix ─────── */}
        <div>
          <label className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]">
            <Sparkles className="h-3 w-3 text-[#B8925A]" />
            Prix (FCFA)
          </label>
          <div className="flex gap-2.5">
            <div className="relative w-1/2">
              <input
                type="number"
                placeholder="Min"
                value={filters.minPrice}
                onChange={(e) => handleChange('minPrice', e.target.value)}
                aria-label="Prix minimum"
                className="w-full rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-3.5 py-3 font-serif text-sm text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15"
              />
            </div>
            <div className="flex items-center text-[#B8925A]">
              <span className="font-serif text-xs">–</span>
            </div>
            <div className="relative w-1/2">
              <input
                type="number"
                placeholder="Max"
                value={filters.maxPrice}
                onChange={(e) => handleChange('maxPrice', e.target.value)}
                aria-label="Prix maximum"
                className="w-full rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-3.5 py-3 font-serif text-sm text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15"
              />
            </div>
          </div>
        </div>

        {/* ─────── Disponibilité ─────── */}
        <div>
          <label
            htmlFor="filter-available"
            className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
          >
            <Sparkles className="h-3 w-3 text-[#B8925A]" />
            Disponibilité
          </label>
          <div className="relative">
            <select
              id="filter-available"
              value={filters.available}
              onChange={(e) => handleChange('available', e.target.value)}
              className="w-full cursor-pointer appearance-none rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 pr-10 font-serif text-sm text-[#2A1520] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15"
            >
              <option value="">Toutes les pièces</option>
              <option value="true">Disponible</option>
              <option value="false">Indisponible</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#B8925A]" />
          </div>
        </div>

        {/* ─────── Bouton effacer (mobile bas de panneau) ─────── */}
        <button
          onClick={clearFilters}
          className="w-full rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] py-3 text-xs font-semibold uppercase tracking-[0.15em] text-[#B8925A] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-white lg:hidden"
        >
          Effacer les filtres
        </button>

        {/* ─────── Signature finale ─────── */}
        <div className="hidden items-center gap-2 border-t border-[#B8925A]/15 pt-4 text-[10px] uppercase tracking-[0.25em] text-[#8B7B7F] lg:flex">
          <Gem className="h-3 w-3 text-[#B8925A]" />
          <span>Sélection rigoureuse</span>
        </div>
      </div>
    </div>
  )
}