import { useEffect, useState } from "react"
import { VERIFY_TOKEN } from '../gql/user'
import { useMutation } from "@apollo/client"

export default function useVerifyToken( token ) {
  console.log("aqui dentro del puto hook");
  const [verifyToken] = useMutation(VERIFY_TOKEN)
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const result = await verifyToken({
          variables: {
              token
          }
      })
      console.log(result);
    }
    fetchData()

}, [verifyToken, token])

  return isValid
}