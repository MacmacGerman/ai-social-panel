import { useState } from 'react'
import './Calendar.css'

function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date())
    const [selectedDate, setSelectedDate] = useState(null)

    // Mock posts data
    const mockPosts = {
        '2026-01-25': [
            { id: 1, platform: 'instagram', title: 'Nuevo producto lanzado', time: '10:00 AM' },
            { id: 2, platform: 'tiktok', title: 'Tutorial rápido', time: '3:00 PM' }
        ],
        '2026-01-27': [
            { id: 3, platform: 'youtube', title: 'Tips de productividad', time: '12:00 PM' }
        ],
        '2026-01-30': [
            { id: 4, platform: 'instagram', title: 'Behind the scenes', time: '2:00 PM' },
            { id: 5, platform: 'instagram', title: 'Testimonios clientes', time: '5:00 PM' }
        ]
    }

    const getDaysInMonth = (date) => {
        const year = date.getFullYear()
        const month = date.getMonth()
        const firstDay = new Date(year, month, 1)
        const lastDay = new Date(year, month + 1, 0)
        const daysInMonth = lastDay.getDate()
        const startingDayOfWeek = firstDay.getDay()

        return { daysInMonth, startingDayOfWeek, year, month }
    }

    const { daysInMonth, startingDayOfWeek, year, month } = getDaysInMonth(currentDate)

    const monthNames = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

    const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const getDateKey = (day) => {
        return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    }

    const getPostsForDate = (day) => {
        const dateKey = getDateKey(day)
        return mockPosts[dateKey] || []
    }

    const isToday = (day) => {
        const today = new Date()
        return day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()
    }

    return (
        <div className="calendar-page fade-in">
            <header className="calendar-page__header">
                <div>
                    <h1 className="h1">Calendario Editorial</h1>
                    <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
                        Planifica y programa tu contenido
                    </p>
                </div>
                <button className="btn btn-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    <span>Nuevo Post</span>
                </button>
            </header>

            <div className="calendar-container glass-card">
                {/* Calendar Header */}
                <div className="calendar-header">
                    <h2 className="h3">{monthNames[month]} {year}</h2>
                    <div className="calendar-nav">
                        <button className="btn-icon" onClick={previousMonth}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                        <button className="btn btn-glass" onClick={() => setCurrentDate(new Date())}>
                            Hoy
                        </button>
                        <button className="btn-icon" onClick={nextMonth}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Day Names */}
                <div className="calendar-days-header">
                    {dayNames.map(day => (
                        <div key={day} className="day-name">{day}</div>
                    ))}
                </div>

                {/* Calendar Grid */}
                <div className="calendar-grid">
                    {/* Empty cells for days before month starts */}
                    {Array.from({ length: startingDayOfWeek }).map((_, index) => (
                        <div key={`empty-${index}`} className="calendar-day calendar-day--empty"></div>
                    ))}

                    {/* Days of the month */}
                    {Array.from({ length: daysInMonth }).map((_, index) => {
                        const day = index + 1
                        const posts = getPostsForDate(day)
                        const today = isToday(day)

                        return (
                            <div
                                key={day}
                                className={`calendar-day ${today ? 'calendar-day--today' : ''} ${posts.length > 0 ? 'calendar-day--has-posts' : ''}`}
                                onClick={() => setSelectedDate(day)}
                            >
                                <div className="calendar-day__number">{day}</div>
                                {posts.length > 0 && (
                                    <div className="calendar-day__posts">
                                        {posts.slice(0, 2).map(post => (
                                            <div key={post.id} className={`post-indicator post-indicator--${post.platform}`}>
                                                <span className="post-indicator__dot"></span>
                                                <span className="post-indicator__title">{post.title}</span>
                                            </div>
                                        ))}
                                        {posts.length > 2 && (
                                            <div className="post-indicator__more">+{posts.length - 2} más</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="calendar-legend glass-card">
                <h4 className="h6">Plataformas</h4>
                <div className="legend-items">
                    <div className="legend-item">
                        <span className="legend-dot legend-dot--instagram"></span>
                        <span>Instagram</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot legend-dot--tiktok"></span>
                        <span>TikTok</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot legend-dot--youtube"></span>
                        <span>YouTube</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Calendar
