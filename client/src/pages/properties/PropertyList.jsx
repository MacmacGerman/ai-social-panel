import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, Search, Filter, Home, MapPin, Tag, Trash2, Edit3, Image as ImageIcon } from 'lucide-react'
import propertiesService from '../../services/properties.service'
import { addToast } from '../../components/Toast'
import './PropertyList.css'

function PropertyList() {
    const navigate = useNavigate()
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const [filterStatus, setFilterStatus] = useState('all')

    useEffect(() => {
        fetchProperties()
    }, [])

    const fetchProperties = async () => {
        try {
            setLoading(true)
            const data = await propertiesService.getProperties()
            setProperties(data)
        } catch (error) {
            console.error('Error fetching properties:', error)
            addToast('Error al cargar propiedades', 'error')
        } finally {
            setLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm('¿Estás seguro de eliminar esta propiedad?')) return

        try {
            await propertiesService.deleteProperty(id)
            setProperties(properties.filter(p => p.id !== id))
            addToast('Propiedad eliminada', 'success')
        } catch (error) {
            console.error('Error deleting property:', error)
            addToast('Error al eliminar', 'error')
        }
    }

    const filteredProperties = properties.filter(prop => {
        const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            prop.address.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesFilter = filterStatus === 'all' || prop.status === filterStatus
        return matchesSearch && matchesFilter
    })

    return (
        <div className="property-list fade-in">
            <header className="list-header">
                <div>
                    <h1 className="h1">Mis Propiedades</h1>
                    <p className="body-large text-secondary">
                        Gestiona tu inventario y genera material de marketing
                    </p>
                </div>
                <button className="btn btn-primary" onClick={() => navigate('/properties/new')}>
                    <Plus size={20} />
                    <span>Nueva Propiedad</span>
                </button>
            </header>

            <div className="list-controls glass-card">
                <div className="search-box">
                    <Search size={20} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Buscar por título o ubicación..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-glass"
                    />
                </div>
                <div className="filter-tabs">
                    <button
                        className={`filter-tab ${filterStatus === 'all' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('all')}
                    >
                        Todos
                    </button>
                    <button
                        className={`filter-tab ${filterStatus === 'venta' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('venta')}
                    >
                        Venta
                    </button>
                    <button
                        className={`filter-tab ${filterStatus === 'arriendo' ? 'active' : ''}`}
                        onClick={() => setFilterStatus('arriendo')}
                    >
                        Arriendo
                    </button>
                </div>
            </div>

            <div className="properties-grid">
                {loading ? (
                    Array(6).fill(0).map((_, i) => (
                        <div key={i} className="property-card loading-skeleton" style={{ height: '350px' }}></div>
                    ))
                ) : filteredProperties.length > 0 ? (
                    filteredProperties.map(prop => (
                        <div key={prop.id} className="property-card glass-card">
                            <div className="property-card__image">
                                {prop.main_image_url ? (
                                    <img src={prop.main_image_url} alt={prop.title} />
                                ) : (
                                    <div className="image-placeholder">
                                        <ImageIcon size={48} />
                                    </div>
                                )}
                                <span className={`card-badge badge--${prop.status}`}>
                                    {prop.status.toUpperCase()}
                                </span>
                            </div>
                            <div className="property-card__content">
                                <h3 className="h4">{prop.title}</h3>
                                <p className="priceText">{prop.price}</p>
                                <div className="locationText">
                                    <MapPin size={14} />
                                    <span>{prop.address}</span>
                                </div>
                                <div className="card-features">
                                    {(prop.features || []).slice(0, 3).map((f, i) => (
                                        <span key={i} className="feature-pill">{f.text}</span>
                                    ))}
                                </div>
                                <div className="card-actions">
                                    <button className="btn btn-glass btn-sm" onClick={() => navigate(`/properties/new?id=${prop.id}`)}>
                                        <Edit3 size={16} />
                                        <span>Editar / Marketing</span>
                                    </button>
                                    <button className="btn btn-glass btn-sm text-error" onClick={() => handleDelete(prop.id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="empty-state-full glass-card">
                        <Home size={64} className="empty-icon" />
                        <h3>No hay propiedades</h3>
                        <p>Aún no has añadido propiedades a tu catálogo o el filtro no coincide.</p>
                        <button className="btn btn-primary" onClick={() => navigate('/properties/new')}>
                            Empezar ahora
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PropertyList
