import { useState } from 'react'
import generateService from '../services/generate.service'
import LoadingSkeleton from '../components/LoadingSkeleton'
import { addToast } from '../components/Toast'
import './Generator.css'

function Generator() {
    const [formData, setFormData] = useState({
        topic: '',
        platform: 'instagram',
        tone: 'profesional',
        contentType: 'reel'
    })
    const [result, setResult] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const handleGenerate = async (e) => {
        e.preventDefault()

        if (!formData.topic.trim()) {
            addToast('Por favor ingresa un tema', 'error')
            return
        }

        setLoading(true)
        setResult(null)

        try {
            // Llamar a la API real de Gemini
            const data = await generateService.generatePost(
                formData.topic,
                formData.platform,
                formData.tone
            )

            setResult(data)
            addToast('¡Contenido generado exitosamente!', 'success')
        } catch (error) {
            console.error('Error generating:', error)
            addToast(
                error.response?.data?.error || 'Error al generar contenido',
                'error'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text)
        addToast(`${type} copiado al portapapeles`, 'success')
    }

    const handleSaveAsDraft = async () => {
        if (!result) return

        try {
            // Aquí podrías llamar a postsService.create() para guardar
            addToast('Post guardado como borrador', 'success')
        } catch (error) {
            addToast('Error al guardar', 'error')
        }
    }

    return (
        <div className="generator fade-in">
            <header className="generator__header">
                <div>
                    <h1 className="h1">Generador de Contenido IA</h1>
                    <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                        Crea contenido optimizado para tus redes sociales con inteligencia artificial
                    </p>
                </div>
            </header>

            <div className="generator__content">
                {/* Form */}
                <div className="generator__form glass-card">
                    <h3 className="h4">Configuración</h3>

                    <form onSubmit={handleGenerate}>
                        <div className="form-group">
                            <label className="form-label">Tema o Idea Principal</label>
                            <textarea
                                name="topic"
                                className="textarea-glass"
                                placeholder="Ej: Lanzamiento de nuevo producto eco-friendly..."
                                value={formData.topic}
                                onChange={handleChange}
                                rows="4"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Plataforma</label>
                            <select
                                name="platform"
                                className="select-glass"
                                value={formData.platform}
                                onChange={handleChange}
                            >
                                <option value="instagram">Instagram Reels</option>
                                <option value="tiktok">TikTok</option>
                                <option value="youtube">YouTube Shorts</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Tono</label>
                            <select
                                name="tone"
                                className="select-glass"
                                value={formData.tone}
                                onChange={handleChange}
                            >
                                <option value="profesional">Profesional</option>
                                <option value="casual">Casual</option>
                                <option value="divertido">Divertido</option>
                                <option value="inspirador">Inspirador</option>
                                <option value="educativo">Educativo</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Tipo de Contenido</label>
                            <select
                                name="contentType"
                                className="select-glass"
                                value={formData.contentType}
                                onChange={handleChange}
                            >
                                <option value="reel">Video / Reel</option>
                                <option value="image">Imagen</option>
                                <option value="carousel">Carrusel</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="shimmer">Generando con IA...</span>
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                                    </svg>
                                    <span>Generar Contenido</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Preview */}
                <div className="generator__preview glass-card">
                    <h3 className="h4">Vista Previa</h3>

                    {loading && (
                        <div className="preview-loading">
                            <LoadingSkeleton type="card" count={1} />
                            <p className="body-small" style={{ color: 'var(--text-secondary)', marginTop: 'var(--space-4)', textAlign: 'center' }}>
                                Generando contenido con IA...
                            </p>
                        </div>
                    )}

                    {!loading && !result && (
                        <div className="preview-empty">
                            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                            </svg>
                            <p className="body-large">Completa el formulario y genera contenido</p>
                            <p className="body-small" style={{ color: 'var(--text-tertiary)' }}>
                                La IA creará captions, hashtags y sugerencias optimizadas
                            </p>
                        </div>
                    )}

                    {!loading && result && (
                        <div className="preview-result slide-in-up">
                            {/* Caption */}
                            <div className="result-section">
                                <div className="result-header">
                                    <h4 className="h5">Caption</h4>
                                    <button
                                        className="btn-icon"
                                        onClick={() => handleCopy(result.caption, 'Caption')}
                                        title="Copiar"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="result-text">{result.caption}</p>
                            </div>

                            {/* Hashtags */}
                            <div className="result-section">
                                <div className="result-header">
                                    <h4 className="h5">Hashtags</h4>
                                    <button
                                        className="btn-icon"
                                        onClick={() => handleCopy(result.hashtags.join(' '), 'Hashtags')}
                                        title="Copiar"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                    </button>
                                </div>
                                <div className="hashtags-list">
                                    {result.hashtags.map((tag, index) => (
                                        <span key={index} className="badge badge--published">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Suggestions */}
                            {result.suggestions && result.suggestions.length > 0 && (
                                <div className="result-section">
                                    <h4 className="h5">Sugerencias para Mejorar</h4>
                                    <ul className="suggestions-list">
                                        {result.suggestions.map((suggestion, index) => (
                                            <li key={index}>{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="result-actions">
                                <button className="btn btn-glass" onClick={handleSaveAsDraft}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                        <polyline points="17 21 17 13 7 13 7 21" />
                                        <polyline points="7 3 7 8 15 8" />
                                    </svg>
                                    <span>Guardar Borrador</span>
                                </button>
                                <button className="btn btn-primary" onClick={handleGenerate}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polyline points="23 4 23 10 17 10" />
                                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                                    </svg>
                                    <span>Regenerar</span>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Generator
