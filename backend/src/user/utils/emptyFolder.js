import fs from 'fs'
import fsExtra from 'fs-extra'
import 'colors'

// Elimina todo lo que este dentro de una carpeta
export default async function emptyFolder (path) {
  try {
    if (fs.existsSync(path) && fsExtra.emptydir) {
      await fsExtra.emptyDir(path)
    }
  } catch (error) {
    console.error(error)
    console.error('Error al vaciar el directorio: '.red + path)
  }
}
