import multer from 'multer'
import fs from 'fs'

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const user = req.user
    const dir = `./upload/Users/${user.username}/Avatar`
    fs.mkdirSync(dir, { recursive: true })
    cb(null, dir)
  },
  filename: function (req, file, cb) {
    const extensionImage = file.originalname.split('.')[1]
    cb(null, `${req.user.id}.${extensionImage}`)
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
