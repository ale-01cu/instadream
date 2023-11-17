import mongoose from 'mongoose'
import dotenv from 'dotenv'
import 'colors'
dotenv.config({ path: '.\\.env' })

const databaseUrl = process.env.database_url

export default async function connectToDatabase () {
  try {
    await mongoose.connect(databaseUrl)
    console.log('Conexion establecida con la base de datos.'.green)
  } catch (e) {
    console.log(e)
    console.log('Error al conectar con la base de datos.'.red)
  }
}
