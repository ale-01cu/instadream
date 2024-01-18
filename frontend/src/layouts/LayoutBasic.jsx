import Header from '../components/Header/Header'

// La funcion de este componente es mantener
// el header de la app fijo aunque varie la pagina
// en la que es usuario este
export default function LayoutBasic({ children }) {

  return (
    <>
      <Header/>
      {children}
    </>
  )
}