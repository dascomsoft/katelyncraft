'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, Store, MapPin, Star } from 'lucide-react'
import { shopService, Shop } from '@/services/shopService'
import toast from 'react-hot-toast'

export default function AdminBoutiques() {
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  const fetchShops = async () => {
    try {
      setLoading(true)
      const data = await shopService.getShops({ search })
      setShops(data)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchShops() }, [search])

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cette boutique ?')) return
    try {
      await shopService.deleteShop(id)
      toast.success('Boutique supprimée')
      fetchShops()
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Erreur')
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Boutiques</h1>
          <p className="text-sm text-gray-500">{shops.length} boutique(s)</p>
        </div>
        <Link
          href="/admin/boutiques/create"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvelle boutique
        </Link>
      </div>

      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher une boutique..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {shops.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl">
          <Store className="h-12 w-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Aucune boutique</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shops.map((shop) => (
            <div key={shop._id} className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  {shop.logo ? (
                    <img src={shop.logo} alt={shop.name} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Store className="h-6 w-6 text-blue-600" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="font-semibold text-gray-800 truncate">{shop.name}</h3>
                    {shop.verified && <Star className="h-3 w-3 text-blue-500 fill-blue-500" />}
                  </div>
                  <p className="text-xs text-gray-500">{shop.ownerName}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <MapPin className="h-3 w-3" />
                    {shop.address?.split(',')[0]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs mb-3">
                <span className={`px-2 py-0.5 rounded-full ${
                  shop.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                }`}>
                  {shop.status}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">
                  {shop.subscription?.plan || 'free'}
                </span>
              </div>

              <div className="flex gap-2 pt-3 border-t">
                <Link
                  href={`/boutiques/${shop.sector?.slug}/${shop.slug}`}
                  target="_blank"
                  className="flex-1 text-center text-xs py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Voir
                </Link>
                <Link
                  href={`/admin/boutiques/${shop._id}/edit`}
                  className="flex-1 text-center text-xs py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg transition-colors"
                >
                  Modifier
                </Link>
                <button
                  onClick={() => handleDelete(shop._id)}
                  className="flex-1 text-xs py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
