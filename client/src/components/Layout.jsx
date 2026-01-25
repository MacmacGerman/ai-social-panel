import { Outlet, NavLink } from 'react-router-dom'
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
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                            </svg>
                        </div>
                        <h2 className="sidebar__title">AI Social Panel</h2>
                    </div>

                    <nav className="sidebar__nav">
                        <NavLink to="/" end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                            <span>Dashboard</span>
                        </NavLink>

                        <NavLink to="/properties/new" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                            </svg>
                            <span>Generador Inmobiliario</span>
                        </NavLink>

                        <NavLink to="/calendar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                <line x1="16" y1="2" x2="16" y2="6" />
                                <line x1="8" y1="2" x2="8" y2="6" />
                                <line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                            <span>Calendario</span>
                        </NavLink>

                        <NavLink to="/campaigns" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <span>Campañas</span>
                        </NavLink>

                        <NavLink to="/library" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                            </svg>
                            <span>Biblioteca</span>
                        </NavLink>

                        <NavLink to="/settings" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24" />
                            </svg>
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
