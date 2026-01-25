import express from 'express'
import * as geminiService from '../services/gemini.service.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authMiddleware)

router.post('/caption', geminiService.generateCaption)
router.post('/hashtags', geminiService.generateHashtags)
router.post('/ideas', geminiService.generateIdeas)
router.post('/post', geminiService.generatePost)
router.post('/property', geminiService.generatePropertyDescription)

export default router
