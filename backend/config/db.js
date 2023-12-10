import mongoose from 'mongoose'
import 'colors'
import { DATABASE_URL } from './baseConfig.js'

export default async function connectToDatabase () {
  try {
    await mongoose.connect(DATABASE_URL)
    console.log('Conexion establecida con la base de datos.'.green)
  } catch (e) {
    console.log(e)
    console.log('Error al conectar con la base de datos.'.red)
  }
}
