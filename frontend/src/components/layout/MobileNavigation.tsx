'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Gem, Crown, MessageCircle, ShoppingBag } from 'lucide-react'
import { useCart } from '@/hooks/useCart'

export default function MobileNavigation() {
  const pathname = usePathname()
  const { totalItems } = useCart()

  const isActive = (path: string) =>
    pathname === path || pathname?.startsWith(path + '/')

  const navItems = [
    { name: 'Accueil', href: '/', icon: Home },
    { name: 'Boutique', href: '/products', icon: Gem },
    { name: 'Collections', href: '/categories', icon: Crown },
    { name: 'Contact', href: '/contact', icon: MessageCircle },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      {/* Liseré doré supérieur */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

      <nav className="relative overflow-hidden border-t border-[#B8925A]/15 bg-[#FDFBF7]/95 backdrop-blur-md">
        {/* Décor perle subtil */}
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute -top-10 left-1/4 h-24 w-24 rounded-full bg-[#D4B87A]/10 blur-2xl" />
          <div className="absolute -bottom-10 right-1/4 h-24 w-24 rounded-full bg-[#E8D5D0]/20 blur-2xl" />
        </div>

        <div className="relative flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const active = isActive(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.name}
                className={`group relative flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 transition-all duration-300 ${
                  active
                    ? 'text-[#B8925A]'
                    : 'text-[#8B7B7F] hover:text-[#B8925A]'
                }`}
              >
                {/* Fond actif subtil */}
                {active && (
                  <span className="absolute inset-0 rounded-2xl border border-[#B8925A]/25 bg-[#FAF6EF]" />
                )}

                {/* Icône */}
                <span className="relative flex h-8 w-8 items-center justify-center">
                  <Icon
                    className={`h-[18px] w-[18px] transition-transform duration-300 ${
                      active ? 'scale-110' : 'group-hover:scale-105'
                    }`}
                  />
                </span>

                {/* Label */}
                <span
                  className={`relative text-[10px] font-medium uppercase tracking-[0.08em] transition-all duration-300 ${
                    active ? 'font-semibold' : ''
                  }`}
                >
                  {item.name}
                </span>

                {/* Point doré indicateur actif */}
                {active && (
                  <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#B8925A]" />
                )}
              </Link>
            )
          })}

          {/* ═══════════════ PANIER ═══════════════ */}
          <Link
            href="/cart"
            aria-label="Voir le panier"
            className={`group relative flex flex-col items-center gap-1 rounded-2xl px-3 py-1.5 transition-all duration-300 ${
              pathname === '/cart'
                ? 'text-[#B8925A]'
                : 'text-[#8B7B7F] hover:text-[#B8925A]'
            }`}
          >
            {/* Fond actif subtil */}
            {pathname === '/cart' && (
              <span className="absolute inset-0 rounded-2xl border border-[#B8925A]/25 bg-[#FAF6EF]" />
            )}

            {/* Icône avec badge */}
            <span className="relative flex h-8 w-8 items-center justify-center">
              <ShoppingBag
                className={`h-[18px] w-[18px] transition-transform duration-300 ${
                  pathname === '/cart'
                    ? 'scale-110'
                    : 'group-hover:scale-105'
                }`}
              />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#B8925A] px-1 text-[9px] font-bold text-white shadow-[0_4px_10px_-2px_rgba(184,146,90,0.6)]">
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </span>

            {/* Label */}
            <span
              className={`relative text-[10px] font-medium uppercase tracking-[0.08em] transition-all duration-300 ${
                pathname === '/cart' ? 'font-semibold' : ''
              }`}
            >
              Panier
            </span>

            {/* Point doré indicateur actif */}
            {pathname === '/cart' && (
              <span className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-[#B8925A]" />
            )}
          </Link>
        </div>

        {/* Safe area iOS */}
        <div className="h-[env(safe-area-inset-bottom)] bg-[#FDFBF7]/95" />
      </nav>
    </div>
  )
}