import React from 'react'
import { Container, Content, Footer } from 'react-bulma-components'

const AppFooter: React.FC = () => {
  return (
    <Footer>
      <Container>
        <Content style={{ textAlign: 'center' }}>
          <p>
            <strong>Survivor Companion</strong> by Kenyon Rosewall.
          </p>
        </Content>
      </Container>
    </Footer>
  )
}

export default AppFooter