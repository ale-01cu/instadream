export default class TokenInvalidError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'TokenInvalidError'
  }
}
