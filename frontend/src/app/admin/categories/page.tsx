'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Gem,
  Crown,
  Sparkles,
  FolderOpen,
  ArrowRight,
} from 'lucide-react'
import { categoryService } from '@/services/categoryService'
import { Category } from '@/types'
import toast from 'react-hot-toast'

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const data = await categoryService.getCategories()
      setCategories(Array.isArray(data) ? data : [])
    } catch (error) {
      console.error('Error fetching categories:', error)
      toast.error('Erreur lors du chargement des catégories')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?'))
      return

    try {
      const success = await categoryService.deleteCategory(id)
      if (success) {
        toast.success('Catégorie supprimée avec succès')
        fetchCategories()
      } else {
        toast.error('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting category:', error)
      toast.error('Erreur lors de la suppression')
    }
  }

  const handleToggleStatus = async (id: string) => {
    try {
      const result = await categoryService.toggleCategoryStatus(id)
      if (result) {
        toast.success(
          `Catégorie ${result.active ? 'activée' : 'désactivée'}`
        )
        fetchCategories()
      } else {
        toast.error('Erreur lors du changement de statut')
      }
    } catch (error) {
      console.error('Error toggling status:', error)
      toast.error('Erreur lors du changement de statut')
    }
  }

  /* ═══════════════════════════════════════
     CHARGEMENT
  ═══════════════════════════════════════ */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#FDFBF7]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-2 border-[#B8925A]/20" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#B8925A]" />
          </div>
          <p className="font-serif text-sm italic text-[#8B7B7F]">
            Chargement des collections…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* ═══════════════════════════════════════
          EN-TÊTE DE PAGE
      ═══════════════════════════════════════ */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          {/* Eyebrow */}
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#B8925A]/30 bg-white/60 px-3.5 py-1 backdrop-blur-sm">
            <Gem className="h-3 w-3 text-[#B8925A]" />
            <span className="text-[9px] font-medium uppercase tracking-[0.28em] text-[#4A2540]">
              Administration
            </span>
          </div>

          <h1 className="mb-1 font-serif text-[2rem] leading-tight text-[#2A1520] md:text-[2.25rem]">
            Nos <span className="italic text-[#B8925A]">collections</span>
          </h1>
          <p className="text-[13px] text-[#5B4A50]">
            {categories.length > 0
              ? `${categories.length} collection${
                  categories.length > 1 ? 's' : ''
                } dans votre écrin`
              : 'Organisez vos univers KATHELYNCRAFT'}
          </p>
        </div>

        {/* CTA Ajouter */}
        <Link
          href="/admin/categories/create"
          className="group inline-flex items-center gap-2 self-start rounded-full bg-[#2A1520] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] sm:self-auto"
        >
          <Plus className="h-3.5 w-3.5" />
          Nouvelle collection
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* Liseré doré séparateur */}
      <div className="mb-8 h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/30 to-transparent" />

      {/* ═══════════════════════════════════════
          GRILLE DE CATÉGORIES
      ═══════════════════════════════════════ */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {categories.length === 0 ? (
          /* ── État vide ── */
          <div className="col-span-full rounded-3xl border border-[#B8925A]/15 bg-white px-6 py-16 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
              <FolderOpen className="h-7 w-7 text-[#B8925A]" />
            </div>
            <p className="mb-1 font-serif text-lg text-[#2A1520]">
              Aucune collection pour l&apos;instant
            </p>
            <p className="mx-auto mb-6 max-w-md text-sm leading-relaxed text-[#5B4A50]">
              Créez votre première collection pour organiser vos créations
              signatures.
            </p>
            <Link
              href="/admin/categories/create"
              className="group inline-flex items-center gap-2 rounded-full bg-[#2A1520] px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#4A2540]"
            >
              <Plus className="h-3.5 w-3.5" />
              Créer une collection
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        ) : (
          categories.map((category) => (
            <article
              key={category._id}
              className="group relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[#B8925A]/40 hover:shadow-[0_25px_60px_-25px_rgba(74,37,64,0.3)]"
            >
              {/* Décor perles */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#D4B87A]/10 blur-2xl" />
                <div className="absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-[#E8D5D0]/20 blur-2xl" />
              </div>

              {/* Liseré doré haut */}
              <div className="absolute inset-x-6 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-[#B8925A] to-transparent transition-transform duration-700 group-hover:scale-x-100" />

              <div className="relative flex items-start gap-4">
                {/* ─── AVATAR ─── */}
                <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#B8925A]/30 bg-[#FAF6EF] transition-all duration-500 group-hover:border-[#B8925A] group-hover:shadow-[0_10px_25px_-10px_rgba(184,146,90,0.5)]">
                  {category.image ? (
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/30">
                      <Gem className="h-6 w-6 text-[#B8925A]" />
                    </div>
                  )}
                </div>

                {/* ─── INFOS ─── */}
                <div className="min-w-0 flex-1">
                  <h3 className="mb-1 truncate font-serif text-[15px] font-medium text-[#2A1520] transition-colors duration-300 group-hover:text-[#B8925A]">
                    {category.name}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-[11px] leading-relaxed text-[#8B7B7F]">
                    {category.description || 'Aucune description'}
                  </p>

                  {/* Badges actif/inactif + ordre */}
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => handleToggleStatus(category._id)}
                      aria-label={`Marquer la collection comme ${
                        category.active ? 'inactive' : 'active'
                      }`}
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] transition-all duration-300 ${
                        category.active
                          ? 'border-[#B8925A]/40 bg-[#FAF6EF] text-[#B8925A] hover:border-[#B8925A]'
                          : 'border-[#8B7B7F]/30 bg-[#FDFBF7] text-[#8B7B7F] hover:border-[#8B7B7F]/60'
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          category.active
                            ? 'bg-[#B8925A]'
                            : 'bg-[#8B7B7F]/50'
                        }`}
                      />
                      {category.active ? 'Active' : 'Inactive'}
                    </button>

                    <span className="inline-flex items-center gap-1 text-[9px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                      <Sparkles className="h-2.5 w-2.5 text-[#B8925A]" />
                      Ordre {category.order || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* ─── ACTIONS ─── */}
              <div className="relative mt-5 flex items-center gap-1.5 border-t border-[#B8925A]/15 pt-4">
                {/* Voir (public) */}
                <Link
                  href={`/categories/${category.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Voir la collection"
                  aria-label={`Voir la collection ${category.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B8925A]/20 text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] hover:text-[#B8925A]"
                >
                  <Eye className="h-3.5 w-3.5" />
                </Link>

                {/* Modifier */}
                <Link
                  href={`/admin/categories/${category._id}/edit`}
                  title="Modifier la collection"
                  aria-label={`Modifier ${category.name}`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-[#B8925A]/20 text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] hover:text-[#B8925A]"
                >
                  <Edit className="h-3.5 w-3.5" />
                </Link>

                {/* Supprimer */}
                <button
                  onClick={() => handleDelete(category._id)}
                  title="Supprimer la collection"
                  aria-label={`Supprimer ${category.name}`}
                  className="group/del ml-auto flex h-9 w-9 items-center justify-center rounded-full border border-[#B8925A]/20 text-[#8B7B7F] transition-all duration-300 hover:border-[#5B4A50]/60 hover:bg-[#E8D5D0]/30 hover:text-[#5B4A50]"
                >
                  <Trash2 className="h-3.5 w-3.5 transition-transform duration-300 group-hover/del:scale-110" />
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  )
}