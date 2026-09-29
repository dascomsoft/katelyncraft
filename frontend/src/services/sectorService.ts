import api from './api'

export interface Sector {
  _id: string
  name: string
  slug: string
  description: string
  icon: string
  color: string
  image?: string
  active: boolean
  order: number
  shopCount?: number
}

export const sectorService = {
  getSectors: async (params?: { active?: boolean }): Promise<Sector[]> => {
    try {
      const { data } = await api.get('/sectors', { params })
      return data.sectors || []
    } catch (error) {
      console.error('Error fetching sectors:', error)
      return []
    }
  },

  getSectorBySlug: async (slug: string) => {
    try {
      const { data } = await api.get(`/sectors/${slug}`)
      return data
    } catch (error) {
      console.error('Error fetching sector:', error)
      return null
    }
  }
}
