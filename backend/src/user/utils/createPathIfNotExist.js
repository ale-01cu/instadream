import fs from 'fs'

// Crea una ruta de carpetas si no esta creada ya
export default function createRootIfNotExist (path) {
  if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true })
}
