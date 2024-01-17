import { useEffect, useState } from "react"
import { VERIFY_TOKEN } from '../gql/user'
import { useMutation } from "@apollo/client"
import { getLocalStorageToken, setToken } from "../utils/token"

export default function useVerifyToken() {
  const [verifyToken] = useMutation(VERIFY_TOKEN)
  const [ tokenInMemory, setTokenInMemory ] = useState()
  const [ isValid, setIsValid ] = useState(false)

  useEffect(() => {
    const token = getLocalStorageToken()
    setTokenInMemory(token)
    setToken(token, false)

    const fetchData = async () => {
      const result = await verifyToken({
          variables: { token: tokenInMemory }
      })
      setIsValid(result.data.verifyToken)

    }
    if(tokenInMemory) fetchData()

 }, [tokenInMemory, verifyToken])

  return [ isValid, tokenInMemory ]
}