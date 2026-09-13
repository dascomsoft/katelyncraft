'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import AdminSidebar from './AdminSidebar'
import AdminHeader from './AdminHeader'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminData')
    router.push('/admin/login')
  }

  return (
    <div className="relative min-h-screen bg-[#FDFBF7] text-[#2A1520]">
      {/* ═══════════════════════════════════════
          DÉCOR PERLES GLOBAL (arrière-plan)
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-gradient-to-br from-[#E8D5D0]/30 via-transparent to-transparent blur-3xl" />
        <div className="absolute top-1/3 -left-40 h-[380px] w-[380px] rounded-full bg-gradient-to-tr from-[#D4B87A]/15 via-transparent to-transparent blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-[360px] w-[360px] rounded-full bg-gradient-to-bl from-[#4A2540]/8 via-transparent to-transparent blur-3xl" />
      </div>

      {/* ═══════════════════════════════════════
          HEADER ADMIN
      ═══════════════════════════════════════ */}
      <AdminHeader
        onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        onLogout={handleLogout}
      />

      {/* ═══════════════════════════════════════
          CORPS — Sidebar + Main
      ═══════════════════════════════════════ */}
      <div className="flex">
        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        <main className="relative flex-1">
          {/* Liseré doré vertical (separateur subtil entre sidebar et contenu) */}
          <div className="pointer-events-none absolute inset-y-6 left-0 hidden w-px bg-gradient-to-b from-transparent via-[#B8925A]/25 to-transparent lg:block" />

          {/* Container principal */}
          <div className="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
            <div className="mx-auto max-w-7xl">
              {/* Fil d'Ariane signature (optionnel visuel) */}
              <div className="mb-6 hidden items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[#8B7B7F] md:flex">
                <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#B8925A]/50" />
                <span>Espace administrateur</span>
                <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#B8925A]/50" />
              </div>

              {/* Contenu dynamique (children) */}
              <div className="rounded-2xl">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}