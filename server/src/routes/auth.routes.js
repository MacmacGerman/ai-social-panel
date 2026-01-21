import express from 'express'
import * as authController from '../controllers/auth.controller.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// Public routes
router.post('/register', authController.register)
router.post('/login', authController.login)
router.post('/google', authController.googleAuth)
router.post('/refresh', authController.refresh)

// Protected routes
router.post('/logout', authMiddleware, authController.logout)
router.get('/me', authMiddleware, authController.me)

export default router
