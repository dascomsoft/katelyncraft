'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Menu,
  ShoppingBag,
  LogOut,
  User,
  ChevronDown,
  Gem,
  Crown,
  ExternalLink,
} from 'lucide-react'

interface AdminHeaderProps {
  onMenuClick: () => void
  onLogout: () => void
}

export default function AdminHeader({ onMenuClick, onLogout }: AdminHeaderProps) {
  const [adminData, setAdminData] = useState<any>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem('adminData')
    if (data) {
      try {
        setAdminData(JSON.parse(data))
      } catch (error) {
        console.error('Error parsing admin data:', error)
      }
    }
  }, [])

  const adminInitial = (adminData?.name || 'A').charAt(0).toUpperCase()

  return (
    <header className="sticky top-0 z-40 border-b border-[#B8925A]/15 bg-[#FDFBF7]/95 backdrop-blur-md">
      {/* ═══════════════════════════════════════
          LISERÉ DORÉ SUPÉRIEUR
      ═══════════════════════════════════════ */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* ═══════════════════════════════════════
            SECTION GAUCHE — Menu + Logo
        ═══════════════════════════════════════ */}
        <div className="flex items-center gap-3">
          {/* Bouton menu mobile */}
          <button
            onClick={onMenuClick}
            aria-label="Ouvrir le menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B8925A]/25 bg-transparent text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>

          {/* Logo Admin */}
          <Link
            href="/admin"
            aria-label="Tableau de bord administrateur"
            className="group flex items-center gap-3"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/40 bg-gradient-to-br from-[#FAF6EF] to-[#FDFBF7] transition-all duration-300 group-hover:shadow-[0_10px_25px_-10px_rgba(184,146,90,0.5)]">
              <Gem className="h-4.5 w-4.5 text-[#B8925A]" />
              {/* Micro-badge couronne */}
              <div className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2A1520] shadow-sm">
                <Crown className="h-2.5 w-2.5 text-[#D4B87A]" />
              </div>
            </div>
            <div className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-[15px] font-semibold tracking-tight text-[#2A1520]">
                KATHELYN
                <span className="italic text-[#B8925A]">CRAFT</span>
              </span>
              <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.24em] text-[#8B7B7F]">
                Administration
              </span>
            </div>
          </Link>
        </div>

        {/* ═══════════════════════════════════════
            SECTION DROITE — Voir site + Utilisateur
        ═══════════════════════════════════════ */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Lien "Voir le site" */}
          <Link
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="group hidden items-center gap-1.5 rounded-full border border-[#B8925A]/25 bg-transparent px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] hover:text-[#B8925A] sm:inline-flex"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Voir le site
          </Link>

          {/* Dropdown utilisateur */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              aria-haspopup="menu"
              aria-expanded={isDropdownOpen}
              className={`group flex items-center gap-2.5 rounded-full border px-2 py-1.5 transition-all duration-300 ${
                isDropdownOpen
                  ? 'border-[#B8925A] bg-[#FAF6EF]'
                  : 'border-[#B8925A]/20 bg-transparent hover:border-[#B8925A]/50 hover:bg-[#FAF6EF]'
              }`}
            >
              {/* Avatar circulaire avec initiale */}
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[#2A1520] to-[#4A2540] font-serif text-xs font-semibold text-[#D4B87A]">
                {adminInitial}
              </div>

              {/* Nom */}
              <span className="hidden text-[12px] font-medium text-[#2A1520] sm:block">
                {adminData?.name || 'Admin'}
              </span>

              {/* Chevron */}
              <ChevronDown
                className={`h-3.5 w-3.5 text-[#B8925A] transition-transform duration-300 ${
                  isDropdownOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Menu déroulant */}
            {isDropdownOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-56 overflow-hidden rounded-2xl border border-[#B8925A]/20 bg-[#FDFBF7] py-1.5 shadow-[0_25px_60px_-30px_rgba(74,37,64,0.35)]"
              >
                {/* En-tête du dropdown */}
                <div className="border-b border-[#B8925A]/15 px-4 py-3">
                  <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                    Connecté en tant que
                  </div>
                  <div className="mt-0.5 truncate font-serif text-sm text-[#2A1520]">
                    {adminData?.name || 'Admin'}
                  </div>
                </div>

                {/* Déconnexion */}
                <button
                  onClick={onLogout}
                  role="menuitem"
                  className="group/item flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-[#4A2540] transition-all duration-300 hover:bg-[#FAF6EF] hover:text-[#B8925A]"
                >
                  <LogOut className="h-3.5 w-3.5 text-[#8B7B7F] transition-colors duration-300 group-hover/item:text-[#B8925A]" />
                  Déconnexion
                </button>

                {/* Signature bas */}
                <div className="mt-1 border-t border-[#B8925A]/15 px-4 py-2.5">
                  <div className="flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-[0.22em] text-[#8B7B7F]">
                    <Gem className="h-2.5 w-2.5 text-[#B8925A]" />
                    <span>Édition limitée</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Liseré doré inférieur */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/20 to-transparent" />
    </header>
  )
}