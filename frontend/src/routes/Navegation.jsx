import { Route, Routes } from 'react-router-dom'
import routes from './routes' 

export default function Navigation() {
  return (
    <Routes>
      {
        routes.map(( route, index ) => (
          <Route 
            key={index}
            path={route.path}
            exact={route.exact}
            Component={props => (
              <route.layout>
                <route.component {...props}/>
              </route.layout>
            )}
          />
        ))
      }
    </Routes>
  )
}
