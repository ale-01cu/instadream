import Publication from '../models/publication.js'
import publicationContent from '../models/publicationContent.js'
import ListPublicationError from '../errors/ListPublicationError.js'
import 'colors'

export default async function listAllPublication () {
  try {
    const publications = await Publication
      .find()
      .populate('user')

    const publicationsWithContent = publications.map(async (p) => {
      p.content = await publicationContent.find({ publication: p._id })
      return p
    })

    return publicationsWithContent.reverse()
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al devolver todas las publicaciones: '.red)
    throw new ListPublicationError('No se pudo listar todas las publicaciones.')
  }
}
