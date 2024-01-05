import Publication from '../models/publication.js'
import PublicationContent from '../models/publicationContent.js'

export default async function updatePublication (req, res) {
  const { id, description } = req.body
  const files = req.files

  try {
    // Crea una nueva publication
    const newPublication = await Publication.findOneAndUpdate(id, {
      description
    })

    await PublicationContent.findAndDelete({ publication: newPublication._id })

    // Itera sobre los ficheros de la publication para guardarlos todos en la DB
    files.forEach(element => {
      const newPublicationContent = new PublicationContent({
        path: element.path,
        publication: newPublication._id
      })
      newPublicationContent.save()
    })

    return res.status(201).json({
      newPublication,
      files: files.map(file => file.path)
    })
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al crear una nueva publicación.'.red)
  }

  return res.status(500).json({
    error: 'No se pudo crear la publicación'
  })
}
