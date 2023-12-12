import React from 'react'
import { useSelector } from 'react-redux'
import { Menu } from 'react-bulma-components'
import { 
  EpisodesSidebar, 
  PlayersSidebar, 
  TribesSidebar, 
  AlliancesSidebar, 
  EventsSidebar,
  SeasonsSidebar,
  AdvantagesSidebar } 
  from '../sidebars'

const AppSidebar: React.FC = () => {
  const selectedSeason: number = useSelector((state: any) => state.season.selectedSeason)
  const selectedEpisode: number = useSelector((state: any) => state.season.selectedEpisode)
  const selectedPlayer: number = useSelector((state: any) => state.season.selectedPlayer)
  const selectedTribe: number = useSelector((state: any) => state.season.selectedTribe)
  const selectedAdvantage: number = useSelector((state: any) => state.season.selectedAdvantage)
  const selectedMenuItem: string = useSelector((state: any) => state.menu.selectedMenuItem)

  const selectComponent = () => {
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
      case 'alliances':
        return <AlliancesSidebar seasonId={selectedSeason} />
      case 'events':
        return <EventsSidebar seasonId={selectedSeason} />
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