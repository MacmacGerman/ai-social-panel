import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../config/supabase'
import authService from '../services/auth.service'
import { addToast } from '../components/Toast'
import './Login.css'

function Login() {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(true)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: ''
    })
    const [loading, setLoading] = useState(false)

    // Check for existing session on mount
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                console.log('✅ Session found, redirecting...')
                navigate('/')
            }
        })

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('🔔 Auth event:', event)
            if (session && event === 'SIGNED_IN') {
                console.log('✅ User signed in, redirecting...')
                navigate('/')
            }
        })

        return () => subscription.unsubscribe()
    }, [navigate])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            if (isLogin) {
                await authService.login(formData.email, formData.password)
                addToast('¡Bienvenido de vuelta!', 'success')
            } else {
                await authService.register(formData.email, formData.password, formData.fullName)
                addToast('¡Cuenta creada exitosamente!', 'success')
            }
            navigate('/')
        } catch (error) {
            const message = error.response?.data?.error || 'Error en la autenticación'
            addToast(message, 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            console.log('🚀 Iniciando Google OAuth...')
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + '/login'
                }
            })

            if (error) throw error

            // Supabase will redirect automatically
        } catch (error) {
            console.error('❌ Error en Google OAuth:', error)
            addToast('Error al conectar con Google', 'error')
        }
    }

    return (
        <div className="login-page">
            <div className="login-background">
                <div className="gradient-orb gradient-orb--1"></div>
                <div className="gradient-orb gradient-orb--2"></div>
                <div className="gradient-orb gradient-orb--3"></div>
            </div>

            <div className="login-container fade-in">
                <div className="login-card glass-card">
                    <div className="login-header">
                        <div className="login-logo">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                            </svg>
                        </div>
                        <h1 className="h2">AI Social Panel</h1>
                        <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                            {isLogin ? 'Inicia sesión para continuar' : 'Crea tu cuenta'}
                        </p>
                    </div>

                    <div className="login-tabs">
                        <button
                            className={`login-tab ${isLogin ? 'login-tab--active' : ''}`}
                            onClick={() => setIsLogin(true)}
                        >
                            Iniciar Sesión
                        </button>
                        <button
                            className={`login-tab ${!isLogin ? 'login-tab--active' : ''}`}
                            onClick={() => setIsLogin(false)}
                        >
                            Registrarse
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        {!isLogin && (
                            <div className="form-group">
                                <label className="form-label">Nombre Completo</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    className="input-glass"
                                    placeholder="Tu nombre"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required={!isLogin}
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="input-glass"
                                placeholder="tu@email.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Contraseña</label>
                            <input
                                type="password"
                                name="password"
                                className="input-glass"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                minLength={6}
                            />
                            {!isLogin && (
                                <p className="body-small" style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>
                                    Mínimo 6 caracteres
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="shimmer">Procesando...</span>
                            ) : (
                                isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
                            )}
                        </button>
                    </form>

                    <div className="login-divider">
                        <span>o continúa con</span>
                    </div>

                    <button
                        className="btn btn-glass w-full"
                        onClick={handleGoogleLogin}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        <span>Google</span>
                    </button>

                    {isLogin && (
                        <div className="login-footer">
                            <Link to="/forgot-password" className="link-primary">
                                ¿Olvidaste tu contraseña?
                            </Link>
                        </div>
                    )}
                </div>

                <div className="login-info glass-card">
                    <h3 className="h4">Gestiona tu contenido con IA</h3>
                    <ul className="login-features">
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Generación automática de captions</span>
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Calendario editorial inteligente</span>
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Publicación en múltiples plataformas</span>
                        </li>
                        <li>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            <span>Analytics y reportes detallados</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Login
