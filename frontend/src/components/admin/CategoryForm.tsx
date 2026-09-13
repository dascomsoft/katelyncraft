'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Upload,
  X,
  Loader2,
  Gem,
  Crown,
  Sparkles,
  ImageIcon,
  ArrowRight,
  ArrowLeft,
  Save,
} from 'lucide-react'
import { categoryService } from '@/services/categoryService'
import { Category } from '@/types'
import toast from 'react-hot-toast'

interface CategoryFormProps {
  category?: Category
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState(category?.image || '')
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    icon: category?.icon || '',
    order: category?.order || 0,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('image', file)

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        {
          method: 'POST',
          body: formData,
        }
      )

      if (!response.ok) throw new Error('Upload failed')

      const data = await response.json()
      setImage(data.image)
      toast.success('Image uploadée avec succès')
    } catch (error) {
      console.error('Upload error:', error)
      toast.error("Erreur lors de l'upload de l'image")
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setImage('')
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value
    setFormData((prev) => ({
      ...prev,
      name,
      slug: generateSlug(name),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const categoryData = {
        ...formData,
        image: image || undefined,
      }

      if (category) {
        await categoryService.updateCategory(category._id, categoryData)
        toast.success('Catégorie mise à jour avec succès')
      } else {
        await categoryService.createCategory(categoryData)
        toast.success('Catégorie créée avec succès')
      }

      router.push('/admin/categories')
    } catch (error: any) {
      console.error('Submit error:', error)
      toast.error(
        error.response?.data?.message || "Erreur lors de l'enregistrement"
      )
    } finally {
      setLoading(false)
    }
  }

  const isEditing = Boolean(category)

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)]"
    >
      {/* ═══════════════════════════════════════
          LISERÉ DORÉ SUPÉRIEUR
      ═══════════════════════════════════════ */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

      {/* ═══════════════════════════════════════
          DÉCOR PERLES
      ═══════════════════════════════════════ */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#D4B87A]/10 blur-2xl" />
        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#E8D5D0]/20 blur-2xl" />
      </div>

      <div className="relative p-6 md:p-8">
        {/* ═══════════════════════════════════════
            EN-TÊTE
        ═══════════════════════════════════════ */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#B8925A]/40 bg-[#FAF6EF]">
              <Gem className="h-5 w-5 text-[#B8925A]" />
            </div>
            <div>
              <h2 className="font-serif text-lg leading-tight text-[#2A1520] md:text-xl">
                {isEditing ? 'Modifier la collection' : 'Nouvelle collection'}
              </h2>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.22em] text-[#8B7B7F]">
                {isEditing ? 'Édition' : 'Création'} · Atelier
              </p>
            </div>
          </div>
          {isEditing && (
            <span className="inline-flex items-center gap-1 rounded-full border border-[#B8925A]/30 bg-[#FAF6EF] px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.15em] text-[#B8925A]">
              <Sparkles className="h-2.5 w-2.5" />
              En cours
            </span>
          )}
        </div>

        <div className="space-y-7">
          {/* ═══════════════════════════════════════
              IMAGE
          ═══════════════════════════════════════ */}
          <div>
            <label className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]">
              <Crown className="h-3 w-3 text-[#B8925A]" />
              Visuel de la collection
            </label>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              {/* Aperçu */}
              {image ? (
                <div className="group relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#B8925A]/40 bg-[#FAF6EF] transition-all duration-500 hover:border-[#B8925A] hover:shadow-[0_15px_40px_-15px_rgba(184,146,90,0.5)]">
                  <Image
                    src={image}
                    alt="Category"
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                  />
                  <button
                    type="button"
                    onClick={removeImage}
                    aria-label="Supprimer l'image"
                    className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center rounded-full bg-[#2A1520]/90 text-[#FAF6EF] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-[#B8925A]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex h-28 w-28 flex-shrink-0 flex-col items-center justify-center gap-1 rounded-full border-2 border-dashed border-[#B8925A]/30 bg-[#FAF6EF]">
                  <ImageIcon className="h-7 w-7 text-[#B8925A]/40" />
                  <span className="text-[9px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                    Aucun visuel
                  </span>
                </div>
              )}

              {/* Upload */}
              <div className="flex-1">
                <label className="inline-block cursor-pointer">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] hover:text-[#B8925A]">
                    {uploading ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Upload…
                      </>
                    ) : (
                      <>
                        <Upload className="h-3.5 w-3.5" />
                        Choisir un visuel
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                  PNG · JPG · GIF — jusqu&apos;à 5 MB
                </p>
              </div>
            </div>
          </div>

          {/* Liseré doré */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/20 to-transparent" />

          {/* ═══════════════════════════════════════
              NOM + SLUG
          ═══════════════════════════════════════ */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="category-name"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                Nom de la collection <span className="text-[#B8925A]">*</span>
              </label>
              <input
                id="category-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Ex : Sacs signatures"
                className="w-full rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 font-serif text-sm text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15"
                required
              />
            </div>

            <div>
              <label
                htmlFor="category-slug"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                Slug <span className="text-[#B8925A]">*</span>
              </label>
              <input
                id="category-slug"
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-[#B8925A]/20 bg-[#FAF6EF] px-4 py-3 font-mono text-sm text-[#5B4A50] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15"
                required
              />
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                Généré automatiquement
              </p>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              DESCRIPTION
          ═══════════════════════════════════════ */}
          <div>
            <label
              htmlFor="category-description"
              className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
            >
              Description
            </label>
            <textarea
              id="category-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              placeholder="Décrivez la collection en quelques mots…"
              className="w-full resize-none rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 font-serif text-sm leading-relaxed text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15"
            />
          </div>

          {/* ═══════════════════════════════════════
              ICÔNE + ORDRE
          ═══════════════════════════════════════ */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="category-icon"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                Icône Lucide
              </label>
              <input
                id="category-icon"
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleInputChange}
                placeholder="ShoppingBag, Home, etc."
                className="w-full rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 font-mono text-sm text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15"
              />
            </div>

            <div>
              <label
                htmlFor="category-order"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                Ordre d&apos;affichage
              </label>
              <input
                id="category-order"
                type="number"
                name="order"
                value={formData.order}
                onChange={handleInputChange}
                min="0"
                className="w-full rounded-xl border border-[#B8925A]/20 bg-[#FDFBF7] px-4 py-3 font-serif text-sm text-[#2A1520] tabular-nums outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15"
              />
            </div>
          </div>

          {/* ═══════════════════════════════════════
              ACTIONS
          ═══════════════════════════════════════ */}
          <div className="flex flex-col-reverse gap-3 border-t border-[#B8925A]/15 pt-6 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => router.back()}
              className="group inline-flex items-center justify-center gap-2 rounded-full border border-[#B8925A]/25 bg-transparent px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A]/50 hover:bg-[#FAF6EF] hover:text-[#B8925A] sm:order-1"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
              Annuler
            </button>

            <button
              type="submit"
              disabled={loading}
              className="group flex flex-1 items-center justify-center gap-2 rounded-full bg-[#2A1520] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#FAF6EF] shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_20px_50px_-15px_rgba(74,37,64,0.6)] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#2A1520] disabled:hover:shadow-[0_15px_40px_-15px_rgba(42,21,32,0.5)] sm:order-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enregistrement…
                </>
              ) : (
                <>
                  <Save className="h-3.5 w-3.5" />
                  {isEditing ? 'Mettre à jour' : 'Créer la collection'}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}