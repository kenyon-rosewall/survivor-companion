import React, { useState, useEffect } from 'react'
import PlayerTableFilter from './playerTableFilter'
import PlayerTableList from './playerTableList'
import { extractAlliances } from '../../utils'

type PlayerTableProps = {
  playerStatus?: string
  seasonId: number
  playersInEpisode: any[]
  tribes: any[]
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
  const [filteredPlayers, setFilteredPlayers] = useState<any[]>(playersInEpisode)
  const [alliances, setAlliances] = useState<any[]>([])
  const [filter, setFilter] = useState<any>({
    tribe: 0,
    hasAdvantage: '',
    alliance: 0,
  })

  useEffect(() => {
    const filterPlayersByStatus = (players: any[]) => {
      if (!players) return []
      
      return players.filter((player: any) => player.status === playerStatus)
    }

    setAlliances(extractAlliances(playersInEpisode))
    if (playerStatus?.toString() !== '') {
      setFilteredPlayers(filterPlayersByStatus(playersInEpisode))    
    }
  }, [playerStatus, playersInEpisode])

  const handleFilterChange = (newFilter: any) => {
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
        seasonId={seasonId}
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