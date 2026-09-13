'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  ArrowRight,
  Gem,
  Crown,
  Gift,
  Sparkles,
  ShieldCheck,
  Scissors,
} from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { useSettings } from '@/hooks/useSettings'
import toast from 'react-hot-toast'

export default function CartPage() {
  const { items, total, totalItems, updateQuantity, removeItem, clearCart } =
    useCart()
  const { settings } = useSettings()
  const [isProcessing, setIsProcessing] = useState(false)

  const formatWhatsAppMessage = () => {
    let message = `Bonjour ${settings?.businessName || 'KATHELYNCRAFT'},\n\n`
    message += 'Je souhaite passer la commande suivante :\n\n'

    items.forEach((item: CartItem, index: number) => {
      message += `${index + 1}. ${item.name}\n`
      message += `Prix : ${item.price.toLocaleString()} FCFA\n`
      message += `Quantité : ${item.quantity}\n\n`
    })

    message += `Total estimé : ${total.toLocaleString()} FCFA\n\n`
    message += 'Merci de confirmer la disponibilité de ma commande.'

    return encodeURIComponent(message)
  }

  const handleCheckout = async () => {
    setIsProcessing(true)

    try {
      const orderData = {
        customerName: 'Client',
        customerPhone: '237600000000',
        items: items.map((item: CartItem) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: total,
        notes: 'Commande depuis le site',
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/orders`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        }
      )

      if (!response.ok) {
        const data = await response.json()
        throw new Error(
          data.message || 'Erreur lors de la création de la commande'
        )
      }

      const phone = settings?.whatsappNumber || '237600000000'
      const message = formatWhatsAppMessage()
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank')

      clearCart()
      toast.success('Commande envoyée avec succès !')
    } catch (error: any) {
      console.error('Error processing order:', error)
      toast.error(error.message || 'Erreur lors du traitement de la commande')
    } finally {
      setIsProcessing(false)
    }
  }

  /* ═══════════════════════════════════════
     ÉTAT VIDE
  ═══════════════════════════════════════ */
  if (items.length === 0) {
    return (
      <div className="relative min-h-[70vh] overflow-hidden bg-[#FDFBF7]">
        {/* Décor perles */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-gradient-to-tr from-[#D4B87A]/25 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="container relative flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF]">
            <ShoppingBag className="h-9 w-9 text-[#B8925A]" />
          </div>

          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#B8925A]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
              Votre écrin est vide
            </span>
          </div>

          <h2 className="mb-3 font-serif text-3xl leading-tight text-[#2A1520] md:text-4xl">
            Aucune pièce <span className="italic text-[#B8925A]">signée</span>
          </h2>
          <p className="mb-8 max-w-md text-sm leading-relaxed text-[#5B4A50] md:text-base">
            Laissez-vous porter par une création cousue main pour vous.
            Chaque pièce est unique, façonnée dans notre atelier.
          </p>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-7 py-3.5 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
          >
            <Gem className="h-4 w-4" />
            Explorer la collection
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#2A1520]">
      {/* Décor perles global */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#E8D5D0]/30 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#D4B87A]/15 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="container px-4 py-10 md:py-14">
        {/* ═══════════════════════════════════════
            EN-TÊTE
        ═══════════════════════════════════════ */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
              <Crown className="h-3.5 w-3.5 text-[#B8925A]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
                Votre écrin
              </span>
            </div>

            <h1 className="mb-2 font-serif text-[2rem] leading-[1.1] tracking-tight text-[#2A1520] md:text-[2.75rem]">
              Mon <span className="italic text-[#B8925A]">panier</span>
            </h1>

            <p className="text-sm leading-relaxed text-[#5B4A50]">
              <span className="font-serif text-base font-semibold text-[#B8925A]">
                {totalItems}
              </span>{' '}
              pièce{totalItems > 1 ? 's' : ''} précieusement sélectionnée
              {totalItems > 1 ? 's' : ''}
            </p>
          </div>

          <Link
            href="/products"
            className="group inline-flex items-center gap-2 self-start text-xs font-medium uppercase tracking-[0.15em] text-[#8B7B7F] transition-colors duration-300 hover:text-[#B8925A] md:self-end"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            Continuer mes achats
          </Link>
        </div>

        {/* ═══════════════════════════════════════
            GRILLE PRINCIPALE
        ═══════════════════════════════════════ */}
        <div className="grid gap-8 lg:grid-cols-3 lg:gap-10">
          {/* ─── Colonne items ─── */}
          <div className="space-y-4 lg:col-span-2">
            {items.map((item: CartItem) => (
              <article
                key={item.productId}
                className="group relative flex gap-4 overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-4 transition-all duration-500 hover:border-[#B8925A]/40 hover:shadow-[0_20px_50px_-25px_rgba(74,37,64,0.2)]"
              >
                {/* Liseré doré supérieur */}
                <div className="absolute inset-x-8 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#B8925A]/60 to-transparent transition-transform duration-500 group-hover:scale-x-100" />

                {/* Image */}
                <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl border border-[#B8925A]/15 bg-[#FAF6EF] sm:h-28 sm:w-28">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={112}
                      height={112}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/30">
                      <Gem className="h-8 w-8 text-[#B8925A]/50" />
                    </div>
                  )}
                </div>

                {/* Infos */}
                <div className="flex min-w-0 flex-1 flex-col">
                  <Link
                    href={`/products/${item.slug}`}
                    className="line-clamp-1 font-serif text-[15px] font-medium text-[#2A1520] transition-colors duration-300 hover:text-[#B8925A] sm:text-base"
                  >
                    {item.name}
                  </Link>

                  <p className="mt-1 font-serif text-[17px] font-semibold text-[#B8925A]">
                    {item.price.toLocaleString()}{' '}
                    <span className="text-[11px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                      FCFA
                    </span>
                  </p>

                  {/* Contrôles */}
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-3">
                    {/* Quantité */}
                    <div className="flex items-center overflow-hidden rounded-full border border-[#B8925A]/25 bg-[#FDFBF7]">
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                        aria-label="Réduire la quantité"
                        className="px-3 py-1.5 text-[#4A2540] transition-colors duration-300 hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="min-w-[2rem] px-1 text-center font-serif text-sm font-semibold tabular-nums text-[#2A1520]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.productId, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.stock}
                        aria-label="Augmenter la quantité"
                        className="px-3 py-1.5 text-[#4A2540] transition-colors duration-300 hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    {/* Supprimer */}
                    <button
                      onClick={() => removeItem(item.productId)}
                      aria-label={`Retirer ${item.name} du panier`}
                      className="group/del ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-transparent text-[#8B7B7F] transition-all duration-300 hover:border-[#B8925A]/30 hover:bg-[#FAF6EF] hover:text-[#B8925A]"
                    >
                      <Trash2 className="h-4 w-4 transition-transform duration-300 group-hover/del:scale-110" />
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {/* Carte reassurance */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 border-t border-[#B8925A]/15 pt-6 text-[10px] uppercase tracking-[0.22em] text-[#8B7B7F]">
              <div className="flex items-center gap-2">
                <Gift className="h-3 w-3 text-[#B8925A]" />
                Écrin signature inclus
              </div>
              <span className="hidden h-3 w-px bg-[#B8925A]/30 sm:block" />
              <div className="flex items-center gap-2">
                <Scissors className="h-3 w-3 text-[#B8925A]" />
                Pièces cousues main
              </div>
              <span className="hidden h-3 w-px bg-[#B8925A]/30 sm:block" />
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3 w-3 text-[#B8925A]" />
                Paiement à la livraison
              </div>
            </div>
          </div>

          {/* ─── Colonne résumé ─── */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)]">
              {/* Liseré doré supérieur */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

              {/* Décor perles */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#D4B87A]/10 blur-2xl" />
                <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-[#E8D5D0]/25 blur-2xl" />
              </div>

              <div className="relative p-6">
                {/* En-tête */}
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF]">
                    <Gem className="h-4.5 w-4.5 text-[#B8925A]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg leading-tight text-[#2A1520]">
                      Récapitulatif
                    </h2>
                    <p className="text-[10px] uppercase tracking-[0.22em] text-[#8B7B7F]">
                      Votre écrin
                    </p>
                  </div>
                </div>

                {/* Détail */}
                <div className="space-y-3 border-b border-[#B8925A]/15 pb-5">
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="text-[13px] text-[#5B4A50]">
                      Sous-total{' '}
                      <span className="text-[#8B7B7F]">
                        · {totalItems} pièce{totalItems > 1 ? 's' : ''}
                      </span>
                    </span>
                    <span className="font-serif text-sm font-semibold tabular-nums text-[#2A1520]">
                      {total.toLocaleString()} FCFA
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-[13px] text-[#5B4A50]">
                      <Gift className="h-3.5 w-3.5 text-[#B8925A]" />
                      Écrin signature
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8925A]">
                      <Sparkles className="h-2.5 w-2.5" />
                      Offert
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-[13px] text-[#5B4A50]">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#B8925A]" />
                      Paiement à la livraison
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                      Disponible
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-baseline justify-between gap-3 py-5">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8B7B7F]">
                    Total estimé
                  </span>
                  <span className="font-serif text-2xl font-semibold text-[#2A1520]">
                    {total.toLocaleString()}{' '}
                    <span className="text-sm text-[#B8925A]">FCFA</span>
                  </span>
                </div>

                {/* Bouton checkout */}
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || items.length === 0}
                  className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#2A1520] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-[#2A1520] disabled:hover:shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)]"
                >
                  {isProcessing ? (
                    <>
                      <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#D4B87A]/40 border-t-[#D4B87A]" />
                      Traitement…
                    </>
                  ) : (
                    <>
                      <Crown className="h-3.5 w-3.5" />
                      Commander sur WhatsApp
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>

                {/* Lien continuer */}
                <Link
                  href="/products"
                  className="group mt-4 flex items-center justify-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.15em] text-[#8B7B7F] transition-colors duration-300 hover:text-[#B8925A]"
                >
                  <ArrowLeft className="h-3 w-3 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  Continuer mes achats
                </Link>

                {/* Signature bas */}
                <div className="mt-5 flex items-center justify-center gap-2 border-t border-[#B8925A]/15 pt-4 text-[10px] uppercase tracking-[0.24em] text-[#8B7B7F]">
                  <Gift className="h-3 w-3 text-[#B8925A]" />
                  <span>Fait main · Édition limitée</span>
                  <Gem className="h-3 w-3 text-[#B8925A]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* Type pour CartItem (à importer depuis les types) */
interface CartItem {
  productId: string
  name: string
  slug: string
  price: number
  quantity: number
  image?: string
  stock: number
}