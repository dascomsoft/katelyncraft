// 'use client'

// import { useEffect, useState } from 'react'
// import Link from 'next/link'
// import Image from 'next/image'
// import { Plus, Search, Edit, Trash2, Eye, Package, ChevronLeft, ChevronRight } from 'lucide-react'
// import { productService } from '@/services/productService'
// import { Product } from '@/types'
// import toast from 'react-hot-toast'

// export default function AdminProducts() {
//   const [products, setProducts] = useState<Product[]>([])
//   const [loading, setLoading] = useState(true)
//   const [search, setSearch] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)

//   const fetchProducts = async () => {
//     try {
//       setLoading(true)
//       const response = await productService.getProducts({
//         search: search || undefined,
//         page: currentPage,
//         limit: 10
//       })
//       setProducts(response.products || [])
//       setTotalPages(response.pagination?.pages || 1)
//     } catch (error) {
//       console.error('Error fetching products:', error)
//       toast.error('Erreur lors du chargement des produits')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchProducts()
//   }, [currentPage, search])

//   const handleDelete = async (id: string) => {
//     if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return

//     try {
//       const success = await productService.deleteProduct(id)
//       if (success) {
//         toast.success('Produit supprimé avec succès')
//         fetchProducts()
//       } else {
//         toast.error('Erreur lors de la suppression')
//       }
//     } catch (error) {
//       console.error('Error deleting product:', error)
//       toast.error('Erreur lors de la suppression')
//     }
//   }

//   const handleToggleAvailability = async (id: string) => {
//     try {
//       const result = await productService.toggleProductAvailability(id)
//       if (result) {
//         toast.success(`Produit ${result.available ? 'disponible' : 'indisponible'}`)
//         fetchProducts()
//       } else {
//         toast.error('Erreur lors du changement de statut')
//       }
//     } catch (error) {
//       console.error('Error toggling availability:', error)
//       toast.error('Erreur lors du changement de statut')
//     }
//   }

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="px-4 py-4 sm:px-6 lg:px-8">
//       {/* ── Header ─────────────────────────────────────────── */}
//       <div className="flex items-center justify-between gap-3 mb-5">
//         <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Produits</h1>
//         <Link
//           href="/admin/products/create"
//           className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl transition-colors w-11 h-11 sm:w-auto sm:h-auto sm:px-4 sm:py-2.5 shadow-sm"
//           aria-label="Ajouter un produit"
//         >
//           <Plus className="h-5 w-5 sm:h-4 sm:w-4 sm:mr-2" />
//           <span className="hidden sm:inline">Ajouter un produit</span>
//         </Link>
//       </div>

//       {/* ── Recherche ──────────────────────────────────────── */}
//       <div className="mb-5">
//         <div className="relative">
//           <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//           <input
//             type="search"
//             inputMode="search"
//             placeholder="Rechercher un produit..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="w-full pl-10 pr-4 py-3 sm:py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm text-[16px] sm:text-sm"
//           />
//         </div>
//       </div>

//       {/* ── Liste produits ─────────────────────────────────── */}
//       {products.length === 0 ? (
//         <div className="bg-white rounded-2xl shadow-sm py-16 flex flex-col items-center">
//           <Package className="h-14 w-14 text-gray-200 mb-3" />
//           <p className="text-gray-500">Aucun produit trouvé</p>
//         </div>
//       ) : (
//         <>
//           {/* Mobile : cartes */}
//           <div className="space-y-3 md:hidden">
//             {products.map((product) => (
//               <article
//                 key={product._id}
//                 className="bg-white rounded-2xl shadow-sm border border-gray-100 p-3.5"
//               >
//                 {/* Ligne 1 : image + infos principales */}
//                 <div className="flex gap-3">
//                   <div className="w-16 h-16 bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
//                     {product.images && product.images[0] ? (
//                       <Image
//                         src={product.images[0]}
//                         alt={product.name}
//                         width={64}
//                         height={64}
//                         className="object-cover w-full h-full"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center text-gray-300">
//                         <Package className="h-7 w-7" />
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex-1 min-w-0">
//                     <p className="font-semibold text-gray-800 text-sm leading-snug line-clamp-2">
//                       {product.name}
//                     </p>
//                     <p className="text-xs text-gray-400 truncate mt-0.5">
//                       {product.description?.substring(0, 60)}
//                     </p>
//                     <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
//                       <span className="font-bold text-blue-700 text-sm">
//                         {product.price.toLocaleString()} FCFA
//                       </span>
//                       {product.oldPrice && (
//                         <span className="text-xs text-gray-400 line-through">
//                           {product.oldPrice.toLocaleString()} FCFA
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Ligne 2 : badges stock + statut */}
//                 <div className="flex items-center gap-2 mt-3">
//                   <span
//                     className={`px-2.5 py-1 rounded-full text-xs font-medium ${
//                       product.stock > 10
//                         ? 'bg-green-100 text-green-700'
//                         : product.stock > 0
//                           ? 'bg-yellow-100 text-yellow-700'
//                           : 'bg-red-100 text-red-700'
//                     }`}
//                   >
//                     {product.stock > 0 ? `${product.stock} unités` : 'Rupture'}
//                   </span>

//                   <button
//                     onClick={() => handleToggleAvailability(product._id)}
//                     className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
//                       product.available && product.stock > 0
//                         ? 'bg-green-100 text-green-700 active:bg-green-200'
//                         : 'bg-red-100 text-red-700 active:bg-red-200'
//                     }`}
//                   >
//                     {product.available && product.stock > 0 ? 'Disponible' : 'Indisponible'}
//                   </button>
//                 </div>

//                 {/* Ligne 3 : actions (zones tactiles ≥ 40px) */}
//                 <div className="flex items-center justify-start gap-1 mt-3 pt-3 border-t border-gray-100">
//                   <Link
//                     href={`/products/${product.slug}`}
//                     target="_blank"
//                     className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-gray-500 active:bg-gray-100 transition-colors"
//                   >
//                     <Eye className="h-4 w-4" />
//                     Voir
//                   </Link>
//                   <Link
//                     href={`/admin/products/${product._id}/edit`}
//                     className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-blue-600 active:bg-blue-50 transition-colors"
//                   >
//                     <Edit className="h-4 w-4" />
//                     Modifier
//                   </Link>
//                   <button
//                     onClick={() => handleDelete(product._id)}
//                     className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-red-600 active:bg-red-50 transition-colors"
//                   >
//                     <Trash2 className="h-4 w-4" />
//                     Supprimer
//                   </button>
//                 </div>
//               </article>
//             ))}
//           </div>

//           {/* Desktop : tableau */}
//           <div className="hidden md:block bg-white rounded-xl shadow-sm overflow-hidden">
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Produit
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Prix
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Stock
//                     </th>
//                     <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Statut
//                     </th>
//                     <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {products.map((product) => (
//                     <tr key={product._id} className="hover:bg-gray-50 transition-colors">
//                       <td className="px-4 py-3">
//                         <div className="flex items-center gap-3">
//                           <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
//                             {product.images && product.images[0] ? (
//                               <Image
//                                 src={product.images[0]}
//                                 alt={product.name}
//                                 width={48}
//                                 height={48}
//                                 className="object-cover w-full h-full"
//                               />
//                             ) : (
//                               <div className="w-full h-full flex items-center justify-center text-gray-400">
//                                 <Package className="h-6 w-6" />
//                               </div>
//                             )}
//                           </div>
//                           <div>
//                             <p className="font-medium text-gray-800">{product.name}</p>
//                             <p className="text-sm text-gray-500 truncate max-w-xs">
//                               {product.description?.substring(0, 50)}...
//                             </p>
//                           </div>
//                         </div>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className="font-semibold text-gray-800">
//                           {product.price.toLocaleString()} FCFA
//                         </span>
//                         {product.oldPrice && (
//                           <span className="text-sm text-gray-400 line-through ml-2">
//                             {product.oldPrice.toLocaleString()} FCFA
//                           </span>
//                         )}
//                       </td>
//                       <td className="px-4 py-3">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-medium ${
//                             product.stock > 10
//                               ? 'bg-green-100 text-green-700'
//                               : product.stock > 0
//                                 ? 'bg-yellow-100 text-yellow-700'
//                                 : 'bg-red-100 text-red-700'
//                           }`}
//                         >
//                           {product.stock > 0 ? `${product.stock} unités` : 'Rupture'}
//                         </span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <button
//                           onClick={() => handleToggleAvailability(product._id)}
//                           className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
//                             product.available && product.stock > 0
//                               ? 'bg-green-100 text-green-700 hover:bg-green-200'
//                               : 'bg-red-100 text-red-700 hover:bg-red-200'
//                           }`}
//                         >
//                           {product.available && product.stock > 0 ? 'Disponible' : 'Indisponible'}
//                         </button>
//                       </td>
//                       <td className="px-4 py-3">
//                         <div className="flex items-center justify-end gap-2">
//                           <Link
//                             href={`/products/${product.slug}`}
//                             target="_blank"
//                             className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
//                             title="Voir"
//                           >
//                             <Eye className="h-4 w-4" />
//                           </Link>
//                           <Link
//                             href={`/admin/products/${product._id}/edit`}
//                             className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors"
//                             title="Modifier"
//                           >
//                             <Edit className="h-4 w-4" />
//                           </Link>
//                           <button
//                             onClick={() => handleDelete(product._id)}
//                             className="p-1.5 text-gray-400 hover:text-red-600 transition-colors"
//                             title="Supprimer"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </>
//       )}

//       {/* ── Pagination ─────────────────────────────────────── */}
//       {totalPages > 1 && (
//         <div className="mt-4 bg-white rounded-xl shadow-sm border border-gray-100 px-4 py-3 flex items-center justify-between gap-3">
//           <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
//             {currentPage} / {totalPages}
//           </span>
//           <div className="flex gap-2 flex-1 sm:flex-none justify-end">
//             <button
//               onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//               disabled={currentPage === 1}
//               className="flex items-center justify-center gap-1 px-3 py-2.5 sm:py-1.5 border border-gray-200 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed active:bg-gray-50 transition-colors"
//             >
//               <ChevronLeft className="h-4 w-4" />
//               <span className="sm:hidden">Préc.</span>
//               <span className="hidden sm:inline">Précédent</span>
//             </button>
//             <button
//               onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//               disabled={currentPage === totalPages}
//               className="flex items-center justify-center gap-1 px-3 py-2.5 sm:py-1.5 border border-gray-200 rounded-xl text-sm disabled:opacity-40 disabled:cursor-not-allowed active:bg-gray-50 transition-colors"
//             >
//               <span className="sm:hidden">Suiv.</span>
//               <span className="hidden sm:inline">Suivant</span>
//               <ChevronRight className="h-4 w-4" />
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }













'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Package,
  ChevronLeft,
  ChevronRight,
  Gem,
  Crown,
  Sparkles,
  AlertCircle,
} from 'lucide-react'
import { productService } from '@/services/productService'
import { Product } from '@/types'
import toast from 'react-hot-toast'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const fetchProducts = async () => {
    try {
      setLoading(true)
      const response = await productService.getProducts({
        search: search || undefined,
        page: currentPage,
        limit: 10,
      })
      setProducts(response.products || [])
      setTotalPages(response.pagination?.pages || 1)
    } catch (error) {
      console.error('Error fetching products:', error)
      toast.error('Erreur lors du chargement des produits')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [currentPage, search])

  const handleDelete = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return

    try {
      const success = await productService.deleteProduct(id)
      if (success) {
        toast.success('Produit supprimé avec succès')
        fetchProducts()
      } else {
        toast.error('Erreur lors de la suppression')
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      toast.error('Erreur lors de la suppression')
    }
  }

  const handleToggleAvailability = async (id: string) => {
    try {
      const result = await productService.toggleProductAvailability(id)
      if (result) {
        toast.success(
          `Produit ${result.available ? 'disponible' : 'indisponible'}`
        )
        fetchProducts()
      } else {
        toast.error('Erreur lors du changement de statut')
      }
    } catch (error) {
      console.error('Error toggling availability:', error)
      toast.error('Erreur lors du changement de statut')
    }
  }

  /* ═══════════════════════════════════════
     CHARGEMENT
  ═══════════════════════════════════════ */
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rounded-full border-2 border-[#B8925A]/20" />
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-[#B8925A]" />
          </div>
          <p className="font-serif text-sm italic text-[#8B7B7F]">
            Chargement des créations…
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* ═══════════════════════════════════════
          EN-TÊTE
      ═══════════════════════════════════════ */}
      <div className="mb-6 flex items-center justify-between gap-3 sm:mb-8">
        <div className="min-w-0">
          <div className="mb-2 hidden items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#B8925A] sm:flex">
            <Gem className="h-3 w-3" />
            <span>Atelier · Gestion</span>
          </div>
          <h1 className="truncate font-serif text-2xl leading-tight text-[#2A1520] sm:text-3xl">
            Nos <span className="italic text-[#B8925A]">créations</span>
          </h1>
        </div>

        <Link
          href="/admin/products/create"
          aria-label="Ajouter une création"
          className="group inline-flex h-11 w-11 flex-shrink-0 items-center justify-center gap-2 rounded-full bg-[#2A1520] text-[#FAF6EF] shadow-[0_10px_30px_-10px_rgba(42,21,32,0.5)] transition-all duration-300 hover:bg-[#4A2540] hover:shadow-[0_15px_40px_-10px_rgba(74,37,64,0.6)] sm:h-auto sm:w-auto sm:px-5 sm:py-3"
        >
          <Plus className="h-5 w-5 sm:h-4 sm:w-4" />
          <span className="hidden text-xs font-semibold uppercase tracking-[0.12em] sm:inline">
            Nouvelle pièce
          </span>
        </Link>
      </div>

      {/* ═══════════════════════════════════════
          RECHERCHE
      ═══════════════════════════════════════ */}
      <div className="mb-6 sm:mb-8">
        <div className="group relative overflow-hidden rounded-full border border-[#B8925A]/20 bg-white shadow-[0_15px_40px_-25px_rgba(74,37,64,0.2)] transition-all duration-300 focus-within:border-[#B8925A] focus-within:shadow-[0_20px_50px_-20px_rgba(184,146,90,0.35)]">
          <div className="pointer-events-none absolute left-3.5 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF] transition-colors duration-300 group-focus-within:border-[#B8925A] group-focus-within:bg-[#B8925A]">
            <Search className="h-3.5 w-3.5 text-[#B8925A] transition-colors duration-300 group-focus-within:text-white" />
          </div>
          <input
            type="search"
            inputMode="search"
            placeholder="Rechercher une création…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent py-3.5 pl-14 pr-4 font-serif text-[15px] text-[#2A1520] placeholder-[#A89298] outline-none sm:py-3.5 sm:text-sm"
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════
          LISTE PRODUITS
      ═══════════════════════════════════════ */}
      {products.length === 0 ? (
        /* ── État vide ── */
        <div className="rounded-3xl border border-[#B8925A]/15 bg-white px-6 py-16 text-center shadow-[0_25px_60px_-30px_rgba(74,37,64,0.15)]">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-[#B8925A]/25 bg-[#FAF6EF]">
            <Package className="h-7 w-7 text-[#B8925A]" />
          </div>
          <p className="mb-1 font-serif text-lg text-[#2A1520]">
            Aucune création trouvée
          </p>
          <p className="text-sm leading-relaxed text-[#5B4A50]">
            {search
              ? `Aucun résultat pour « ${search} »`
              : 'Commencez par ajouter votre première pièce.'}
          </p>
        </div>
      ) : (
        <>
          {/* ═══════════ MOBILE : CARTES ═══════════ */}
          <div className="space-y-3 md:hidden">
            {products.map((product) => (
              <article
                key={product._id}
                className="group relative overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white p-4 transition-all duration-300 hover:border-[#B8925A]/40 hover:shadow-[0_20px_50px_-25px_rgba(74,37,64,0.2)]"
              >
                {/* Ligne 1 : image + infos */}
                <div className="flex gap-3.5">
                  <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-[#B8925A]/15 bg-[#FAF6EF]">
                    {product.images && product.images[0] ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/30">
                        <Gem className="h-6 w-6 text-[#B8925A]/50" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="line-clamp-2 font-serif text-[14px] font-medium leading-snug text-[#2A1520]">
                      {product.name}
                    </p>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-[#8B7B7F]">
                      {product.description?.substring(0, 60)}
                    </p>
                    <div className="mt-2 flex flex-wrap items-baseline gap-2">
                      <span className="font-serif text-[15px] font-semibold text-[#B8925A]">
                        {product.price.toLocaleString()}{' '}
                        <span className="text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                          FCFA
                        </span>
                      </span>
                      {product.oldPrice && (
                        <span className="text-[11px] text-[#8B7B7F] line-through">
                          {product.oldPrice.toLocaleString()} FCFA
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Ligne 2 : badges */}
                <div className="mt-3.5 flex flex-wrap items-center gap-2">
                  {/* Badge stock */}
                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                      product.stock > 10
                        ? 'border-[#B8925A]/40 bg-[#FAF6EF] text-[#B8925A]'
                        : product.stock > 0
                        ? 'border-[#D4B87A]/50 bg-[#FAF6EF] text-[#D4B87A]'
                        : 'border-[#5B4A50]/30 bg-[#E8D5D0]/30 text-[#5B4A50]'
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        product.stock > 10
                          ? 'bg-[#B8925A]'
                          : product.stock > 0
                          ? 'bg-[#D4B87A]'
                          : 'bg-[#5B4A50]'
                      }`}
                    />
                    {product.stock > 0
                      ? `${product.stock} unités`
                      : 'Rupture'}
                  </span>

                  {/* Badge disponibilité */}
                  <button
                    onClick={() => handleToggleAvailability(product._id)}
                    aria-label={`Marquer comme ${
                      product.available && product.stock > 0
                        ? 'indisponible'
                        : 'disponible'
                    }`}
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                      product.available && product.stock > 0
                        ? 'border-[#B8925A]/40 bg-[#B8925A]/10 text-[#B8925A] active:bg-[#B8925A]/20'
                        : 'border-[#8B7B7F]/30 bg-[#FAF6EF] text-[#8B7B7F] active:bg-[#E8D5D0]/40'
                    }`}
                  >
                    {product.available && product.stock > 0 ? (
                      <>
                        <Sparkles className="h-2.5 w-2.5" />
                        Disponible
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-2.5 w-2.5" />
                        Indisponible
                      </>
                    )}
                  </button>
                </div>

                {/* Ligne 3 : actions */}
                <div className="mt-4 flex items-center gap-1.5 border-t border-[#B8925A]/15 pt-3">
                  <Link
                    href={`/products/${product.slug}`}
                    target="_blank"
                    aria-label={`Voir ${product.name}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5B4A50] transition-all duration-300 active:border-[#B8925A]/30 active:bg-[#FAF6EF]"
                  >
                    <Eye className="h-3.5 w-3.5" />
                    Voir
                  </Link>

                  <Link
                    href={`/admin/products/${product._id}/edit`}
                    aria-label={`Modifier ${product.name}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8925A] transition-all duration-300 active:border-[#B8925A]/30 active:bg-[#FAF6EF]"
                  >
                    <Edit className="h-3.5 w-3.5" />
                    Modifier
                  </Link>

                  <button
                    onClick={() => handleDelete(product._id)}
                    aria-label={`Supprimer ${product.name}`}
                    className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-transparent px-2 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#5B4A50] transition-all duration-300 active:border-[#5B4A50]/30 active:bg-[#E8D5D0]/30"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Suppr.
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* ═══════════ DESKTOP : TABLEAU ═══════════ */}
          <div className="hidden md:block">
            <div className="overflow-hidden rounded-2xl border border-[#B8925A]/15 bg-white shadow-[0_25px_60px_-30px_rgba(74,37,64,0.2)]">
              {/* Liseré doré supérieur */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-[#B8925A]/40 to-transparent" />

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-[#B8925A]/15 bg-[#FAF6EF]">
                    <tr>
                      <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                        <span className="inline-flex items-center gap-1.5">
                          <Gem className="h-3 w-3 text-[#B8925A]" />
                          Création
                        </span>
                      </th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                        Prix
                      </th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                        Stock
                      </th>
                      <th className="px-5 py-3.5 text-left text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                        Statut
                      </th>
                      <th className="px-5 py-3.5 text-right text-[10px] font-semibold uppercase tracking-[0.2em] text-[#8B7B7F]">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#B8925A]/10">
                    {products.map((product) => (
                      <tr
                        key={product._id}
                        className="group transition-colors duration-300 hover:bg-[#FAF6EF]/60"
                      >
                        {/* Produit */}
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3.5">
                            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-xl border border-[#B8925A]/15 bg-[#FAF6EF]">
                              {product.images && product.images[0] ? (
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  width={48}
                                  height={48}
                                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#E8D5D0] via-[#FAF6EF] to-[#D4B87A]/30">
                                  <Gem className="h-5 w-5 text-[#B8925A]/50" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="truncate font-serif text-[14px] font-medium text-[#2A1520]">
                                {product.name}
                              </p>
                              <p className="mt-0.5 max-w-xs truncate text-[11px] text-[#8B7B7F]">
                                {product.description?.substring(0, 50)}...
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Prix */}
                        <td className="px-5 py-4">
                          <div className="flex flex-wrap items-baseline gap-2">
                            <span className="font-serif text-[14px] font-semibold text-[#B8925A]">
                              {product.price.toLocaleString()}
                              <span className="ml-1 text-[10px] uppercase tracking-[0.15em] text-[#8B7B7F]">
                                FCFA
                              </span>
                            </span>
                            {product.oldPrice && (
                              <span className="text-[11px] text-[#8B7B7F] line-through">
                                {product.oldPrice.toLocaleString()}
                              </span>
                            )}
                          </div>
                        </td>

                        {/* Stock */}
                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                              product.stock > 10
                                ? 'border-[#B8925A]/40 bg-[#FAF6EF] text-[#B8925A]'
                                : product.stock > 0
                                ? 'border-[#D4B87A]/50 bg-[#FAF6EF] text-[#D4B87A]'
                                : 'border-[#5B4A50]/30 bg-[#E8D5D0]/30 text-[#5B4A50]'
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                product.stock > 10
                                  ? 'bg-[#B8925A]'
                                  : product.stock > 0
                                  ? 'bg-[#D4B87A]'
                                  : 'bg-[#5B4A50]'
                              }`}
                            />
                            {product.stock > 0
                              ? `${product.stock} unités`
                              : 'Rupture'}
                          </span>
                        </td>

                        {/* Disponibilité */}
                        <td className="px-5 py-4">
                          <button
                            onClick={() =>
                              handleToggleAvailability(product._id)
                            }
                            className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] transition-all duration-300 ${
                              product.available && product.stock > 0
                                ? 'border-[#B8925A]/40 bg-[#B8925A]/10 text-[#B8925A] hover:border-[#B8925A] hover:bg-[#B8925A] hover:text-white'
                                : 'border-[#8B7B7F]/30 bg-[#FAF6EF] text-[#8B7B7F] hover:border-[#8B7B7F]/60 hover:bg-[#E8D5D0]/40'
                            }`}
                          >
                            {product.available && product.stock > 0 ? (
                              <>
                                <Sparkles className="h-2.5 w-2.5" />
                                Disponible
                              </>
                            ) : (
                              <>
                                <AlertCircle className="h-2.5 w-2.5" />
                                Indisponible
                              </>
                            )}
                          </button>
                        </td>

                        {/* Actions */}
                        <td className="px-5 py-4">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              href={`/products/${product.slug}`}
                              target="_blank"
                              title="Voir la création"
                              aria-label={`Voir ${product.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B8925A]/20 text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] hover:text-[#B8925A]"
                            >
                              <Eye className="h-3.5 w-3.5" />
                            </Link>
                            <Link
                              href={`/admin/products/${product._id}/edit`}
                              title="Modifier la création"
                              aria-label={`Modifier ${product.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B8925A]/20 text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] hover:text-[#B8925A]"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Link>
                            <button
                              onClick={() => handleDelete(product._id)}
                              title="Supprimer la création"
                              aria-label={`Supprimer ${product.name}`}
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#B8925A]/20 text-[#8B7B7F] transition-all duration-300 hover:border-[#5B4A50]/60 hover:bg-[#E8D5D0]/30 hover:text-[#5B4A50]"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ═══════════════════════════════════════
          PAGINATION
      ═══════════════════════════════════════ */}
      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-[#B8925A]/15 bg-white px-4 py-3 shadow-[0_15px_40px_-25px_rgba(74,37,64,0.15)] sm:mt-6 sm:px-5 sm:py-3.5">
          <span className="flex items-center gap-2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8B7B7F] sm:text-[11px]">
            <Crown className="h-3 w-3 text-[#B8925A]" />
            Page
            <span className="font-serif text-sm font-semibold normal-case tracking-normal text-[#B8925A]">
              {currentPage}
            </span>
            <span className="hidden sm:inline">sur</span>
            <span className="font-serif text-sm font-semibold normal-case tracking-normal text-[#B8925A]">
              {totalPages}
            </span>
          </span>

          <div className="flex flex-1 justify-end gap-2 sm:flex-none">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              aria-label="Page précédente"
              className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#B8925A]/25 disabled:hover:bg-[#FDFBF7] sm:py-2"
            >
              <ChevronLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
              <span className="sm:hidden">Préc.</span>
              <span className="hidden sm:inline">Précédent</span>
            </button>

            <button
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={currentPage === totalPages}
              aria-label="Page suivante"
              className="group inline-flex items-center justify-center gap-1.5 rounded-full border border-[#B8925A]/25 bg-[#FDFBF7] px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#4A2540] transition-all duration-300 hover:border-[#B8925A] hover:bg-[#FAF6EF] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[#B8925A]/25 disabled:hover:bg-[#FDFBF7] sm:py-2"
            >
              <span className="sm:hidden">Suiv.</span>
              <span className="hidden sm:inline">Suivant</span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}