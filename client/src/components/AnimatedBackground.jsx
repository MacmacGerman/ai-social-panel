import { useEffect, useState } from 'react'
import './AnimatedBackground.css'

function AnimatedBackground() {
    const [particles, setParticles] = useState([])

    useEffect(() => {
        // Generate random particles
        const newParticles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            top: Math.random() * 100,
            size: Math.random() * 4 + 2,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5
        }))
        setParticles(newParticles)
    }, [])

    return (
        <div className="animated-background">
            {/* Gradient Orbs */}
            <div className="gradient-orb gradient-orb--1"></div>
            <div className="gradient-orb gradient-orb--2"></div>
            <div className="gradient-orb gradient-orb--3"></div>

            {/* Floating Particles */}
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="particle"
                    style={{
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `${particle.delay}s`
                    }}
                />
            ))}
        </div>
    )
}

export default AnimatedBackground
