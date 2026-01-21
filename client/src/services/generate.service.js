import api from '../config/api'

// AI Generation Service
export const generateService = {
    // Generate caption
    generateCaption: async (topic, platform, tone) => {
        const { data } = await api.post('/generate/caption', {
            topic,
            platform,
            tone
        })
        return data.caption
    },

    // Generate hashtags
    generateHashtags: async (topic, platform, count = 10) => {
        const { data } = await api.post('/generate/hashtags', {
            topic,
            platform,
            count
        })
        return data.hashtags
    },

    // Generate content ideas
    generateIdeas: async (niche, platform, count = 5) => {
        const { data } = await api.post('/generate/ideas', {
            niche,
            platform,
            count
        })
        return data.ideas
    },

    // Generate complete post
    generatePost: async (topic, platform, tone) => {
        const { data } = await api.post('/generate/post', {
            topic,
            platform,
            tone
        })
        return data
    }
}

export default generateService
