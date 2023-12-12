import fs from 'fs'
import 'colors'

// Crea una ruta de carpetas si no esta creada ya
export default function createPathIfNotExist (path) {
  try {
    if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
  } catch (error) {
    console.error(error)
    console.error('Error al crear una ruta en disco.'.red)
  }
}
