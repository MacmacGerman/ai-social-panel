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
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Handle preflight requests explicitly
app.options('*', cors())

// Request logger for debugging
app.use((req, res, next) => {
    console.log(`[Request] ${req.method} ${req.originalUrl}`)
    next()
})

// Root route for health check
app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'API Root' })
})

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

// API Routes Setup
const apiRouter = express.Router()

apiRouter.use('/auth', authRoutes)
apiRouter.use('/posts', postsRoutes)
apiRouter.use('/campaigns', campaignsRoutes)
apiRouter.use('/properties', propertiesRoutes)
apiRouter.use('/generate', generateRoutes)

// Mount the API router at /api
app.use('/api', apiRouter)

// Also mount at root for flexibility with Vercel rewrites
// This acts as a fallback if the /api prefix is stripped by the host
app.use('/', apiRouter)

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Route not found'
    })
})

// Error handler (must be last)
app.use(errorHandler)

// Start server only if not in Vercel
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`)
    })
}

export default app
