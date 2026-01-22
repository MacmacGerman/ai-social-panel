import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../config/supabase'

function ProtectedRoute({ children }) {
    const [session, setSession] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check current session
        supabase.auth.getSession().then(({ data: { session } }) => {
            console.log('🛡️ ProtectedRoute: Session check:', session ? 'Active' : 'None')
            setSession(session)
            setLoading(false)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('🛡️ ProtectedRoute: Auth event:', event)
            setSession(session)
            setLoading(false)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                color: 'var(--text-primary)'
            }}>
                <div className="shimmer">Verificando acceso...</div>
            </div>
        )
    }

    if (!session) {
        console.log('🛡️ ProtectedRoute: No session, redirecting to login')
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute
