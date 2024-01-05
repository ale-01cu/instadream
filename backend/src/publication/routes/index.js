import { Router } from 'express'
import createPublication from '../controllers/createPublication.js'
import updatePublication from '../controllers/updatePublication.js'
import uploadPublicationContent from '../middlewares/uploadPublicationContent.js'
import authorizationMiddleware from '../../user/middlewares/authorization.js'

const router = Router()

router.post('',
  [authorizationMiddleware, uploadPublicationContent],
  createPublication
)

router.put('',
  [authorizationMiddleware, uploadPublicationContent],
  updatePublication
)

export default router
