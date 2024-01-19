import Publication from '../models/publication.js'
import publicationContent from '../models/publicationContent.js'
import ListPublicationError from '../errors/ListPublicationError.js'
import 'colors'
import User from '../../user/models/user.js'
import { PAGINATION_LIMIT } from '../../../config/baseConfig.js'

// Lista todas las publications de un usuario
// especifico ordenadas desde la
// mas reciente hasta la menos y las pagina
// mediante cursor pagination
export default async function listPublication ({ args }) {
  const { lastCreateAt, username } = args
  try {
    const user = await User.findOne({ username })

    let query = {
      user: user._id
    }

    // Si el usuario envia el campo createAt
    // entonces se crea un parametro para obtener
    // los elementos anteriores a el enviado por el usuario
    if (lastCreateAt) {
      query = {
        ...query,
        createAt: { $lt: lastCreateAt }
      }
    }

    // Obtiene los elementos segun el limite
    const publications = await Publication
      .find(query)
      .sort({ createAt: -1 })
      .populate('user')
      .limit(PAGINATION_LIMIT + 1)

    let next = false

    // Comprueba si hay mas elementos
    if (publications.length > PAGINATION_LIMIT) {
      next = true
      publications.pop() // Eliminamos el último elemento que solo se usó para verificar si hay un siguiente
    }

    // Agrega a cada elemento su contenido de la
    // coleccion de contenido osea (imagenes, videos, etc)
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
    console.error('Ocurrio un error al devolver todas las publicaciones del usuario: '.red + username)
    throw new ListPublicationError('No se pudo listar las publicaciones.')
  }
}
