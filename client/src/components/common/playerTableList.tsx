import React from 'react'
import { Table } from 'react-bulma-components'
import PlayerInEpisodeForm from '../forms/playerInEpisode'

type PlayerTableListProps = {
  filter: any
  playersInEpisode: any[]
  tribes: any[]
  alliances: any[]
  seasonId: number
  renderShotInTheDark: boolean
  toggleRefreshEpisodeChildren: () => void
  toggleRefreshEpisode: () => void
}

const PlayerTableList: React.FC<PlayerTableListProps> = ({ 
  filter, playersInEpisode, tribes, seasonId, toggleRefreshEpisodeChildren, 
  toggleRefreshEpisode, renderShotInTheDark 
}) => {
  const tableHeaders = [
    'Player', 'Status', 'Tribe', 'Advantages', 
    'Alliances', 'Shot in the Dark', 'Notes'
  ]

  const renderHeaders = () => {
    return tableHeaders.map((header: any, index: number) => (
      <th
        key={index}
        className={ (header === 'Shot in the Dark' && !renderShotInTheDark) ? 'is-hidden' : '' }
      >{header}</th>
    ))
  }

  const filterPlayersInEpisode = (players: any[]) => {
    let filteredPlayers = players

    if (filter.tribe > 0) {
      filteredPlayers = filteredPlayers.filter((player: any) => {
        return player.tribe.id === filter.tribe
      })
    }

    if (filter.hasAdvantage !== '') {
      if (filter.hasAdvantage === 'yes') {
        filteredPlayers = filteredPlayers.filter((player: any) => {
          return player.advantages.length > 0
        })
      } else {
        filteredPlayers = filteredPlayers.filter((player: any) => {
          return player.advantages.length === 0
        })
      }
    }
    
    if (filter.alliance > 0) {
      filteredPlayers = filteredPlayers.filter((player: any) => {
        return player.alliances
          .map((alliance: any) => alliance.id)
          .includes(filter.alliance)
      })
    }

    return filteredPlayers
  }

  const renderPlayersInEpisode = () => {
    const players = filterPlayersInEpisode(playersInEpisode)
    return players.map((player, index) => (
      <PlayerInEpisodeForm
        key={index}
        playerInEpisode={player}
        tribes={tribes}
        seasonId={seasonId}
        renderShotInTheDark={renderShotInTheDark}
        toggleRefreshEpisodeChildren={toggleRefreshEpisodeChildren}
        toggleRefreshEpisode={toggleRefreshEpisode}
      />
    ))
  }

  return (
    <Table
      bordered 
      size='fullwidth' 
      className={ (playersInEpisode.length === 0) ? 'is-hidden' : '' }
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