import { useState } from 'react'
import Modal from '../components/Modal'
import './CreatePostModal.css'

function CreatePostModal({ isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        platform: 'instagram',
        contentType: 'reel',
        caption: '',
        scheduledDate: '',
        scheduledTime: '',
        campaign: ''
    })

    const handleSubmit = () => {
        if (window.addToast) {
            window.addToast('✨ Post creado exitosamente!', 'success')
        }
        onSave(formData)
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Crear Nuevo Post" size="large">
            <div className="create-post-form">
                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Plataforma</label>
                        <select
                            className="select-glass"
                            value={formData.platform}
                            onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                        >
                            <option value="instagram">Instagram Reels</option>
                            <option value="tiktok">TikTok</option>
                            <option value="youtube">YouTube Shorts</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Tipo de Contenido</label>
                        <select
                            className="select-glass"
                            value={formData.contentType}
                            onChange={(e) => setFormData({ ...formData, contentType: e.target.value })}
                        >
                            <option value="reel">Video / Reel</option>
                            <option value="image">Imagen</option>
                            <option value="carousel">Carrusel</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Caption</label>
                    <textarea
                        className="textarea-glass"
                        rows="4"
                        placeholder="Escribe el caption de tu post..."
                        value={formData.caption}
                        onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                    />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label className="form-label">Fecha de Publicación</label>
                        <input
                            type="date"
                            className="input-glass"
                            value={formData.scheduledDate}
                            onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Hora</label>
                        <input
                            type="time"
                            className="input-glass"
                            value={formData.scheduledTime}
                            onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Campaña (Opcional)</label>
                    <select
                        className="select-glass"
                        value={formData.campaign}
                        onChange={(e) => setFormData({ ...formData, campaign: e.target.value })}
                    >
                        <option value="">Sin campaña</option>
                        <option value="1">Lanzamiento Producto Q1</option>
                        <option value="2">Testimonios Clientes</option>
                        <option value="3">Tips Educativos</option>
                    </select>
                </div>

                <div className="form-actions">
                    <button className="btn btn-glass" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn btn-primary" onClick={handleSubmit}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                        <span>Crear Post</span>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default CreatePostModal
