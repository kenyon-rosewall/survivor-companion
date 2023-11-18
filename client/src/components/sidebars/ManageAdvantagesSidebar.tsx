import React, { useEffect, useState } from 'react'
import { Menu } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type ManageAdvantagesSidebarProps = {
  seasonId: number
}

const ManageAdvantagesSidebar: React.FC<ManageAdvantagesSidebarProps> = ({ seasonId }) => {
  const [advantages, setAdvantages] = useState<any[]>([])

  useEffect(() => {
    fetch(`http://localhost:5000/advantages`)
      .then(response => response.json())
      .then(data => {
        setAdvantages(data.data)
      })
      .catch(err => console.error('Error fetching advantages:', err))
  }, [])

  const renderAdvantages = () => {
    if (Array.isArray(advantages) && advantages.length > 0) {
      return advantages.map((advantage, index) => (
        <Menu.List.Item key={advantage.id}>
          {advantage.name}
        </Menu.List.Item>
      ))
    }
  }

  return (
    <>
      <Menu.List.Item>
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Advantage</span>
      </Menu.List.Item>
      {renderAdvantages()}
    </>
  )
}

export default ManageAdvantagesSidebar