'use client'

import { useState } from 'react'
import { Search, X, Gem } from 'lucide-react'

interface ProductSearchProps {
  value: string
  onChange: (value: string) => void
}

export default function ProductSearch({ value, onChange }: ProductSearchProps) {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div
      className={`group relative transition-all duration-500 ${
        isFocused
          ? 'shadow-[0_20px_50px_-20px_rgba(184,146,90,0.35)]'
          : ''
      }`}
    >
      {/* Liseré doré supérieur (visible en focus) */}
      <div
        className={`absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-[#B8925A] to-transparent transition-opacity duration-500 ${
          isFocused ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div className="relative overflow-hidden rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] transition-all duration-500 focus-within:border-[#B8925A]">
        {/* Décor perle subtil */}
        <div
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="absolute -top-8 left-1/3 h-20 w-20 rounded-full bg-[#D4B87A]/15 blur-2xl" />
          <div className="absolute -bottom-8 right-1/3 h-20 w-20 rounded-full bg-[#E8D5D0]/25 blur-2xl" />
        </div>

        {/* Icône loupe dorée */}
        <div className="pointer-events-none absolute left-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
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

        {/* Input */}
        <input
          type="text"
          placeholder="Rechercher une création, une collection…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Rechercher un produit"
          className="relative w-full bg-transparent py-4 pl-16 pr-14 font-serif text-[15px] text-[#2A1520] placeholder-[#A89298] outline-none md:py-4.5 md:text-base"
        />

        {/* Bouton reset */}
        {value && (
          <button
            onClick={() => onChange('')}
            aria-label="Effacer la recherche"
            className="group/btn absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-white"
          >
            <X className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:rotate-90" />
          </button>
        )}

        {/* Micro-signature interne à droite (visible en focus, sans valeur) */}
        {!value && isFocused && (
          <div className="pointer-events-none absolute right-4 top-1/2 hidden -translate-y-1/2 items-center gap-1.5 md:flex">
            <Gem className="h-3 w-3 text-[#B8925A]/70" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#8B7B7F]">
              Entrée pour valider
            </span>
          </div>
        )}
      </div>

      {/* Liseré doré inférieur (signature) */}
      <div
        className={`absolute inset-x-8 -bottom-px h-px bg-gradient-to-r from-transparent via-[#B8925A]/50 to-transparent transition-opacity duration-500 ${
          isFocused ? 'opacity-0' : 'opacity-100'
        }`}
      />
    </div>
  )
}