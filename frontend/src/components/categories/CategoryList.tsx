import Link from 'next/link'
import { Category } from '@/types'
import { ChevronRight, Gem, Sparkles, Crown } from 'lucide-react'

interface CategoryListProps {
  categories: Category[]
  selectedCategory?: string
  onSelect?: (categoryId: string) => void
}

export default function CategoryList({
  categories,
  selectedCategory,
  onSelect,
}: CategoryListProps) {
  const isAllSelected = !selectedCategory

  return (
    <div className="rounded-2xl border border-[#B8925A]/15 bg-white p-5 shadow-[0_20px_50px_-25px_rgba(74,37,64,0.15)]">
      {/* ═══════════════════════════════════════
          EN-TÊTE
      ═══════════════════════════════════════ */}
      <div className="mb-5 flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF]">
          <Gem className="h-3.5 w-3.5 text-[#B8925A]" />
        </div>
        <div>
          <h3 className="font-serif text-[15px] text-[#2A1520]">
            Collections
          </h3>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7B7F]">
            {categories.length} univers
          </p>
        </div>
      </div>

      {/* Liseré doré séparateur */}
      <div className="mb-4 h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/30 to-transparent" />

      {/* ═══════════════════════════════════════
          LISTE
      ═══════════════════════════════════════ */}
      <ul className="space-y-1.5">
        {/* ─── Toutes les collections ─── */}
        <li>
          <button
            onClick={() => onSelect?.('')}
            className={`group flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-[13px] transition-all duration-300 ${
              isAllSelected
                ? 'border-[#B8925A]/40 bg-[#FAF6EF] font-semibold text-[#B8925A]'
                : 'border-transparent text-[#4A2540] hover:border-[#B8925A]/20 hover:bg-[#FAF6EF] hover:text-[#B8925A]'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <Sparkles
                className={`h-3.5 w-3.5 transition-colors duration-300 ${
                  isAllSelected
                    ? 'text-[#B8925A]'
                    : 'text-[#8B7B7F] group-hover:text-[#B8925A]'
                }`}
              />
              <span className="font-serif">
                Toutes les collections
              </span>
            </span>
            <ChevronRight
              className={`h-3.5 w-3.5 transition-all duration-300 ${
                isAllSelected
                  ? 'translate-x-0.5 text-[#B8925A]'
                  : 'text-[#8B7B7F] group-hover:translate-x-0.5 group-hover:text-[#B8925A]'
              }`}
            />
          </button>
        </li>

        {/* ─── Catégories ─── */}
        {categories.map((category) => {
          const isSelected = selectedCategory === category._id
          return (
            <li key={category._id}>
              <button
                onClick={() => onSelect?.(category._id)}
                aria-current={isSelected ? 'true' : undefined}
                className={`group flex w-full items-center justify-between rounded-xl border px-3.5 py-2.5 text-left text-[13px] transition-all duration-300 ${
                  isSelected
                    ? 'border-[#B8925A]/40 bg-[#FAF6EF] font-semibold text-[#B8925A]'
                    : 'border-transparent text-[#4A2540] hover:border-[#B8925A]/20 hover:bg-[#FAF6EF] hover:text-[#B8925A]'
                }`}
              >
                <span className="flex items-center gap-2.5 truncate">
                  {/* Micro-puce dorée en lieu d'icône */}
                  <span
                    className={`h-1.5 w-1.5 flex-shrink-0 rounded-full transition-colors duration-300 ${
                      isSelected
                        ? 'bg-[#B8925A]'
                        : 'bg-[#E8D5D0] group-hover:bg-[#B8925A]'
                    }`}
                  />
                  <span className="truncate font-serif">
                    {category.name}
                  </span>
                </span>
                <ChevronRight
                  className={`h-3.5 w-3.5 flex-shrink-0 transition-all duration-300 ${
                    isSelected
                      ? 'translate-x-0.5 text-[#B8925A]'
                      : 'text-[#8B7B7F] group-hover:translate-x-0.5 group-hover:text-[#B8925A]'
                  }`}
                />
              </button>
            </li>
          )
        })}
      </ul>

      {/* ═══════════════════════════════════════
          SIGNATURE DE BAS DE LISTE
      ═══════════════════════════════════════ */}
      {categories.length > 0 && (
        <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#B8925A]/15 pt-4 text-[10px] uppercase tracking-[0.24em] text-[#8B7B7F]">
          <Crown className="h-3 w-3 text-[#B8925A]" />
          <span>Édition limitée</span>
        </div>
      )}
    </div>
  )
}