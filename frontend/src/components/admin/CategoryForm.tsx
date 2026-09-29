'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Upload, X, Loader2, FolderTree, Save } from 'lucide-react'
import { categoryService } from '@/services/categoryService'
import { Category } from '@/types'
import toast from 'react-hot-toast'

interface CategoryFormProps {
  category?: Category
}

export default function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState(category?.image || '')
  const [formData, setFormData] = useState({
    name: category?.name || '',
    slug: category?.slug || '',
    description: category?.description || '',
    icon: category?.icon || '',
    order: category?.order || 0
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)

    try {
      // Récupérer le token admin
      const token = localStorage.getItem('adminToken')
      
      if (!token) {
        toast.error('Vous devez être connecté en tant qu\'admin')
        return
      }

      const formData = new FormData()
      formData.append('image', file)
      formData.append('folder', 'categories')

      // ⭐ CORRECTION : /api/upload/image (au lieu de /api/upload)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Upload failed')
      }

      const data = await response.json()
      
      if (data.success && data.image) {
        setImage(data.image)
        toast.success('Image uploadée avec succès')
      } else {
        throw new Error('Réponse invalide du serveur')
      }
    } catch (error: any) {
      console.error('Upload error:', error)
      toast.error(error.message || 'Erreur lors de l\'upload de l\'image')
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
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
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name) {
      toast.error('Le nom est requis')
      return
    }

    setLoading(true)

    try {
      const categoryData = {
        ...formData,
        image: image || undefined
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
      toast.error(error.response?.data?.message || 'Erreur lors de l\'enregistrement')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
      <div className="space-y-6">
        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image de la catégorie
          </label>
          
          <div className="flex items-center gap-4">
            {/* Preview */}
            {image ? (
              <div className="relative w-24 h-24 bg-gray-100 rounded-xl overflow-hidden group">
                <Image
                  src={image}
                  alt="Category"
                  fill
                  className="object-cover"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-gray-300">
                <FolderTree className="h-8 w-8 text-gray-400" />
              </div>
            )}

            {/* Bouton upload */}
            <div className="flex-1">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 text-sm font-medium"
              >
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Upload...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4" />
                    {image ? 'Changer l\'image' : 'Choisir une image'}
                  </>
                )}
              </button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              
              <p className="text-xs text-gray-400 mt-2">
                PNG, JPG, GIF jusqu'à 5MB
              </p>
            </div>
          </div>

          {/* Champ URL manuel (fallback) */}
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Ou collez l'URL de l'image ici"
            className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Nom + Slug */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la catégorie *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleNameChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug *
            </label>
            <input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-gray-50"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            placeholder="Description de la catégorie..."
          />
        </div>

        {/* Icône + Ordre */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Icône (nom Lucide)
            </label>
            <input
              type="text"
              name="icon"
              value={formData.icon}
              onChange={handleInputChange}
              placeholder="Ex: ShoppingBag, Home, Sparkles"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ordre d'affichage
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              min="0"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Enregistrement...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" />
                {category ? 'Mettre à jour' : 'Créer la catégorie'}
              </>
            )}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
        </div>
      </div>
    </form>
  )
}
