import api from '../config/api'
import { supabase } from '../config/supabase'

export const propertiesService = {
    // Upload image to Supabase Storage
    uploadImage: async (file) => {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`

        let { error: uploadError, data } = await supabase.storage
            .from('properties-images')
            .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
            .from('properties-images')
            .getPublicUrl(filePath)

        return publicUrl
    },

    // Get all properties
    getProperties: async () => {
        const { data } = await api.get('/properties')
        return data.properties || []
    },

    // Create a new property
    createProperty: async (propertyData) => {
        const { data } = await api.post('/properties', propertyData)
        return data.property
    },

    // Update property
    updateProperty: async (id, updates) => {
        const { data } = await api.patch(`/properties/${id}`, updates)
        return data.property
    },

    // Delete property
    deleteProperty: async (id) => {
        const { data } = await api.delete(`/properties/${id}`)
        return data
    }
}

export default propertiesService
