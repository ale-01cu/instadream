export default class FollowMySelfError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'FollowMySelfError'
  }
}
