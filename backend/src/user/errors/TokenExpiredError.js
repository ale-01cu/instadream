export default class TokenExpiredError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'TokenExpiredError'
  }
}
