import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import './UserProfile.css'

function UserProfile() {
    const [user, setUser] = useState(null)
    const [showMenu, setShowMenu] = useState(false)

    useEffect(() => {
        // Get current user from Supabase
        supabase.auth.getUser().then(({ data: { user } }) => {
            setUser(user)
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user || null)
        })

        return () => subscription.unsubscribe()
    }, [])

    const handleLogout = async () => {
        if (window.confirm('¿Cerrar sesión?')) {
            await supabase.auth.signOut()
            window.location.href = '/login'
        }
    }

    if (!user) return null

    const initials = user.user_metadata?.full_name
        ? user.user_metadata.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : user.email[0].toUpperCase()

    return (
        <div className="user-profile">
            <button
                className="user-profile__button"
                onClick={() => setShowMenu(!showMenu)}
            >
                <div className="user-profile__avatar">
                    {user.user_metadata?.avatar_url ? (
                        <img src={user.user_metadata.avatar_url} alt="Avatar" />
                    ) : (
                        <span>{initials}</span>
                    )}
                </div>
                <div className="user-profile__info">
                    <span className="user-profile__name">
                        {user.user_metadata?.full_name || 'Usuario'}
                    </span>
                    <span className="user-profile__email">{user.email}</span>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {showMenu && (
                <div className="user-profile__menu glass-card fade-in">
                    <button className="user-profile__menu-item" onClick={() => window.location.href = '/settings'}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                        </svg>
                        <span>Configuración</span>
                    </button>
                    <button className="user-profile__menu-item user-profile__menu-item--danger" onClick={handleLogout}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                            <polyline points="16 17 21 12 16 7" />
                            <line x1="21" y1="12" x2="9" y2="12" />
                        </svg>
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            )}
        </div>
    )
}

export default UserProfile
