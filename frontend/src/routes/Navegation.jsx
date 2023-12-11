import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import routes from './routes' 
import { map } from 'lodash'

export default function Navigation() {
  return (
    <Routes>
      {
        map(routes, ( route, index ) => (
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
