import dotenv from 'dotenv'
dotenv.config({ path: '.\\.env' })

export const SECRET_KEY = process.env.SECRET_KEY
export const DATABASE_URL = process.env.DATABASE_URL
