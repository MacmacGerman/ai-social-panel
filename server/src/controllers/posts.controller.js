import { supabaseAdmin } from '../config/supabase.js'

// Get all posts
export const getPosts = async (req, res, next) => {
    try {
        const { status, platform, campaign_id } = req.query

        let query = supabaseAdmin
            .from('posts')
            .select(`
        *,
        campaigns (
          id,
          name
        )
      `)
            .order('created_at', { ascending: false })

        // Apply filters
        if (status) query = query.eq('status', status)
        if (platform) query = query.eq('platform', platform)
        if (campaign_id) query = query.eq('campaign_id', campaign_id)

        const { data, error } = await query

        if (error) throw error

        res.json({
            posts: data,
            count: data.length
        })
    } catch (error) {
        next(error)
    }
}

// Get single post
export const getPost = async (req, res, next) => {
    try {
        const { id } = req.params

        const { data, error } = await supabaseAdmin
            .from('posts')
            .select(`
        *,
        campaigns (
          id,
          name
        )
      `)
            .eq('id', id)
            .single()

        if (error) throw error

        res.json({ post: data })
    } catch (error) {
        next(error)
    }
}

// Create post
export const createPost = async (req, res, next) => {
    try {
        const {
            platform,
            content_type,
            caption,
            hashtags,
            media_url,
            scheduled_at,
            campaign_id,
            ai_generated
        } = req.body

        const { data, error } = await supabaseAdmin
            .from('posts')
            .insert({
                platform,
                content_type,
                caption,
                hashtags,
                media_url,
                scheduled_at,
                campaign_id,
                ai_generated: ai_generated || false,
                status: 'draft',
                created_by: req.user.id
            })
            .select()
            .single()

        if (error) throw error

        res.status(201).json({
            message: 'Post created successfully',
            post: data
        })
    } catch (error) {
        next(error)
    }
}

// Update post
export const updatePost = async (req, res, next) => {
    try {
        const { id } = req.params
        const updates = req.body

        const { data, error } = await supabaseAdmin
            .from('posts')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        res.json({
            message: 'Post updated successfully',
            post: data
        })
    } catch (error) {
        next(error)
    }
}

// Delete post
export const deletePost = async (req, res, next) => {
    try {
        const { id } = req.params

        const { error } = await supabaseAdmin
            .from('posts')
            .delete()
            .eq('id', id)

        if (error) throw error

        res.json({
            message: 'Post deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}

// Publish post to social media
export const publishPost = async (req, res, next) => {
    try {
        const { id } = req.params

        // Get post details
        const { data: post, error: fetchError } = await supabaseAdmin
            .from('posts')
            .select('*')
            .eq('id', id)
            .single()

        if (fetchError) throw fetchError

        // TODO: Implement actual publishing to social media platforms
        // For now, just update status to published

        const { data, error } = await supabaseAdmin
            .from('posts')
            .update({
                status: 'published',
                published_at: new Date().toISOString()
            })
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        res.json({
            message: 'Post published successfully',
            post: data
        })
    } catch (error) {
        next(error)
    }
}
