import fs from 'fs'
import { __dirname } from '../../../config/baseConfig.js'
import 'colors'

export default function deleteFile (path) {
  const absolutlyPath = __dirname + '/upload' + path

  try {
    fs.unlinkSync(absolutlyPath)
    console.log('Se ha eliminado el fichero: '.green + absolutlyPath)
    return true
  } catch (error) {
    console.error('Ocurrio un error al eliminar el fichero: '.red + absolutlyPath)
    console.error(error)
  }

  return false
}
