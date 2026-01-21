import { useState } from 'react'
import './Campaigns.css'

function Campaigns() {
    const [campaigns] = useState([
        {
            id: 1,
            name: 'Lanzamiento Producto Q1',
            description: 'Campaña de lanzamiento para el nuevo producto de la temporada',
            status: 'active',
            objective: 'awareness',
            startDate: '2026-01-20',
            endDate: '2026-02-28',
            platforms: ['instagram', 'tiktok', 'youtube'],
            postsCount: 12,
            publishedCount: 5,
            scheduledCount: 7
        },
        {
            id: 2,
            name: 'Testimonios Clientes',
            description: 'Serie de testimonios de clientes satisfechos',
            status: 'active',
            objective: 'engagement',
            startDate: '2026-01-15',
            endDate: '2026-03-15',
            platforms: ['instagram', 'youtube'],
            postsCount: 8,
            publishedCount: 3,
            scheduledCount: 5
        },
        {
            id: 3,
            name: 'Tips Educativos',
            description: 'Contenido educativo semanal sobre el uso del producto',
            status: 'active',
            objective: 'traffic',
            startDate: '2026-01-10',
            endDate: '2026-04-10',
            platforms: ['tiktok', 'youtube'],
            postsCount: 15,
            publishedCount: 8,
            scheduledCount: 7
        },
        {
            id: 4,
            name: 'Black Friday 2025',
            description: 'Campaña de descuentos especiales',
            status: 'completed',
            objective: 'conversion',
            startDate: '2025-11-20',
            endDate: '2025-11-30',
            platforms: ['instagram', 'tiktok'],
            postsCount: 20,
            publishedCount: 20,
            scheduledCount: 0
        },
        {
            id: 5,
            name: 'Colaboración Influencers',
            description: 'Campaña con micro-influencers del sector',
            status: 'draft',
            objective: 'awareness',
            startDate: '2026-02-01',
            endDate: '2026-02-28',
            platforms: ['instagram', 'tiktok'],
            postsCount: 0,
            publishedCount: 0,
            scheduledCount: 0
        }
    ])

    const getStatusBadge = (status) => {
        const badges = {
            active: { label: 'Activa', class: 'badge--published' },
            completed: { label: 'Completada', class: 'badge--draft' },
            draft: { label: 'Borrador', class: 'badge--scheduled' }
        }
        return badges[status] || badges.draft
    }

    const getObjectiveLabel = (objective) => {
        const objectives = {
            awareness: 'Awareness',
            engagement: 'Engagement',
            conversion: 'Conversión',
            traffic: 'Tráfico'
        }
        return objectives[objective] || objective
    }

    const getProgress = (campaign) => {
        if (campaign.postsCount === 0) return 0
        return Math.round((campaign.publishedCount / campaign.postsCount) * 100)
    }

    return (
        <div className="campaigns fade-in">
            <header className="campaigns__header">
                <div>
                    <h1 className="h1">Campañas</h1>
                    <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                        Organiza tu contenido en campañas estratégicas
                    </p>
                </div>
                <button className="btn btn-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Nueva Campaña</span>
                </button>
            </header>

            {/* Stats Overview */}
            <div className="campaigns__stats">
                <div className="stat-mini glass-card">
                    <div className="stat-mini__icon" style={{ background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                        </svg>
                    </div>
                    <div className="stat-mini__content">
                        <p className="stat-mini__value">3</p>
                        <p className="stat-mini__label">Activas</p>
                    </div>
                </div>

                <div className="stat-mini glass-card">
                    <div className="stat-mini__icon" style={{ background: 'rgba(59, 130, 246, 0.2)', color: 'var(--info)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                    </div>
                    <div className="stat-mini__content">
                        <p className="stat-mini__value">35</p>
                        <p className="stat-mini__label">Posts Totales</p>
                    </div>
                </div>

                <div className="stat-mini glass-card">
                    <div className="stat-mini__icon" style={{ background: 'rgba(245, 158, 11, 0.2)', color: 'var(--warning)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                        </svg>
                    </div>
                    <div className="stat-mini__content">
                        <p className="stat-mini__value">19</p>
                        <p className="stat-mini__label">Programados</p>
                    </div>
                </div>

                <div className="stat-mini glass-card">
                    <div className="stat-mini__icon" style={{ background: 'rgba(102, 126, 234, 0.2)', color: 'var(--primary-500)' }}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    </div>
                    <div className="stat-mini__content">
                        <p className="stat-mini__value">16</p>
                        <p className="stat-mini__label">Publicados</p>
                    </div>
                </div>
            </div>

            {/* Campaigns Grid */}
            <div className="campaigns__grid">
                {campaigns.map(campaign => {
                    const statusBadge = getStatusBadge(campaign.status)
                    const progress = getProgress(campaign)

                    return (
                        <div key={campaign.id} className="campaign-card glass-card">
                            <div className="campaign-card__header">
                                <h3 className="h5">{campaign.name}</h3>
                                <span className={`badge ${statusBadge.class}`}>{statusBadge.label}</span>
                            </div>

                            <p className="campaign-card__description">{campaign.description}</p>

                            <div className="campaign-card__meta">
                                <div className="meta-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                                        <line x1="7" y1="7" x2="7.01" y2="7" />
                                    </svg>
                                    <span>{getObjectiveLabel(campaign.objective)}</span>
                                </div>
                                <div className="meta-item">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span>{new Date(campaign.startDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })} - {new Date(campaign.endDate).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
                                </div>
                            </div>

                            <div className="campaign-card__platforms">
                                {campaign.platforms.map(platform => (
                                    <span key={platform} className={`badge badge--${platform}`}>
                                        {platform === 'instagram' ? 'Instagram' : platform === 'tiktok' ? 'TikTok' : 'YouTube'}
                                    </span>
                                ))}
                            </div>

                            <div className="campaign-card__stats">
                                <div className="stat-item">
                                    <span className="stat-item__value">{campaign.postsCount}</span>
                                    <span className="stat-item__label">Posts</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-item__value">{campaign.publishedCount}</span>
                                    <span className="stat-item__label">Publicados</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-item__value">{campaign.scheduledCount}</span>
                                    <span className="stat-item__label">Programados</span>
                                </div>
                            </div>

                            {campaign.postsCount > 0 && (
                                <div className="campaign-card__progress">
                                    <div className="progress-bar">
                                        <div className="progress-bar__fill" style={{ width: `${progress}%` }}></div>
                                    </div>
                                    <span className="progress-label">{progress}% completado</span>
                                </div>
                            )}

                            <div className="campaign-card__actions">
                                <button className="btn btn-glass btn-sm">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                    <span>Ver Detalles</span>
                                </button>
                                <button className="btn-icon">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="1" />
                                        <circle cx="12" cy="5" r="1" />
                                        <circle cx="12" cy="19" r="1" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Campaigns
