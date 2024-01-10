import Publication from '../models/publication.js'
import publicationContent from '../models/publicationContent.js'
import ListPublicationError from '../errors/ListPublicationError.js'
import 'colors'

const limit = 5

export default async function listAllPublication ({ args }) {
  try {
    const { lastId } = args

    let query = {}
    if (lastId) {
      query = { _id: { $gt: lastId } }
    }

    // const numberOfPublications = await Publication.countDocuments()
    const publications = await Publication
      .find(query)
      .populate('user')
      .sort({ _id: 1 })
      .limit(limit + 1)

    let next = false

    if (publications.length > limit) {
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
    console.error('Ocurrio un error al devolver todas las publicaciones: '.red)
    throw new ListPublicationError('No se pudo listar todas las publicaciones.')
  }
}
