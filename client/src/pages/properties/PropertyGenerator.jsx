import React, { useState, useRef } from 'react';
import { toPng } from 'html-to-image';
import { Camera, MapPin, Bed, Bath, Share2, Download, Home } from 'lucide-react';
import propertiesService from '../../services/properties.service';
import { addToast } from '../../components/Toast';
import './PropertyGenerator.css';

const PropertyGenerator = () => {
  const [property, setProperty] = useState({
    title: 'Hermosa Casa Moderna',
    price: '$250.000.000',
    address: 'Av. Las Condes 1234, Santiago',
    bedrooms: 3,
    bathrooms: 2,
    sqft: 140,
    status: 'venta',
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80&w=1000'
  });
  const [isSaving, setIsSaving] = useState(false);

  const previewRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProperty(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await propertiesService.createProperty({
        title: property.title,
        price: property.price,
        address: property.address,
        features: {
          bedrooms: property.bedrooms,
          bathrooms: property.bathrooms,
          sqft: property.sqft
        },
        main_image_url: property.image, // Nota: En producción esto debería ser una URL de Supabase Storage
        status: property.status
      });
      addToast('Propiedad guardada exitosamente', 'success');
    } catch (err) {
      console.error('Error al guardar propiedad:', err);
      addToast('Error al guardar la propiedad', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const downloadImage = async () => {
    if (previewRef.current === null) return;
    try {
      const dataUrl = await toPng(previewRef.current, { cacheBust: true });
      const link = document.createElement('a');
      link.download = `property-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();

      // Opcional: Auto-guardar al descargar
      handleSave();
    } catch (err) {
      console.error('Error al exportar imagen:', err);
      addToast('Error al generar la imagen', 'error');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // 1. Mostrar preview local inmediata
      const reader = new FileReader();
      reader.onloadend = () => {
        setProperty(prev => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);

      // 2. Subir a Supabase Storage
      try {
        setIsSaving(true);
        addToast('Subiendo imagen...', 'info');
        const publicUrl = await propertiesService.uploadImage(file);
        setProperty(prev => ({ ...prev, image: publicUrl }));
        addToast('Imagen lista', 'success');
      } catch (err) {
        console.error('Error al subir imagen:', err);
        addToast('Error al subir la imagen a la nube', 'error');
      } finally {
        setIsSaving(false);
      }
    }
  };

  return (
    <div className="property-generator fade-in">
      <header className="section-header">
        <div>
          <h1 className="h2">SaaS Inmobiliario - Generador de Marketing</h1>
          <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
            Crea publicaciones impactantes para tus propiedades en segundos.
          </p>
        </div>
      </header>

      <div className="generator-grid">
        {/* COLUMNA IZQUIERDA: FORMULARIO */}
        <section className="glass-card property-form">
          <h3 className="h5">Datos de la Propiedad</h3>
          <div className="form-content">
            <div className="form-group">
              <label className="form-label">Título del Anuncio</label>
              <input
                type="text" name="title" className="input-glass"
                value={property.title} onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Precio</label>
              <input
                type="text" name="price" className="input-glass"
                value={property.price} onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Dirección</label>
              <input
                type="text" name="address" className="input-glass"
                value={property.address} onChange={handleInputChange}
              />
            </div>

            <div className="grid-2-cols">
              <div className="form-group">
                <label className="form-label">Habitaciones</label>
                <input
                  type="number" name="bedrooms" className="input-glass"
                  value={property.bedrooms} onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Baños</label>
                <input
                  type="number" name="bathrooms" className="input-glass"
                  value={property.bathrooms} onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Foto Principal</label>
              <div className="upload-box btn-glass">
                <input type="file" onChange={handleImageUpload} accept="image/*" />
                <Camera size={20} />
                <span>Subir Imagen</span>
              </div>
            </div>

            <div className="form-actions" style={{ display: 'flex', gap: 'var(--space-3)' }}>
              <button
                className="btn btn-glass w-full"
                onClick={handleSave}
                disabled={isSaving}
              >
                <Home size={18} />
                {isSaving ? 'Guardando...' : 'Guardar Datos'}
              </button>
              <button
                className="btn btn-primary w-full"
                onClick={downloadImage}
                disabled={isSaving}
              >
                <Download size={18} />
                {isSaving ? 'Procesando...' : 'Descargar Post'}
              </button>
            </div>
          </div>
        </section>

        {/* COLUMNA DERECHA: PREVISUALIZACIÓN */}
        <section className="preview-container">
          <h3 className="h5" style={{ marginBottom: 'var(--space-4)' }}>Vista Previa Instagram</h3>

          {/* El lienzo (Instagram Story Format 9:16 o Post 1:1) */}
          <div className="instagram-canvas" ref={previewRef}>
            {/* Fondo de la Imagen */}
            <div className="canvas-image" style={{ backgroundImage: `url(${property.image})` }}>
              <div className="canvas-overlay"></div>
            </div>

            {/* Contenido flotante sobre la imagen */}
            <div className="canvas-content">
              <div className="canvas-badge">{property.status.toUpperCase()}</div>

              <div className="canvas-info-box">
                <h2 className="canvas-title">{property.title}</h2>
                <div className="canvas-price">{property.price}</div>

                <div className="canvas-location">
                  <MapPin size={14} />
                  <span>{property.address}</span>
                </div>

                <div className="canvas-features">
                  <div className="feature">
                    <Bed size={16} />
                    <span>{property.bedrooms} Dorm.</span>
                  </div>
                  <div className="feature">
                    <Bath size={16} />
                    <span>{property.bathrooms} Baños</span>
                  </div>
                </div>
              </div>

              <div className="canvas-footer">
                <div className="canvas-brand">Tu Inmobiliaria Pro</div>
                <div className="canvas-cta">Más info al DM</div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PropertyGenerator;
