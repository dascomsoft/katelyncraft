'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Settings,
  X,
  Gem,
  Crown,
  Sparkles,
  ChevronRight,
} from 'lucide-react'

interface AdminSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
  const pathname = usePathname()

  const menuItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Produits', href: '/admin/products', icon: Package },
    { name: 'Catégories', href: '/admin/categories', icon: FolderTree },
    { name: 'Commandes', href: '/admin/orders', icon: ShoppingBag },
    { name: 'Paramètres', href: '/admin/settings', icon: Settings },
  ]

  const isActive = (path: string) =>
    pathname === path || pathname?.startsWith(path + '/')

  return (
    <>
      {/* ═══════════════════════════════════════
          MOBILE OVERLAY
      ═══════════════════════════════════════ */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#2A1520]/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* ═══════════════════════════════════════
          SIDEBAR
      ═══════════════════════════════════════ */}
      <aside
        className={`
          fixed left-0 top-0 z-50 h-screen w-64
          bg-[#FDFBF7] border-r border-[#B8925A]/15
          transform transition-transform duration-500 ease-out
          lg:sticky lg:z-0 lg:translate-x-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        aria-label="Navigation administrateur"
      >
        {/* Décor perles subtiles */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-[#D4B87A]/10 blur-3xl" />
          <div className="absolute bottom-1/4 -left-20 h-40 w-40 rounded-full bg-[#E8D5D0]/20 blur-3xl" />
        </div>

        {/* Liseré doré vertical droit */}
        <div className="pointer-events-none absolute inset-y-6 right-0 w-px bg-gradient-to-b from-transparent via-[#B8925A]/30 to-transparent" />

        <div className="relative flex h-full flex-col">
          {/* ═══════════════════════════════════════
              EN-TÊTE MOBILE (visible < lg)
          ═══════════════════════════════════════ */}
          <div className="flex items-center justify-between border-b border-[#B8925A]/15 px-5 py-4 lg:hidden">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF]">
                <Gem className="h-3.5 w-3.5 text-[#B8925A]" />
              </div>
              <span className="font-serif text-[15px] text-[#2A1520]">
                Navigation
              </span>
            </div>
            <button
              onClick={onClose}
              aria-label="Fermer le menu"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#B8925A]/25 bg-transparent text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF]"
            >
              <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* ═══════════════════════════════════════
              EN-TÊTE DESKTOP (visible ≥ lg)
          ═══════════════════════════════════════ */}
          <div className="hidden border-b border-[#B8925A]/15 px-5 py-6 lg:block">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/40 bg-gradient-to-br from-[#FAF6EF] to-[#FDFBF7]">
                <Gem className="h-4.5 w-4.5 text-[#B8925A]" />
                <div className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[#2A1520] shadow-sm">
                  <Crown className="h-2.5 w-2.5 text-[#D4B87A]" />
                </div>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-[15px] font-semibold tracking-tight text-[#2A1520]">
                  KATHELYN
                  <span className="italic text-[#B8925A]">CRAFT</span>
                </span>
                <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.24em] text-[#8B7B7F]">
                  Administration
                </span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              NAVIGATION
          ═══════════════════════════════════════ */}
          <nav className="relative flex-1 space-y-1.5 overflow-y-auto px-3 py-5">
            {/* Eyebrow de section */}
            <div className="mb-4 flex items-center gap-2 px-3.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-[#8B7B7F]">
              <span className="h-px w-4 bg-[#B8925A]/40" />
              <span>Navigation</span>
            </div>

            {menuItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  aria-current={active ? 'page' : undefined}
                  className={`group relative flex items-center gap-3 rounded-xl border px-3.5 py-2.5 text-[13px] transition-all duration-300 ${
                    active
                      ? 'border-[#B8925A]/40 bg-[#FAF6EF] font-semibold text-[#B8925A]'
                      : 'border-transparent text-[#4A2540] hover:border-[#B8925A]/20 hover:bg-[#FAF6EF] hover:text-[#B8925A]'
                  }`}
                >
                  {/* Icône */}
                  <Icon
                    className={`h-4 w-4 flex-shrink-0 transition-colors duration-300 ${
                      active
                        ? 'text-[#B8925A]'
                        : 'text-[#8B7B7F] group-hover:text-[#B8925A]'
                    }`}
                  />

                  {/* Nom */}
                  <span className="truncate font-serif">{item.name}</span>

                  {/* Chevron (visible en hover ou actif) */}
                  <ChevronRight
                    className={`ml-auto h-3.5 w-3.5 flex-shrink-0 transition-all duration-300 ${
                      active
                        ? 'translate-x-0.5 text-[#B8925A]'
                        : 'text-transparent group-hover:translate-x-0.5 group-hover:text-[#B8925A]'
                    }`}
                  />

                  {/* Point doré indicateur actif (à gauche, à l'extérieur) */}
                  {active && (
                    <span className="absolute -left-3 top-1/2 h-6 w-0.5 -translate-y-1/2 rounded-full bg-gradient-to-b from-transparent via-[#B8925A] to-transparent" />
                  )}
                </Link>
              )
            })}

            {/* Liseré décoratif */}
            <div className="my-5 h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/20 to-transparent" />

            {/* Signature bas de navigation */}
            <div className="flex items-center justify-center gap-2 px-3.5 py-3 text-[9px] uppercase tracking-[0.24em] text-[#8B7B7F]">
              <Sparkles className="h-2.5 w-2.5 text-[#B8925A]" />
              <span>Atelier privé</span>
              <Sparkles className="h-2.5 w-2.5 text-[#B8925A]" />
            </div>
          </nav>

          {/* ═══════════════════════════════════════
              PIED DE SIDEBAR (desktop)
          ═══════════════════════════════════════ */}
          <div className="hidden border-t border-[#B8925A]/15 px-5 py-4 lg:block">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF]">
                <Crown className="h-3.5 w-3.5 text-[#B8925A]" />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-serif text-[11px] text-[#2A1520]">
                  KATHELYNCRAFT
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#8B7B7F]">
                  v1.0 · Maison
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}