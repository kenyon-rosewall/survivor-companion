import React, { useState, useEffect } from 'react'
import { Table } from 'react-bulma-components'
import PlayerInEpisodeForm from '../forms/playerInEpisode'

type PlayerTableProps = {
  players: any[]
  tribes: any[]
  selectedSeason: number
  playersCallback: () => void
  hasShotInTheDark: boolean
  playerFilter?: string
}

const PlayerTable: React.FC<PlayerTableProps> = ({ players, tribes, selectedSeason, playersCallback, hasShotInTheDark, playerFilter }) => {
  const tableHeaders = [
    'Player', 'Status', 'Tribe', 'Advantages', 
    'Alliances', 'Shot in the Dark', 'Notes'
  ]
  const [filteredPlayers, setFilteredPlayers] = useState<any[]>(players)

  useEffect(() => {
    setFilteredPlayers(players.filter((player: any) => player.status === playerFilter))
  }, [playerFilter, players])

  const renderHeaders = () => {
    return tableHeaders.map((header: any, index: number) => (
      <th
        key={index}
        className={ (header === 'Shot in the Dark' && !hasShotInTheDark) ? 'is-hidden' : '' }
      >{header}</th>
    ))
  }

  const renderPlayersInEpisode = () => {
    return players
            .filter((player: any) => player.status === playerFilter)
            .map((player, index) => (
      <PlayerInEpisodeForm
        key={index}
        pie={player}
        tribes={tribes}
        seasonId={selectedSeason}
        hasShotInTheDark={hasShotInTheDark}
        callback={playersCallback}
      />
    ))
  }

  return (
    <Table
      bordered 
      size='fullwidth' 
      className={ (filteredPlayers.length === 0) ? 'is-hidden' : '' }
    >
      <thead>
        <tr>
          {renderHeaders()}
        </tr>  
      </thead>
      <tbody>
        {renderPlayersInEpisode()}
      </tbody>
    </Table>
  )
}

export default PlayerTable