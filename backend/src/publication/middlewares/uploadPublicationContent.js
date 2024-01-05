import fs from 'fs'
import multer from 'multer'
import createPathIfNotExist from '../../user/utils/createPathIfNotExist.js'
import emptyFolder from '../../user/utils/emptyFolder.js'
let cont = 0

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const path = req.filesPath
    cb(null, path)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9)
    const extensionImage = file.mimetype.split('/')[1]
    const filename = `${cont}${uniqueSuffix}-${req.user.id}.${extensionImage}`
    cont++
    cb(null, filename)
  }
})

// Valida que el avatar sea una imagen
const fileFilter = (req, file, cb) => {
  // Aquí puedes especificar qué tipos de ficheros quieres aceptar
  if (file.mimetype.split('/')[0] === 'image' || file.mimetype.split('/')[0] === 'video') {
    // Aceptar el fichero
    cb(null, true)
  } else {
    // Rechazar el fichero
    cb(null, false)
  }
}

// Esta funcion es para guardar todos los ficheros de la publicacion
// en la misma carpeta que representa la publicacion
export default function (req, res, next) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
  const user = req.user
  const path = `./upload/Users/${user.username}/Publications/${uniqueSuffix}`

  if (fs.existsSync(path)) emptyFolder(path)
  else createPathIfNotExist(path)
  req.filesPath = path

  const multerEngine = multer({ storage, fileFilter }).any('content')
  multerEngine(req, res, next)
}
