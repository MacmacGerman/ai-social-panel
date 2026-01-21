import api from '../config/api'

// Posts Service
export const postsService = {
    // Get all posts
    getAll: async (filters = {}) => {
        const params = new URLSearchParams()
        if (filters.status) params.append('status', filters.status)
        if (filters.platform) params.append('platform', filters.platform)
        if (filters.campaign_id) params.append('campaign_id', filters.campaign_id)

        const { data } = await api.get(`/posts?${params}`)
        return data.posts
    },

    // Get single post
    getById: async (id) => {
        const { data } = await api.get(`/posts/${id}`)
        return data.post
    },

    // Create post
    create: async (postData) => {
        const { data } = await api.post('/posts', postData)
        return data.post
    },

    // Update post
    update: async (id, updates) => {
        const { data } = await api.put(`/posts/${id}`, updates)
        return data.post
    },

    // Delete post
    delete: async (id) => {
        const { data } = await api.delete(`/posts/${id}`)
        return data
    },

    // Publish post
    publish: async (id) => {
        const { data } = await api.post(`/posts/${id}/publish`)
        return data.post
    }
}

export default postsService
