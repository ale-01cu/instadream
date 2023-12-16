export default class RegisterError extends Error {
  constructor (msg = 'Lo sentimos, no se pudo registrar el usuario.') {
    super(msg)
    this.name = 'RegisterError'
  }
}
