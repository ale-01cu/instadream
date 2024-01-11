import { useEffect, useState } from "react"
import { VERIFY_TOKEN } from '../gql/user'
import { useMutation } from "@apollo/client"
import { getToken } from "../utils/token"

export default function useVerifyToken() {
  const [verifyToken] = useMutation(VERIFY_TOKEN)
  const [ token, setToken ] = useState()
  const [ isValid, setIsValid ] = useState(false)

  useEffect(() => {
    setToken(getToken())

    const fetchData = async () => {
      const result = await verifyToken({
          variables: { token }
      })
      setIsValid(result.data.verifyToken)
    }
    if(token) fetchData()

 }, [token, verifyToken])

  return [ isValid, token ]
}