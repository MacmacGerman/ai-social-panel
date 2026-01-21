import { useState } from 'react'
import CreatePostModal from '../components/CreatePostModal'
import './Dashboard.css'

function Dashboard() {
    const [showCreateModal, setShowCreateModal] = useState(false)

    const handleSavePost = (postData) => {
        console.log('Saving post:', postData)
    }

    return (
        <div className="dashboard fade-in">
            {/* Header */}
            <header className="dashboard__header">
                <div>
                    <h1 className="h1">Dashboard</h1>
                    <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                        Bienvenido a tu panel de gestión de contenido con IA
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Nuevo Post</span>
                </button>
            </header>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card glass-card">
                    <div className="stat-card__icon stat-card__icon--primary">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </div>
                    <div className="stat-card__content">
                        <p className="stat-card__label">Posts Programados</p>
                        <h3 className="stat-card__value">24</h3>
                        <p className="stat-card__change stat-card__change--positive">+12% vs mes anterior</p>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-card__icon stat-card__icon--accent">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                            <path d="M2 17l10 5 10-5" />
                            <path d="M2 12l10 5 10-5" />
                        </svg>
                    </div>
                    <div className="stat-card__content">
                        <p className="stat-card__label">Campañas Activas</p>
                        <h3 className="stat-card__value">5</h3>
                        <p className="stat-card__change stat-card__change--positive">+2 esta semana</p>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-card__icon stat-card__icon--success">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                        </svg>
                    </div>
                    <div className="stat-card__content">
                        <p className="stat-card__label">Contenido IA</p>
                        <h3 className="stat-card__value">156</h3>
                        <p className="stat-card__change stat-card__change--positive">+45 este mes</p>
                    </div>
                </div>

                <div className="stat-card glass-card">
                    <div className="stat-card__icon stat-card__icon--warning">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                    </div>
                    <div className="stat-card__content">
                        <p className="stat-card__label">Engagement Rate</p>
                        <h3 className="stat-card__value">8.4%</h3>
                        <p className="stat-card__change stat-card__change--positive">+1.2% vs promedio</p>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <div className="content-grid">
                {/* Recent Posts */}
                <div className="content-section glass-card">
                    <div className="section-header">
                        <h3 className="h4">Posts Recientes</h3>
                        <a href="#" className="link-primary">Ver todos</a>
                    </div>

                    <div className="posts-list">
                        <div className="post-item">
                            <div className="post-item__thumbnail">
                                <div className="thumbnail-placeholder">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                        <polyline points="21 15 16 10 5 21" />
                                    </svg>
                                </div>
                            </div>
                            <div className="post-item__content">
                                <div className="post-item__header">
                                    <span className="badge badge--instagram">Instagram</span>
                                    <span className="badge badge--scheduled">Programado</span>
                                </div>
                                <p className="post-item__caption">
                                    Nuevo producto lanzado 🚀 Descubre las características increíbles...
                                </p>
                                <p className="post-item__date">Programado para: 25 Ene, 10:00 AM</p>
                            </div>
                        </div>

                        <div className="post-item">
                            <div className="post-item__thumbnail">
                                <div className="thumbnail-placeholder">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="23 7 16 12 23 17 23 7" />
                                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className="post-item__content">
                                <div className="post-item__header">
                                    <span className="badge badge--tiktok">TikTok</span>
                                    <span className="badge badge--published">Publicado</span>
                                </div>
                                <p className="post-item__caption">
                                    Tutorial rápido: Cómo usar nuestra app en 30 segundos ⏱️
                                </p>
                                <p className="post-item__date">Publicado: 21 Ene, 3:00 PM</p>
                            </div>
                        </div>

                        <div className="post-item">
                            <div className="post-item__thumbnail">
                                <div className="thumbnail-placeholder">
                                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="23 7 16 12 23 17 23 7" />
                                        <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                    </svg>
                                </div>
                            </div>
                            <div className="post-item__content">
                                <div className="post-item__header">
                                    <span className="badge badge--youtube">YouTube</span>
                                    <span className="badge badge--draft">Borrador</span>
                                </div>
                                <p className="post-item__caption">
                                    5 tips para aumentar tu productividad con IA 💡
                                </p>
                                <p className="post-item__date">Creado: 20 Ene, 5:30 PM</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="content-section glass-card glass-card--gradient">
                    <h3 className="h4">Acciones Rápidas</h3>

                    <div className="quick-actions">
                        <button className="action-btn">
                            <div className="action-btn__icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                                </svg>
                            </div>
                            <div className="action-btn__content">
                                <h5 className="action-btn__title">Generar con IA</h5>
                                <p className="action-btn__desc">Crea contenido automáticamente</p>
                            </div>
                        </button>

                        <button className="action-btn">
                            <div className="action-btn__icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                    <line x1="16" y1="2" x2="16" y2="6" />
                                    <line x1="8" y1="2" x2="8" y2="6" />
                                    <line x1="3" y1="10" x2="21" y2="10" />
                                </svg>
                            </div>
                            <div className="action-btn__content">
                                <h5 className="action-btn__title">Ver Calendario</h5>
                                <p className="action-btn__desc">Planifica tus publicaciones</p>
                            </div>
                        </button>

                        <button className="action-btn">
                            <div className="action-btn__icon">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                    <path d="M2 17l10 5 10-5" />
                                    <path d="M2 12l10 5 10-5" />
                                </svg>
                            </div>
                            <div className="action-btn__content">
                                <h5 className="action-btn__title">Nueva Campaña</h5>
                                <p className="action-btn__desc">Organiza tu contenido</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Modals */}
            <CreatePostModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSave={handleSavePost}
            />
        </div>
    )
}

export default Dashboard
