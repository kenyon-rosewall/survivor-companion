import React, { useState } from "react"
import { Form } from "react-bulma-components"
import { searchPlayers } from "../../api"

type playerSearchProps = {
  handleSelectPlayer: (player: any) => void
  seasonId?: number
}

const PlayerSearch: React.FC<playerSearchProps> = ({ 
  handleSelectPlayer, seasonId 
}) => {
  const [players, setPlayers] = useState<any[]>([])
  const [query, setQuery] = useState<string>('')
  const [active, setActive] = useState<boolean>(false)

  const setPlayersWrapper = (data: any) => {
    if (data && data.length > 0) {
      setPlayers(data)
    } else {
      setPlayers([])
      setActive(false)
    }
  }

  const handleSearch = (e: any) => {
    e.preventDefault()
    setQuery(e.target.value)
    setActive(true)

    const q = e.target.value
    searchPlayers(q, Number(seasonId), setPlayersWrapper)
  }

  const selectPlayer = (player: any) => {
    setQuery('')
    setPlayers([])
    handleSelectPlayer(player)
    setActive(false)
  }

  const renderPlayers = () => {
    if (Array.isArray(players) && players.length > 0) {
      return players.map((player) => (
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
        <div className={active ? 'dropdown is-active' : 'dropdown'}>
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