import Link from 'next/link'
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MessageCircle,
  Gem,
  Crown,
  Sparkles,
  Heart,
  ArrowRight,
} from 'lucide-react'
import { useSettings } from '@/hooks/useSettings'

export default function Footer() {
  const { settings } = useSettings()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-auto overflow-hidden bg-[#2A1520] text-[#FAF6EF]">
      {/* ═══════════════════════════════════════
          DÉCOR PERLES EN ARRIÈRE-PLAN
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-[#D4B87A]/10 blur-3xl" />
        <div className="absolute -bottom-40 left-1/4 h-[380px] w-[380px] rounded-full bg-[#E8D5D0]/8 blur-3xl" />
      </div>

      {/* ═══════════════════════════════════════
          LISERÉ DORÉ SUPÉRIEUR
      ═══════════════════════════════════════ */}
      <div className="relative h-px w-full bg-gradient-to-r from-transparent via-[#D4B87A]/40 to-transparent" />

      <div className="container relative py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-4">

          {/* ═══════════════ COLONNE MAISON ═══════════════ */}
          <div className="lg:col-span-1">
            {/* Logo signature */}
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4B87A]/40 bg-[#D4B87A]/10">
                <Gem className="h-5 w-5 text-[#D4B87A]" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg font-semibold tracking-tight text-[#FAF6EF]">
                  KATHELYN
                  <span className="italic text-[#D4B87A]">CRAFT</span>
                </span>
                <span className="mt-0.5 text-[9px] font-medium uppercase tracking-[0.28em] text-[#A89298]">
                  Maison de perles
                </span>
              </div>
            </div>

            <p className="mb-6 text-sm leading-relaxed text-[#C4B5B8]">
              {settings?.businessDescription ||
                'Maison de maroquinerie artisanale — sacs de luxe en perles, façonnés à la main dans notre atelier.'}
            </p>

            {/* Mini signature */}
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#A89298]">
              <Sparkles className="h-3 w-3 text-[#D4B87A]" />
              <span>Fait main · Édition limitée</span>
            </div>
          </div>

          {/* ═══════════════ COLONNE LIENS RAPIDES ═══════════════ */}
          <div>
            <h3 className="mb-5 font-serif text-base text-[#FAF6EF]">
              La Maison
            </h3>
            <ul className="space-y-3">
              {[
                { label: 'Boutique', href: '/products' },
                { label: 'Collections', href: '/categories' },
                { label: 'Notre histoire', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Offres & drops', href: '/promotions' },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-[#C4B5B8] transition-colors duration-300 hover:text-[#D4B87A]"
                  >
                    <span className="h-px w-0 bg-[#D4B87A] transition-all duration-300 group-hover:w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ═══════════════ COLONNE CONTACT ═══════════════ */}
          <div>
            <h3 className="mb-5 font-serif text-base text-[#FAF6EF]">
              Service client
            </h3>
            <ul className="space-y-3.5 text-sm text-[#C4B5B8]">
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#D4B87A]/25">
                  <Phone className="h-3 w-3 text-[#D4B87A]" />
                </div>
                <span className="leading-relaxed">
                  {settings?.businessPhone || '+237 600 000 000'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#D4B87A]/25">
                  <Mail className="h-3 w-3 text-[#D4B87A]" />
                </div>
                <span className="break-all leading-relaxed">
                  {settings?.businessEmail || 'contact@kathelyncraft.com'}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-[#D4B87A]/25">
                  <MapPin className="h-3 w-3 text-[#D4B87A]" />
                </div>
                <span className="leading-relaxed">
                  {settings?.businessAddress || 'Yaoundé, Cameroun'}
                </span>
              </li>
            </ul>
          </div>

          {/* ═══════════════ COLONNE SOCIAL + WHATSAPP ═══════════════ */}
          <div>
            <h3 className="mb-5 font-serif text-base text-[#FAF6EF]">
              Suivez la maison
            </h3>

            {/* Réseaux sociaux */}
            <div className="mb-6 flex flex-wrap gap-2.5">
              {[
                { icon: Facebook, label: 'Facebook', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
                { icon: Youtube, label: 'YouTube', href: '#' },
              ].map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="group flex h-10 w-10 items-center justify-center rounded-full border border-[#D4B87A]/25 bg-white/[0.02] text-[#C4B5B8] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4B87A] hover:bg-[#D4B87A] hover:text-[#2A1520] hover:shadow-[0_10px_25px_-10px_rgba(212,184,122,0.6)]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>

            {/* CTA WhatsApp */}
            <a
              href={`https://wa.me/${
                settings?.whatsappNumber || '237600000000'
              }`}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4B87A] px-5 py-3 text-xs font-semibold text-[#2A1520] transition-all duration-300 hover:bg-[#E8D5D0] hover:shadow-[0_15px_40px_-15px_rgba(212,184,122,0.5)]"
            >
              <MessageCircle className="h-4 w-4" />
              Discuter sur WhatsApp
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#A89298]">
              <Crown className="h-3 w-3 text-[#D4B87A]" />
              Réponse sous 15 min
            </p>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            LIGNE DE SÉPARATION DORÉE
        ═══════════════════════════════════════ */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-[#D4B87A]/30 to-transparent" />

        {/* ═══════════════════════════════════════
            BAS DE FOOTER
        ═══════════════════════════════════════ */}
        <div className="flex flex-col items-center justify-between gap-5 text-center md:flex-row md:text-left">
          {/* Copyright */}
          <p className="flex items-center gap-2 text-xs text-[#A89298]">
            <span>© {currentYear}</span>
            <span className="font-serif text-[#D4B87A]">
              KATHELYN
              <span className="italic">CRAFT</span>
            </span>
            <span>· Tous droits réservés.</span>
          </p>

          {/* Liens secondaires */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs">
            {[
              { label: 'Boutique', href: '/products' },
              { label: 'Collections', href: '/categories' },
              { label: 'Contact', href: '/contact' },
              { label: 'Mentions légales', href: '/legal' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#A89298] transition-colors duration-300 hover:text-[#D4B87A]"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Signature finale */}
          <p className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.28em] text-[#A89298]">
            Façonné avec
            <Heart className="h-3 w-3 fill-[#D4B87A] text-[#D4B87A]" />
            à l&apos;atelier
          </p>
        </div>
      </div>
    </footer>
  )
}