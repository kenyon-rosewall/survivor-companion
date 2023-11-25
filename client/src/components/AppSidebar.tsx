import React from 'react'
import { useSelector } from 'react-redux'
import { Menu } from 'react-bulma-components'
import { 
  EpisodesSidebar, 
  PlayersSidebar, 
  TribesSidebar, 
  AlliancesSidebar, 
  AdvantagesSidebar, 
  EventsSidebar,
  ManageSeasonsSidebar,
  ManageAdvantagesSidebar } 
  from './sidebars'

const AppSidebar: React.FC = () => {
  const selectedSeason: number = useSelector((state: any) => state.season.selectedSeason)
  const selectedEpisode: number = useSelector((state: any) => state.season.selectedEpisode)
  const selectedMenuItem: string = useSelector((state: any) => state.menu.selectedMenuItem)

  const selectComponent = () => {
    if (selectedMenuItem === 'manageSeasons') {
      return <ManageSeasonsSidebar seasonId={selectedSeason} />
    } else if (selectedMenuItem === 'manageAdvantages') {
      return <ManageAdvantagesSidebar seasonId={selectedSeason} />
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
        return <PlayersSidebar seasonId={selectedSeason} />
      case 'tribes':
        return <TribesSidebar seasonId={selectedSeason} />
      case 'alliances':
        return <AlliancesSidebar seasonId={selectedSeason} />
      case 'advantages':
        return <AdvantagesSidebar seasonId={selectedSeason} />
      case 'events':
        return <EventsSidebar seasonId={selectedSeason} />
      default:
        return <Menu.List.Item>No Items</Menu.List.Item>
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