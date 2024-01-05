import Publication from '../models/publication.js'
import ListPublicationError from '../errors/ListPublicationError.js'
import 'colors'

export default async function listAllPublication (args, context) {
  try {
    const publications = await Publication
      .find()
      .populate('user')
      .populate('publicationContent')

    return publications
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al devolver todas las publicaciones: '.red)
    throw new ListPublicationError('No se pudo listar todas las publicaciones.')
  }
}
