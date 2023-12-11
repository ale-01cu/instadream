import { dirname } from 'path'
import { fileURLToPath } from 'url'
import dotenv from 'dotenv'
dotenv.config({ path: '.\\.env' })

const __filename = fileURLToPath(import.meta.url)
export const __dirname = dirname(dirname(__filename))

export const SECRET_KEY = process.env.SECRET_KEY
export const DATABASE_URL = process.env.DATABASE_URL
export const PORT = process.env.PORT || 4000
export const UPLOAD_ROOT = 'upload'
