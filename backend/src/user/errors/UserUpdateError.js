export default class UserUpdateError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'UserUpdateError'
  }
}
