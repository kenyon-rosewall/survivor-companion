import React from 'react'
import { Table } from 'react-bulma-components'
import PlayerInEpisodeForm from '../forms/playerInEpisode'

type PlayerTableListProps = {
  filter: any
  renderShotInTheDark: boolean
  seasonId: number
  playersInEpisode: any[]
  tribes: any[]
  refreshAlliances: boolean
  toggleRefreshEpisode: () => void
  setRefreshAlliances: (refresh: boolean) => void
}

const PlayerTableList: React.FC<PlayerTableListProps> = ({ 
  filter, renderShotInTheDark, seasonId, playersInEpisode, tribes,
  refreshAlliances, toggleRefreshEpisode, setRefreshAlliances
}) => {
  const tableHeaders = [
    'Player', 'Status', 'Tribe', 'Advantages', 
    'Alliances', 'Shot in the Dark', 'Notes'
  ]

  const renderHeaders = () => {
    return (
      <thead>
        <tr>
        {tableHeaders.map((header: any, index: number) => (
          <th
            key={index}
            className={ (header === 'Shot in the Dark' && !renderShotInTheDark) ? 'is-hidden' : '' }
          >
            {header}
          </th>
        ))}
        </tr>
      </thead>
    )
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
    return players.map((player) => (
      <tbody>
        <PlayerInEpisodeForm
          key={player.id}
          playerInEpisode={player}
          tribes={tribes}
          renderShotInTheDark={renderShotInTheDark}
          refreshAlliances={refreshAlliances}
          toggleRefreshEpisode={toggleRefreshEpisode}
          setRefreshAlliances={setRefreshAlliances}
        />
      </tbody>
    ))
  }

  return (
    <Table
      bordered 
      size='fullwidth' 
      className={ (playersInEpisode.length === 0) ? 'is-hidden' : '' }
    >
      {renderHeaders()}
      {renderPlayersInEpisode()}
    </Table>
  )
}

export default PlayerTableList