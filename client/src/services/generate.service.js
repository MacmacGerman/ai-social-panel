import api from '../config/api'

export const generateService = {
    // Generate property description
    generatePropertyDescription: async (propertyData) => {
        const { data } = await api.post('/generate/property', propertyData)
        return data.description
    },

    // New Gemini Methods
    generatePost: async (topic, platform, tone) => {
        const { data } = await api.post('/generate/post', { topic, platform, tone })
        return data
    },

    generateHashtags: async (topic, platform, count) => {
        const { data } = await api.post('/generate/hashtags', { topic, platform, count })
        return data.hashtags
    },

    generateIdeas: async (niche, platform, count) => {
        const { data } = await api.post('/generate/ideas', { niche, platform, count })
        return data.ideas
    },

    generateCaption: async (topic, platform, tone) => {
        const { data } = await api.post('/generate/caption', { topic, platform, tone })
        return data.caption
    }
}

export default generateService
