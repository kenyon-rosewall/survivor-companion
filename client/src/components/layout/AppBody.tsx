import React from 'react'
import { Columns } from 'react-bulma-components'
import AppSidebar from './AppSidebar'
import MainContent from './AppContent'

const AppBody: React.FC = () => {
  return (
    <Columns style={{ width: '100%' }}>
      <Columns.Column 
        size={2} 
        style={{ height: '700px', overflow: 'auto', border: '1px solid black' }}
      >
        <AppSidebar />
      </Columns.Column>
      <Columns.Column>
        <MainContent />
      </Columns.Column>
    </Columns>
  )
}

export default AppBody