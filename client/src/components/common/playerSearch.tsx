import React, { useState } from "react"
import { Form } from "react-bulma-components"

type playerSearchProps = {
  handleSelectPlayer: (player: any) => void
  seasonId?: number
}

const PlayerSearch: React.FC<playerSearchProps> = ({ 
  handleSelectPlayer, seasonId 
}) => {
  const [players, setPlayers] = useState<any[]>([])
  const [query, setQuery] = useState<string>('')

  const handleSearch = (e: any) => {
    e.preventDefault()
    setQuery(e.target.value)

    const q = e.target.value
    let seasonQuery = ''
    if (Number(seasonId) > 0) seasonQuery = 'season/' + seasonId + '/'
    if (q.length > 2) {
      fetch(`http://localhost:5000/players/${seasonQuery}search/${q}`)
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
    setQuery('')
    setPlayers([])
    handleSelectPlayer(player)
  }

  const renderPlayers = () => {
    if (Array.isArray(players) && players.length > 0) {
      return players.map((player, index) => (
        <li 
          className='dropdown-item'
          key={player.item.id}
          onClick={selectPlayer.bind(this, player.item)}
        >
          {player.item.name}
        </li>
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
              placeholder="Search existing players..."
              onChange={handleSearch}
              value={query}
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