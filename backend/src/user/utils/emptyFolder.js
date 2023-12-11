import fs from 'fs'
import fsExtra from 'fs-extra'

// Elimina todo lo que este dentro de una carpeta
export default async function emptyFolder (path) {
  if (fs.existsSync(path) && fsExtra.emptydir) {
    await fsExtra.emptyDir(path)
  }
}
