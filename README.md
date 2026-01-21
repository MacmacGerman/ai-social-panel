# AI Social Panel - Panel de Gestión de Contenido con IA

Panel operativo moderno para gestión automatizada de contenido en redes sociales (TikTok, Instagram, YouTube Shorts) con inteligencia artificial.

## 🎨 Características

- ✨ **Diseño Moderno 2026**: Glassmorphism, gradientes vibrantes, animaciones fluidas
- 🤖 **Generación de Contenido con IA**: Integración con Gemini API
- 📅 **Calendario Editorial**: Planificación y programación de posts
- 🎯 **Gestión de Campañas**: Organización de contenido por campañas
- 📊 **Dashboard Analítico**: Métricas y estadísticas en tiempo real
- 🔐 **Multi-tenant**: Arquitectura para múltiples organizaciones
- 📱 **Responsive**: Optimizado para todos los dispositivos

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** - Librería UI
- **Vite** - Build tool y dev server
- **React Router** - Navegación
- **Zustand** - State management
- **Vanilla CSS** - Styling con design system custom

### Backend (próximamente)
- **Node.js + Express** - API REST
- **Supabase** - Base de datos PostgreSQL + Auth + Storage
- **Gemini API** - Generación de contenido con IA

## 📦 Instalación

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd "CONTENIDO INSTAGRAM"
```

2. **Instalar dependencias del cliente**
```bash
cd client
npm install
```

3. **Ejecutar en desarrollo**
```bash
npm run dev
```

El proyecto estará disponible en `http://localhost:3000`

## 📁 Estructura del Proyecto

```
client/
├── src/
│   ├── components/
│   │   └── Layout.jsx          # Layout principal con sidebar
│   ├── pages/
│   │   ├── Dashboard.jsx       # Dashboard principal
│   │   ├── Calendar.jsx        # Calendario editorial
│   │   ├── Campaigns.jsx       # Gestión de campañas
│   │   ├── Generator.jsx       # Generador de contenido IA
│   │   └── Library.jsx         # Biblioteca de contenido
│   ├── App.jsx                 # Componente raíz
│   ├── main.jsx               # Entry point
│   └── index.css              # Estilos globales + Design System
├── index.html
├── vite.config.js
└── package.json
```

## 🎨 Design System

El proyecto utiliza un design system completo con:

### Colores
- **Gradientes primarios**: Violeta a Púrpura (#667eea → #764ba2)
- **Dark mode**: Backgrounds oscuros (#0f0f23, #1a1a2e)
- **Glass effect**: Transparencias y blur para efecto glassmorphism

### Tipografía
- **Font**: Inter (Google Fonts)
- **Pesos**: 300, 400, 500, 600, 700, 800

### Componentes
- Glass cards
- Buttons (primary, glass, icon)
- Inputs y selects con efecto glass
- Badges para plataformas y estados
- Animaciones suaves (fade-in, slide-in, scale-in)

## 🚀 Próximos Pasos

### Fase 1: MVP (En progreso)
- [x] Setup del proyecto
- [x] Design system implementado
- [x] Layout y navegación
- [x] Dashboard básico
- [ ] Configurar Supabase
- [ ] Implementar autenticación
- [ ] Crear backend API

### Fase 2: Funcionalidades Core
- [ ] Generador de contenido con Gemini
- [ ] Calendario editorial interactivo
- [ ] Gestión de campañas (CRUD)
- [ ] Biblioteca de contenido
- [ ] Upload de media

### Fase 3: Automatización
- [ ] Programación de posts
- [ ] Generación de imágenes con IA
- [ ] Templates de contenido
- [ ] Analytics básicos

## 📚 Documentación

- [Investigación de Mejores Prácticas](../brain/research_social_media_ai.md)
- [Sistema de Diseño](../brain/design_system.md)
- [Esquema de Base de Datos](../brain/database_schema.md)

## 🔑 Variables de Entorno

Crear archivo `.env` en la raíz del proyecto:

```env
# Supabase
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# Gemini API
VITE_GEMINI_API_KEY=your_gemini_api_key
```

## 🤝 Contribución

Este es un proyecto privado. Para contribuir, contacta al administrador.

## 📄 Licencia

Privado - Todos los derechos reservados

---

**Desarrollado con ❤️ usando React + Vite + Gemini AI**
