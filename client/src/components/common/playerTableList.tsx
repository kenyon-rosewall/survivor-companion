import React from 'react'
import { Table } from 'react-bulma-components'
import PlayerInEpisodeForm from '../forms/playerInEpisode'

type PlayerTableListProps = {
  filter: any
  players: any[]
  tribes: any[]
  alliances: any[]
  selectedSeason: number
  playersCallback: () => void
  hasShotInTheDark: boolean
}

const PlayerTableList: React.FC<PlayerTableListProps> = ({ 
  filter, players, tribes, selectedSeason, playersCallback, hasShotInTheDark 
}) => {
  const tableHeaders = [
    'Player', 'Status', 'Tribe', 'Advantages', 
    'Alliances', 'Shot in the Dark', 'Notes'
  ]

  const renderHeaders = () => {
    return tableHeaders.map((header: any, index: number) => (
      <th
        key={index}
        className={ (header === 'Shot in the Dark' && !hasShotInTheDark) ? 'is-hidden' : '' }
      >{header}</th>
    ))
  }

  const renderPlayersInEpisode = () => {
    let filteredPlayers = players
    if (filter.tribe > 0)
      filteredPlayers = filteredPlayers.filter((player: any) => player.tribe.id === filter.tribe)
    if (filter.hasAdvantage !== '') {
      if (filter.hasAdvantage === 'yes')
        filteredPlayers = filteredPlayers.filter((player: any) => player.advantages.length > 0)
      else
        filteredPlayers = filteredPlayers.filter((player: any) => player.advantages.length === 0)
    }
    if (filter.alliance > 0)
      filteredPlayers = filteredPlayers.filter((player: any) => player.alliances.map((alliance: any) => alliance.id).includes(filter.alliance))
    return filteredPlayers.map((player, index) => (
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
      className={ (players.length === 0) ? 'is-hidden' : '' }
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

export default PlayerTableList