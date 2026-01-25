import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import propertiesService from '../services/properties.service'
import { Home, Tag, Key, TrendingUp, Plus, Image, List } from 'lucide-react'
import './Dashboard.css'

function Dashboard() {
    const navigate = useNavigate()
    const [stats, setStats] = useState({
        total: 0,
        venta: 0,
        arriendo: 0,
        marketing: 0
    })
    const [recentProperties, setRecentProperties] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const properties = await propertiesService.getProperties() || []

                const statsMap = (properties || []).reduce((acc, prop) => {
                    acc.total++
                    if (prop.status === 'venta') acc.venta++
                    if (prop.status === 'arriendo') acc.arriendo++
                    return acc
                }, { total: 0, venta: 0, arriendo: 0, marketing: 0 })

                setStats(statsMap)
                setRecentProperties((properties || []).slice(0, 3))
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchDashboardData()
    }, [])

    return (
        <div className="dashboard fade-in">
            {/* Header */}
            <header className="dashboard__header">
                <div>
                    <h1 className="h1">💎 Panel Inmobiliario <small style={{ fontSize: '0.5em', opacity: 0.5 }}>v4.0</small></h1>
                    <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                        Gestión inteligente de tus propiedades y marketing digital
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/properties/new')}>
                    <Plus size={20} />
                    <span>Nueva Propiedad</span>
                </button>
            </header>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card glass-card">
                    <div className="stat-card__icon stat-card__icon--primary">
                        <Home size={24} />
                    </div>
                    <div className="stat-card__content">
                        <p className="stat-card__label">Propiedades Totales</p>
                        <h3 className="stat-card__value">{stats.total}</h3>
                        <p className="stat-card__change stat-card__change--positive">Inventario activo</p>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-card__icon stat-card__icon--accent">
                        <Tag size={24} />
                    </div>
                    <div className="stat-card__content">
                        <p className="stat-card__label">En Venta</p>
                        <h3 className="stat-card__value">{stats.venta}</h3>
                        <p className="stat-card__change">Disponibles ahora</p>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-card__icon stat-card__icon--success">
                        <Key size={24} />
                    </div>
                    <div className="stat-card__content">
                        <p className="stat-card__label">En Arriendo</p>
                        <h3 className="stat-card__value">{stats.arriendo}</h3>
                        <p className="stat-card__change">Listos para entrega</p>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-card__icon stat-card__icon--warning">
                        <TrendingUp size={24} />
                    </div>
                    <div className="stat-card__content">
                        <p className="stat-card__label">Posts Generados</p>
                        <h3 className="stat-card__value">{stats.total * 2}</h3>
                        <p className="stat-card__change stat-card__change--positive">+Marketing activo</p>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="content-grid">
                {/* Recent Properties */}
                <div className="content-section glass-card">
                    <div className="section-header">
                        <h3 className="h4">Propiedades Recientes</h3>
                        <button className="link-primary" onClick={() => navigate('/properties')}>Ver todas</button>
                    </div>

                    <div className="posts-list">
                        {loading ? (
                            <p>Cargando propiedades...</p>
                        ) : recentProperties.length > 0 ? (
                            recentProperties.map(prop => (
                                <div key={prop.id} className="post-item">
                                    <div className="post-item__thumbnail">
                                        {prop.main_image_url ? (
                                            <img src={prop.main_image_url} alt={prop.title} className="thumbnail-img" />
                                        ) : (
                                            <div className="thumbnail-placeholder">
                                                <Home size={32} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="post-item__content">
                                        <div className="post-item__header">
                                            <span className={`badge badge--${prop.status}`}>
                                                {prop.status.toUpperCase()}
                                            </span>
                                            <span className="badge badge--published">ACTIVO</span>
                                        </div>
                                        <p className="post-item__caption">{prop.title}</p>
                                        <p className="post-item__date">{prop.price}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="empty-state">
                                <p>No hay propiedades aún.</p>
                                <button className="btn btn-glass btn-sm" onClick={() => navigate('/properties/new')}>Comienza aquí</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="content-section glass-card glass-card--gradient">
                    <h3 className="h4">Acciones Rápidas</h3>

                    <div className="quick-actions">
                        <button className="action-btn" onClick={() => navigate('/properties/new')}>
                            <div className="action-btn__icon">
                                <Plus size={24} />
                            </div>
                            <div className="action-btn__content">
                                <h5 className="action-btn__title">Nueva Propiedad</h5>
                                <p className="action-btn__desc">Añade al inventario</p>
                            </div>
                        </button>

                        <button className="action-btn" onClick={() => navigate('/properties/new')}>
                            <div className="action-btn__icon">
                                <Image size={24} />
                            </div>
                            <div className="action-btn__content">
                                <h5 className="action-btn__title">Generar Marketing</h5>
                                <p className="action-btn__desc">Crea posts de Instagram</p>
                            </div>
                        </button>

                        <button className="action-btn" onClick={() => navigate('/properties')}>
                            <div className="action-btn__icon">
                                <List size={24} />
                            </div>
                            <div className="action-btn__content">
                                <h5 className="action-btn__title">Ver Catálogo</h5>
                                <p className="action-btn__desc">Gestiona tus anuncios</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard
