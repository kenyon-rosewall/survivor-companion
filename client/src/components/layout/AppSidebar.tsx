import React from 'react'
import { useSelector } from 'react-redux'
import { Menu } from 'react-bulma-components'
import { 
  EpisodesSidebar, 
  PlayersSidebar, 
  TribesSidebar,
  SeasonsSidebar,
  AdvantagesSidebar } 
  from '../sidebars'
import { RootState } from '../../reducers'

const AppSidebar: React.FC = () => {
  const selectedSeason: number = useSelector((state: RootState) => state.season.selectedSeason)
  const selectedEpisode: number = useSelector((state: RootState) => state.season.selectedEpisode) ?? 0
  const selectedPlayer: number = useSelector((state: RootState) => state.season.selectedPlayer) ?? 0
  const selectedTribe: number = useSelector((state: RootState) => state.season.selectedTribe) ?? 0
  const selectedAdvantage: number = useSelector((state: RootState) => state.season.selectedAdvantage) ?? 0
  const selectedMenuItem: string = useSelector((state: RootState) => state.menu.selectedMenuItem)

  const selectComponent = (): React.ReactNode => {
    if (selectedMenuItem === 'manageSeasons') {
      return <SeasonsSidebar seasonId={selectedSeason} />
    } else if (selectedMenuItem === 'manageAdvantages') {
      return <AdvantagesSidebar advantageId={selectedAdvantage} />
    }

    if (selectedSeason === 0) {
      return <Menu.List.Item>No Season Selected</Menu.List.Item>
    }

    switch (selectedMenuItem) {
      case 'episodes':
        return <EpisodesSidebar
                  seasonId={selectedSeason}
                  episodeId={selectedEpisode}
                />
      case 'players':
        return <PlayersSidebar
                  seasonId={selectedSeason}
                  playerId={selectedPlayer}
                />
      case 'tribes':
        return <TribesSidebar
                  seasonId={selectedSeason}
                  tribeId={selectedTribe}
                />
      default:
        return null
    }
  }

  return (
    <Menu>
      <Menu.List>
        {selectComponent()}
      </Menu.List>
    </Menu>
  )
}

export default AppSidebar