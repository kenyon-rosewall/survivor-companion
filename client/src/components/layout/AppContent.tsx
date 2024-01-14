import React from 'react'
import { useSelector } from 'react-redux'
import { 
  SeasonInfo, 
  Seasons,
  Episodes, 
  Players, 
  Advantages, 
  Tribes
} 
  from '../content'
import { RootState } from '../../reducers'

const AppContent: React.FC = () => {
  const selectedSeason: number = useSelector((state: RootState) => state.season.selectedSeason)
  const selectedEpisode: number = useSelector((state: RootState) => state.season.selectedEpisode) ?? 0
  const selectedPlayer: number = useSelector((state: RootState) => state.season.selectedPlayer) ?? 0
  const selectedTribe: number = useSelector((state: RootState) => state.season.selectedTribe) ?? 0
  const selectedAdvantage: number = useSelector((state: RootState) => state.season.selectedAdvantage) ?? 0
  const selectedMenuItem: string = useSelector((state: RootState) => state.menu.selectedMenuItem)

  const selectComponent = (): React.ReactNode => {
    if (selectedMenuItem === 'manageSeasons') {
      return <Seasons seasonId={selectedSeason} />
    } else if (selectedMenuItem === 'manageAdvantages') {
      return <Advantages advantageId={selectedAdvantage} />
    }

    if (selectedSeason === 0) {
      return <h1>Select Season First</h1>
    }

    switch (selectedMenuItem) {
      case 'seasonInfo':
        return <SeasonInfo seasonId={selectedSeason} />
      case 'episodes':
        return <Episodes
                  seasonId={selectedSeason}
                  episodeId={selectedEpisode}
                />
      case 'players':
        return <Players
                  seasonId={selectedSeason}
                  playerId={selectedPlayer}
                />
      case 'tribes':
        return <Tribes
                  seasonId={selectedSeason}
                  tribeId={selectedTribe}
                />
      default:
        return <h1>Content</h1>
    }
  }

  return (
    <div>
      {selectComponent()}
    </div>
  )
}

export default AppContent