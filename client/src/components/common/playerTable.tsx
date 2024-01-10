import React, { useState, useEffect } from 'react'
import PlayerTableFilter from './playerTableFilter'
import PlayerTableList from './playerTableList'
import { extractAlliances } from '../../utils'
import { PlayerStatusEnum, IPlayerInEpisode, ITribe, IAlliance, PlayerFilter } from '../../models'

type PlayerTableProps = {
  playerStatus?: PlayerStatusEnum
  seasonId: number
  playersInEpisode: IPlayerInEpisode[]
  tribes: ITribe[]
  showFilter?: boolean
  renderShotInTheDark: boolean
  refreshAlliances: boolean
  toggleRefreshEpisode: () => void
  setRefreshAlliances: (refresh: boolean) => void
}

const PlayerTable: React.FC<PlayerTableProps> = ({ 
  playerStatus, seasonId, playersInEpisode, tribes, showFilter = false,
  renderShotInTheDark, refreshAlliances, toggleRefreshEpisode, setRefreshAlliances
}) => {
  const [filteredPlayers, setFilteredPlayers] = useState<IPlayerInEpisode[]>(playersInEpisode)
  const [alliances, setAlliances] = useState<IAlliance[]>([])
  const [filter, setFilter] = useState<PlayerFilter>({
    tribe: 0,
    hasAdvantage: '',
    alliance: 0,
  })

  useEffect(() => {
    const filterPlayersByStatus = (players: IPlayerInEpisode[]) => {
      if (!players) return []
      
      return players.filter((player: IPlayerInEpisode) => player.status === playerStatus)
    }

    setAlliances(extractAlliances(playersInEpisode))
    if (playerStatus?.toString() !== '') {
      setFilteredPlayers(filterPlayersByStatus(playersInEpisode))    
    }
  }, [playerStatus, playersInEpisode])

  const handleFilterChange = (newFilter: PlayerFilter) => {
    setFilter(newFilter)
  }

  return (
    <>
      { (showFilter) && (
      <PlayerTableFilter
        filter={filter}
        tribes={tribes}
        alliances={alliances}
        callback={handleFilterChange}
      />
      )}
      <PlayerTableList
        filter={filter}
        playersInEpisode={filteredPlayers}
        tribes={tribes}
        renderShotInTheDark={renderShotInTheDark}
        refreshAlliances={refreshAlliances}
        toggleRefreshEpisode={toggleRefreshEpisode}
        setRefreshAlliances={setRefreshAlliances}
      />
    </>
  )
}

export default PlayerTable