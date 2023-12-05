import Header from '../components/Header/Header'

export default function LayoutBasic({ children }) {

  return (
    <>
      <Header/>
      {children}
    </>
  )
}