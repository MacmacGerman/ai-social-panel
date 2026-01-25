import { supabase } from '../config/supabase.js'

// Get all properties for an organization
export const getProperties = async (req, res, next) => {
    try {
        const { organization_id } = req.user

        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .eq('organization_id', organization_id)
            .order('created_at', { ascending: false })

        if (error) throw error

        res.json({
            properties: data,
            count: data.length
        })
    } catch (error) {
        next(error)
    }
}

// Create a new property
export const createProperty = async (req, res, next) => {
    try {
        const {
            title,
            price,
            address,
            features,
            main_image_url,
            status
        } = req.body
        const { id: user_id, organization_id } = req.user

        const { data, error } = await supabase
            .from('properties')
            .insert({
                title,
                price,
                address,
                features,
                main_image_url,
                status,
                user_id,
                organization_id
            })
            .select()
            .single()

        if (error) throw error

        res.status(201).json({
            message: 'Property created successfully',
            property: data
        })
    } catch (error) {
        next(error)
    }
}

// Update property
export const updateProperty = async (req, res, next) => {
    try {
        const { id } = req.params
        const updates = req.body

        const { data, error } = await supabase
            .from('properties')
            .update(updates)
            .eq('id', id)
            .select()
            .single()

        if (error) throw error

        res.json({
            message: 'Property updated successfully',
            property: data
        })
    } catch (error) {
        next(error)
    }
}

// Delete property
export const deleteProperty = async (req, res, next) => {
    try {
        const { id } = req.params

        const { error } = await supabase
            .from('properties')
            .delete()
            .eq('id', id)

        if (error) throw error

        res.json({
            message: 'Property deleted successfully'
        })
    } catch (error) {
        next(error)
    }
}
