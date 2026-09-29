'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Store,
  Send,
  MessageCircle,
  ChevronRight,
  Home,
  CheckCircle,
  Sparkles,
  Users,
  TrendingUp,
  Shield,
  Phone,
  User,
  MapPin,
  Package,
  AlertCircle,
  Gem,
  Crown,
  Gift,
  Scissors,
  ArrowRight,
} from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'
import toast from 'react-hot-toast'

export default function DevenirVendeurPage() {
  const { settings } = useSettings()
  const [formData, setFormData] = useState({
    ownerName: '',
    shopName: '',
    sector: '',
    phone: '',
    city: '',
    description: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const sectors = [
    'Cosmétiques',
    'Shopping',
    'Lingerie',
    'Bijoux',
    'Électroménagers',
    'Mode Homme',
    'Mode Femme',
    'Chaussures',
    'Électronique',
    'Maison',
    'Alimentation',
    'Autres',
  ]

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.ownerName || formData.ownerName.length < 2) {
      newErrors.ownerName = 'Votre nom est requis'
    }
    if (!formData.shopName || formData.shopName.length < 2) {
      newErrors.shopName = 'Le nom de la boutique est requis'
    }
    if (!formData.sector) {
      newErrors.sector = 'Veuillez choisir un secteur'
    }
    if (!formData.phone || formData.phone.length < 9) {
      newErrors.phone = 'Numéro de téléphone invalide'
    }
    if (!formData.description || formData.description.length < 20) {
      newErrors.description = 'Décrivez votre activité (20 caractères minimum)'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      toast.error('Veuillez corriger les erreurs')
      return
    }

    // Construire le message WhatsApp
    const message = `Bonjour GLA GLA Business, 👋

Je souhaite devenir vendeur sur votre plateforme.

📋 *INFORMATIONS*
━━━━━━━━━━━━━━━━━━━━
👤 *Nom :* ${formData.ownerName}
🏪 *Boutique :* ${formData.shopName}
📂 *Secteur :* ${formData.sector}
📱 *Téléphone :* ${formData.phone}
📍 *Ville :* ${formData.city || 'Non précisée'}

📝 *Description de mon activité :*
${formData.description}
━━━━━━━━━━━━━━━━━━━━

Merci de me recontacter pour la suite. 🙏`

    const encodedMessage = encodeURIComponent(message)
    const whatsappNumber = settings?.whatsappNumber || '237682214958'
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Ouvrir WhatsApp
    window.open(whatsappUrl, '_blank')

    toast.success('Ouverture de WhatsApp...')
  }

  /* Helper classes cohérentes KATHELYNCRAFT */
  const inputBaseClass =
    'w-full rounded-xl border bg-[#FDFBF7] px-4 py-3.5 font-serif text-[15px] text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15'
  const errorClass = 'border-[#B8925A]/60 bg-[#E8D5D0]/20'
  const normalClass = 'border-[#B8925A]/20'

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#FDFBF7] text-[#2A1520]">
      {/* ═══════════════════════════════════════
          HERO — Éditorial atelier
      ═══════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#FAF6EF]">
        {/* Motif perles décoratif */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-[280px] w-[280px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl sm:-top-40 sm:-right-40 sm:h-[500px] sm:w-[500px]" />
          <div className="absolute -bottom-24 -left-24 h-[260px] w-[260px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl sm:-bottom-40 sm:-left-40 sm:h-[420px] sm:w-[420px]" />
          <div className="absolute top-1/2 left-1/3 h-[200px] w-[200px] rounded-full bg-gradient-to-bl from-[#4A2540]/10 via-transparent to-transparent blur-3xl sm:h-[300px] sm:w-[300px]" />
        </div>

        <div className="container relative px-4 py-12 sm:py-16 md:py-20">
          {/* Fil d'Ariane */}
          <nav className="mb-5 flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#8B7B7F] md:text-xs">
            <Link
              href="/"
              className="flex items-center gap-1.5 transition-colors hover:text-[#B8925A]"
            >
              <Home className="h-3 w-3" />
              Accueil
            </Link>
            <ChevronRight className="h-3 w-3 text-[#B8925A]/50" />
            <span className="font-semibold text-[#B8925A]">
              Devenir vendeur
            </span>
          </nav>

          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-3.5 py-1.5 backdrop-blur-sm sm:mb-6 sm:px-4">
              <Sparkles className="h-3 w-3 text-[#B8925A] sm:h-3.5 sm:w-3.5" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#4A2540] sm:tracking-[0.28em]">
                Rejoignez la marketplace
              </span>
            </div>

            <h1 className="break-words font-serif text-[1.75rem] leading-[1.08] tracking-tight text-[#2A1520] sm:text-5xl sm:leading-[1.05] md:text-6xl">
              Vendez sur{' '}
              <span className="italic text-[#B8925A]">
                KATELYNCRAFT
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[14px] leading-relaxed text-[#5B4A50] sm:mt-6 sm:text-base md:text-lg">
              Rejoignez notre marketplace et exposez vos produits à des
              milliers de clients au Cameroun. Inscription gratuite pendant
              3 mois.
            </p>
          </div>
        </div>

        {/* Liseré doré inférieur */}
        <div className="container relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          AVANTAGES — 3 piliers
      ═══════════════════════════════════════ */}
      <section className="container relative z-10 -mt-5 px-4 sm:-mt-8">
        <div className="grid grid-cols-1 gap-4 rounded-2xl border border-[#B8925A]/15 bg-white p-5 shadow-[0_30px_80px_-30px_rgba(74,37,64,0.25)] sm:p-6 md:grid-cols-3 md:gap-6 md:rounded-3xl">
          {[
            {
              icon: Users,
              title: 'Plus de clients',
              desc: 'Accédez à notre base de clients',
            },
            {
              icon: TrendingUp,
              title: 'Vendez plus',
              desc: 'Augmentez vos ventes en ligne',
            },
            {
              icon: Shield,
              title: 'Zéro frais fixes',
              desc: '3 mois gratuits, sans engagement',
            },
          ].map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="flex items-start gap-3.5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF]">
                  <Icon className="h-4.5 w-4.5 text-[#B8925A] sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-serif text-[15px] font-medium text-[#2A1520] sm:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-[12px] leading-relaxed text-[#5B4A50] sm:text-[13px]">
                    {item.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FORMULAIRE
      ═══════════════════════════════════════ */}
      <section className="container px-4 py-10 sm:py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          {/* En-tête de section */}
          <div className="mb-8 text-center sm:mb-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-3.5 py-1.5 backdrop-blur-sm sm:px-4">
              <Crown className="h-3 w-3 text-[#B8925A] sm:h-3.5 sm:w-3.5" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#4A2540] sm:tracking-[0.28em]">
                Candidature vendeur
              </span>
            </div>
            <h2 className="break-words font-serif text-[1.6rem] leading-tight text-[#2A1520] sm:text-3xl md:text-4xl">
              Inscrivez votre{' '}
              <span className="italic text-[#B8925A]">boutique</span>
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-[13px] leading-relaxed text-[#5B4A50] sm:mt-4 sm:text-sm">
              Remplissez le formulaire et nous vous recontactons sur
              WhatsApp dans les 48h.
            </p>
          </div>

          {/* Bandeau info WhatsApp */}
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-[#B8925A]/25 bg-[#FAF6EF] p-4 sm:p-5">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/40 bg-white">
              <MessageCircle className="h-4 w-4 text-[#B8925A]" />
            </div>
            <div className="min-w-0">
              <p className="font-serif text-[14px] font-medium text-[#2A1520] sm:text-[15px]">
                Envoi par WhatsApp
              </p>
              <p className="mt-0.5 text-[12px] leading-relaxed text-[#5B4A50] sm:text-[13px]">
                Après avoir rempli le formulaire, cela va vous renvoyer sur
                WhatsApp avec votre demande. Il vous suffira de cliquer sur
                Envoyer.
              </p>
            </div>
          </div>

          {/* Formulaire */}
          <form
            onSubmit={handleSubmit}
            className="relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-5 shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)] sm:p-6 md:p-8"
          >
            {/* Liseré doré supérieur */}
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

            {/* Décor perles */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4B87A]/10 blur-2xl" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#E8D5D0]/20 blur-2xl" />
            </div>

            <div className="relative space-y-5 sm:space-y-6">
              {/* Nom propriétaire */}
              <div>
                <label
                  htmlFor="ownerName"
                  className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
                >
                  <User className="h-3 w-3 text-[#B8925A]" />
                  Votre nom complet{' '}
                  <span className="text-[#B8925A]">*</span>
                </label>
                <input
                  id="ownerName"
                  type="text"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="Ex : Marie Ngo"
                  className={`${inputBaseClass} ${
                    errors.ownerName ? errorClass : normalClass
                  }`}
                />
                {errors.ownerName && (
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#B8925A]">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                    {errors.ownerName}
                  </p>
                )}
              </div>

              {/* Nom boutique */}
              <div>
                <label
                  htmlFor="shopName"
                  className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
                >
                  <Store className="h-3 w-3 text-[#B8925A]" />
                  Nom de votre boutique{' '}
                  <span className="text-[#B8925A]">*</span>
                </label>
                <input
                  id="shopName"
                  type="text"
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                  placeholder="Ex : Beauty Boutique"
                  className={`${inputBaseClass} ${
                    errors.shopName ? errorClass : normalClass
                  }`}
                />
                {errors.shopName && (
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#B8925A]">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                    {errors.shopName}
                  </p>
                )}
              </div>

              {/* Secteur */}
              <div>
                <label
                  htmlFor="sector"
                  className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
                >
                  <Package className="h-3 w-3 text-[#B8925A]" />
                  Secteur de ventes{' '}
                  <span className="text-[#B8925A]">*</span>
                </label>
                <div className="relative">
                  <select
                    id="sector"
                    name="sector"
                    value={formData.sector}
                    onChange={handleChange}
                    className={`${inputBaseClass} cursor-pointer appearance-none pr-10 ${
                      errors.sector ? errorClass : normalClass
                    }`}
                  >
                    <option value="">— Choisir un secteur —</option>
                    {sectors.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <ChevronRight className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 rotate-90 text-[#B8925A]" />
                </div>
                {errors.sector && (
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#B8925A]">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                    {errors.sector}
                  </p>
                )}
              </div>

              {/* Téléphone + Ville */}
              <div className="grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
                  >
                    <Phone className="h-3 w-3 text-[#B8925A]" />
                    Téléphone WhatsApp{' '}
                    <span className="text-[#B8925A]">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="237 6XX XXX XXX"
                    className={`${inputBaseClass} tabular-nums ${
                      errors.phone ? errorClass : normalClass
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#B8925A]">
                      <AlertCircle className="h-3 w-3 flex-shrink-0" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
                  >
                    <MapPin className="h-3 w-3 text-[#B8925A]" />
                    Ville
                  </label>
                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Ex : Yaoundé"
                    className={`${inputBaseClass} ${normalClass}`}
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
                >
                  <Sparkles className="h-3 w-3 text-[#B8925A]" />
                  Décrivez votre activité{' '}
                  <span className="text-[#B8925A]">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Ex : Je vends des cosmétiques naturels bio, des huiles essentielles et des soins pour la peau. J'ai environ 30 produits en stock..."
                  className={`${inputBaseClass} resize-none leading-relaxed ${
                    errors.description ? errorClass : normalClass
                  }`}
                />
                {errors.description && (
                  <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-[#B8925A]">
                    <AlertCircle className="h-3 w-3 flex-shrink-0" />
                    {errors.description}
                  </p>
                )}
                <p className="mt-1.5 text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                  {formData.description.length}/20 caractères minimum
                </p>
              </div>

              {/* Bouton submit */}
              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-2 rounded-full bg-[#2A1520] px-6 py-4 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] sm:py-3.5"
              >
                <MessageCircle className="h-4 w-4" />
                Envoyer ma demande via WhatsApp
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="text-center text-[11px] leading-relaxed text-[#8B7B7F] sm:text-xs">
                En cliquant, cela va vous renvoyer sur WhatsApp avec votre
                demande prête à envoyer.
              </p>
            </div>
          </form>

          {/* ═══════════════════════════════════════
              ÉTAPES APRÈS ENVOI
          ═══════════════════════════════════════ */}
          <div className="mt-12 sm:mt-14">
            <div className="mb-6 text-center sm:mb-8">
              <span className="mb-3 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-[#B8925A]">
                Le processus
              </span>
              <h3 className="font-serif text-[1.4rem] leading-tight text-[#2A1520] sm:text-2xl md:text-3xl">
                Que se passe-t-il{' '}
                <span className="italic text-[#B8925A]">ensuite ?</span>
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
              {[
                {
                  step: '1',
                  title: 'Envoi WhatsApp',
                  desc: 'Votre demande part sur notre WhatsApp',
                  icon: Send,
                },
                {
                  step: '2',
                  title: 'Vérification',
                  desc: 'Nous examinons votre dossier sous 48h',
                  icon: CheckCircle,
                },
                {
                  step: '3',
                  title: 'Activation',
                  desc: 'Votre boutique est en ligne !',
                  icon: Store,
                },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <div
                    key={i}
                    className="group relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-5 text-center transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.25)] sm:p-6"
                  >
                    {/* Numéro d'étape en filigrane */}
                    <div className="pointer-events-none absolute -right-2 -top-4 font-serif text-[5rem] leading-none text-[#B8925A]/8 sm:text-[6rem]">
                      {item.step}
                    </div>

                    <div className="relative">
                      {/* Icône */}
                      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A] sm:h-14 sm:w-14">
                        <Icon className="h-5 w-5 text-[#B8925A] transition-colors duration-300 group-hover:text-white sm:h-6 sm:w-6" />
                      </div>

                      {/* Label étape */}
                      <div className="mb-2 inline-flex items-center gap-1 rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#B8925A]">
                        <Gem className="h-2.5 w-2.5" />
                        Étape {item.step}
                      </div>

                      {/* Titre + description */}
                      <h4 className="font-serif text-[15px] text-[#2A1520] sm:text-base">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-[12px] leading-relaxed text-[#5B4A50] sm:text-[13px]">
                        {item.desc}
                      </p>
                    </div>

                    {/* Liseré doré au survol */}
                    <div className="absolute inset-x-6 bottom-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#B8925A] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CTA BAS DE PAGE
      ═══════════════════════════════════════ */}
      <section className="container px-4 pb-14 sm:pb-16 md:pb-20">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] px-5 py-12 text-center text-[#FAF6EF] sm:rounded-[2rem] sm:px-6 sm:py-16 md:px-12 md:py-20">
          {/* Perles lumineuses */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4B87A]/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#E8D5D0]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            {/* Icône */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10 backdrop-blur-sm sm:h-16 sm:w-16">
              <MessageCircle className="h-6 w-6 text-[#D4B87A] sm:h-7 sm:w-7" />
            </div>

            {/* Titre */}
            <h2 className="mt-6 break-words font-serif text-[1.6rem] leading-tight text-[#FAF6EF] sm:mt-7 sm:text-3xl md:text-4xl">
              Une question avant de vous{' '}
              <span className="italic text-[#D4B87A]">lancer ?</span>
            </h2>

            {/* Description */}
            <p className="mx-auto mt-4 max-w-xl text-[13px] leading-relaxed text-[#C4B5B8] sm:mt-5 sm:text-sm md:text-[15px]">
              Notre équipe est disponible pour répondre à toutes vos
              questions.
            </p>

            {/* CTA */}
            <a
              href={`https://wa.me/${
                settings?.whatsappNumber || '237600000000'
              }?text=${encodeURIComponent(
                "Bonjour, j'ai une question sur le programme vendeur GLA GLA Business."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-[#D4B87A] px-7 py-3.5 text-sm font-semibold text-[#2A1520] transition-all duration-300 hover:bg-[#E8D5D0] hover:shadow-[0_20px_50px_-15px_rgba(212,184,122,0.5)] sm:mt-8 sm:px-8 sm:py-4"
            >
              <MessageCircle className="h-4 w-4" />
              Discuter avec nous
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            {/* Signature bas CTA */}
            <p className="mt-5 flex items-center justify-center gap-2 text-[10px] uppercase tracking-[0.22em] text-[#A89298] sm:mt-6 sm:text-[11px] sm:tracking-[0.28em]">
              <Gift className="h-3 w-3 text-[#D4B87A]" />
              Réponse sous 15 min · Sur WhatsApp
              <Scissors className="h-3 w-3 text-[#D4B87A]" />
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}