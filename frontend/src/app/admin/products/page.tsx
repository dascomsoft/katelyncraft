'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Search, Edit, Trash2, Eye, Package, Store } from 'lucide-react'
import { productService } from '@/services/productService'
import { shopService, Shop } from '@/services/shopService'
import { Product } from '@/types'
import toast from 'react-hot-toast'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [shops, setShops] = useState<Shop[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [shopFilter, setShopFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const params: any = {
        search: search || undefined,
        page: currentPage,
        limit: 10
      }
      if (shopFilter) params.shop = shopFilter
      
      const response = await productService.getProducts(params)
      setProducts(response.products || [])
      setTotalPages(response.pagination?.pages || 1)
    } catch (error) {
      console.error('Error:', error)
      toast.error('Erreur lors du chargement')
    } finally {
      setLoading(false)
    }
  }

  const fetchShops = async () => {
    try {
      const data = await shopService.getShops()
      setShops(data)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => { fetchShops() }, [])
  useEffect(() => { fetchProducts() }, [currentPage, search, shopFilter])

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit ?')) return
    try {
      await productService.deleteProduct(id)
      toast.success('Produit supprimé')
      fetchProducts()
    } catch (error) {
      toast.error('Erreur lors de la suppression')
    }
  }

  const handleToggleAvailability = async (id: string) => {
    try {
      const result = await productService.toggleProductAvailability(id)
      if (result) {
        toast.success(`Produit ${result.available ? 'disponible' : 'indisponible'}`)
        fetchProducts()
      }
    } catch (error) {
      toast.error('Erreur')
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
        <h1 className="text-2xl font-bold text-gray-800">Produits</h1>
        <Link
          href="/admin/products/create"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter un produit
        </Link>
      </div>

      {/* Filtres */}
      <div className="mb-6 grid md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* ⭐ FILTRE PAR BOUTIQUE */}
        <div className="relative">
          <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <select
            value={shopFilter}
            onChange={(e) => { setShopFilter(e.target.value); setCurrentPage(1) }}
            className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
          >
            <option value="">Toutes les boutiques</option>
            <option value="null">🏪 KATELYNCRAFT (principale)</option>
            {shops.map(shop => (
              <option key={shop._id} value={shop._id}>🏬 {shop.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produit</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Boutique</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Prix</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Statut</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                    <Package className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                    Aucun produit trouvé
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {product.images?.[0] ? (
                            <Image src={product.images[0]} alt={product.name} width={48} height={48} className="object-cover w-full h-full" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center"><Package className="h-6 w-6 text-gray-400" /></div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">{product.name}</p>
                          <p className="text-sm text-gray-500 truncate max-w-xs">
                            {product.description?.substring(0, 50)}...
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {product.shop ? (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                          🏬 {product.shop.name}
                        </span>
                      ) : (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          🏪 Principale
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 font-semibold text-gray-800">
                      {product.price.toLocaleString()} FCFA
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        product.stock > 10 ? 'bg-green-100 text-green-700'
                        : product.stock > 0 ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stock > 0 ? `${product.stock}` : 'Rupture'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleAvailability(product._id)}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.available && product.stock > 0
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {product.available && product.stock > 0 ? 'Disponible' : 'Indisponible'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/products/${product.slug}`} target="_blank" className="p-1.5 text-gray-400 hover:text-blue-600">
                          <Eye className="h-4 w-4" />
                        </Link>
                        <Link href={`/admin/products/${product._id}/edit`} className="p-1.5 text-gray-400 hover:text-blue-600">
                          <Edit className="h-4 w-4" />
                        </Link>
                        <button onClick={() => handleDelete(product._id)} className="p-1.5 text-gray-400 hover:text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="px-4 py-3 border-t flex justify-between items-center">
            <span className="text-sm text-gray-500">Page {currentPage} sur {totalPages}</span>
            <div className="flex gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}
                className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50">Précédent</button>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded-lg text-sm disabled:opacity-50">Suivant</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}



