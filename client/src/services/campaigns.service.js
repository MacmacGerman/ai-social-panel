import api from '../config/api'

// Campaigns Service
export const campaignsService = {
    // Get all campaigns
    getAll: async (filters = {}) => {
        const params = new URLSearchParams()
        if (filters.status) params.append('status', filters.status)

        const { data } = await api.get(`/campaigns?${params}`)
        return data.campaigns
    },

    // Get single campaign
    getById: async (id) => {
        const { data } = await api.get(`/campaigns/${id}`)
        return data.campaign
    },

    // Create campaign
    create: async (campaignData) => {
        const { data } = await api.post('/campaigns', campaignData)
        return data.campaign
    },

    // Update campaign
    update: async (id, updates) => {
        const { data } = await api.put(`/campaigns/${id}`, updates)
        return data.campaign
    },

    // Delete campaign
    delete: async (id) => {
        const { data } = await api.delete(`/campaigns/${id}`)
        return data
    },

    // Get campaign posts
    getPosts: async (id) => {
        const { data } = await api.get(`/campaigns/${id}/posts`)
        return data.posts
    }
}

export default campaignsService
