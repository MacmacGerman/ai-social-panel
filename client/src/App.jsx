import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { supabase } from './config/supabase'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from './components/Toast'
import Dashboard from './pages/Dashboard'
import Calendar from './pages/Calendar'
import Campaigns from './pages/Campaigns'
import Generator from './pages/Generator'
import Library from './pages/Library'
import Settings from './pages/Settings'
import Login from './pages/Login'
import PropertyGenerator from './pages/properties/PropertyGenerator'
import PropertyList from './pages/properties/PropertyList'

function App() {
    useEffect(() => {
        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('🔔 Auth event:', event)
            if (session) {
                console.log('✅ User session:', session.user.email)
                // Store user in localStorage for quick access
                localStorage.setItem('user', JSON.stringify(session.user))
            } else {
                localStorage.removeItem('user')
            }
        })

        return () => subscription.unsubscribe()
    }, [])
    return (
        <>
            <ToastContainer />
            <Router>
                <Routes>
                    {/* Public route */}
                    <Route path="/login" element={<Login />} />

                    {/* Protected routes */}
                    <Route path="/" element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Dashboard />} />
                        <Route path="calendar" element={<Calendar />} />
                        <Route path="campaigns" element={<Campaigns />} />
                        <Route path="generator" element={<Generator />} />
                        <Route path="properties" element={<PropertyList />} />
                        <Route path="properties/new" element={<PropertyGenerator />} />
                        <Route path="library" element={<Library />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>

                    {/* Catch all */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
