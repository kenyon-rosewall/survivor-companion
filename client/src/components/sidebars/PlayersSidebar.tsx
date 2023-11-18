import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Menu } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

type PlayersSidebarProps = {
  seasonId: number
}

const PlayersSidebar: React.FC<PlayersSidebarProps> = ({ seasonId }) => {
  const [players, setPlayers] = useState<any[]>([])

  useEffect(() => {
    fetch(`http://localhost:5000/seasons/${seasonId}/players`)
      .then(response => response.json())
      .then(data => {
        setPlayers(data.data)
      })
      .catch(err => console.error('Error fetching players:', err))
  }, [])

  const renderPlayers = () => {
    if (Array.isArray(players) && players.length > 0) {
      return players.map((player, index) => (
        <Menu.List.Item key={player.id}>
          {player.name}
        </Menu.List.Item>
      ))
    }
  }

  return (
    <>
      <Menu.List.Item>
        <FontAwesomeIcon icon={["fas", "plus"]} />
        <span>Add Player</span>
      </Menu.List.Item>
      {renderPlayers()}
    </>
  )
}

export default PlayersSidebar