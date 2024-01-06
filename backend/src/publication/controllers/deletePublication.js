import Publication from '../models/publication.js'
import PublicationContent from '../models/publicationContent.js'
import 'colors'

export default async function deletePublication ({ args, context }) {
  const { id } = args
  const user = context.user

  try {
    const deletedPublication = await Publication.findOneAndDelete({
      user: user._id, id
    })

    await PublicationContent.findAndDelete({
      user: user._id,
      publication: deletedPublication._id
    })

    return true
  } catch (error) {
    console.error(error)
    console.error('Ocurrio un error al devolver todas las publicaciones del usuario: '.red + user.username)
  }
  return false
}
