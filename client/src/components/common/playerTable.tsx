import React, { useState, useEffect } from 'react'
import PlayerTableFilter from './playerTableFilter'
import PlayerTableList from './playerTableList'

type PlayerTableProps = {
  playerStatus?: string
  seasonId: number
  playersInEpisode: any[]
  tribes: any[]
  showFilter?: boolean
  renderShotInTheDark: boolean
  toggleRefreshEpisode: () => void
}

const PlayerTable: React.FC<PlayerTableProps> = ({ 
  playersInEpisode, tribes, seasonId, toggleRefreshEpisode, 
  renderShotInTheDark, playerStatus, showFilter = false
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

    const extractAlliances = (players: any[]) => {
      if (!players) return []
      
      const alliances = players.map((player: any) => player.alliances)
        .reduce((prev: any, curr: any) => prev.concat(curr), [])
        .filter((alliance: never, index: number, arr: []) => arr.indexOf(alliance) === index)
      
      let unique: any[] = []
      for (const alliance of alliances) {
        if (!alliance) continue
        if (unique.map((a: any) => a.id).includes(alliance.id)) continue
          
        unique.push(alliance)
      }
  
      return unique
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
        alliances={alliances}
        renderShotInTheDark={renderShotInTheDark}
        toggleRefreshEpisode={toggleRefreshEpisode}
      />
    </>
  )
}

export default PlayerTable