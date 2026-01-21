import { useEffect, useState } from 'react'
import './LoadingSkeleton.css'

function LoadingSkeleton({ type = 'card', count = 1 }) {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const renderSkeleton = () => {
        switch (type) {
            case 'card':
                return (
                    <div className={`skeleton-card ${mounted ? 'skeleton-mounted' : ''}`}>
                        <div className="skeleton-thumbnail shimmer"></div>
                        <div className="skeleton-content">
                            <div className="skeleton-line skeleton-line--title shimmer"></div>
                            <div className="skeleton-line skeleton-line--text shimmer"></div>
                            <div className="skeleton-line skeleton-line--text shimmer" style={{ width: '60%' }}></div>
                        </div>
                    </div>
                )
            case 'stat':
                return (
                    <div className={`skeleton-stat ${mounted ? 'skeleton-mounted' : ''}`}>
                        <div className="skeleton-circle shimmer"></div>
                        <div className="skeleton-line skeleton-line--title shimmer"></div>
                        <div className="skeleton-line skeleton-line--text shimmer" style={{ width: '50%' }}></div>
                    </div>
                )
            case 'list':
                return (
                    <div className={`skeleton-list-item ${mounted ? 'skeleton-mounted' : ''}`}>
                        <div className="skeleton-avatar shimmer"></div>
                        <div className="skeleton-content">
                            <div className="skeleton-line skeleton-line--text shimmer"></div>
                            <div className="skeleton-line skeleton-line--text shimmer" style={{ width: '70%' }}></div>
                        </div>
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div key={index} style={{ animationDelay: `${index * 0.1}s` }}>
                    {renderSkeleton()}
                </div>
            ))}
        </>
    )
}

export default LoadingSkeleton
