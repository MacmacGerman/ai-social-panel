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

// Generate property description for real estate
export const generatePropertyDescription = async (req, res, next) => {
    try {
        const { title, price, address, features, status } = req.body

        const prompt = `Actúa como un Copywriter Inmobiliario Senior experto en el mercado de lujo en Chile. 
        Tu tarea es transformar los datos de una propiedad en un anuncio irresistible para Instagram.
        
        PROPIEDAD:
        - Tipo de operación: ${status === 'venta' ? 'VENTA' : 'ARRIENDO'}
        - Título actual: ${title}
        - Valor: ${price}
        - Ubicación: ${address}
        - Atributos: ${features}

        REGLAS DE ORO:
        1. Comienza con un GANCHO (Hook) que detenga el scroll (máximo 8 palabras).
        2. Usa un tono ${status === 'venta' ? 'exclusivo, sofisticado y aspiracional' : 'moderno, cálido y acogedor'}.
        3. No solo listes datos, vende una EXPERIENCIA de vida (ej: "Imagínate despertando con esta vista...").
        4. Incluye 3 beneficios clave usando bullet points con emojis elegantes.
        5. Termina con un Call to Action (CTA) potente invitando a ver el catálogo o enviar un DM.
        6. Usa español de Chile (neutral/profesional).
        
        IMPORTANTE: Devuelve PRIMERO una sugerencia de título optimizado de una sola línea, y luego el cuerpo del post.
        Límite: 150 palabras.`

        if (!model) {
            throw new Error('Gemini AI Model not initialized. Check API Key.')
        }

        const result = await model.generateContent(prompt)
        const response = await result.response
        const text = response.text()

        res.json({
            description: text.trim(),
            success: true
        })
    } catch (error) {
        console.error('❌ Gemini Service Error:', error)
        res.status(500).json({
            error: 'La IA está descansando un momento. Inténtalo en unos segundos.',
            details: error.message
        })
    }
}
