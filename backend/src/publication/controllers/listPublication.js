import Publication from '../models/publication.js'
import ListPublicationError from '../errors/ListPublicationError.js'
import 'colors'

export default async function listPublication (args, context) {
  const user = context.user

  try {
    const publications = await Publication
      .find({ user: user._id })
      .populate('user')
      .populate('publicationContent')

    return publications
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al devolver todas las publicaciones del usuario: '.red + user.username)
    throw new ListPublicationError('No se pudo listar las publicaciones.')
  }
}
