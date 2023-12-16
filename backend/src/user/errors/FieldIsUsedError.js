export default class FieldIsUsedError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'FieldIsUsedError'
  }
}
