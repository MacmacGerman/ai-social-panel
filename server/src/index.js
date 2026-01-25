import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import dotenv from 'dotenv'
import errorHandler from './middleware/errorHandler.js'

// Import routes
import authRoutes from './routes/auth.routes.js'
import postsRoutes from './routes/posts.routes.js'
import campaignsRoutes from './routes/campaigns.routes.js'
import propertiesRoutes from './routes/properties.routes.js'
// import socialRoutes from './routes/social.routes.js'
import generateRoutes from './routes/generate.routes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Security middleware
app.use(helmet())

// CORS configuration
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        /\.vercel\.app$/
    ],
    credentials: true
}))

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
})
app.use('/api/', limiter)

// Body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        message: 'AI Social Panel API is running',
        timestamp: new Date().toISOString()
    })
})

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/posts', postsRoutes)
app.use('/api/campaigns', campaignsRoutes)
app.use('/api/properties', propertiesRoutes)
// app.use('/api/social', socialRoutes)
app.use('/api/generate', generateRoutes)

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found'
    })
})

// Error handler (must be last)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`)
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`)
})

export default app
