import React, { useState, useEffect } from 'react'
import PlayerTableFilter from './playerTableFilter'
import PlayerTableList from './playerTableList'

type PlayerTableProps = {
  playersInEpisode: any[]
  tribes: any[]
  seasonId: number
  renderShotInTheDark: boolean
  toggleRefreshEpisodeChildren: () => void
  toggleRefreshEpisode: () => void
  showFilter: boolean
  playerStatus?: string
}

const PlayerTable: React.FC<PlayerTableProps> = ({ 
  playersInEpisode, tribes, seasonId, toggleRefreshEpisodeChildren, 
  toggleRefreshEpisode, renderShotInTheDark, playerStatus, showFilter 
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
      if (Array.isArray(players)) {
        return players.filter((player: any) => player.status === playerStatus)
      }

      return []
    }

    const extractAlliances = (players: any[]) => {
      if (!players) return []
      
      let unique: any[] = []

      const alliances = players.map((player: any) => player.alliances)
        
      for (const alliance of alliances) {
        if (alliance) {
          if (unique.map((a: any) => a.id).includes(alliance.id)) continue
          unique.push(alliance)
        }
      }
  
      return unique
    }
    
    if (Array.isArray(playersInEpisode)) {
      if (playerStatus && playerStatus !== '') {
        setFilteredPlayers(filterPlayersByStatus(playersInEpisode))    
      }

      setAlliances(extractAlliances(playersInEpisode))
    }
  }, [playerStatus, playersInEpisode])

  const handleFilterChange = (newFilter: any) => {
    setFilter(newFilter)
  }

  return (
    <>
      { (showFilter) ? (
      <PlayerTableFilter
        filter={filter}
        tribes={tribes}
        alliances={alliances}
        callback={handleFilterChange}
      />
      ) : null }
      <PlayerTableList
        filter={filter}
        playersInEpisode={filteredPlayers}
        tribes={tribes}
        alliances={alliances}
        seasonId={seasonId}
        renderShotInTheDark={renderShotInTheDark}
        toggleRefreshEpisodeChildren={toggleRefreshEpisodeChildren}
        toggleRefreshEpisode={toggleRefreshEpisode}
      />
    </>
  )
}

export default PlayerTable