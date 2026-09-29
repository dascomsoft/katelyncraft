import api from './api'

export interface Shop {
  _id: string
  name: string
  slug: string
  sector: any
  description: string
  logo: string
  coverImage: string
  ownerName: string
  ownerPhone: string
  whatsappNumber: string
  email: string
  address: string
  status: string
  verified: boolean
  featured: boolean
  subscription: any
  rating: number
  totalProducts: number
}

export const shopService = {
  getShops: async (params?: any): Promise<Shop[]> => {
    try {
      const { data } = await api.get('/shops', { params })
      return data.shops || []
    } catch (error) {
      console.error('Error fetching shops:', error)
      return []
    }
  },

  getShopBySlug: async (slug: string) => {
    try {
      const { data } = await api.get(`/shops/${slug}`)
      return data
    } catch (error) {
      console.error('Error fetching shop:', error)
      return null
    }
  },

  createShop: async (shop: Partial<Shop>) => {
    const { data } = await api.post('/shops', shop)
    return data.shop
  },

  updateShop: async (id: string, shop: Partial<Shop>) => {
    const { data } = await api.put(`/shops/${id}`, shop)
    return data.shop
  },

  deleteShop: async (id: string) => {
    await api.delete(`/shops/${id}`)
  }
}
