import React from 'react'
import { Hero, Footer, Container, Content, Columns } from 'react-bulma-components'
import './App.css'
import AppNavbar from './components/AppNavbar'
import AppSidebar from './components/AppSidebar'
import MainContent from './components/MainContent'

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <Hero size="fullheight">
        <Hero.Header renderAs="header" />
        <Hero.Body>
          <Columns style={{ width: '100%' }}>
      <Columns.Column size={2} style={{ height: '700px', overflow: 'auto', border: '1px solid black' }}>
              <AppSidebar />
            </Columns.Column>
            <Columns.Column>
              <MainContent />
            </Columns.Column>
          </Columns>
        </Hero.Body>
        <Hero.Footer>
          <Footer>
            <Container>
              <Content style={{ textAlign: 'center' }}>
                <p>
                  <strong>Survivor Companion</strong> by Kenyon Rosewall.
                </p>
              </Content>
            </Container>
          </Footer>
        </Hero.Footer>
      </Hero>
    </div>
  )
}

export default App
