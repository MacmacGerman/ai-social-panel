import { model } from '../config/gemini.js'

// Generate caption
export const generateCaption = async (req, res, next) => {
    try {
        const { topic, platform, tone } = req.body

        const prompt = `Generate a ${tone} social media caption for ${platform} about: ${topic}

Requirements:
- Platform: ${platform}
- Tone: ${tone}
- Include relevant emojis
- Keep it engaging and concise
- ${platform === 'instagram' ? 'Optimal length: 125-150 characters' : ''}
- ${platform === 'tiktok' ? 'Make it catchy and trend-focused' : ''}
- ${platform === 'youtube' ? 'Include a call-to-action' : ''}

Generate only the caption, no explanations.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const caption = response.text()

        res.json({
            caption: caption.trim()
        })
    } catch (error) {
        next(error)
    }
}

// Generate hashtags
export const generateHashtags = async (req, res, next) => {
    try {
        const { topic, platform, count = 10 } = req.body

        const prompt = `Generate ${count} relevant hashtags for ${platform} about: ${topic}

Requirements:
- Platform: ${platform}
- Number of hashtags: ${count}
- Mix of popular and niche hashtags
- Relevant to the topic
- No spaces in hashtags

Return only the hashtags separated by spaces, starting with #`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const hashtagsText = response.text()

        // Parse hashtags
        const hashtags = hashtagsText
            .trim()
            .split(/\s+/)
            .filter(tag => tag.startsWith('#'))
            .slice(0, count)

        res.json({
            hashtags
        })
    } catch (error) {
        next(error)
    }
}

// Generate content ideas
export const generateIdeas = async (req, res, next) => {
    try {
        const { niche, platform, count = 5 } = req.body

        const prompt = `Generate ${count} creative content ideas for ${platform} in the ${niche} niche.

Requirements:
- Platform: ${platform}
- Niche: ${niche}
- Number of ideas: ${count}
- Each idea should be unique and engaging
- Consider current trends
- Make them actionable

Format: Return as a numbered list, one idea per line.`

        const result = await model.generateContent(prompt)
        const response = await result.response
        const ideasText = response.text()

        // Parse ideas
        const ideas = ideasText
            .trim()
            .split('\n')
            .filter(line => line.trim())
            .map(line => line.replace(/^\d+\.\s*/, '').trim())
            .filter(idea => idea.length > 0)
            .slice(0, count)

        res.json({
            ideas
        })
    } catch (error) {
        next(error)
    }
}

// Generate complete post
export const generatePost = async (req, res, next) => {
    try {
        const { topic, platform, tone } = req.body

        // Generate caption
        const captionPrompt = `Generate a ${tone} social media caption for ${platform} about: ${topic}. Keep it engaging and concise. Include emojis.`
        const captionResult = await model.generateContent(captionPrompt)
        const captionResponse = await captionResult.response
        const caption = captionResponse.text().trim()

        // Generate hashtags
        const hashtagsPrompt = `Generate 10 relevant hashtags for ${platform} about: ${topic}. Return only hashtags separated by spaces.`
        const hashtagsResult = await model.generateContent(hashtagsPrompt)
        const hashtagsResponse = await hashtagsResult.response
        const hashtagsText = hashtagsResponse.text()
        const hashtags = hashtagsText
            .trim()
            .split(/\s+/)
            .filter(tag => tag.startsWith('#'))
            .slice(0, 10)

        // Generate suggestions
        const suggestionsPrompt = `Give 3 quick tips to make this ${platform} post more engaging: "${caption}"`
        const suggestionsResult = await model.generateContent(suggestionsPrompt)
        const suggestionsResponse = await suggestionsResult.response
        const suggestionsText = suggestionsResponse.text()
        const suggestions = suggestionsText
            .trim()
            .split('\n')
            .filter(line => line.trim())
            .slice(0, 3)

        res.json({
            caption,
            hashtags,
            suggestions,
            platform,
            tone
        })
    } catch (error) {
        next(error)
    }
}
