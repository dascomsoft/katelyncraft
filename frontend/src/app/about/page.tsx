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
  Scissors
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
        className={`mt-4 font-serif text-3xl leading-tight md:text-4xl lg:text-[2.75rem] ${
          dark ? 'text-[#FAF6EF]' : 'text-[#2A1520]'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mx-auto mt-5 max-w-xl text-sm leading-relaxed md:text-[15px] ${
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
    <div className="group relative overflow-hidden rounded-2xl border border-[#D4B87A]/15 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4B87A]/40 hover:bg-white/[0.05]">
      <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D4B87A]/40 transition-colors duration-300 group-hover:bg-[#D4B87A]">
        <Icon className="h-6 w-6 text-[#D4B87A] transition-colors duration-300 group-hover:text-[#2A1520]" />
      </div>
      <h3 className="mt-6 font-serif text-xl text-[#FAF6EF]">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-[#C4B5B8]">
        {description}
      </p>
      <div className="mt-6 h-px w-12 bg-gradient-to-r from-[#D4B87A] to-transparent transition-all duration-500 group-hover:w-24" />
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
        'Chaque perle est posée à la main, dans notre atelier, avec la précision d\'un geste répété mille fois.',
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
        'Aucune création n\'est dupliquée à l\'identique. Chaque pièce porte sa propre signature.',
    },
    {
      icon: PackageCheck,
      title: 'Écrin signature',
      description:
        'Chaque commande part dans un écrin soigné, prêt à offrir ou à s\'offrir.',
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
        'Une table d\'atelier, une pince, et un fil. La maison naît d\'une envie simple : redonner à la perle ses lettres de noblesse dans la maroquinerie.',
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
      text: 'J\'apprécie la disponibilité, la délicatesse et surtout cette sensation d\'avoir une pièce unique entre les mains.',
      rating: 5,
    },
    {
      name: 'Cliente KATHELYNCRAFT',
      text: 'Une maison exigeante, des finitions dignes de la haute maroquinerie, et un accompagnement personnalisé du début à la fin.',
      rating: 5,
    },
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#FDFBF7] text-[#2A1520]">

      {/* =========================================================
          HERO — Éditorial atelier
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#FAF6EF]">
        {/* Motif perles décoratif */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-transparent opacity-70 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-[300px] w-[300px] rounded-full bg-gradient-to-bl from-[#4A2540]/10 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="container relative py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            {/* Eyebrow doré */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-4 py-1.5 backdrop-blur-sm">
              <Gem className="h-3.5 w-3.5 text-[#B8925A]" />
              <span className="text-[10px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
                Atelier · Pièces cousues main
              </span>
            </div>

            <h1 className="font-serif text-[2.6rem] leading-[1.05] tracking-tight text-[#2A1520] sm:text-5xl md:text-6xl lg:text-[4rem]">
              Bienvenue dans la maison{' '}
              <span className="italic text-[#B8925A]">{businessName}</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-relaxed text-[#5B4A50] md:text-lg">
              {businessDescription}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#2A1520] px-7 py-3.5 text-sm font-semibold text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)]"
              >
                Découvrir la collection
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#2A1520]/20 bg-transparent px-7 py-3.5 text-sm font-medium text-[#2A1520] transition-all duration-300 hover:border-[#B8925A] hover:bg-white/60"
              >
                <MessageCircle className="h-4 w-4" />
                Nous contacter
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-[#B8925A]/15 pt-6 text-xs text-[#5B4A50]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#B8925A]" />
                Perles cousues main
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#B8925A]" />
                Livraison soignée
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#B8925A]" />
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
      <section className="relative z-10 -mt-8 px-4">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#B8925A]/20 bg-white shadow-[0_30px_80px_-30px_rgba(74,37,64,0.25)]">
          <div className="grid grid-cols-2 divide-x divide-y divide-[#B8925A]/15 md:grid-cols-4 md:divide-y-0">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div
                  key={index}
                  className="group p-5 text-center transition-all duration-300 hover:bg-[#FAF6EF]/60 md:p-7"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A]">
                    <Icon className="h-6 w-6 text-[#B8925A] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <div className="font-serif text-2xl font-semibold text-[#2A1520] md:text-3xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-sm font-medium text-[#4A2540]">
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
      <section className="container py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Visuel éditorial */}
          <div className="relative">
            {/* Décor perles */}
            <div className="absolute -left-5 -top-5 h-24 w-24 rounded-full bg-gradient-to-br from-[#E8D5D0] to-[#FAF6EF]" />
            <div className="absolute -right-4 -bottom-4 h-20 w-20 rounded-full border border-[#B8925A]/30" />

            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] p-8 shadow-[0_30px_80px_-30px_rgba(74,37,64,0.4)] md:p-12">
              <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#D4B87A]/15 blur-3xl" />
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[#E8D5D0]/10 blur-3xl" />

              <div className="relative">
                <div className="mb-10 flex h-20 w-20 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#FAF6EF]/5 backdrop-blur-sm">
                  <Scissors className="h-8 w-8 text-[#D4B87A]" />
                </div>

                <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#D4B87A]">
                  Depuis 2024
                </div>
                <h2 className="mt-4 font-serif text-3xl leading-tight text-[#FAF6EF] md:text-4xl">
                  Faire de chaque perle un{' '}
                  <span className="italic text-[#D4B87A]">objet de désir.</span>
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-[#C4B5B8]">
                  Une vision artisanale, une exigence de maison de couture,
                  et la conviction que le vrai luxe est celui qui prend le
                  temps du geste juste.
                </p>

                <div className="mt-8 flex items-center gap-3 text-sm font-medium text-[#FAF6EF]">
                  <MapPin className="h-4 w-4 text-[#D4B87A]" />
                  Yaoundé, Cameroun
                </div>

                <div className="divider-gold mt-8" />

                <div className="mt-6 flex items-center gap-6 text-xs text-[#A89298]">
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
            <div className="absolute -bottom-6 -right-4 rounded-2xl border border-[#B8925A]/20 bg-[#FDFBF7] p-5 shadow-[0_20px_50px_-20px_rgba(42,21,32,0.3)] md:right-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#FAF6EF]">
                  <CheckCircle2 className="h-5 w-5 text-[#B8925A]" />
                </div>
                <div>
                  <p className="font-serif text-sm font-semibold text-[#2A1520]">
                    Notre engagement
                  </p>
                  <p className="text-[11px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                    Fait main, toujours
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contenu éditorial */}
          <div>
            <span className="eyebrow">Notre maison</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight tracking-tight text-[#2A1520] md:text-4xl">
              Une marque de maroquinerie née d'une{' '}
              <span className="italic text-[#B8925A]">obsession.</span>
            </h2>

            <div className="mt-7 space-y-5 text-[15px] leading-relaxed text-[#5B4A50]">
              <p>
                <strong className="font-serif text-[#2A1520]">
                  {businessName}
                </strong>{' '}
                est née en 2024 d'une envie claire : redonner à la perle ses
                lettres de noblesse dans la maroquinerie de luxe.
              </p>
              <p>
                Notre objectif est simple : créer des sacs qui traversent
                le temps — cousus à la main, pensés dans les moindres détails,
                portés comme des bijoux.
              </p>
              <p>
                Installés à Yaoundé, nous façonnons chaque pièce dans notre
                atelier. Au-delà des sacs signatures, la maison ouvre son
                écrin à une sélection d'accessoires précieux et de coffrets
                cadeaux, choisis avec la même exigence.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-4 rounded-2xl border border-[#B8925A]/20 bg-[#FAF6EF] p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#2A1520]">
                <Shield className="h-5 w-5 text-[#D4B87A]" />
              </div>
              <div>
                <p className="font-serif text-[15px] font-semibold text-[#2A1520]">
                  Une relation basée sur la confiance
                </p>
                <p className="mt-1 text-sm text-[#5B4A50]">
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
      <section className="relative overflow-hidden bg-[#2A1520] py-20 md:py-24">
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
          <div className="mt-14 grid gap-6 md:grid-cols-3">
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
      <section className="container py-20 md:py-24">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <span className="eyebrow">Notre univers</span>
            <h2 className="mt-4 font-serif text-3xl leading-tight text-[#2A1520] md:text-4xl">
              Tout ce que la maison{' '}
              <span className="italic">façonne pour vous.</span>
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#5B4A50] md:text-[15px]">
              Des sacs signatures aux éditions confidentielles — explorez
              les univers de KATHELYNCRAFT.
            </p>
          </div>
          <Link
            href="/products"
            className="group inline-flex items-center gap-2 text-sm font-medium text-[#4A2540] transition-colors hover:text-[#B8925A]"
          >
            Voir toute la collection
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Link
                href="/products"
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.3)]"
              >
                <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-gradient-to-br from-[#E8D5D0]/40 to-transparent transition-transform duration-700 group-hover:scale-150" />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A]">
                    <Icon className="h-5 w-5 text-[#B8925A] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="mt-6 font-serif text-lg font-medium text-[#2A1520]">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#5B4A50]">
                    {category.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#B8925A]">
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
      <section className="bg-[#FAF6EF] py-20 md:py-24">
        <div className="container">
          <SectionHeader
            label="Ce qui nous définit"
            title="Les valeurs de la maison"
            description="Les principes qui guident chaque geste, chaque point, chaque perle."
          />
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.25)]"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] transition-colors duration-300 group-hover:border-[#B8925A] group-hover:bg-[#B8925A]">
                    <Icon className="h-6 w-6 text-[#B8925A] transition-colors duration-300 group-hover:text-white" />
                  </div>
                  <h3 className="mt-6 font-serif text-xl text-[#2A1520]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#5B4A50]">
                    {value.description}
                  </p>
                  <div className="mt-6 h-px w-10 bg-[#B8925A]/40 transition-all duration-500 group-hover:w-20" />
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          TIMELINE
      ========================================================= */}
      <section className="container py-20 md:py-24">
        <SectionHeader
          label="Notre évolution"
          title="Une histoire cousue main."
        />
        <div className="mx-auto mt-16 max-w-4xl">
          {timeline.map((item, index) => (
            <div key={index} className="relative flex gap-6 pb-12 last:pb-0">
              {index !== timeline.length - 1 && (
                <div className="absolute left-6 top-14 h-full w-px bg-gradient-to-b from-[#B8925A]/50 via-[#B8925A]/20 to-transparent" />
              )}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF] font-serif text-sm font-semibold text-[#B8925A]">
                {String(index + 1).padStart(2, '0')}
              </div>
              <div className="pt-1">
                <span className="font-serif text-sm italic text-[#B8925A]">
                  {item.year}
                </span>
                <h3 className="mt-1 font-serif text-xl text-[#2A1520]">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#5B4A50] md:text-[15px]">
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
      <section className="bg-[#2A1520] py-20 text-[#FAF6EF] md:py-24">
        <div className="container">
          <SectionHeader
            label="Elles nous font confiance"
            title="L'expérience de nos clientes."
            dark
          />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-2xl border border-[#D4B87A]/15 bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:border-[#D4B87A]/40 hover:bg-white/[0.06]"
              >
                {/* Guillemet décoratif */}
                <Quote className="h-8 w-8 text-[#D4B87A]/40" />

                <div className="mt-5 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map(
                    (_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-4 w-4 fill-[#D4B87A] text-[#D4B87A]"
                      />
                    )
                  )}
                </div>

                <p className="mt-5 font-serif text-[15px] italic leading-relaxed text-[#D9CDCF]">
                  « {testimonial.text} »
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-[#D4B87A]/15 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4B87A]/30 bg-[#D4B87A]/10">
                    <Crown className="h-4 w-4 text-[#D4B87A]" />
                  </div>
                  <span className="font-serif text-sm text-[#FAF6EF]">
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
      <section className="container py-20 md:py-28">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#2A1520] via-[#3D1F2F] to-[#4A2540] px-6 py-16 text-center text-[#FAF6EF] md:px-12 md:py-20">
          {/* Perles lumineuses */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#D4B87A]/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#E8D5D0]/10 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-3xl">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10 backdrop-blur-sm">
              <Gem className="h-7 w-7 text-[#D4B87A]" />
            </div>

            <h2 className="mt-7 font-serif text-3xl leading-tight text-[#FAF6EF] md:text-5xl">
              Prête à trouver votre{' '}
              <span className="italic text-[#D4B87A]">pièce signature ?</span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-[#C4B5B8] md:text-[15px]">
              Parcourez la collection et laissez-vous porter par une pièce
              cousue pour vous, à la main, dans notre atelier.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#D4B87A] px-8 py-4 text-sm font-semibold text-[#2A1520] transition-all duration-300 hover:bg-[#E8D5D0] hover:shadow-[0_20px_50px_-15px_rgba(212,184,122,0.5)]"
              >
                Explorer la collection
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4B87A]/30 bg-white/[0.06] px-8 py-4 text-sm font-medium text-[#FAF6EF] backdrop-blur-sm transition-all duration-300 hover:border-[#D4B87A]/60 hover:bg-white/[0.1]"
              >
                <MessageCircle className="h-4 w-4" />
                Besoin d'un conseil ?
              </Link>
            </div>

            <p className="mt-6 text-[11px] uppercase tracking-[0.28em] text-[#A89298]">
              Réponse sous 15 minutes · Sur WhatsApp
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}