import { supabaseAdmin } from '../config/supabase.js'

// Get all campaigns
export const getCampaigns = async (req, res, next) => {
    try {
        const { status } = req.query

        let query = supabaseAdmin
            .from('campaigns')
            .select(`
        *,
        posts (count)
      `)
            .order('created_at', { ascending: false })

        if (status) query = query.eq('status', status)

        const { data, error } = await query

        if (error) throw error

        res.json({
            campaigns: data,
            count: data.length
        })
    } catch (error) {
        next(error)
    }
}

// Get single campaign
export const getCampaign = async (req, res, next) => {
    try {
        const { id } = req.params

        const { data, error } = await supabaseAdmin
            .from('campaigns')
            .select(`
        *,
        posts (*)
      `)
            .eq('id', id)
            .single()

        if (error) throw error

        res.json({ campaign: data })
    } catch (error) {
        next(error)
    }
}

// Create campaign
export const createCampaign = async (req, res, next) => {
    try {
        const {
            name,
            description,
            start_date,
            end_date,
            target_platforms
        } = req.body

        const { data, error } = await supabaseAdmin
            .from('campaigns')
            .insert({
                name,
                description,
                start_date,
                end_date,
                target_platforms,
                status: 'active',
                created_by: req.user.id
            })
            .select()
            .single()

        if (error) throw error

        res.status(201).json({
            message: 'Campaign created successfully',
            campaign: data
        })
    } catch (error) {
        next(error)
    }
}

// Update campaign
export const updateCampaign = async (req, res, next) => {
    try {
        const { id } = req.params
        const updates = req.body

        const { data, error } = await supabaseAdmin
            .from('campaigns')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        res.json({
            message: 'Campaign updated successfully',
            campaign: data
        })
    } catch (error) {
        next(error)
    }
}

// Delete campaign
export const deleteCampaign = async (req, res, next) => {
    try {
        const { id } = req.params

        const { error } = await supabaseAdmin
            .from('campaigns')
            .delete()
            .eq('id', id)

        if (error) throw error

        res.json({
            message: 'Campaign deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}

// Get campaign posts
export const getCampaignPosts = async (req, res, next) => {
    try {
        const { id } = req.params

        const { data, error } = await supabaseAdmin
            .from('posts')
            .select('*')
            .eq('campaign_id', id)
            .order('created_at', { ascending: false })

        if (error) throw error

        res.json({
            posts: data,
            count: data.length
        })
    } catch (error) {
        next(error)
    }
}
