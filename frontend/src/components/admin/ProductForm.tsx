'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Upload,
  X,
  Plus,
  Loader2,
  Gem,
  Crown,
  Sparkles,
  ImageIcon,
  Save,
  ArrowLeft,
  ArrowRight,
  AlertCircle,
} from 'lucide-react'
import { productService } from '@/services/productService'
import { Category } from '@/types'
import toast from 'react-hot-toast'

interface ProductFormProps {
  product?: any
  categories: Category[]
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [images, setImages] = useState<string[]>(product?.images || [])
  const [formData, setFormData] = useState({
    name: product?.name || '',
    slug: product?.slug || '',
    description: product?.description || '',
    price: product?.price || '',
    oldPrice: product?.oldPrice || '',
    category: product?.category?._id || '',
    brand: product?.brand || '',
    stock: product?.stock || '',
    available: product?.available !== undefined ? product.available : true,
    featured: product?.featured || false,
    specifications: product?.specifications || {},
  })

  /* ═══════════════════════════════════════
     VALIDATION (logique métier INCHANGÉE)
  ═══════════════════════════════════════ */
  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Le nom doit contenir au moins 3 caractères'
    }

    if (!formData.description || formData.description.length < 10) {
      newErrors.description =
        'La description doit contenir au moins 10 caractères'
    }

    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = 'Le prix doit être supérieur à 0'
    }

    if (!formData.category) {
      newErrors.category = 'Veuillez sélectionner une catégorie'
    }

    if (!formData.stock || Number(formData.stock) < 0) {
      newErrors.stock = 'Le stock ne peut pas être négatif'
    }

    if (images.length === 0) {
      newErrors.images = 'Veuillez ajouter au moins une image'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
    // Effacer l'erreur du champ
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)

    try {
      const token = localStorage.getItem('adminToken')

      if (!token) {
        toast.error("Vous devez être connecté en tant qu'admin")
        return
      }

      const uploadedImages = []

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const formData = new FormData()
        formData.append('image', file)
        formData.append('folder', 'products')

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/upload/image`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        )

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || 'Upload failed')
        }

        const data = await response.json()

        if (data.success && data.image) {
          uploadedImages.push(data.image)
        }
      }

      if (uploadedImages.length > 0) {
        setImages([...images, ...uploadedImages])
        toast.success(
          `${uploadedImages.length} image(s) uploadée(s) avec succès`
        )
        // Effacer l'erreur d'images
        if (errors.images) {
          setErrors((prev) => ({ ...prev, images: '' }))
        }
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(error.message || "Erreur lors de l'upload des images")
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
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

    // Validation avant soumission
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs du formulaire')
      return
    }

    setLoading(true)

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        oldPrice: formData.oldPrice ? Number(formData.oldPrice) : undefined,
        stock: Number(formData.stock),
        images,
      }

      if (product) {
        await productService.updateProduct(product._id, productData)
        toast.success('Produit mis à jour avec succès')
      } else {
        await productService.createProduct(productData)
        toast.success('Produit créé avec succès')
      }

      router.push('/admin/products')
    } catch (error: any) {
      console.error('Submit error:', error)
      const errorMsg =
        error.response?.data?.message || "Erreur lors de l'enregistrement"
      toast.error(errorMsg)

      // Si l'erreur est une validation MongoDB, afficher le détail
      if (error.response?.data?.errors) {
        const fieldErrors = error.response.data.errors
        const newErrors: Record<string, string> = {}
        fieldErrors.forEach((err: any) => {
          newErrors[err.path] = err.message
        })
        setErrors(newErrors)
      }
    } finally {
      setLoading(false)
    }
  }

  const isEditing = Boolean(product)

  /* Helper pour classes de champ cohérentes */
  const inputBaseClass =
    'w-full rounded-xl border bg-[#FDFBF7] px-4 py-3 font-serif text-sm text-[#2A1520] placeholder-[#A89298] outline-none transition-all duration-300 hover:border-[#B8925A]/40 focus:border-[#B8925A] focus:bg-white focus:ring-2 focus:ring-[#B8925A]/15'
  const errorClass = 'border-[#B8925A]/60 bg-[#E8D5D0]/20'
  const normalClass = 'border-[#B8925A]/20'

  return (
    <form
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)]"
    >
      {/* Liseré doré supérieur */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

      {/* Décor perles */}
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
                {isEditing ? 'Modifier la pièce' : 'Nouvelle création'}
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
              IMAGES
          ═══════════════════════════════════════ */}
          <div>
            <label className="mb-3 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]">
              <Crown className="h-3 w-3 text-[#B8925A]" />
              Visuels de la pièce{' '}
              <span className="text-[#B8925A]">*</span>
            </label>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-xl border border-[#B8925A]/20 bg-[#FAF6EF] transition-all duration-500 hover:border-[#B8925A]/60"
                >
                  <Image
                    src={image}
                    alt={`Image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    aria-label={`Supprimer l'image ${index + 1}`}
                    className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#2A1520]/90 text-[#FAF6EF] opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 hover:bg-[#B8925A]"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}

              {/* Bouton d'upload */}
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="group aspect-square flex flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed border-[#B8925A]/30 bg-[#FAF6EF] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FDFBF7] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-7 w-7 animate-spin text-[#B8925A]" />
                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                      Upload…
                    </span>
                  </>
                ) : (
                  <>
                    <Upload className="h-7 w-7 text-[#B8925A]/60 transition-colors duration-300 group-hover:text-[#B8925A]" />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#8B7B7F]">
                      Ajouter
                    </span>
                  </>
                )}
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Erreur images */}
            {errors.images && (
              <div className="mt-3 flex items-center gap-2 rounded-full border border-[#B8925A]/40 bg-[#E8D5D0]/20 px-3 py-1.5">
                <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 text-[#B8925A]" />
                <p className="text-[11px] font-medium text-[#B8925A]">
                  {errors.images}
                </p>
              </div>
            )}

            <p className="mt-3 text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
              Formats acceptés · JPG · PNG · GIF · WEBP · SVG (max 5 MB)
            </p>
          </div>

          {/* Liseré doré */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/20 to-transparent" />

          {/* ═══════════════════════════════════════
              NOM + SLUG
          ═══════════════════════════════════════ */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="product-name"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                Nom de la pièce <span className="text-[#B8925A]">*</span>
              </label>
              <input
                id="product-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleNameChange}
                placeholder="Ex : Sac signature perle dorée"
                className={`${inputBaseClass} ${
                  errors.name ? errorClass : normalClass
                }`}
                required
              />
              {errors.name && (
                <div className="mt-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3 flex-shrink-0 text-[#B8925A]" />
                  <p className="text-[11px] font-medium text-[#B8925A]">
                    {errors.name}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="product-slug"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                Slug <span className="text-[#B8925A]">*</span>
              </label>
              <input
                id="product-slug"
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                className={`${inputBaseClass} border-[#B8925A]/20 bg-[#FAF6EF] font-mono text-[#5B4A50]`}
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
              htmlFor="product-description"
              className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
            >
              Description <span className="text-[#B8925A]">*</span>
              <span className="ml-1 normal-case tracking-normal text-[#8B7B7F]/80">
                (minimum 10 caractères)
              </span>
            </label>
            <textarea
              id="product-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={4}
              placeholder="Décrivez la pièce, ses perles, sa fabrication…"
              className={`${inputBaseClass} resize-none leading-relaxed ${
                errors.description ? errorClass : normalClass
              }`}
              required
              minLength={10}
            />
            {errors.description && (
              <div className="mt-2 flex items-center gap-1.5">
                <AlertCircle className="h-3 w-3 flex-shrink-0 text-[#B8925A]" />
                <p className="text-[11px] font-medium text-[#B8925A]">
                  {errors.description}
                </p>
              </div>
            )}
            <p className="mt-2 text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
              {formData.description.length}/10 caractères minimum
            </p>
          </div>

          {/* ═══════════════════════════════════════
              CATÉGORIE + MARQUE
          ═══════════════════════════════════════ */}
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label
                htmlFor="product-category"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                Collection <span className="text-[#B8925A]">*</span>
              </label>
              <div className="relative">
                <select
                  id="product-category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`${inputBaseClass} cursor-pointer appearance-none pr-10 ${
                    errors.category ? errorClass : normalClass
                  }`}
                  required
                >
                  <option value="">Sélectionner une collection</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <Crown className="pointer-events-none absolute right-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#B8925A]" />
              </div>
              {errors.category && (
                <div className="mt-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3 flex-shrink-0 text-[#B8925A]" />
                  <p className="text-[11px] font-medium text-[#B8925A]">
                    {errors.category}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="product-brand"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                Signature / Marque
              </label>
              <input
                id="product-brand"
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleInputChange}
                placeholder="Ex : KATHELYNCRAFT"
                className={`${inputBaseClass} ${normalClass}`}
              />
            </div>
          </div>

          {/* ═══════════════════════════════════════
              PRIX + ANCIEN PRIX + STOCK
          ═══════════════════════════════════════ */}
          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label
                htmlFor="product-price"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                Prix (FCFA) <span className="text-[#B8925A]">*</span>
              </label>
              <input
                id="product-price"
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="0"
                className={`${inputBaseClass} tabular-nums ${
                  errors.price ? errorClass : normalClass
                }`}
                required
                min="0"
              />
              {errors.price && (
                <div className="mt-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3 flex-shrink-0 text-[#B8925A]" />
                  <p className="text-[11px] font-medium text-[#B8925A]">
                    {errors.price}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="product-oldprice"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                Ancien prix (FCFA)
              </label>
              <input
                id="product-oldprice"
                type="number"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleInputChange}
                placeholder="Optionnel"
                className={`${inputBaseClass} tabular-nums ${normalClass}`}
                min="0"
              />
              <p className="mt-1.5 text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                Affiché barré si rempli
              </p>
            </div>

            <div>
              <label
                htmlFor="product-stock"
                className="mb-2 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#8B7B7F]"
              >
                Stock <span className="text-[#B8925A]">*</span>
              </label>
              <input
                id="product-stock"
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleInputChange}
                placeholder="0"
                className={`${inputBaseClass} tabular-nums ${
                  errors.stock ? errorClass : normalClass
                }`}
                required
                min="0"
              />
              {errors.stock && (
                <div className="mt-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3 w-3 flex-shrink-0 text-[#B8925A]" />
                  <p className="text-[11px] font-medium text-[#B8925A]">
                    {errors.stock}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ═══════════════════════════════════════
              TOGGLES (Disponible + Vedette)
          ═══════════════════════════════════════ */}
          <div className="flex flex-wrap gap-3">
            {[
              {
                name: 'available',
                checked: formData.available,
                label: 'Disponible',
                icon: Sparkles,
              },
              {
                name: 'featured',
                checked: formData.featured,
                label: 'Pièce vedette',
                icon: Crown,
              },
            ].map((toggle) => {
              const Icon = toggle.icon
              return (
                <label
                  key={toggle.name}
                  className={`group flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                    toggle.checked
                      ? 'border-[#B8925A]/50 bg-[#FAF6EF] text-[#B8925A]'
                      : 'border-[#B8925A]/20 bg-transparent text-[#8B7B7F] hover:border-[#B8925A]/40 hover:text-[#B8925A]'
                  }`}
                >
                  <input
                    type="checkbox"
                    name={toggle.name}
                    checked={toggle.checked}
                    onChange={handleCheckboxChange}
                    className="sr-only"
                  />
                  <Icon className="h-3.5 w-3.5" />
                  {toggle.label}
                </label>
              )
            })}
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
                  {isEditing ? (
                    <Save className="h-3.5 w-3.5" />
                  ) : (
                    <Plus className="h-3.5 w-3.5" />
                  )}
                  {isEditing ? 'Mettre à jour' : 'Créer la pièce'}
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