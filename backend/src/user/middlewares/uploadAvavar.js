import multer from 'multer'
import emptyFolder from '../utils/emptyFolder.js'
import createRootIfNotExist from '../utils/createPathIfNotExist.js'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const user = req.user
    const path = `./upload/Users/${user.username}/Avatar`

    emptyFolder(path)
    createRootIfNotExist(path)

    cb(null, path)
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const extensionImage = file.mimetype.split('/')[1]
    cb(null, `${uniqueSuffix}-${req.user.id}.${extensionImage}`)
  }
})

// Valida que el avatar sea una imagen
const fileFilter = (req, file, cb) => {
  // Aquí puedes especificar qué tipos de ficheros quieres aceptar
  if (file.mimetype.split('/')[0] === 'image') {
    // Aceptar el fichero
    cb(null, true)
  } else {
    // Rechazar el fichero
    cb(null, false)
  }
}

export default multer({ storage, fileFilter }).single('avatar')
