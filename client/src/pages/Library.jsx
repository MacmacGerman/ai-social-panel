import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import CreatePostModal from '../components/CreatePostModal'
import DeleteConfirmModal from '../components/DeleteConfirmModal'
import './Library.css'

function Library() {
    const [filter, setFilter] = useState('all')
    const [platformFilter, setPlatformFilter] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showDeleteModal, setShowDeleteModal] = useState(false)
    const [selectedPost, setSelectedPost] = useState(null)

    const mockPosts = [
        {
            id: 1,
            platform: 'instagram',
            contentType: 'reel',
            caption: 'Nuevo producto lanzado 🚀 Descubre las características increíbles...',
            hashtags: ['#instagram', '#reels', '#viral', '#trending'],
            status: 'scheduled',
            scheduledDate: '2026-01-25 10:00 AM',
            campaign: 'Lanzamiento Producto Q1',
            aiGenerated: true
        },
        {
            id: 2,
            platform: 'tiktok',
            contentType: 'video',
            caption: 'Tutorial rápido: Cómo usar nuestra app en 30 segundos ⏱️',
            hashtags: ['#fyp', '#tutorial', '#viral'],
            status: 'published',
            publishedDate: '2026-01-21 3:00 PM',
            campaign: 'Tips Educativos',
            aiGenerated: true
        },
        {
            id: 3,
            platform: 'youtube',
            contentType: 'short',
            caption: '5 tips para aumentar tu productividad con IA 💡',
            hashtags: ['#shorts', '#productivity', '#ai'],
            status: 'draft',
            campaign: 'Tips Educativos',
            aiGenerated: false
        },
        {
            id: 4,
            platform: 'instagram',
            contentType: 'carousel',
            caption: 'Testimonios de nuestros clientes favoritos ❤️',
            hashtags: ['#testimonials', '#clients', '#success'],
            status: 'published',
            publishedDate: '2026-01-20 2:00 PM',
            campaign: 'Testimonios Clientes',
            aiGenerated: true
        },
        {
            id: 5,
            platform: 'tiktok',
            contentType: 'video',
            caption: 'POV: Descubriste esta función oculta 😱',
            hashtags: ['#fyp', '#viral', '#trending', '#parati'],
            status: 'scheduled',
            scheduledDate: '2026-01-26 4:00 PM',
            campaign: 'Lanzamiento Producto Q1',
            aiGenerated: true
        },
        {
            id: 6,
            platform: 'instagram',
            contentType: 'reel',
            caption: 'Behind the scenes de nuestro equipo trabajando 🎬',
            hashtags: ['#bts', '#team', '#work'],
            status: 'draft',
            campaign: null,
            aiGenerated: false
        }
    ]

    const filteredPosts = mockPosts.filter(post => {
        const statusMatch = filter === 'all' || post.status === filter
        const platformMatch = platformFilter === 'all' || post.platform === platformFilter
        const searchMatch = searchQuery === '' ||
            post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        return statusMatch && platformMatch && searchMatch
    })

    const handleDeletePost = (post) => {
        setSelectedPost(post)
        setShowDeleteModal(true)
    }

    const confirmDelete = () => {
        console.log('Deleting post:', selectedPost)
    }

    const handleSavePost = (postData) => {
        console.log('Saving post:', postData)
    }

    const getStatusBadge = (status) => {
        const badges = {
            draft: { label: 'Borrador', class: 'badge--draft' },
            scheduled: { label: 'Programado', class: 'badge--scheduled' },
            published: { label: 'Publicado', class: 'badge--published' }
        }
        return badges[status] || badges.draft
    }

    return (
        <div className="library fade-in">
            <header className="library__header">
                <div>
                    <h1 className="h1">Biblioteca de Contenido</h1>
                    <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                        Todos tus posts en un solo lugar
                    </p>
                </div>
                <div style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'center' }}>
                    <SearchBar
                        placeholder="Buscar posts..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                        onClear={() => setSearchQuery('')}
                    />
                    <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                        <span>Nuevo Post</span>
                    </button>
                </div>
            </header>

            {/* Filters */}
            <div className="library__filters glass-card">
                <div className="filter-group">
                    <label className="filter-label">Estado</label>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            Todos
                        </button>
                        <button
                            className={`filter-btn ${filter === 'draft' ? 'filter-btn--active' : ''}`}
                            onClick={() => setFilter('draft')}
                        >
                            Borradores
                        </button>
                        <button
                            className={`filter-btn ${filter === 'scheduled' ? 'filter-btn--active' : ''}`}
                            onClick={() => setFilter('scheduled')}
                        >
                            Programados
                        </button>
                        <button
                            className={`filter-btn ${filter === 'published' ? 'filter-btn--active' : ''}`}
                            onClick={() => setFilter('published')}
                        >
                            Publicados
                        </button>
                    </div>
                </div>

                <div className="filter-group">
                    <label className="filter-label">Plataforma</label>
                    <div className="filter-buttons">
                        <button
                            className={`filter-btn ${platformFilter === 'all' ? 'filter-btn--active' : ''}`}
                            onClick={() => setPlatformFilter('all')}
                        >
                            Todas
                        </button>
                        <button
                            className={`filter-btn ${platformFilter === 'instagram' ? 'filter-btn--active' : ''}`}
                            onClick={() => setPlatformFilter('instagram')}
                        >
                            Instagram
                        </button>
                        <button
                            className={`filter-btn ${platformFilter === 'tiktok' ? 'filter-btn--active' : ''}`}
                            onClick={() => setPlatformFilter('tiktok')}
                        >
                            TikTok
                        </button>
                        <button
                            className={`filter-btn ${platformFilter === 'youtube' ? 'filter-btn--active' : ''}`}
                            onClick={() => setPlatformFilter('youtube')}
                        >
                            YouTube
                        </button>
                    </div>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="library__grid">
                {filteredPosts.map(post => {
                    const statusBadge = getStatusBadge(post.status)

                    return (
                        <div key={post.id} className="post-card glass-card">
                            <div className="post-card__thumbnail">
                                <div className="thumbnail-placeholder">
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        {post.contentType === 'video' || post.contentType === 'reel' || post.contentType === 'short' ? (
                                            <>
                                                <polygon points="23 7 16 12 23 17 23 7" />
                                                <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                                            </>
                                        ) : post.contentType === 'carousel' ? (
                                            <>
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </>
                                        ) : (
                                            <>
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </>
                                        )}
                                    </svg>
                                </div>
                                {post.aiGenerated && (
                                    <div className="ai-badge">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <circle cx="12" cy="12" r="3" />
                                            <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                                        </svg>
                                        <span>IA</span>
                                    </div>
                                )}
                            </div>

                            <div className="post-card__content">
                                <div className="post-card__header">
                                    <span className={`badge badge--${post.platform}`}>
                                        {post.platform === 'instagram' ? 'Instagram' : post.platform === 'tiktok' ? 'TikTok' : 'YouTube'}
                                    </span>
                                    <span className={`badge ${statusBadge.class}`}>{statusBadge.label}</span>
                                </div>

                                <p className="post-card__caption">{post.caption}</p>

                                <div className="post-card__hashtags">
                                    {post.hashtags.slice(0, 3).map((tag, index) => (
                                        <span key={index} className="hashtag-mini">{tag}</span>
                                    ))}
                                    {post.hashtags.length > 3 && (
                                        <span className="hashtag-mini hashtag-mini--more">+{post.hashtags.length - 3}</span>
                                    )}
                                </div>

                                {post.campaign && (
                                    <div className="post-card__campaign">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                            <path d="M2 17l10 5 10-5" />
                                            <path d="M2 12l10 5 10-5" />
                                        </svg>
                                        <span>{post.campaign}</span>
                                    </div>
                                )}

                                <div className="post-card__date">
                                    {post.status === 'scheduled' && `📅 ${post.scheduledDate}`}
                                    {post.status === 'published' && `✓ ${post.publishedDate}`}
                                    {post.status === 'draft' && '📝 Borrador'}
                                </div>

                                <div className="post-card__actions">
                                    <button className="btn-icon" title="Ver detalles">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                    </button>
                                    <button className="btn-icon" title="Editar">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                    </button>
                                    <button className="btn-icon" title="Eliminar" onClick={() => handleDeletePost(post)}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <polyline points="3 6 5 6 21 6" />
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            {filteredPosts.length === 0 && (
                <div className="library__empty glass-card">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                    </svg>
                    <p className="body" style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-4)' }}>
                        No se encontraron posts con los filtros seleccionados
                    </p>
                </div>
            )}

            {/* Modals */}
            <CreatePostModal
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                onSave={handleSavePost}
            />

            <DeleteConfirmModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
                itemName={selectedPost?.caption.substring(0, 30) + '...'}
                itemType="post"
            />
        </div>
    )
}

export default Library
