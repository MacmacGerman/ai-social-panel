import supabase from '../config/supabase.js'

// Register new user
export const register = async (req, res, next) => {
    try {
        const { email, password, fullName } = req.body

        // Create user in Supabase Auth
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName
                }
            }
        })

        if (error) throw error

        res.status(201).json({
            message: 'User registered successfully',
            user: data.user,
            session: data.session
        })
    } catch (error) {
        next(error)
    }
}

// Login user
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        })

        if (error) throw error

        res.json({
            message: 'Login successful',
            user: data.user,
            session: data.session
        })
    } catch (error) {
        next(error)
    }
}

// Login with Google
export const googleAuth = async (req, res, next) => {
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${process.env.FRONTEND_URL}/auth/callback`
            }
        })

        if (error) throw error

        res.json({
            url: data.url
        })
    } catch (error) {
        next(error)
    }
}

// Refresh token
export const refresh = async (req, res, next) => {
    try {
        const { refresh_token } = req.body

        const { data, error } = await supabase.auth.refreshSession({
            refresh_token
        })

        if (error) throw error

        res.json({
            session: data.session
        })
    } catch (error) {
        next(error)
    }
}

// Logout
export const logout = async (req, res, next) => {
    try {
        const { error } = await supabase.auth.signOut()

        if (error) throw error

        res.json({
            message: 'Logout successful'
        })
    } catch (error) {
        next(error)
    }
}

// Get current user
export const me = async (req, res, next) => {
    try {
        res.json({
            user: req.user
        })
    } catch (error) {
        next(error)
    }
}
