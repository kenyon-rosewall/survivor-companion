import React, { useState } from "react"
import { Form } from "react-bulma-components"

type playerSearchProps = {
  formDisabled: boolean
  handleSelectPlayer: (player: any) => void
}

const PlayerSearch: React.FC<playerSearchProps> = ({ formDisabled, handleSelectPlayer }) => {
  const [players, setPlayers] = useState<any[]>([])

  const handleSearch = (e: any) => {
    e.preventDefault()

    const q = e.target.value
    if (q.length > 2) {
      fetch(`http://localhost:5000/players/search/${q}`)
        .then(response => response.json())
        .then(data => {
          setPlayers(data.data)
        })
        .catch(err => console.error('Error fetching players:', err))
    } else {
      setPlayers([])
    }
  }

  const selectPlayer = (player: any) => {
    setPlayers([])
    handleSelectPlayer(player)
  }

  const renderPlayers = () => {
    if (Array.isArray(players) && players.length > 0) {
      return players.map((player, index) => (
        <a 
          href="#"
          className='dropdown-item'
          key={player.item.id}
          onClick={selectPlayer.bind(this, player.item)}
        >
          {player.item.name}
        </a>
      ))
    }
  }

  return (
    <Form.Field>
      <Form.Control>
        <div className="dropdown is-active">
          <div className="dropdown-trigger">
            <Form.Input
              name="q"
              id="playerSearch"
              placeholder="Search existing players..."
              onChange={handleSearch}
              disabled={formDisabled}
            />
          </div>
          <div className="dropdown-menu" role="menu">
            <div className="dropdown-content">
              {renderPlayers()}
            </div>
          </div>
        </div>
      </Form.Control>
    </Form.Field>
  )
}

export default PlayerSearch