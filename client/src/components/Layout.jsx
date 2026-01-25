import { Outlet, NavLink } from 'react-router-dom'
import { Building2, Home, Calendar, Layout as LayoutIcon, Folder, Settings, Sparkles } from 'lucide-react'
import AnimatedBackground from './AnimatedBackground'
import UserProfile from './UserProfile'
import './Layout.css'

function Layout() {
    return (
        <>
            <AnimatedBackground />
            <div className="layout">
                {/* Sidebar */}
                <aside className="sidebar">
                    <div className="sidebar__header">
                        <div className="sidebar__logo">
                            <Building2 size={32} />
                        </div>
                        <h2 className="sidebar__title">Propify SaaS</h2>
                    </div>

                    <nav className="sidebar__nav">
                        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <LayoutIcon size={24} />
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink to="/properties" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Building2 size={24} />
                            <span>Mi Catálogo</span>
                        </NavLink>

                        <NavLink to="/properties/new" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Sparkles size={24} />
                            <span>Generador IA</span>
                        </NavLink>

                        <NavLink to="/calendar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Calendar size={24} />
                            <span>Calendario</span>
                        </NavLink>

                        <NavLink to="/campaigns" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Home size={24} />
                            <span>Campañas</span>
                        </NavLink>

                        <NavLink to="/library" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Folder size={24} />
                            <span>Biblioteca</span>
                        </NavLink>

                        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <Settings size={24} />
                            <span>Configuración</span>
                        </NavLink>
                    </nav>

                    {/* User Profile */}
                    <UserProfile />
                </aside>

                {/* Main Content */}
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default Layout
