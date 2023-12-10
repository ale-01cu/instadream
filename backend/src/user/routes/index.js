import { Router } from 'express'
import updateAvatar from '../controllers/updateAvatar.js'
import uploadAvatar from '../middlewares/uploadAvavar.js'
import validateToken from '../middlewares/validateToken.js'

const router = Router()

router.post('/upload-avatar', [validateToken, uploadAvatar], updateAvatar)

export default router
