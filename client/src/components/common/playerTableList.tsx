import React from 'react'
import { Table } from 'react-bulma-components'
import PlayerInEpisodeForm from '../forms/playerInEpisode'
import { PlayerFilter, IPlayerInEpisode, ITribe, IAlliance } from '../../models'

type PlayerTableListProps = {
  filter: PlayerFilter
  renderShotInTheDark: boolean
  playersInEpisode: IPlayerInEpisode[]
  tribes: ITribe[]
  refreshAlliances: boolean
  toggleRefreshEpisode: () => void
  setRefreshAlliances: (refresh: boolean) => void
}

const PlayerTableList: React.FC<PlayerTableListProps> = ({ 
  filter, renderShotInTheDark, playersInEpisode, tribes,
  refreshAlliances, toggleRefreshEpisode, setRefreshAlliances
}) => {
  const tableHeaders: string[] = [
    'Player', 'Status', 'Tribe', 'Advantages', 
    'Alliances', 'Shot in the Dark', 'Notes'
  ]

  const hideShot = (header: string) => {
    return (header === 'Shot in the Dark' && !renderShotInTheDark)
  }

  const renderHeaders = () => {
    return (
      <thead>
        <tr>
        {tableHeaders.map((header: string, index: number) => (
          <th
            key={index}
            className={ hideShot(header) ? 'is-hidden' : '' }
          >
            {header}
          </th>
        ))}
        </tr>
      </thead>
    )
  }

  const filterPlayersInEpisode = (players: IPlayerInEpisode[]) => {
    let filteredPlayers: IPlayerInEpisode[] = players
    if (filter.tribe > 0) {
      filteredPlayers = filteredPlayers.filter((player: IPlayerInEpisode) => {
        if (player.tribe) return player.tribe.id === filter.tribe
      })
    }

    if (filter.hasAdvantage !== '') {
      if (filter.hasAdvantage === 'yes') {
        filteredPlayers = filteredPlayers.filter((player: IPlayerInEpisode) => {
          if (player.advantages) return player.advantages.length > 0
        })
      } else {
        filteredPlayers = filteredPlayers.filter((player: IPlayerInEpisode) => {
          if (player.advantages) return player.advantages.length === 0
        })
      }
    }
    
    if (filter.alliance > 0) {
      filteredPlayers = filteredPlayers.filter((player: IPlayerInEpisode) => {
        if (player.alliances) {
          return player.alliances
            .map((alliance: IAlliance) => alliance.id)
            .includes(filter.alliance)
        }
      })
    }

    return filteredPlayers
  }

  const renderPlayersInEpisode = () => {
    const players: IPlayerInEpisode[] = filterPlayersInEpisode(playersInEpisode)
    return players.map((player: IPlayerInEpisode) => (
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