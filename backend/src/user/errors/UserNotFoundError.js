export default class UserNotFoundError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'UserNotFound'
  }
}
