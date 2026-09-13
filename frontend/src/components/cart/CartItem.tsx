'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Trash2, Plus, Minus, Gem, ArrowRight } from 'lucide-react'
import { CartItem as CartItemType } from '@/types'
import { useCart } from '@/hooks/useCart'

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const isDecrementDisabled = item.quantity <= 1
  const isIncrementDisabled = item.quantity >= item.stock

  return (
    <article className="group relative flex gap-3.5 overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-3 transition-all duration-500 hover:border-[#B8925A]/40 hover:shadow-[0_20px_50px_-25px_rgba(74,37,64,0.25)]">
      {/* ═══════════════════════════════════════
          IMAGE PRODUIT
      ═══════════════════════════════════════ */}
      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-[#B8925A]/15 bg-[#FAF6EF]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            width={80}
            height={80}
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/30">
            <Gem className="h-6 w-6 text-[#B8925A]/50" />
          </div>
        )}

        {/* Liseré doré au survol */}
        <div className="absolute inset-x-3 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#D4B87A] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
      </div>

      {/* ═══════════════════════════════════════
          INFOS PRODUIT
      ═══════════════════════════════════════ */}
      <div className="min-w-0 flex-1">
        {/* Nom */}
        <Link
          href={`/products/${item.slug}`}
          className="group/link line-clamp-1 font-serif text-[14px] font-medium text-[#2A1520] transition-colors duration-300 hover:text-[#B8925A]"
        >
          {item.name}
        </Link>

        {/* Prix */}
        <p className="mt-0.5 font-serif text-[15px] font-semibold text-[#B8925A]">
          {item.price.toLocaleString()} FCFA
        </p>

        {/* Contrôles quantité + suppression */}
        <div className="mt-2.5 flex items-center gap-2">
          {/* Sélecteur quantité */}
          <div className="flex items-center overflow-hidden rounded-full border border-[#B8925A]/25 bg-[#FDFBF7]">
            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity - 1)
              }
              disabled={isDecrementDisabled}
              aria-label="Réduire la quantité"
              className="px-2.5 py-1.5 text-[#4A2540] transition-all duration-300 hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <Minus className="h-3 w-3" />
            </button>
            <span className="min-w-[1.75rem] px-1 text-center font-serif text-xs font-semibold tabular-nums text-[#2A1520]">
              {item.quantity}
            </span>
            <button
              onClick={() =>
                updateQuantity(item.productId, item.quantity + 1)
              }
              disabled={isIncrementDisabled}
              aria-label="Augmenter la quantité"
              className="px-2.5 py-1.5 text-[#4A2540] transition-all duration-300 hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>

          {/* Bouton supprimer */}
          <button
            onClick={() => removeItem(item.productId)}
            aria-label={`Retirer ${item.name} du panier`}
            className="ml-auto group/del flex h-7 w-7 items-center justify-center rounded-full border border-transparent text-[#8B7B7F] transition-all duration-300 hover:border-[#B8925A]/30 hover:bg-[#FAF6EF] hover:text-[#B8925A]"
          >
            <Trash2 className="h-3.5 w-3.5 transition-transform duration-300 group-hover/del:scale-110" />
          </button>
        </div>
      </div>
    </article>
  )
}