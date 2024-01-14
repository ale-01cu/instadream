import Publication from '../models/publication.js'
import publicationContent from '../models/publicationContent.js'
import ListPublicationError from '../errors/ListPublicationError.js'
import 'colors'
import User from '../../user/models/user.js'
import { PAGINATION_LIMIT } from '../../../config/baseConfig.js'

export default async function listPublication ({ args, context }) {
  const { lastId, username } = args
  try {
    const user = await User.findOne({ username })

    let query = {
      user: user._id
    }
    if (lastId) {
      query = {
        ...query,
        _id: { $gt: lastId }
      }
    }

    const publications = await Publication
      .find(query)
      .populate('user')
      .sort({ _id: 1 })
      .limit(PAGINATION_LIMIT + 1)

    let next = false

    if (publications.length > PAGINATION_LIMIT) {
      next = true
      publications.pop() // Eliminamos el último elemento que solo se usó para verificar si hay un siguiente
    }

    const publicationsWithContent = publications.map(async (p) => {
      p.content = await publicationContent.find({ publication: p._id })
      return p
    })

    return {
      data: publicationsWithContent,
      next
    }
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al devolver todas las publicaciones del usuario: '.red + username)
    throw new ListPublicationError('No se pudo listar las publicaciones.')
  }
}
