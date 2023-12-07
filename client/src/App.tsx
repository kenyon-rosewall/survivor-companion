import React from 'react'
import { Block } from 'react-bulma-components'
import './App.scss'
import AppNavbar from './components/layout/AppNavbar'
import AppBody from './components/layout/AppBody'
import AppFooter from './components/layout/AppFooter'

const App: React.FC = () => {
  return (
    <div className="App">
      <AppNavbar />
      <Block>
        <AppBody />
      </Block>
      <Block>
        <AppFooter />
      </Block>
    </div>
  )
}

export default App
