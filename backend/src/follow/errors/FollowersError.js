export default class FollowersError extends Error {
  constructor (msg) {
    super(msg)
    this.name = 'FollowersError'
  }
}
