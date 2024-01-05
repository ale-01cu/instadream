export default class ListPublicationError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'ListPublicationError'
  }
}
