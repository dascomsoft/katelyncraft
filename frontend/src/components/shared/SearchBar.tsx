'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, X, Gem, Sparkles } from 'lucide-react'

interface SearchBarProps {
  placeholder?: string
  className?: string
}

export default function SearchBar({
  placeholder = 'Rechercher un produit...',
  className = '',
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className={`relative ${className}`}
    >
      <div
        className={`group relative overflow-hidden rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] transition-all duration-500 ${
          isFocused
            ? 'border-[#B8925A] shadow-[0_20px_50px_-20px_rgba(184,146,90,0.35)]'
            : ''
        }`}
      >
        {/* ═══════════════════════════════════════
            LISERÉ DORÉ SUPÉRIEUR (visible en focus)
        ═══════════════════════════════════════ */}
        <div
          className={`pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-[#B8925A] to-transparent transition-opacity duration-500 ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* ═══════════════════════════════════════
            DÉCOR PERLE SUBTIL
        ═══════════════════════════════════════ */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute -top-8 left-1/3 h-20 w-20 rounded-full bg-[#D4B87A]/15 blur-2xl" />
          <div className="absolute -bottom-8 right-1/3 h-20 w-20 rounded-full bg-[#E8D5D0]/25 blur-2xl" />
        </div>

        {/* ═══════════════════════════════════════
            ICÔNE LOUPE DORÉE
        ═══════════════════════════════════════ */}
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2">
          <div
            className={`flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-300 ${
              isFocused
                ? 'border-[#B8925A] bg-[#B8925A]'
                : 'border-[#B8925A]/25 bg-[#FAF6EF]'
            }`}
          >
            <Search
              className={`h-3.5 w-3.5 transition-colors duration-300 ${
                isFocused ? 'text-white' : 'text-[#B8925A]'
              }`}
            />
          </div>
        </div>

        {/* ═══════════════════════════════════════
            INPUT
        ═══════════════════════════════════════ */}
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Rechercher un produit"
          className="relative w-full bg-transparent py-4 pl-16 pr-14 font-serif text-[15px] text-[#2A1520] placeholder-[#A89298] outline-none md:text-base"
        />

        {/* ═══════════════════════════════════════
            BOUTON RESET
        ═══════════════════════════════════════ */}
        {query && (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Effacer la recherche"
            className="group/btn absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-white"
          >
            <X className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:rotate-90" />
          </button>
        )}

        {/* ═══════════════════════════════════════
            MICRO-SIGNATURE INTERNE (visible en focus, sans valeur)
        ═══════════════════════════════════════ */}
        {!query && isFocused && (
          <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-1.5 md:flex">
            <Gem className="h-3 w-3 text-[#B8925A]/70" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8B7B7F]">
              Entrée pour valider
            </span>
          </div>
        )}

        {/* ═══════════════════════════════════════
            LISERÉ DORÉ INFÉRIEUR (visible au repos)
        ═══════════════════════════════════════ */}
        <div
          className={`pointer-events-none absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-[#B8925A]/50 to-transparent transition-opacity duration-500 ${
            isFocused ? 'opacity-0' : 'opacity-100'
          }`}
        />
      </div>

      {/* Signature sous la barre (uniquement en focus sur desktop) */}
      {isFocused && !query && (
        <div className="pointer-events-none absolute -bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-1.5 whitespace-nowrap text-[10px] uppercase tracking-[0.24em] text-[#8B7B7F] md:flex">
          <Sparkles className="h-2.5 w-2.5 text-[#B8925A]" />
          <span>Collection privée</span>
        </div>
      )}
    </form>
  )
}