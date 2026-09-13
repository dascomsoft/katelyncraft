'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  ShoppingBag,
  Menu,
  X,
  MessageCircle,
  LogOut,
  Settings,
  Gem,
  Crown,
  Heart,
} from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useAuth } from '@/hooks/useAuth'
import { useSettings } from '@/hooks/useSettings'

interface HeaderProps {
  onCartOpen: () => void
}

export default function Header({ onCartOpen }: HeaderProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { totalItems } = useCart()
  const { isAuthenticated, logout } = useAuth()
  const { settings } = useSettings()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Accueil', href: '/' },
    { name: 'Boutique', href: '/products' },
    { name: 'Collections', href: '/categories' },
    { name: 'La Maison', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (path: string) =>
    pathname === path || pathname?.startsWith(path + '/')

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'border-b border-[#B8925A]/20 bg-[#FDFBF7]/95 shadow-[0_10px_40px_-20px_rgba(74,37,64,0.2)] backdrop-blur-md'
          : 'border-b border-transparent bg-[#FDFBF7]/80 backdrop-blur-sm'
      }`}
    >
      {/* Liseré doré supérieur */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

      <div className="container">
        <div className="flex h-[68px] items-center justify-between md:h-20">
          {/* ═══════════════ LOGO ═══════════════ */}
          <Link
            href="/"
            className="group flex flex-shrink-0 items-center gap-2.5"
            aria-label="Retour à l'accueil"
          >
            <div className="relative flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="KATHELYNCRAFT"
                width={40}
                height={40}
                className="h-10 w-auto transition-transform duration-300 group-hover:scale-105 md:h-11"
                priority
              />
            </div>
            <div className="hidden flex-col leading-none sm:flex">
              <span className="font-serif text-lg font-semibold tracking-tight text-[#2A1520] md:text-xl">
                KATHELYN
                <span className="italic text-[#B8925A]">CRAFT</span>
              </span>
              <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.28em] text-[#8B7B7F]">
                Maison de perles
              </span>
            </div>
            {/* Version mobile compacte */}
            <span className="font-serif text-lg font-semibold tracking-tight text-[#2A1520] sm:hidden">
              K<span className="italic text-[#B8925A]">C</span>
            </span>
          </Link>

          {/* ═══════════════ NAVIGATION DESKTOP ═══════════════ */}
          <nav className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-2 text-[13px] font-medium uppercase tracking-[0.12em] transition-colors duration-300 ${
                    active
                      ? 'text-[#B8925A]'
                      : 'text-[#5B4A50] hover:text-[#B8925A]'
                  }`}
                >
                  {item.name}
                  {/* Soulignement doré actif */}
                  {active && (
                    <span className="absolute inset-x-3.5 bottom-0 h-px bg-gradient-to-r from-transparent via-[#B8925A] to-transparent" />
                  )}
                </Link>
              )
            })}

            {/* Lien Promotions avec icône */}
            <Link
              href="/promotions"
              className="group relative ml-2 inline-flex items-center gap-1.5 rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8925A] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-white"
            >
              <Crown className="h-3 w-3" />
              Offres
            </Link>
          </nav>

          {/* ═══════════════ ACTIONS DROITE ═══════════════ */}
          <div className="flex items-center gap-1.5 md:gap-2">
            {/* WhatsApp desktop */}
            <a
              href={`https://wa.me/${
                settings?.whatsappNumber || '237600000000'
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-1.5 rounded-full bg-[#2A1520] px-4 py-2 text-xs font-semibold text-[#FAF6EF] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_10px_30px_-10px_rgba(74,37,64,0.5)] lg:inline-flex"
            >
              <MessageCircle className="h-3.5 w-3.5" />
              WhatsApp
            </a>

            {/* Admin desktop */}
            <Link
              href="/admin"
              aria-label="Administration"
              className={`hidden h-10 w-10 items-center justify-center rounded-full border transition-all duration-300 md:inline-flex ${
                isActive('/admin')
                  ? 'border-[#B8925A] bg-[#B8925A] text-white'
                  : 'border-[#B8925A]/25 bg-transparent text-[#5B4A50] hover:border-[#B8925A] hover:text-[#B8925A]'
              }`}
            >
              <Settings className="h-4 w-4" />
            </Link>

            {/* Panier */}
            <button
              onClick={onCartOpen}
              aria-label="Ouvrir le panier"
              className="group relative flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/25 bg-transparent text-[#2A1520] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF]"
            >
              <ShoppingBag className="h-4 w-4 transition-colors group-hover:text-[#B8925A]" />
              {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 animate-pulse items-center justify-center rounded-full bg-[#B8925A] text-[10px] font-bold text-white shadow-[0_4px_10px_-2px_rgba(184,146,90,0.6)]">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </button>

            {/* Menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/25 bg-transparent text-[#2A1520] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] md:hidden"
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* ═══════════════ NAVIGATION MOBILE ═══════════════ */}
        {isMenuOpen && (
          <div className="animate-slideDown border-t border-[#B8925A]/15 py-4 md:hidden">
            {/* Nav links */}
            <div className="flex flex-col gap-1">
              {[
                ...navItems,
                { name: 'Offres', href: '/promotions' },
                { name: 'FAQ', href: '/faq' },
              ].map((item) => {
                const active = isActive(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm transition-all duration-300 ${
                      active
                        ? 'border border-[#B8925A]/30 bg-[#FAF6EF] font-semibold text-[#B8925A]'
                        : 'border border-transparent text-[#5B4A50] hover:border-[#B8925A]/15 hover:bg-[#FAF6EF]'
                    }`}
                  >
                    <span className="font-serif text-[15px]">{item.name}</span>
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[#B8925A]" />
                    )}
                  </Link>
                )
              })}

              {/* Administration */}
              <Link
                href="/admin"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2.5 rounded-xl border border-transparent px-4 py-3 text-sm text-[#5B4A50] transition-all duration-300 hover:border-[#B8925A]/15 hover:bg-[#FAF6EF]"
              >
                <Settings className="h-4 w-4 text-[#B8925A]" />
                <span className="font-serif text-[15px]">Administration</span>
              </Link>

              {/* Déconnexion si authentifié */}
              {isAuthenticated && (
                <button
                  onClick={() => {
                    logout()
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center gap-2.5 rounded-xl border border-transparent px-4 py-3 text-sm text-[#B8925A] transition-all duration-300 hover:border-[#B8925A]/15 hover:bg-[#FAF6EF]"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="font-serif text-[15px]">Déconnexion</span>
                </button>
              )}
            </div>

            {/* CTA WhatsApp mobile */}
            <div className="mt-4 px-4">
              <a
                href={`https://wa.me/${
                  settings?.whatsappNumber || '237600000000'
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-full bg-[#2A1520] px-4 py-3.5 text-sm font-semibold text-[#FAF6EF] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_15px_40px_-15px_rgba(74,37,64,0.5)]"
              >
                <MessageCircle className="h-4 w-4" />
                Discuter sur WhatsApp
              </a>
            </div>

            {/* Ligne de signature */}
            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#8B7B7F]">
              <Gem className="h-3 w-3 text-[#B8925A]" />
              <span>Fait main · Édition limitée</span>
              <Heart className="h-3 w-3 text-[#B8925A]" />
            </div>
          </div>
        )}
      </div>

      {/* Liseré doré inférieur (visible au scroll) */}
      {isScrolled && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/30 to-transparent" />
      )}
    </header>
  )
}