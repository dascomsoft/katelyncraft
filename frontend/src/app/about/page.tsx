'use client'

export const dynamic = 'force-dynamic'

import { useSettings } from '@/hooks/useSettings'
import {
  Users,
  Award,
  Truck,
  Shield,
  Heart,
  Star,
  Clock,
  ThumbsUp,
  ShoppingBag,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageCircle,
  MapPin,
  PackageCheck,
  Headphones,
  BadgeCheck,
  Quote,
  Gem,
  Crown,
  Gift,
  Scissors,
} from 'lucide-react'
import Link from 'next/link'

/* =========================================================
   SOUS-COMPOSANTS RÉUTILISABLES
========================================================= */

function SectionHeader({
  label,
  title,
  description,
  dark = false,
}: {
  label: string
  title: string
  description?: string
  dark?: boolean
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span
        className={`inline-block text-[10px] font-semibold uppercase tracking-[0.3em] ${
          dark ? 'text-[#D4B87A]' : 'text-[#B8925A]'
        }`}
      >
        {label}
      </span>
      <h2
        className={`mt-3 font-serif text-[1.75rem] leading-tight sm:mt-4 sm:text-3xl md:text-4xl lg:text-[2.75rem] ${
          dark ? 'text-[#FAF6EF]' : 'text-[#2A1520]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mx-auto mt-4 max-w-xl text-[13px] leading-relaxed sm:mt-5 sm:text-sm md:text-[15px] ${
            dark ? 'text-[#C4B5B8]' : 'text-[#5B4A50]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  )
}

function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType
  title: string
  description: string
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-[#D4B87A]/15 bg-white/[0.03] p-5 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4B87A]/40 hover:bg-white/[0.05] sm:p-6 md:p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4B87A]/40 transition-colors duration-300 group-hover:bg-[#D4B87A] sm:h-14 sm:w-14">
        <Icon className="h-5 w-5 text-[#D4B87A] transition-colors duration-300 group-hover:text-[#2A1520] sm:h-6 sm:w-6" />
      </div>
      <h3 className="mt-5 font-serif text-lg text-[#FAF6EF] sm:mt-6 sm:text-xl">
        {title}
      </h3>
      <p className="mt-2.5 text-[13px] leading-relaxed text-[#C4B5B8] sm:mt-3 sm:text-sm">
        {description}
      </p>
      <div className="mt-5 h-px w-12 bg-gradient-to-r from-[#D4B87A] to-transparent transition-all duration-500 group-hover:w-24 sm:mt-6" />
    </div>
  )
}

/* =========================================================
   PAGE PRINCIPALE
========================================================= */

export default function AboutPage() {
  const { settings } = useSettings()

  const businessName = settings?.businessName || 'KATHELYNCRAFT'
  const businessDescription =
    settings?.businessDescription ||
    'Maison de maroquinerie artisanale — sacs de luxe en perles, façonnés à la main.'

  const stats = [
    {
      icon: Heart,
      value: '500+',
      label: 'Clientes conquises',
      description: 'Une communauté qui nous fait confiance',
    },
    {
      icon: Gem,
      value: '1000+',
      label: 'Créations cousues',
      description: 'Chaque pièce assemblée à la main',
    },
    {
      icon: Truck,
      value: '24h',
      label: 'Livraison soignée',
      description: 'Emballage signature et suivi',
    },
    {
      icon: Award,
      value: '100%',
      label: 'Fait main',
      description: 'Perles sélectionnées une à une',
    },
  ]

  const values = [
    {
      icon: Sparkles,
      title: 'Savoir-faire',
      description:
        "Chaque perle est posée à la main, dans notre atelier, avec la précision d'un geste répété mille fois.",
    },
    {
      icon: Gem,
      title: 'Matières nobles',
      description:
        'Perles premium, laiton doré et cuirs fins — sélectionnés pour leur éclat et leur durabilité.',
    },
    {
      icon: Clock,
      title: 'Patience',
      description:
        'Quarante à quatre-vingts heures par création. Le luxe ne se presse jamais.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description:
        'Une obsession tranquille : transformer la perle en objet de désir, porté toute une vie.',
    },
  ]

  const advantages = [
    {
      icon: BadgeCheck,
      title: 'Pièces uniques',
      description:
        "Aucune création n'est dupliquée à l'identique. Chaque pièce porte sa propre signature.",
    },
    {
      icon: PackageCheck,
      title: 'Écrin signature',
      description:
        "Chaque commande part dans un écrin soigné, prêt à offrir ou à s'offrir.",
    },
    {
      icon: MessageCircle,
      title: 'Sur-mesure',
      description:
        'Une couleur, une taille, un motif ? Nous façonnons votre pièce sur demande, à vos mesures.',
    },
  ]

  const timeline = [
    {
      year: '2024',
      title: 'La naissance de KATHELYNCRAFT',
      description:
        "Une table d'atelier, une pince, et un fil. La maison naît d'une envie simple : redonner à la perle ses lettres de noblesse dans la maroquinerie.",
    },
    {
      year: '2025',
      title: 'Les premières signatures',
      description:
        'Nos sacs iconiques — cousus un à un — partent rejoindre des clientes à travers le pays. La maison ouvre son écrin à d\'autres objets précieux.',
    },
    {
      year: 'Aujourd’hui',
      title: 'Une maison, un atelier',
      description:
        'Chaque commande est toujours cousue main. Nous continuons à enrichir nos collections et à affiner chaque détail, sans jamais sacrifiér la lenteur du geste.',
    },
  ]

  const categories = [
    {
      icon: Gem,
      title: 'Sacs signatures',
      description: 'Nos pièces maîtresses en perles cousues main',
    },
    {
      icon: Sparkles,
      title: 'Accessoires précieux',
      description: 'Petits objets, grandes attentions',
    },
    {
      icon: Gift,
      title: 'Coffrets cadeaux',
      description: 'Présentations signées, prêtes à offrir',
    },
    {
      icon: Crown,
      title: 'Éditions limitées',
      description: 'Drops confidentiels, séries numérotées',
    },
  ]

  const testimonials = [
    {
      name: 'Cliente signature',
      text: 'Mon sac est arrivé dans un écrin magnifique. Les perles sont cousues avec une précision rare. Un vrai bijou de maroquinerie.',
      rating: 5,
    },
    {
      name: 'Cliente fidèle',
      text: "J'apprécie la disponibilité, la délicatesse et surtout cette sensation d'avoir une pièce unique entre les mains.",
      rating: 5,
    },
    {
      name: 'Cliente KATHELYNCRAFT',
      text: 'Une maison exigeante, des finitions dignes de la haute maroquinerie, et un accompagnement personnalisé du début à la fin.',
      rating: 5,
    },
  ]

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#FDFBF7] text-[#2A1520]">
      {/* =========================================================
          HERO — Éditorial atelier
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#FAF6EF]">
        {/* Motif perles décoratif */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-[280px] w-[280px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl sm:-top-40 sm:-right-40 sm:h-[500px] sm:w-[500px]" />
          <div className="absolute -bottom-24 -left-24 h-[260px] w-[260px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl sm:-bottom-40 sm:-left-40 sm:h-[420px] sm:w-[420px]" />
          <div className="absolute top-1/2 left-1/3 h-[200px] w-[200px] rounded-full bg-gradient-to-bl from-[#4A2540]/10 via-transparent to-transparent blur-3xl sm:h-[300px] sm:w-[300px]" />
        </div>

        <div className="container relative py-12 sm:py-16 md:py-24 lg:py-28">
          <div className="max-w-3xl">
            {/* Eyebrow doré */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-3.5 py-1.5 backdrop-blur-sm sm:mb-6 sm:px-4">
              <Gem className="h-3 w-3 text-[#B8925A] sm:h-3.5 sm:w-3.5" />
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-[#4A2540] sm:tracking-[0.28em]">
                Atelier · Pièces cousues main
              </span>
            </div>

            <h1 className="break-words font-serif text-[1.75rem] leading-[1.08] tracking-tight text-[#2A1520] sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-[4rem]">
              Bienvenue dans la maison{' '}
              <span className="italic text-[#B8925A]">{businessName}</span>
            </h1>

            <p className="mt-5 max-w-2xl text-[14px] leading-relaxed text-[#5B4A50] sm:mt-7 sm:text-base md:text-lg">
              {businessDescription}
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2A1520] px-6 py-3.5 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] sm:px-7"
              >
                Découvrir la collection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2A1520]/20 bg-transparent px-6 py-3.5 text-sm font-medium text-[#2A1520] transition-all duration-300 hover:border-[#B8925A] hover:bg-white/60 sm:px-7"
              >
                <MessageCircle className="h-4 w-4" />
                Nous contacter
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2.5 border-t border-[#B8925A]/15 pt-5 text-[11px] text-[#5B4A50] sm:mt-12 sm:gap-x-8 sm:gap-y-3 sm:pt-6 sm:text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#B8925A] sm:h-4 sm:w-4" />
                Perles cousues main
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#B8925A] sm:h-4 sm:w-4" />
                Livraison soignée
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#B8925A] sm:h-4 sm:w-4" />
                Sur-mesure sur demande
              </div>
            </div>
          </div>
        </div>

        {/* Liseré doré inférieur */}
        <div className="container relative">
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />
        </div>
      </section>

      {/* =========================================================
          STATS — Chiffres signature
      ========================================================= */}
      <section className="relative z-10 -mt-6 px-4 sm:-mt-8">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-[#B8925A]/20 bg-white shadow-[0_30px_80px_-30px_rgba(74,37,64,0.25)] sm:rounded-3xl">
          <div className="grid grid-cols-2 divide-x divide-y divide-[#B8925A]/15 md:grid-cols-4 md:divide-y-0">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="group p-4 text-center transition-all duration-300 hover:bg-[#FAF6EF]/60 sm:p-5 md:p-7"
                >
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A] sm:mb-4 sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 text-[#B8925A] transition-colors duration-300 group-hover:text-white sm:h-6 sm:w-6" />
                  </div>
                  <div className="font-serif text-xl font-semibold text-[#2A1520] sm:text-2xl md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[12px] font-medium text-[#4A2540] sm:text-sm">
                    {stat.label}
                  </div>
                  <p className="mt-2 hidden text-xs leading-5 text-[#8B7B7F] md:block">
                    {stat.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          NOTRE HISTOIRE
      ========================================================= */}
      <section className="container py-14 sm:py-20 md:py-28">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Visuel éditorial */}
          <div className="relative">
            {/* Décor perles */}
            <div className="absolute -left-3 -top-3 h-16 w-16 rounded-full bg-gradient-to-br from-[#E8D5D0] to-[#FAF6EF] sm:-left-5 sm:-top-5 sm:h-24 sm:w-24" />
            <div className="absolute -right-3 -bottom-3 h-14 w-14 rounded-full border border-[#B8925A]/30 sm:-right-4 sm:-bottom-4 sm:h-20 sm:w-20" />

            <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] p-6 shadow-[0_30px_80px_-30px_rgba(74,37,64,0.4)] sm:rounded-[2rem] sm:p-8 md:p-12">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#D4B87A]/15 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#E8D5D0]/10 blur-3xl" />

              <div className="relative">
                <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#FAF6EF]/5 backdrop-blur-sm sm:mb-10 sm:h-20 sm:w-20">
                  <Scissors className="h-6 w-6 text-[#D4B87A] sm:h-8 sm:w-8" />
                </div>

                <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#D4B87A] sm:tracking-[0.3em]">
                  Depuis 2024
                </div>
                <h2 className="mt-3 break-words font-serif text-[1.6rem] leading-tight text-[#FAF6EF] sm:mt-4 sm:text-3xl md:text-4xl">
                  Faire de chaque perle un{' '}
                  <span className="italic text-[#D4B87A]">
                    objet de désir.
                  </span>
                </h2>
                <p className="mt-4 text-[13px] leading-relaxed text-[#C4B5B8] sm:mt-5 sm:text-sm">
                  Une vision artisanale, une exigence de maison de couture,
                  et la conviction que le vrai luxe est celui qui prend le
                  temps du geste juste.
                </p>

                <div className="mt-7 flex items-center gap-3 text-[13px] font-medium text-[#FAF6EF] sm:mt-8 sm:text-sm">
                  <MapPin className="h-4 w-4 text-[#D4B87A]" />
                  Yaoundé, Cameroun
                </div>

                <div className="divider-gold mt-7 sm:mt-8" />

                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] text-[#A89298] sm:mt-6 sm:gap-6 sm:text-xs">
                  <div className="flex items-center gap-1.5">
                    <Gem className="h-3.5 w-3.5 text-[#D4B87A]" />
                    Perles premium
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Crown className="h-3.5 w-3.5 text-[#D4B87A]" />
                    Édition limitée
                  </div>
                </div>
              </div>
            </div>

            {/* Carte flottante engagement */}
            <div className="absolute -bottom-4 -right-2 rounded-2xl border border-[#B8925A]/20 bg-[#FDFBF7] p-4 shadow-[0_20px_50px_-20px_rgba(42,21,32,0.3)] sm:-bottom-6 sm:-right-4 sm:p-5 md:right-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#FAF6EF] sm:h-11 sm:w-11">
                  <CheckCircle2 className="h-4 w-4 text-[#B8925A] sm:h-5 sm:w-5" />
                </div>
                <div className="min-w-0">
                  <p className="font-serif text-[13px] font-semibold text-[#2A1520] sm:text-sm">
                    Notre engagement
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F] sm:text-[11px]">
                    Fait main, toujours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu éditorial */}
          <div>
            <span className="eyebrow">Notre maison</span>
            <h2 className="mt-3 break-words font-serif text-[1.6rem] leading-tight tracking-tight text-[#2A1520] sm:mt-4 sm:text-3xl md:text-4xl">
              Une marque de maroquinerie née d&apos;une{' '}
              <span className="italic text-[#B8925A]">obsession.</span>
            </h2>

            <div className="mt-6 space-y-4 text-[14px] leading-relaxed text-[#5B4A50] sm:mt-7 sm:space-y-5 sm:text-[15px]">
              <p>
                <strong className="font-serif text-[#2A1520]">
                  {businessName}
                </strong>{' '}
                est née en 2024 d&apos;une envie claire : redonner à la perle
                ses lettres de noblesse dans la maroquinerie de luxe.
              </p>
              <p>
                Notre objectif est simple : créer des sacs qui traversent
                le temps — cousus à la main, pensés dans les moindres détails,
                portés comme des bijoux.
              </p>
              <p>
                Installés à Yaoundé, nous façonnons chaque pièce dans notre
                atelier. Au-delà des sacs signatures, la maison ouvre son
                écrin à une sélection d&apos;accessoires précieux et de
                coffrets cadeaux, choisis avec la même exigence.
              </p>
            </div>

            <div className="mt-7 flex items-center gap-3.5 rounded-2xl border border-[#B8925A]/20 bg-[#FAF6EF] p-4 sm:mt-8 sm:gap-4 sm:p-5">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#2A1520] sm:h-12 sm:w-12">
                <Shield className="h-4 w-4 text-[#D4B87A] sm:h-5 sm:w-5" />
              </div>
              <div className="min-w-0">
                <p className="font-serif text-[14px] font-semibold text-[#2A1520] sm:text-[15px]">
                  Une relation basée sur la confiance
                </p>
                <p className="mt-1 text-[12px] text-[#5B4A50] sm:text-sm">
                  Nous construisons des relations durables, pièce après pièce.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          POURQUOI NOUS CHOISIR — Section prune
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#2A1520] py-14 sm:py-20 md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
          <div className="absolute top-10 left-10 h-72 w-72 rounded-full bg-[#D4B87A] blur-3xl" />
          <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-[#E8D5D0] blur-3xl" />
        </div>

        <div className="container relative">
          <SectionHeader
            label="Pourquoi nous choisir"
            title="Plus qu'un atelier, une signature."
            description="Chaque détail compte lorsqu'il s'agit d'une pièce que vous porterez toute une vie."
            dark
          />
          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
            {advantages.map((item, index) => (
              <FeatureCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          UNIVERS / CATEGORIES
      ========================================================= */}
      <section className="container py-14 sm:py-20 md:py-24">
        <div className="flex flex-col justify-between gap-4 sm:gap-5 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Notre univers</span>
            <h2 className="mt-3 break-words font-serif text-[1.6rem] leading-tight text-[#2A1520] sm:mt-4 sm:text-3xl md:text-4xl">
              Tout ce que la maison{' '}
              <span className="italic">façonne pour vous.</span>
            </h2>
            <p className="mt-3 max-w-xl text-[13px] leading-relaxed text-[#5B4A50] sm:mt-4 sm:text-sm md:text-[15px]">
              Des sacs signatures aux éditions confidentielles — explorez
              les univers de KATHELYNCRAFT.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-[#4A2540] transition-colors hover:text-[#B8925A] md:self-end"
          >
            Voir toute la collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Link
                href="/products"
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.3)] sm:p-6 md:p-7"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-[#E8D5D0]/40 to-transparent transition-transform duration-700 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A] sm:h-11 sm:w-11">
                    <Icon className="h-4.5 w-4.5 text-[#B8925A] transition-colors duration-300 group-hover:text-white sm:h-5 sm:w-5" />
                  </div>
                  <h3 className="mt-5 font-serif text-[16px] font-medium text-[#2A1520] sm:mt-6 sm:text-lg">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-6 text-[#5B4A50] sm:text-sm">
                    {category.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em] text-[#B8925A] sm:mt-5 sm:text-xs">
                    Découvrir
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* =========================================================
          NOS VALEURS
      ========================================================= */}
      <section className="bg-[#FAF6EF] py-14 sm:py-20 md:py-24">
        <div className="container">
          <SectionHeader
            label="Ce qui nous définit"
            title="Les valeurs de la maison"
            description="Les principes qui guident chaque geste, chaque point, chaque perle."
          />
          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-5 transition-all duration-500 hover:-translate-y-2 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.25)] sm:p-6 md:p-7"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A] sm:h-14 sm:w-14">
                    <Icon className="h-5 w-5 text-[#B8925A] transition-colors duration-300 group-hover:text-white sm:h-6 sm:w-6" />
                  </div>
                  <h3 className="mt-5 font-serif text-lg text-[#2A1520] sm:mt-6 sm:text-xl">
                    {value.title}
                  </h3>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-[#5B4A50] sm:mt-3 sm:text-sm">
                    {value.description}
                  </p>
                  <div className="mt-5 h-px w-10 bg-[#B8925A]/40 transition-all duration-500 group-hover:w-20 sm:mt-6" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          TIMELINE
      ========================================================= */}
      <section className="container py-14 sm:py-20 md:py-24">
        <SectionHeader
          label="Notre évolution"
          title="Une histoire cousue main."
        />
        <div className="mx-auto mt-10 max-w-4xl sm:mt-16">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="relative flex gap-4 pb-10 last:pb-0 sm:gap-6 sm:pb-12"
            >
              {index !== timeline.length - 1 && (
                <div className="absolute left-5 top-12 h-full w-px bg-gradient-to-b from-[#B8925A]/50 via-[#B8925A]/20 to-transparent sm:left-6 sm:top-14" />
              )}
              <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF] font-serif text-xs font-semibold text-[#B8925A] sm:h-12 sm:w-12 sm:text-sm">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="min-w-0 pt-0.5 sm:pt-1">
                <span className="font-serif text-[13px] italic text-[#B8925A] sm:text-sm">
                  {item.year}
                </span>
                <h3 className="mt-1 break-words font-serif text-[16px] text-[#2A1520] sm:text-xl">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-[#5B4A50] sm:text-sm md:text-[15px]">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
          AVIS CLIENTS
      ========================================================= */}
      <section className="bg-[#2A1520] py-14 text-[#FAF6EF] sm:py-20 md:py-24">
        <div className="container">
          <SectionHeader
            label="Elles nous font confiance"
            title="L'expérience de nos clientes."
            dark
          />
          <div className="mt-10 grid gap-4 sm:mt-14 sm:gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-[#D4B87A]/15 bg-white/[0.03] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#D4B87A]/40 hover:bg-white/[0.06] sm:p-6 md:p-7"
              >
                {/* Guillemet décoratif */}
                <Quote className="h-7 w-7 text-[#D4B87A]/40 sm:h-8 sm:w-8" />

                <div className="mt-4 flex gap-1 sm:mt-5">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-3.5 w-3.5 fill-[#D4B87A] text-[#D4B87A] sm:h-4 sm:w-4"
                      />
                    )
                  )}
                </div>

                <p className="mt-4 font-serif text-[14px] italic leading-relaxed text-[#D9CDCF] sm:mt-5 sm:text-[15px]">
                  « {testimonial.text} »
                </p>

                <div className="mt-5 flex items-center gap-3 border-t border-[#D4B87A]/15 pt-4 sm:mt-6 sm:pt-5">
                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-[#D4B87A]/30 bg-[#D4B87A]/10 sm:h-10 sm:w-10">
                    <Crown className="h-3.5 w-3.5 text-[#D4B87A] sm:h-4 sm:w-4" />
                  </div>
                  <span className="min-w-0 font-serif text-[13px] text-[#FAF6EF] sm:text-sm">
                    {testimonial.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="container py-14 sm:py-20 md:py-28">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] px-5 py-12 text-center text-[#FAF6EF] sm:rounded-[2rem] sm:px-6 sm:py-16 md:px-12 md:py-20">
          {/* Perles lumineuses */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4B87A]/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#E8D5D0]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10 backdrop-blur-sm sm:h-16 sm:w-16">
              <Gem className="h-6 w-6 text-[#D4B87A] sm:h-7 sm:w-7" />
            </div>

            <h2 className="mt-6 break-words font-serif text-[1.6rem] leading-tight text-[#FAF6EF] sm:mt-7 sm:text-3xl md:text-5xl">
              Prête à trouver votre{' '}
              <span className="italic text-[#D4B87A]">
                pièce signature ?
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-[13px] leading-relaxed text-[#C4B5B8] sm:mt-5 sm:text-sm md:text-[15px]">
              Parcourez la collection et laissez-vous porter par une pièce
              cousue pour vous, à la main, dans notre atelier.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:mt-9 sm:flex-row">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D4B87A] px-7 py-3.5 text-sm font-semibold text-[#2A1520] transition-all duration-300 hover:bg-[#E8D5D0] hover:shadow-[0_20px_50px_-15px_rgba(212,184,122,0.5)] sm:px-8 sm:py-4"
              >
                Explorer la collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4B87A]/30 bg-white/[0.06] px-7 py-3.5 text-sm font-medium text-[#FAF6EF] backdrop-blur-sm transition-all duration-300 hover:border-[#D4B87A]/60 hover:bg-white/[0.1] sm:px-8 sm:py-4"
              >
                <MessageCircle className="h-4 w-4" />
                Besoin d&apos;un conseil ?
              </Link>
            </div>

            <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-[#A89298] sm:mt-6 sm:text-[11px] sm:tracking-[0.28em]">
              Réponse sous 15 minutes · Sur WhatsApp
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}