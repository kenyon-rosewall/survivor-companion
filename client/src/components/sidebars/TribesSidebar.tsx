import React, { useEffect, useState } from 'react'
import { Menu } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type TribesSidebarProps = {
  seasonId: number
}

const TribesSidebar: React.FC<TribesSidebarProps> = ({ seasonId }) => {
  const [tribes, setTribes] = useState<any[]>([])

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/tribes`)
      .then(response => response.json())
      .then(data => {
        setTribes(data.data)
      })
      .catch(err => console.error('Error fetching tribes:', err))
  }, [])

  const renderTribes = () => {
    if (Array.isArray(tribes) && tribes.length > 0) {
      return tribes.map((tribe, index) => (
        <Menu.List.Item key={tribe.id}>
          {tribe.name}
        </Menu.List.Item>
      ))
    }
  }

  return (
    <>
      <Menu.List.Item>
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Tribe</span>
      </Menu.List.Item>
      {renderTribes()}
    </>
  )
}

export default TribesSidebar