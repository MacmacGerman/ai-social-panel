import { useState } from 'react'
import Modal from '../components/Modal'
import './Settings.css'

function Settings() {
    const [activeTab, setActiveTab] = useState('profile')
    const [showApiModal, setShowApiModal] = useState(false)

    return (
        <div className="settings fade-in">
            <header className="settings__header">
                <div>
                    <h1 className="h1">Configuración</h1>
                    <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                        Personaliza tu experiencia y gestiona tu cuenta
                    </p>
                </div>
            </header>

            {/* Tabs */}
            <div className="settings__tabs glass-card">
                <button
                    className={`tab ${activeTab === 'profile' ? 'tab--active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Perfil</span>
                </button>
                <button
                    className={`tab ${activeTab === 'social' ? 'tab--active' : ''}`}
                    onClick={() => setActiveTab('social')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 2h-3a5 5 0 0 0-5 5v3H6v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                    <span>Cuentas</span>
                </button>
                <button
                    className={`tab ${activeTab === 'api' ? 'tab--active' : ''}`}
                    onClick={() => setActiveTab('api')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                    </svg>
                    <span>API Keys</span>
                </button>
                <button
                    className={`tab ${activeTab === 'preferences' ? 'tab--active' : ''}`}
                    onClick={() => setActiveTab('preferences')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                    </svg>
                    <span>Preferencias</span>
                </button>
                <button
                    className={`tab ${activeTab === 'billing' ? 'tab--active' : ''}`}
                    onClick={() => setActiveTab('billing')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                    </svg>
                    <span>Facturación</span>
                </button>
            </div>

            {/* Tab Content */}
            <div className="settings__content">
                {activeTab === 'profile' && (
                    <div className="tab-content fade-in">
                        <div className="glass-card">
                            <h3 className="h4">Información Personal</h3>

                            <div className="form-grid">
                                <div className="form-group">
                                    <label className="form-label">Nombre</label>
                                    <input type="text" className="input-glass" defaultValue="Usuario Demo" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="input-glass" defaultValue="usuario@email.com" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Organización</label>
                                    <input type="text" className="input-glass" defaultValue="Mi Empresa" />
                                </div>

                                <div className="form-group">
                                    <label className="form-label">Rol</label>
                                    <select className="select-glass">
                                        <option>Administrador</option>
                                        <option>Editor</option>
                                        <option>Viewer</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-actions">
                                <button className="btn btn-glass">Cancelar</button>
                                <button className="btn btn-primary">Guardar Cambios</button>
                            </div>
                        </div>

                        <div className="glass-card" style={{ marginTop: 'var(--space-6)' }}>
                            <h3 className="h4">Avatar</h3>
                            <div className="avatar-upload">
                                <div className="avatar-preview">
                                    <div className="avatar-placeholder">U</div>
                                </div>
                                <div>
                                    <button className="btn btn-glass">Cambiar Avatar</button>
                                    <p className="body-small" style={{ color: 'var(--text-tertiary)', marginTop: 'var(--space-2)' }}>
                                        JPG, PNG o GIF. Máximo 2MB.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'api' && (
                    <div className="tab-content fade-in">
                        <div className="glass-card">
                            <div className="section-header">
                                <div>
                                    <h3 className="h4">API Keys</h3>
                                    <p className="body-small" style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-2)' }}>
                                        Gestiona tus claves de API para integraciones
                                    </p>
                                </div>
                                <button className="btn btn-primary" onClick={() => setShowApiModal(true)}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    <span>Nueva API Key</span>
                                </button>
                            </div>

                            <div className="api-keys-list">
                                <div className="api-key-item">
                                    <div className="api-key-info">
                                        <div className="api-key-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <circle cx="12" cy="12" r="3" />
                                                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h5 className="api-key-name">Gemini API</h5>
                                            <p className="api-key-value">AIza...xxxx (oculta)</p>
                                            <p className="api-key-date">Creada: 15 Ene 2026</p>
                                        </div>
                                    </div>
                                    <div className="api-key-actions">
                                        <span className="badge badge--published">Activa</span>
                                        <button className="btn-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </button>
                                        <button className="btn-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>

                                <div className="api-key-item">
                                    <div className="api-key-info">
                                        <div className="api-key-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                <circle cx="8.5" cy="8.5" r="1.5" />
                                                <polyline points="21 15 16 10 5 21" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h5 className="api-key-name">Replicate API</h5>
                                            <p className="api-key-value">r8_...xxxx (oculta)</p>
                                            <p className="api-key-date">Creada: 10 Ene 2026</p>
                                        </div>
                                    </div>
                                    <div className="api-key-actions">
                                        <span className="badge badge--draft">Inactiva</span>
                                        <button className="btn-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                        </button>
                                        <button className="btn-icon">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <polyline points="3 6 5 6 21 6" />
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'preferences' && (
                    <div className="tab-content fade-in">
                        <div className="glass-card">
                            <h3 className="h4">Preferencias de Generación</h3>

                            <div className="form-group">
                                <label className="form-label">Plataforma Predeterminada</label>
                                <select className="select-glass">
                                    <option>Instagram Reels</option>
                                    <option>TikTok</option>
                                    <option>YouTube Shorts</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Tono Predeterminado</label>
                                <select className="select-glass">
                                    <option>Casual</option>
                                    <option>Profesional</option>
                                    <option>Divertido</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Idioma</label>
                                <select className="select-glass">
                                    <option>Español</option>
                                    <option>English</option>
                                    <option>Português</option>
                                </select>
                            </div>

                            <div className="form-actions">
                                <button className="btn btn-primary">Guardar Preferencias</button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'billing' && (
                    <div className="tab-content fade-in">
                        <div className="glass-card">
                            <h3 className="h4">Plan Actual</h3>

                            <div className="plan-card">
                                <div className="plan-header">
                                    <h4 className="h5">Plan Pro</h4>
                                    <span className="badge badge--published">Activo</span>
                                </div>
                                <p className="plan-price">$49<span>/mes</span></p>
                                <ul className="plan-features">
                                    <li>✓ Generación ilimitada con IA</li>
                                    <li>✓ 3 organizaciones</li>
                                    <li>✓ 10 miembros del equipo</li>
                                    <li>✓ Analytics avanzados</li>
                                    <li>✓ Soporte prioritario</li>
                                </ul>
                                <button className="btn btn-glass w-full">Cambiar Plan</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* API Modal */}
            <Modal
                isOpen={showApiModal}
                onClose={() => setShowApiModal(false)}
                title="Nueva API Key"
                size="medium"
            >
                <div className="form-group">
                    <label className="form-label">Nombre</label>
                    <input type="text" className="input-glass" placeholder="Ej: Gemini Production" />
                </div>
                <div className="form-group">
                    <label className="form-label">Servicio</label>
                    <select className="select-glass">
                        <option>Gemini API</option>
                        <option>Replicate</option>
                        <option>OpenAI</option>
                        <option>Otro</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label">API Key</label>
                    <input type="password" className="input-glass" placeholder="Pega tu API key aquí" />
                </div>
                <div className="form-actions">
                    <button className="btn btn-glass" onClick={() => setShowApiModal(false)}>Cancelar</button>
                    <button className="btn btn-primary">Guardar</button>
                </div>
            </Modal>
        </div>
    )
}

export default Settings
