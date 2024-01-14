import React from 'react'
import { useSelector } from 'react-redux'
import { Columns, Container } from 'react-bulma-components'
import AppSidebar from './AppSidebar'
import MainContent from './AppContent'
import { RootState } from '../../reducers'

// TODO: Create refreshes for sidebars so that updating
//      a form in the content pane will refresh the sidebar
const AppBody: React.FC = () => {
  const selectedMenuItem: string = useSelector((state: RootState) => state.menu.selectedMenuItem)

  const sidebarHidden = (): boolean => {
    switch (selectedMenuItem) {
      case 'seasonInfo':
        return true
      default:
        return false
    }
  }

  return (
    <Columns style={{ width: '100%' }}>
      <Columns.Column 
        size={2} 
        style={{ height: '700px', overflow: 'auto', border: '1px solid black' }}
        className={ sidebarHidden() ? 'is-hidden' : '' }
      >
        <AppSidebar />
      </Columns.Column>
      <Columns.Column
        style={{ minHeight: '700px' }}
      >
        <Container>
          <br />
          <MainContent />
        </Container>
      </Columns.Column>
    </Columns>
  )
}

export default AppBody