import { Router } from 'express'
import updateAvatar from '../controllers/updateAvatar.js'

const router = Router()

router.get('/upload-avatar', updateAvatar)

export default router
