import React from 'react'
import { Hero } from 'react-bulma-components'
import './App.scss'
import AppNavbar from './components/layout/AppNavbar'
import AppBody from './components/layout/AppBody'
import AppFooter from './components/layout/AppFooter'

const App: React.FC = () => {
  return (
    <div className="App">
      <AppNavbar />
      <Hero size="fullheight">
        {/* <Hero.Header renderAs="header" /> */}
        <Hero.Body>
          <AppBody />
        </Hero.Body>
        <Hero.Footer>
          <AppFooter />
        </Hero.Footer>
      </Hero>
    </div>
  )
}

export default App
