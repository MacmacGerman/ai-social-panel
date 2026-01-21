import express from 'express'
import * as postsController from '../controllers/posts.controller.js'
import authMiddleware from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authMiddleware)

router.get('/', postsController.getPosts)
router.get('/:id', postsController.getPost)
router.post('/', postsController.createPost)
router.put('/:id', postsController.updatePost)
router.delete('/:id', postsController.deletePost)
router.post('/:id/publish', postsController.publishPost)

export default router
