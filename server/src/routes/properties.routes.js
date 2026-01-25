import express from 'express'
import * as propertiesController from '../controllers/properties.controller.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authMiddleware)

router.get('/', propertiesController.getProperties)
router.post('/', propertiesController.createProperty)
router.patch('/:id', propertiesController.updateProperty)
router.delete('/:id', propertiesController.deleteProperty)

export default router
