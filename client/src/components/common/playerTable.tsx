import React, { useState, useEffect } from 'react'
import PlayerTableFilter from './playerTableFilter'
import PlayerTableList from './playerTableList'

type PlayerTableProps = {
  players: any[]
  tribes: any[]
  selectedSeason: number
  playersCallback: () => void
  hasShotInTheDark: boolean
  playerStatus?: string
  showFilter: boolean
}

const PlayerTable: React.FC<PlayerTableProps> = ({ 
  players, tribes, selectedSeason, playersCallback, 
  hasShotInTheDark, playerStatus, showFilter 
}) => {
  const [filteredPlayers, setFilteredPlayers] = useState<any[]>(players)
  const [alliances, setAlliances] = useState<any[]>([])
  const [filter, setFilter] = useState<any>({
    tribe: 0,
    hasAdvantage: '',
    alliance: 0,
  })

  const createUniqueAlliances = (alliances: any[]) => {
    let unique: any[] = []
    for (const alliance of alliances) {
      if (unique.map((a: any) => a.id).includes(alliance.id)) continue
      unique.push(alliance)
    }

    return unique
  }

  useEffect(() => {
    const filterPlayers = players.filter((player: any) => player.status === playerStatus)
    const alliances = players.map((player: any) => player.alliances)
      .reduce((prev: any, curr: any) => prev.concat(curr), [])
      .filter((alliance: never, index: number, arr: []) => arr.indexOf(alliance) === index)
    if (playerStatus && playerStatus !== '') setFilteredPlayers(filterPlayers)
    setAlliances(createUniqueAlliances(alliances))
  }, [playerStatus, players])

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
        players={filteredPlayers}
        tribes={tribes}
        alliances={alliances}
        selectedSeason={selectedSeason}
        playersCallback={playersCallback}
        hasShotInTheDark={hasShotInTheDark}
      />
    </>
  )
}

export default PlayerTable