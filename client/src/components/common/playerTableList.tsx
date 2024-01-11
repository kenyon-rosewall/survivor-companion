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

  const hideShot = (header: string): boolean => {
    return (header === 'Shot in the Dark' && !renderShotInTheDark)
  }

  const renderHeaders = (): React.ReactNode => {
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

  const filterPlayersInEpisode = (players: IPlayerInEpisode[]): IPlayerInEpisode[] => {
    return players.filter((player: IPlayerInEpisode) => {
      const hasAdvantageCondition = filter.hasAdvantage === 'yes'
        ? (player.advantages?.length)
        : (!player.advantages?.length);
      const inAdvantageFilter = filter.hasAdvantage === '' || hasAdvantageCondition;

      const inTribeFilter = filter.tribe > 0
        ? player.tribe?.id === filter.tribe
        : true;

      const inAllianceFilter = filter.alliance > 0
        ? player.alliances?.some(alliance => alliance.id === filter.alliance)
        : true;

      return inTribeFilter && inAdvantageFilter && inAllianceFilter;
    });
  }

  const renderPlayersInEpisode = (): React.ReactNode => {
    return filterPlayersInEpisode(playersInEpisode)
      .map((player: IPlayerInEpisode) => (
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