import React, { useEffect, useState } from 'react'
import { Menu } from 'react-bulma-components'

type AdvantagesSidebarProps = {
  seasonId: number
}

const AdvantagesSidebar: React.FC<AdvantagesSidebarProps> = ({ seasonId }) => {
  const [advantages, setAdvantages] = useState<any[]>([])

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/advantages`)
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
      {renderAdvantages()}
    </>
  )
}

export default AdvantagesSidebar