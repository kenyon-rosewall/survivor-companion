import React, { useEffect, useState } from 'react'
import { Menu } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type AlliancesSidebarProps = {
  seasonId: number
}

const AlliancesSidebar: React.FC<AlliancesSidebarProps> = ({ seasonId }) => {
  const [alliances, setAlliances] = useState<any[]>([])

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/alliances`)
      .then(response => response.json())
      .then(data => {
        setAlliances(data.data)
      })
      .catch(err => console.error('Error fetching advantages:', err))
  }, [seasonId])

  const renderAlliances = () => {
    if (Array.isArray(alliances) && alliances.length > 0) {
      return alliances.map((alliance, index) => (
        <Menu.List.Item key={alliance.id}>
          {alliance.name}
        </Menu.List.Item>
      ))
    }
  }

  return (
    <>
      <Menu.List.Item>
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Alliance</span>
      </Menu.List.Item>
      {renderAlliances()}
    </>
  )
}

export default AlliancesSidebar