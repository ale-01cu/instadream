export default class LoginEmailOrPassError extends Error {
  constructor (msg = 'Email o password incorrectos.') {
    super(msg)
    this.name = 'LoginEmailOrPassError'
  }
}
