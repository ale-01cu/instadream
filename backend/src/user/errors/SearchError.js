export default class SearchError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'SearchError'
  }
}
