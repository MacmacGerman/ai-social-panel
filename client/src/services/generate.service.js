import api from '../config/api'

export const generateService = {
    // Generate property description
    generatePropertyDescription: async (propertyData) => {
        const { data } = await api.post('/generate/property', propertyData)
        return data.description
    }
}

export default generateService
