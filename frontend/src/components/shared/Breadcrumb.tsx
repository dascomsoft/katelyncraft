import Link from 'next/link'
import { ChevronRight, Home, Gem } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`flex flex-wrap items-center gap-1.5 text-[11px] uppercase tracking-[0.18em] ${className}`}
    >
      {/* ─── Accueil ─── */}
      <Link
        href="/"
        aria-label="Accueil"
        className="group inline-flex items-center gap-1.5 text-[#8B7B7F] transition-colors duration-300 hover:text-[#B8925A]"
      >
        <Home className="h-3.5 w-3.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
      </Link>

      {/* ─── Items ─── */}
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <div key={index} className="flex items-center gap-1.5">
            {/* Séparateur doré */}
            <ChevronRight className="h-3 w-3 flex-shrink-0 text-[#B8925A]/50" />

            {item.href && !isLast ? (
              /* Lien intermédiaire */
              <Link
                href={item.href}
                className="text-[#8B7B7F] transition-colors duration-300 hover:text-[#B8925A]"
              >
                {item.label}
              </Link>
            ) : isLast ? (
              /* Élément courant (dernier) */
              <span className="inline-flex items-center gap-1.5 font-serif text-[12px] font-semibold normal-case tracking-normal text-[#B8925A]">
                <Gem className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </span>
            ) : (
              /* Fallback : item sans href qui n'est pas dernier */
              <span className="text-[#8B7B7F]">{item.label}</span>
            )}
          </div>
        )
      })}
    </nav>
  )
}