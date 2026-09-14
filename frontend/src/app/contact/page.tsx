'use client'

import { useState } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Gem,
  Sparkles,
  Crown,
  Scissors,
  CheckCircle2,
  Heart,
  Gift,
  ArrowRight,
} from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'
import toast from 'react-hot-toast'
import Link from 'next/link'

export default function ContactPage() {
  const { settings } = useSettings()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)

    // Simuler l'envoi (à remplacer par un vrai service d'email)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast.success('Message envoyé avec succès !')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setSending(false)
  }

  const businessName = settings?.businessName || 'KATHELYNCRAFT'
  const businessDescription =
    settings?.businessDescription ||
    'Maison de maroquinerie artisanale — sacs de luxe en perles, façonnés à la main.'

  // Champs de contact exposés en variable pour cohérence design
  const contactItems = [
    {
      icon: Phone,
      label: 'Téléphone',
      value: settings?.businessPhone || '+237 682214958',
    },
    {
      icon: Mail,
      label: 'Email',
      value: settings?.businessEmail || 'cathylight51@gmail.com',
    },
    {
      icon: MapPin,
      label: 'Atelier',
      value: settings?.businessAddress || 'Yaoundé, Cameroun',
    },
    {
      icon: Clock,
      label: 'Horaires',
      value: 'Lun – Sam · 8h – 19h',
    },
  ]

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#FDFBF7] text-[#2A1520]">
      {/* =========================================================
          HERO ÉDITORIAL
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#FAF6EF]">
        {/* Motif perles décoratif */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-32 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl" />
          <div className="absolute top-1/3 left-1/2 h-[260px] w-[260px] rounded-full bg-gradient-to-bl from-[#4A2540]/10 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="container relative py-16 md:py-20 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
              <MessageCircle className="h-3.5 w-3.5 text-[#B8925A]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
                Service client · Réponse sous 15 min
              </span>
            </div>

            <h1 className="font-serif text-[2.4rem] leading-[1.08] tracking-tight text-[#2A1520] sm:text-5xl md:text-6xl">
              Parlons de votre{' '}
              <span className="italic text-[#B8925A]">prochaine pièce.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-[#5B4A50] md:text-base">
              Une question sur une création, un projet sur-mesure, un suivi
              de commande ? Notre atelier vous répond personnellement, avec
              attention.
            </p>
          </div>
        </div>

        {/* Liseré doré inférieur */}
        <div className="container relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />
        </div>
      </section>

      {/* =========================================================
          CORPS — Coordonnées + Formulaire
      ========================================================= */}
      <section className="container py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-5 lg:gap-12">
          {/* ─────────────── Colonne infos (2/5) ─────────────── */}
          <div className="lg:col-span-2">
            {/* Carte principale */}
            <div className="relative overflow-hidden rounded-3xl border border-[#B8925A]/15 bg-white p-7 shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)] md:p-8">
              {/* Décor perle en coin */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br from-[#E8D5D0]/50 to-transparent blur-2xl" />

              <div className="relative">
                {/* En-tête maison */}
                <div className="mb-7 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF]">
                    <Gem className="h-5 w-5 text-[#B8925A]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-xl leading-tight text-[#2A1520]">
                      {businessName}
                    </h2>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-[#8B7B7F]">
                      Atelier & Maison
                    </p>
                  </div>
                </div>

                <p className="mb-8 text-sm leading-relaxed text-[#5B4A50]">
                  {businessDescription}
                </p>

                {/* Liste des coordonnées */}
                <div className="space-y-3">
                  {contactItems.map((item, i) => {
                    const Icon = item.icon
                    return (
                      <div
                        key={i}
                        className="group flex items-center gap-4 rounded-2xl border border-[#B8925A]/15 bg-[#FDFBF7] p-4 transition-all duration-300 hover:border-[#B8925A]/40 hover:bg-[#FAF6EF]"
                      >
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/30 bg-white transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A]">
                          <Icon className="h-4 w-4 text-[#B8925A] transition-colors duration-300 group-hover:text-white" />
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#8B7B7F]">
                            {item.label}
                          </div>
                          <div className="truncate font-serif text-[15px] text-[#2A1520]">
                            {item.value}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Info livraison conditionnelle */}
                {settings?.deliveryInfo && (
                  <div className="mt-6 rounded-2xl border border-[#B8925A]/25 bg-[#FAF6EF] p-4">
                    <div className="flex items-start gap-3">
                      <Gift className="h-4 w-4 flex-shrink-0 text-[#B8925A] mt-0.5" />
                      <p className="text-xs leading-relaxed text-[#5B4A50]">
                        {settings.deliveryInfo}
                      </p>
                    </div>
                  </div>
                )}

                {/* CTA WhatsApp */}
                <a
                  href={`https://wa.me/${
                    settings?.whatsappNumber || '237682214958'
                  }`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[#2A1520] px-6 py-3.5 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Discuter sur WhatsApp
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <div className="mt-4 flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#8B7B7F]">
                  <CheckCircle2 className="h-3 w-3 text-[#B8925A]" />
                  Réponse garantie sous 15 minutes
                </div>
              </div>
            </div>

            {/* Carte secondaire — Signature */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-[#B8925A]/15 bg-white p-5 text-center transition-all duration-300 hover:border-[#B8925A]/40 hover:shadow-[0_20px_40px_-20px_rgba(74,37,64,0.25)]">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF]">
                  <Scissors className="h-4 w-4 text-[#B8925A]" />
                </div>
                <div className="font-serif text-sm text-[#2A1520]">
                  Sur-mesure
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8B7B7F]">
                  Sur demande
                </div>
              </div>

              <div className="rounded-2xl border border-[#B8925A]/15 bg-white p-5 text-center transition-all duration-300 hover:border-[#B8925A]/40 hover:shadow-[0_20px_40px_-20px_rgba(74,37,64,0.25)]">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF]">
                  <Crown className="h-4 w-4 text-[#B8925A]" />
                </div>
                <div className="font-serif text-sm text-[#2A1520]">
                  Édition limitée
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-[#8B7B7F]">
                  Pièces uniques
                </div>
              </div>
            </div>
          </div>

          {/* ─────────────── Colonne formulaire (3/5) ─────────────── */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="relative overflow-hidden rounded-3xl border border-[#B8925A]/15 bg-white p-7 shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)] md:p-9"
            >
              {/* Décor perle en coin */}
              <div className="pointer-events-none absolute -right-20 -bottom-20 h-48 w-48 rounded-full bg-gradient-to-tl from-[#E8D5D0]/40 to-transparent blur-2xl" />

              <div className="relative">
                {/* En-tête formulaire */}
                <div className="mb-7 flex items-start gap-3">
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF]">
                    <Sparkles className="h-5 w-5 text-[#B8925A]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl leading-tight text-[#2A1520]">
                      Écrivez-nous
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#8B7B7F]">
                      Chaque message est lu personnellement par notre équipe.
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {/* Nom */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-[#5B4A50]"
                    >
                      Nom complet
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Marie K."
                      className="w-full rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 font-serif text-[15px] text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 focus:border-[#B8925A]/60 focus:bg-white focus:shadow-[0_10px_30px_-15px_rgba(184,146,90,0.35)]"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-[#5B4A50]"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="vous@exemple.com"
                      className="w-full rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 font-serif text-[15px] text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 focus:border-[#B8925A]/60 focus:bg-white focus:shadow-[0_10px_30px_-15px_rgba(184,146,90,0.35)]"
                      required
                    />
                  </div>

                  {/* Sujet */}
                  <div>
                    <label
                      htmlFor="contact-subject"
                      className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-[#5B4A50]"
                    >
                      Sujet
                    </label>
                    <input
                      id="contact-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      placeholder="Commande sur-mesure, question, suivi…"
                      className="w-full rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 font-serif text-[15px] text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 focus:border-[#B8925A]/60 focus:bg-white focus:shadow-[0_10px_30px_-15px_rgba(184,146,90,0.35)]"
                      required
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.2em] text-[#5B4A50]"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={5}
                      placeholder="Dites-nous tout…"
                      className="w-full resize-none rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 font-serif text-[15px] text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 focus:border-[#B8925A]/60 focus:bg-white focus:shadow-[0_10px_30px_-15px_rgba(184,146,90,0.35)]"
                      required
                    />
                  </div>

                  {/* Bouton submit */}
                  <button
                    type="submit"
                    disabled={sending}
                    className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#2A1520] px-6 py-4 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {sending ? (
                      <>
                        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#D4B87A]/40 border-t-[#D4B87A]" />
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Envoyer le message
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>

                  {/* Note de confidentialité */}
                  <p className="flex items-center justify-center gap-2 text-center text-[11px] text-[#8B7B7F]">
                    <Heart className="h-3 w-3 text-[#B8925A]" />
                    Vos informations restent strictement confidentielles
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* =========================================================
          BANDEAU BAS — Réassurance
      ========================================================= */}
      <section className="container pb-16 md:pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: Clock,
              title: 'Réponse rapide',
              desc: 'Moins de 15 minutes sur WhatsApp',
            },
            {
              icon: Scissors,
              title: 'Conseil expert',
              desc: 'Une artisane vous guide',
            },
            {
              icon: Gift,
              title: 'Écrin offert',
              desc: 'Emballage signature inclus',
            },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="group flex items-start gap-4 rounded-2xl border border-[#B8925A]/15 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_20px_40px_-20px_rgba(74,37,64,0.2)]"
              >
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A]">
                  <Icon className="h-4 w-4 text-[#B8925A] transition-colors duration-300 group-hover:text-white" />
                </div>
                <div>
                  <div className="font-serif text-[15px] text-[#2A1520]">
                    {item.title}
                  </div>
                  <div className="mt-0.5 text-xs leading-relaxed text-[#8B7B7F]">
                    {item.desc}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}