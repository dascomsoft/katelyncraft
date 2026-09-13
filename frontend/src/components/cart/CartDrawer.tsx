'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  X,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  Gem,
  Crown,
  Gift,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { useCart } from '@/hooks/useCart'
import { Settings } from '@/types'
import toast from 'react-hot-toast'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  settings?: Settings
}

export default function CartDrawer({ isOpen, onClose, settings }: CartDrawerProps) {
  const {
    items = [],
    total = 0,
    totalItems = 0,
    updateQuantity,
    removeItem,
    clearCart,
  } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  if (!isOpen) return null

  const formatWhatsAppMessage = () => {
    let message = `Bonjour ${
      settings?.businessName || 'KATHELYNCRAFT'
    },\n\n`
    message += 'Je souhaite passer la commande suivante :\n\n'

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `Prix : ${item.price.toLocaleString()} FCFA\n`
      message += `Quantité : ${item.quantity}\n\n`
    })

    message += `Total estimé : ${total.toLocaleString()} FCFA\n\n`
    message += 'Merci de confirmer la disponibilité de ma commande.'

    return encodeURIComponent(message)
  }

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Votre panier est vide')
      return
    }

    setIsProcessing(true)

    try {
      // Préparer les données de la commande
      const orderData = {
        customerName: 'Client',
        customerPhone: settings?.whatsappNumber || '237600000000',
        customerEmail: 'client@email.com',
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        total: total,
        notes: 'Commande depuis le site KATHELYNCRAFT',
      }

      console.log('📦 Envoi de la commande:', orderData)

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      const data = await response.json()
      console.log('📦 Réponse:', data)

      if (!response.ok) {
        throw new Error(
          data.message || 'Erreur lors de la création de la commande'
        )
      }

      // Ouvrir WhatsApp
      const phone = settings?.whatsappNumber || '237600000000'
      const message = formatWhatsAppMessage()
      window.open(`https://wa.me/${phone}?text=${message}`, '_blank')

      // Vider le panier
      clearCart()
      toast.success('Commande envoyée avec succès !')
      onClose()
    } catch (error: any) {
      console.error('❌ Error processing order:', error)
      toast.error(error.message || 'Erreur lors du traitement de la commande')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* ═══════════════════════════════════════
          BACKDROP
      ═══════════════════════════════════════ */}
      <div
        className="fixed inset-0 bg-[#2A1520]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* ═══════════════════════════════════════
          DRAWER
      ═══════════════════════════════════════ */}
      <div
        className="fixed inset-y-0 right-0 w-full max-w-md border-l border-[#B8925A]/20 bg-[#FDFBF7] shadow-[0_0_80px_-20px_rgba(42,21,32,0.5)]"
        role="dialog"
        aria-modal="true"
        aria-label="Panier"
      >
        <div className="flex h-full flex-col">
          {/* ─── HEADER ─── */}
          <div className="relative flex items-center justify-between border-b border-[#B8925A]/15 bg-[#FDFBF7] px-5 py-4">
            {/* Liseré doré en haut */}
            <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#B8925A]/50 to-transparent" />

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF]">
                <Gem className="h-4.5 w-4.5 text-[#B8925A]" />
              </div>
              <div>
                <h2 className="font-serif text-lg leading-tight text-[#2A1520]">
                  Mon écrin
                </h2>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#8B7B7F]">
                  {totalItems} pièce{totalItems > 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              aria-label="Fermer le panier"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-[#B8925A]/25 bg-transparent text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF]"
            >
              <X className="h-4 w-4 transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* ─── CORPS ─── */}
          <div className="flex-1 overflow-y-auto px-4 py-5">
            {!items || items.length === 0 ? (
              /* ══════════ ÉTAT VIDE ══════════ */
              <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
                  <ShoppingBag className="h-8 w-8 text-[#B8925A]" />
                </div>
                <p className="mb-2 font-serif text-lg text-[#2A1520]">
                  Votre écrin est vide
                </p>
                <p className="mb-6 max-w-xs text-sm leading-relaxed text-[#5B4A50]">
                  Laissez-vous porter par une création cousue main pour vous.
                </p>
                <Link
                  href="/products"
                  onClick={onClose}
                  className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-6 py-3 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
                >
                  <Gem className="h-4 w-4" />
                  Découvrir la collection
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            ) : (
              /* ══════════ LISTE DES ITEMS ══════════ */
              <div className="space-y-3">
                {items.map((item) => (
                  <article
                    key={item.productId}
                    className="group relative flex gap-3.5 overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-3 transition-all duration-300 hover:border-[#B8925A]/40 hover:shadow-[0_15px_40px_-25px_rgba(74,37,64,0.2)]"
                  >
                    {/* Image produit */}
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-[#B8925A]/15 bg-[#FAF6EF]">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).style.display =
                              'none'
                          }}
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/30">
                          <Gem className="h-6 w-6 text-[#B8925A]/50" />
                        </div>
                      )}
                    </div>

                    {/* Infos produit */}
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/products/${item.slug}`}
                        onClick={onClose}
                        className="line-clamp-1 font-serif text-[14px] font-medium text-[#2A1520] transition-colors duration-300 hover:text-[#B8925A]"
                      >
                        {item.name}
                      </Link>

                      <p className="mt-0.5 font-serif text-[15px] font-semibold text-[#B8925A]">
                        {item.price.toLocaleString()} FCFA
                      </p>

                      {/* Contrôles quantité + suppression */}
                      <div className="mt-2.5 flex items-center gap-2">
                        {/* Sélecteur quantité */}
                        <div className="flex items-center overflow-hidden rounded-full border border-[#B8925A]/25 bg-[#FDFBF7]">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                Math.max(1, item.quantity - 1)
                              )
                            }
                            aria-label="Réduire la quantité"
                            className="px-2 py-1 text-[#4A2540] transition-colors duration-300 hover:bg-[#FAF6EF]"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[1.75rem] px-1 text-center font-serif text-xs font-semibold tabular-nums text-[#2A1520]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.productId,
                                Math.min(
                                  item.stock || 999,
                                  item.quantity + 1
                                )
                              )
                            }
                            aria-label="Augmenter la quantité"
                            className="px-2 py-1 text-[#4A2540] transition-colors duration-300 hover:bg-[#FAF6EF]"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Supprimer */}
                        <button
                          onClick={() => removeItem(item.productId)}
                          aria-label={`Retirer ${item.name}`}
                          className="ml-auto flex h-7 w-7 items-center justify-center rounded-full border border-transparent text-[#8B7B7F] transition-all duration-300 hover:border-[#B8925A]/30 hover:bg-[#FAF6EF] hover:text-[#B8925A]"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                ))}

                {/* Note paiement à la livraison */}
                <div className="flex items-start gap-3 rounded-2xl border border-[#B8925A]/20 bg-[#FAF6EF] px-4 py-3 text-xs leading-relaxed text-[#5B4A50]">
                  <ShieldCheck className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#B8925A]" />
                  <span>
                    Paiement à la livraison disponible. Réglez à la réception
                    de votre écrin.
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ─── FOOTER ─── */}
          {items && items.length > 0 && (
            <div className="relative border-t border-[#B8925A]/15 bg-[#FAF6EF] px-5 py-5">
              {/* Liseré doré en haut du footer */}
              <div className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

              {/* Total */}
              <div className="mb-5 flex items-baseline justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#8B7B7F]">
                  Total estimé
                </span>
                <span className="font-serif text-2xl font-semibold text-[#2A1520]">
                  {total.toLocaleString()}{' '}
                  <span className="text-sm text-[#B8925A]">FCFA</span>
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-2.5">
                <button
                  onClick={clearCart}
                  className="rounded-full border border-[#B8925A]/25 bg-transparent px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A]/50 hover:bg-[#FDFBF7]"
                >
                  Vider
                </button>
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2A1520] px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#2A1520] disabled:hover:shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)]"
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
              </div>

              {/* Signature bas footer */}
              <div className="mt-4 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#8B7B7F]">
                <Gift className="h-3 w-3 text-[#B8925A]" />
                <span>Écrin signature inclus</span>
                <Sparkles className="h-3 w-3 text-[#B8925A]" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}