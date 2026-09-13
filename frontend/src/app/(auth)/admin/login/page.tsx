'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Mail,
  Lock,
  AlertCircle,
  Gem,
  Crown,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { authService } from '@/services/authService'
import toast from 'react-hot-toast'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.login({ email, password })
      if (response.token) {
        localStorage.setItem('adminToken', response.token)
        localStorage.setItem('adminData', JSON.stringify(response.admin))
        toast.success('Connexion réussie')
        router.push('/admin')
      }
    } catch (err: any) {
      const message = err.response?.data?.message || 'Erreur de connexion'
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FDFBF7] px-4 py-12">
      {/* ═══════════════════════════════════════
          DÉCOR PERLES GLOBAL
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-gradient-to-br from-[#E8D5D0]/40 via-[#FAF6EF] to-transparent opacity-80 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-[#D4B87A]/30 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-gradient-to-bl from-[#4A2540]/8 via-transparent to-transparent blur-3xl" />
      </div>

      {/* Motif perles subtil */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <svg width="100%" height="100%">
          <defs>
            <pattern
              id="login-pearls"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="24" cy="24" r="1.5" fill="#B8925A" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-pearls)" />
        </svg>
      </div>

      {/* ═══════════════════════════════════════
          CARTE FORMULAIRE
      ═══════════════════════════════════════ */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#B8925A]/20 bg-[#FDFBF7]/95 shadow-[0_40px_100px_-30px_rgba(74,37,64,0.4)] backdrop-blur-md">
        {/* Liseré doré supérieur */}
        <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-[#B8925A]/60 to-transparent" />

        {/* Décor perles internes */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4B87A]/15 blur-2xl" />
          <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#E8D5D0]/25 blur-2xl" />
        </div>

        <div className="relative px-8 py-10 md:px-10 md:py-12">
          {/* ═══════════════════════════════════════
              EN-TÊTE — LOGO
          ═══════════════════════════════════════ */}
          <div className="mb-9 text-center">
            {/* Logo Gem dans cercle doré */}
            <div className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/40 bg-gradient-to-br from-[#FAF6EF] to-[#FDFBF7] shadow-[0_15px_40px_-15px_rgba(184,146,90,0.5)]">
              <Gem className="h-7 w-7 text-[#B8925A]" />
              {/* Micro-badge couronne */}
              <div className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#2A1520] shadow-sm">
                <Crown className="h-3 w-3 text-[#D4B87A]" />
              </div>
            </div>

            {/* Eyebrow */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-3.5 py-1 backdrop-blur-sm">
              <Sparkles className="h-3 w-3 text-[#B8925A]" />
              <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
                Espace privé
              </span>
            </div>

            {/* Titre */}
            <h1 className="mb-2 font-serif text-[1.75rem] leading-tight text-[#2A1520] md:text-3xl">
              Administration
            </h1>
            <p className="font-serif text-[13px] italic text-[#8B7B7F]">
              KATHELYNCRAFT · Maison de perles
            </p>
          </div>

          {/* ═══════════════════════════════════════
              FORMULAIRE
          ═══════════════════════════════════════ */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Erreur */}
            {error && (
              <div className="flex items-start gap-3 rounded-2xl border border-[#B8925A]/40 bg-[#E8D5D0]/30 px-4 py-3">
                <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#B8925A]" />
                <span className="text-[13px] font-medium leading-relaxed text-[#B8925A]">
                  {error}
                </span>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="admin-email"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                <Mail className="h-3 w-3 text-[#B8925A]" />
                Adresse email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@kathelyncraft.com"
                required
                className="w-full rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 font-serif text-sm text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15"
              />
            </div>

            {/* Mot de passe */}
            <div>
              <label
                htmlFor="admin-password"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                <Lock className="h-3 w-3 text-[#B8925A]" />
                Mot de passe
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 font-serif text-sm text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15"
              />
            </div>

            {/* Bouton */}
            <button
              type="submit"
              disabled={loading}
              className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-[#2A1520] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:bg-[#2A1520]"
            >
              {/* Décor perle au survol */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-[#D4B87A]/20 blur-xl" />
                <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-[#E8D5D0]/15 blur-xl" />
              </div>

              {loading ? (
                <>
                  <span className="inline-block h-3.5 w-3.5 animate-spin rounded-full border-2 border-[#D4B87A]/40 border-t-[#D4B87A]" />
                  Connexion en cours…
                </>
              ) : (
                <>
                  <Crown className="h-3.5 w-3.5" />
                  Se connecter
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* ═══════════════════════════════════════
              PIED DE CARTE
          ═══════════════════════════════════════ */}
          <div className="mt-8 space-y-4 border-t border-[#B8925A]/15 pt-6 text-center">
            {/* Message d'aide */}
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#8B7B7F]">
              Contactez l&apos;administrateur pour accéder
            </p>

            {/* Signature sécurité */}
            <div className="flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.24em] text-[#A89298]">
              <ShieldCheck className="h-3 w-3 text-[#B8925A]" />
              <span>Accès sécurisé · Chiffré</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}