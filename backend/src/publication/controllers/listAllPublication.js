import Publication from '../models/publication.js'
import publicationContent from '../models/publicationContent.js'
import ListPublicationError from '../errors/ListPublicationError.js'
import 'colors'
import { PAGINATION_LIMIT } from '../../../config/baseConfig.js'

export default async function listAllPublication ({ args }) {
  try {
    const { lastCreateAt } = args

    let query = {}
    if (lastCreateAt) {
      query = { createAt: { $lt: lastCreateAt } }
    }

    // const numberOfPublications = await Publication.countDocuments()
    const publications = await Publication
      .find(query)
      .sort({ createAt: -1 })
      .populate('user')
      .limit(PAGINATION_LIMIT + 1)

    let next = false

    if (publications.length > PAGINATION_LIMIT) {
      next = true
      publications.pop() // Eliminamos el último elemento que solo se usó para verificar si hay un siguiente
    }

    const publicationsWithContent = publications.map(async (p) => {
      p.content = await publicationContent
        .find({ publication: p._id })
      return p
    })

    return {
      data: publicationsWithContent,
      next
    }
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al devolver todas las publicaciones: '.red)
    throw new ListPublicationError('No se pudo listar todas las publicaciones.')
  }
}
