import { decode } from 'jsonwebtoken'

const getUser = token => {
  return decode(token)
}

export default getUser
