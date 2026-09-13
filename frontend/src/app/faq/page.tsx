'use client'

export const dynamic = 'force-dynamic'

import { useState } from 'react'
import {
  ChevronDown,
  ChevronUp,
  Search,
  MessageCircle,
  Gem,
  Crown,
  Sparkles,
  Gift,
  HelpCircle,
  ArrowRight,
} from 'lucide-react'
import Link from 'next/link'
import { useSettings } from '@/hooks/useSettings'

export default function FAQPage() {
  const { settings } = useSettings()
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      category: 'Commandes',
      q: 'Comment passer une commande ?',
      a: 'Sélectionnez vos produits, ajoutez-les au panier, puis cliquez sur "Commander via WhatsApp". Un message automatisé sera généré avec le détail de votre commande.',
    },
    {
      category: 'Commandes',
      q: 'Puis-je modifier ma commande après validation ?',
      a: 'Oui, contactez-nous rapidement via WhatsApp avec votre numéro de commande. Nous ferons de notre mieux pour modifier votre commande avant expédition.',
    },
    {
      category: 'Paiement',
      q: 'Quels sont les modes de paiement acceptés ?',
      a: 'Nous acceptons le paiement à la livraison (cash), Orange Money, MTN Mobile Money et le virement bancaire. Un paiement sécurisé et flexible pour votre confort.',
    },
    {
      category: 'Paiement',
      q: 'Le paiement en ligne est-il sécurisé ?',
      a: "Actuellement, nous privilégions le paiement à la livraison. Cela vous permet de vérifier vos produits avant de payer, pour une tranquillité d'esprit totale.",
    },
    {
      category: 'Livraison',
      q: 'Quels sont les délais de livraison ?',
      a: "Livraison sous 24-48h à Yaoundé et Douala. Pour les autres villes du Cameroun, comptez 3-5 jours ouvrés. Des délais supplémentaires peuvent s'appliquer en période de forte affluence.",
    },
    {
      category: 'Livraison',
      q: 'Y a-t-il des frais de livraison ?',
      a: 'La livraison est gratuite pour toute commande à Yaoundé et Douala. Pour les autres villes, les frais sont calculés en fonction de la localisation.',
    },
    {
      category: 'Retours',
      q: 'Puis-je retourner un produit ?',
      a: "Oui, vous disposez de 7 jours après réception pour retourner un produit non utilisé, dans son emballage d'origine. Contactez-nous pour organiser le retour.",
    },
    {
      category: 'Retours',
      q: 'Comment se passe le remboursement ?',
      a: 'Le remboursement est effectué dans les 48h suivant la réception du produit retourné, sur le mode de paiement initial.',
    },
    {
      category: 'Service client',
      q: 'Comment contacter le service client ?',
      a: 'Par WhatsApp au +237 600 000 000 (réponse sous 15 min) ou par email à contact@kathelyncraft.com. Notre équipe est disponible du lundi au samedi de 8h à 19h.',
    },
    {
      category: 'Service client',
      q: 'Que faire si je reçois un produit défectueux ?',
      a: "Contactez-nous immédiatement avec une photo du produit. Nous organiserons l'échange ou le remboursement dans les meilleurs délais.",
    },
  ]

  const filteredFaqs = searchTerm
    ? faqs.filter(
        (faq) =>
          faq.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.a.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : faqs

  const categories = [...new Set(faqs.map((f) => f.category))]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FDFBF7] text-[#2A1520]">
      {/* ═══════════════════════════════════════
          DÉCOR PERLES GLOBAL
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#E8D5D0]/30 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#D4B87A]/15 via-transparent to-transparent blur-3xl" />
      </div>

      {/* ═══════════════════════════════════════
          HERO — Éditorial
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FAF6EF]">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="container relative px-4 py-16 text-center md:py-20">
          {/* Eyebrow signature */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
            <HelpCircle className="h-3.5 w-3.5 text-[#B8925A]" />
            <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
              Questions fréquentes
            </span>
          </div>

          <h1 className="mx-auto mb-5 max-w-3xl font-serif text-[2.4rem] leading-[1.05] tracking-tight text-[#2A1520] sm:text-5xl md:text-6xl">
            Comment pouvons-nous{' '}
            <span className="italic text-[#B8925A]">vous aider ?</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-[#5B4A50] md:text-lg">
            Trouvez rapidement une réponse à vos questions. Si vous ne
            trouvez pas, notre atelier vous répond personnellement.
          </p>
        </div>

        {/* Liseré doré inférieur */}
        <div className="container relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BARRE DE RECHERCHE
      ═══════════════════════════════════════ */}
      <section className="container relative z-10 -mt-5 px-4">
        <div className="mx-auto max-w-2xl overflow-hidden rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] shadow-[0_20px_50px_-25px_rgba(74,37,64,0.25)] backdrop-blur-sm">
          <div className="flex items-center gap-3 px-5 py-3.5">
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF]">
              <Search className="h-3.5 w-3.5 text-[#B8925A]" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une question, un mot-clé…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              aria-label="Rechercher dans la FAQ"
              className="flex-1 bg-transparent font-serif text-[15px] text-[#2A1520] placeholder-[#A89298] outline-none md:text-base"
            />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CATÉGORIES (filtres)
      ═══════════════════════════════════════ */}
      <section className="container px-4 py-8">
        <div className="flex flex-wrap justify-center gap-2.5">
          <button
            onClick={() => setSearchTerm('')}
            className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
              !searchTerm
                ? 'border-[#B8925A] bg-[#B8925A] text-white shadow-[0_10px_25px_-10px_rgba(184,146,90,0.5)]'
                : 'border-[#B8925A]/25 bg-transparent text-[#4A2540] hover:border-[#B8925A]/50 hover:bg-[#FAF6EF] hover:text-[#B8925A]'
            }`}
          >
            <Sparkles className="h-3 w-3" />
            Toutes
          </button>

          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchTerm(cat)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                searchTerm === cat
                  ? 'border-[#B8925A] bg-[#B8925A] text-white shadow-[0_10px_25px_-10px_rgba(184,146,90,0.5)]'
                  : 'border-[#B8925A]/25 bg-transparent text-[#4A2540] hover:border-[#B8925A]/50 hover:bg-[#FAF6EF] hover:text-[#B8925A]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LISTE FAQ
      ═══════════════════════════════════════ */}
      <section className="container max-w-3xl px-4 py-8 md:py-10">
        {filteredFaqs.length === 0 ? (
          /* ── État vide ── */
          <div className="rounded-3xl border border-[#B8925A]/15 bg-white px-6 py-16 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
              <Search className="h-7 w-7 text-[#B8925A]" />
            </div>
            <p className="mb-1 font-serif text-lg text-[#2A1520]">
              Aucune réponse trouvée
            </p>
            <p className="text-sm leading-relaxed text-[#5B4A50]">
              Aucun résultat pour «{' '}
              <span className="font-serif italic text-[#B8925A]">
                {searchTerm}
              </span>{' '}
              ». Essayez un autre mot-clé ou contactez-nous.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openIndex === index
              return (
                <div
                  key={index}
                  className={`group relative overflow-hidden rounded-2xl border bg-white transition-all duration-500 ${
                    isOpen
                      ? 'border-[#B8925A]/40 shadow-[0_25px_60px_-25px_rgba(74,37,64,0.25)]'
                      : 'border-[#B8925A]/15 hover:border-[#B8925A]/30 hover:shadow-[0_20px_50px_-25px_rgba(74,37,64,0.15)]'
                  }`}
                >
                  {/* Liseré doré supérieur (visible quand ouvert) */}
                  <div
                    className={`absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#B8925A] to-transparent transition-transform duration-500 ${
                      isOpen ? 'scale-x-100' : 'scale-x-0'
                    }`}
                  />

                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5"
                  >
                    <div className="min-w-0 flex-1">
                      {/* Catégorie en eyebrow */}
                      <span className="mb-2 inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#B8925A]">
                        <Gem className="h-2.5 w-2.5" />
                        {faq.category}
                      </span>

                      {/* Question */}
                      <span className="block font-serif text-[15px] leading-snug text-[#2A1520] md:text-base">
                        {faq.q}
                      </span>
                    </div>

                    {/* Toggle */}
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                        isOpen
                          ? 'border-[#B8925A] bg-[#B8925A] text-white'
                          : 'border-[#B8925A]/25 bg-transparent text-[#4A2540] group-hover:border-[#B8925A] group-hover:bg-[#FAF6EF] group-hover:text-[#B8925A]'
                      }`}
                    >
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </button>

                  {/* Réponse */}
                  {isOpen && (
                    <div className="border-t border-[#B8925A]/15 px-5 pb-5 pt-4 md:px-6 md:pb-6">
                      <div className="rounded-xl border border-[#B8925A]/15 bg-[#FAF6EF] px-4 py-3.5 md:px-5 md:py-4">
                        <div className="mb-2 flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#8B7B7F]">
                          <Crown className="h-3 w-3 text-[#B8925A]" />
                          <span>Réponse</span>
                        </div>
                        <p className="font-serif text-[14px] leading-relaxed text-[#5B4A50] md:text-[15px]">
                          {faq.a}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ═══════════════════════════════════════
          CTA CONTACT
      ═══════════════════════════════════════ */}
      <section className="container max-w-3xl px-4 py-12 md:py-16">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] px-6 py-12 text-center text-[#FAF6EF] md:px-12 md:py-16">
          {/* Perles lumineuses */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4B87A]/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#E8D5D0]/10 blur-3xl" />

          <div className="relative mx-auto max-w-xl">
            {/* Icône */}
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10 backdrop-blur-sm">
              <MessageCircle className="h-6 w-6 text-[#D4B87A]" />
            </div>

            {/* Titre */}
            <h2 className="mb-4 font-serif text-2xl leading-tight text-[#FAF6EF] md:text-3xl">
              Vous ne trouvez pas votre{' '}
              <span className="italic text-[#D4B87A]">réponse ?</span>
            </h2>

            {/* Texte */}
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-[#C4B5B8] md:text-[15px]">
              Une artisane vous répond personnellement sur WhatsApp en moins
              de 15 minutes — conseil, suivi, personnalisation : dites-nous
              tout.
            </p>

            {/* CTA */}
            <a
              href={`https://wa.me/${
                settings?.whatsappNumber || '237600000000'
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full bg-[#D4B87A] px-8 py-3.5 text-sm font-semibold text-[#2A1520] transition-all duration-300 hover:bg-[#E8D5D0] hover:shadow-[0_20px_50px_-15px_rgba(212,184,122,0.5)]"
            >
              <MessageCircle className="h-4 w-4" />
              Contacter l&apos;atelier
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Signature bas CTA */}
            <p className="mt-6 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.24em] text-[#A89298]">
              <Gift className="h-3 w-3 text-[#D4B87A]" />
              Réponse sous 15 min · 7j/7
              <Gift className="h-3 w-3 text-[#D4B87A]" />
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}