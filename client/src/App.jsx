import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
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

function App() {
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
