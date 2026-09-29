'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Loader2, Save, Upload, X, Store } from 'lucide-react'
import { shopService } from '@/services/shopService'
import { sectorService, Sector } from '@/services/sectorService'
import toast from 'react-hot-toast'

export default function EditShopPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const logoInputRef = useRef<HTMLInputElement>(null)
  const coverInputRef = useRef<HTMLInputElement>(null)
  const [sectors, setSectors] = useState<Sector[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploadingLogo, setUploadingLogo] = useState(false)
  const [uploadingCover, setUploadingCover] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    sector: '',
    description: '',
    logo: '',
    coverImage: '',
    ownerName: '',
    ownerPhone: '',
    whatsappNumber: '',
    email: '',
    address: '',
    featured: false,
    verified: false
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [shops, sectorList] = await Promise.all([
          shopService.getShops(),
          sectorService.getSectors()
        ])
        setSectors(sectorList)
        
        // Trouver la boutique par ID
        const shop: any = shops.find(s => s._id === id)
        if (shop) {
          setFormData({
            name: shop.name || '',
            sector: shop.sector?._id || shop.sector || '',
            description: shop.description || '',
            logo: shop.logo || '',
            coverImage: shop.coverImage || '',
            ownerName: shop.ownerName || '',
            ownerPhone: shop.ownerPhone || '',
            whatsappNumber: shop.whatsappNumber || '',
            email: shop.email || '',
            address: shop.address || '',
            featured: shop.featured || false,
            verified: shop.verified || false
          })
        }
      } catch (error) {
        console.error('Error:', error)
        toast.error('Erreur lors du chargement')
      } finally {
        setLoading(false)
      }
    }
    if (id) fetchData()
  }, [id])

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const uploadImage = async (file: File) => {
    const token = localStorage.getItem('adminToken')
    if (!token) return null

    const formData = new FormData()
    formData.append('image', file)
    formData.append('folder', 'shops')

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/upload/image`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      })
      if (!response.ok) throw new Error('Upload failed')
      const data = await response.json()
      return data.image
    } catch (error) {
      toast.error('Erreur lors de l\'upload')
      return null
    }
  }

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingLogo(true)
    const url = await uploadImage(file)
    if (url) {
      setFormData(prev => ({ ...prev, logo: url }))
      toast.success('Logo uploadé')
    }
    setUploadingLogo(false)
    if (logoInputRef.current) logoInputRef.current.value = ''
  }

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploadingCover(true)
    const url = await uploadImage(file)
    if (url) {
      setFormData(prev => ({ ...prev, coverImage: url }))
      toast.success('Bannière uploadée')
    }
    setUploadingCover(false)
    if (coverInputRef.current) coverInputRef.current.value = ''
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await shopService.updateShop(id, formData)
      toast.success('Boutique mise à jour')
      router.push('/admin/boutiques')
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Modifier la boutique</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 max-w-3xl">
        <div className="space-y-6">
          
          {/* ⭐ LOGO ET BANNIÈRE */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-5">
            <h3 className="text-sm font-bold text-blue-900 mb-4 flex items-center gap-2">
              <Store className="h-4 w-4" />
              Identité visuelle
            </h3>
            
            <div className="grid md:grid-cols-2 gap-5">
              {/* LOGO */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo de la boutique
                </label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full bg-white border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden flex-shrink-0 relative group">
                    {formData.logo ? (
                      <>
                        <img src={formData.logo} alt="Logo" className="w-full h-full object-cover" />
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, logo: '' }))}
                          className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          <X className="h-5 w-5 text-white" />
                        </button>
                      </>
                    ) : (
                      <Store className="h-10 w-10 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <button
                      type="button"
                      onClick={() => logoInputRef.current?.click()}
                      disabled={uploadingLogo}
                      className="w-full px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {uploadingLogo ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Upload...</>
                      ) : (
                        <><Upload className="h-4 w-4" /> Changer</>
                      )}
                    </button>
                  </div>
                </div>
                <input
                  ref={logoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <input
                  type="text"
                  name="logo"
                  value={formData.logo}
                  onChange={handleChange}
                  placeholder="URL du logo"
                  className="mt-3 w-full px-3 py-2 border border-gray-300 rounded-lg text-xs"
                />
              </div>

              {/* COVER */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image de couverture
                </label>
                <div className="relative w-full h-24 rounded-lg bg-white border-2 border-dashed border-gray-300 flex items-center justify-center overflow-hidden group">
                  {formData.coverImage ? (
                    <>
                      <img src={formData.coverImage} alt="Cover" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, coverImage: '' }))}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center">
                      <Upload className="h-6 w-6 text-gray-300 mx-auto mb-1" />
                      <p className="text-xs text-gray-400">Bannière</p>
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => coverInputRef.current?.click()}
                  disabled={uploadingCover}
                  className="mt-3 w-full px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {uploadingCover ? (
                    <><Loader2 className="h-4 w-4 animate-spin" /> Upload...</>
                  ) : (
                    <><Upload className="h-4 w-4" /> Changer</>
                  )}
                </button>
                <input
                  ref={coverInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Autres champs */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secteur *</label>
              <select
                name="sector"
                value={formData.sector}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              >
                <option value="">Sélectionner</option>
                {sectors.map(s => (
                  <option key={s._id} value={s._id}>{s.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Propriétaire *</label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Téléphone *</label>
              <input
                type="tel"
                name="ownerPhone"
                value={formData.ownerPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp *</label>
              <input
                type="tel"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-700">Boutique vedette</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="verified" checked={formData.verified} onChange={handleChange} className="w-4 h-4 text-blue-600 rounded" />
              <span className="text-sm text-gray-700">Boutique vérifiée</span>
            </label>
          </div>

          <div className="flex gap-4 pt-4 border-t">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-semibold disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Enregistrer
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Annuler
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
