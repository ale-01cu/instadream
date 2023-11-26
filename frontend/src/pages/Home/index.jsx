import useAuth from "../../hooks/useAuth"

export default function Home () {
  const auth = useAuth()
  console.log(auth);

  return (
    <h1>Home</h1>
  )
}