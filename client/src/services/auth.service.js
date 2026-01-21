import api from '../config/api'

// Authentication Service
export const authService = {
    // Register new user
    register: async (email, password, fullName) => {
        const { data } = await api.post('/auth/register', {
            email,
            password,
            fullName
        })

        if (data.session?.access_token) {
            localStorage.setItem('access_token', data.session.access_token)
            localStorage.setItem('user', JSON.stringify(data.user))
        }

        return data
    },

    // Login user
    login: async (email, password) => {
        const { data } = await api.post('/auth/login', {
            email,
            password
        })

        if (data.session?.access_token) {
            localStorage.setItem('access_token', data.session.access_token)
            localStorage.setItem('user', JSON.stringify(data.user))
        }

        return data
    },

    // Login with Google
    googleAuth: async () => {
        const { data } = await api.post('/auth/google')
        if (data.url) {
            window.location.href = data.url
        }
        return data
    },

    // Logout
    logout: async () => {
        try {
            await api.post('/auth/logout')
        } finally {
            localStorage.removeItem('access_token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
    },

    // Get current user
    me: async () => {
        const { data } = await api.get('/auth/me')
        return data.user
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('access_token')
    },

    // Get current user from localStorage
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user')
        return userStr ? JSON.parse(userStr) : null
    }
}

export default authService
