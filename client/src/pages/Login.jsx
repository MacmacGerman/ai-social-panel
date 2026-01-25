import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Building2, Building, Layout, Image, Share2, CheckCircle2 } from 'lucide-react'
import { supabase } from '../config/supabase'
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
        // Capturar errores de redirección (OAuth) en el hash
        const hash = window.location.hash
        if (hash.includes('error')) {
            const params = new URLSearchParams(hash.slice(1))
            const errorDesc = params.get('error_description') || params.get('error')
            console.error('❌ Error OAuth detectado:', errorDesc)
            addToast(errorDesc, 'error')
        }

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
                // Login with Supabase
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: formData.email,
                    password: formData.password
                })

                if (error) throw error

                console.log('✅ Login exitoso:', data.user.email)
                localStorage.setItem('user', JSON.stringify(data.user))
                localStorage.setItem('access_token', data.session.access_token)
                addToast('¡Bienvenido de vuelta!', 'success')
                navigate('/')
            } else {
                // Register with Supabase
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                            full_name: formData.fullName
                        }
                    }
                })

                if (error) throw error

                console.log('✅ Registro exitoso:', data.user.email)
                addToast('¡Cuenta creada! Revisa tu email para confirmar.', 'success')
            }
        } catch (error) {
            console.error('❌ Error en autenticación:', error)
            const message = error.message || 'Error en la autenticación'
            addToast(message, 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            console.log('🚀 Iniciando Google OAuth con Modelo Maestro...')
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: window.location.origin + '/login',
                    queryParams: {
                        access_type: 'offline',
                        prompt: 'consent'
                    }
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
                            <Building2 size={40} />
                        </div>
                        <h1 className="h2">Propify SaaS</h1>
                        <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                            Gestión Inmobiliaria Inteligente
                        </p>
                    </div>

                    <div className="login-actions" style={{ marginTop: 'var(--space-8)' }}>
                        <button
                            className="btn btn-primary w-full"
                            onClick={handleGoogleLogin}
                            style={{ height: '56px', fontSize: '1.1rem' }}
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" style={{ marginRight: '12px' }}>
                                <path fill="#FFFFFF" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#FFFFFF" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FFFFFF" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#FFFFFF" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>Entrar con Google</span>
                        </button>
                    </div>

                    <p className="body-small text-tertiary" style={{ textAlign: 'center', marginTop: 'var(--space-6)' }}>
                        Acceso rápido y seguro para profesionales
                    </p>
                </div>

                <div className="login-info glass-card">
                    <h3 className="h4">Tu oficina virtual inmobiliaria</h3>
                    <ul className="login-features">
                        <li>
                            <Image size={20} />
                            <span>Generación de posts para Instagram</span>
                        </li>
                        <li>
                            <Layout size={20} />
                            <span>Gestión de inventario de propiedades</span>
                        </li>
                        <li>
                            <Share2 size={20} />
                            <span>Publicación directa en redes sociales</span>
                        </li>
                        <li>
                            <CheckCircle2 size={20} />
                            <span>Control total de tus ventas y arriendos</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Login
