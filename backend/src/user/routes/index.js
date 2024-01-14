import { Router } from 'express'
import updateAvatar from '../controllers/updateAvatar.js'
import uploadAvatar from '../middlewares/uploadAvavar.js'
import authorizationMiddleware from '../middlewares/authorization.js'
import searchUsers from '../controllers/searchUsers.js'

const router = Router()

router.post('/upload-avatar', [authorizationMiddleware, uploadAvatar], updateAvatar)
router.get('/search', [authorizationMiddleware], searchUsers)

export default router
