import { supabase, supabaseAdmin } from '../config/supabase.js'

export const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No authorization token provided' })
        }

        const token = authHeader.split(' ')[1]
        const { data: { user }, error: authError } = await supabase.auth.getUser(token)

        if (authError || !user) {
            return res.status(401).json({ error: 'Invalid or expired token' })
        }

        // Fetch profile and organization
        let { data: profile, error: profileError } = await supabaseAdmin
            .from('user_profiles')
            .select('*, organizations(*)')
            .eq('id', user.id)
            .single()

        // AUTO-PROVISIONING: If profile doesn't exist (after a reset)
        if (profileError && profileError.code === 'PGRST116') {
            console.log('🔄 Profile missing, auto-provisioning for user:', user.email)

            // 1. Create a default organization
            const { data: org, error: orgError } = await supabaseAdmin
                .from('organizations')
                .insert({ name: `${user.email.split('@')[0]}'s Organization` })
                .select()
                .single()

            if (orgError) throw orgError

            // 2. Create the profile
            const { data: newProfile, error: newProfileError } = await supabaseAdmin
                .from('user_profiles')
                .insert({
                    id: user.id,
                    organization_id: org.id,
                    full_name: user.user_metadata?.full_name || user.email.split('@')[0]
                })
                .select()
                .single()

            if (newProfileError) throw newProfileError

            profile = { ...newProfile, organizations: org }
        } else if (profileError) {
            throw profileError
        }

        // Attach enriched user data to request
        req.user = {
            ...user,
            profile,
            organization_id: profile.organization_id,
            organization: profile.organizations
        }

        next()
    } catch (error) {
        console.error('Auth middleware error:', error)
        res.status(500).json({ error: 'Authentication error' })
    }
}

export default authMiddleware
