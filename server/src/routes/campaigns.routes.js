import express from 'express'
import * as campaignsController from '../controllers/campaigns.controller.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authMiddleware)

router.get('/', campaignsController.getCampaigns)
router.get('/:id', campaignsController.getCampaign)
router.post('/', campaignsController.createCampaign)
router.put('/:id', campaignsController.updateCampaign)
router.delete('/:id', campaignsController.deleteCampaign)
router.get('/:id/posts', campaignsController.getCampaignPosts)

export default router
