export default class LoginError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'LoginError'
  }
}
