import React from 'react'
import { useSelector } from 'react-redux'
import { SeasonInfo, 
  Episodes, 
  Players, 
  Alliances, 
  Advantages, 
  Events,
  ManageAdvantages } 
  from './content'

const MainContent: React.FC = () => {
  const selectedSeason: number = useSelector((state: any) => state.season.selectedSeason)
  const selectedMenuItem: string = useSelector((state: any) => state.menu.selectedMenuItem)

  const selectComponent = () => {
    if (selectedMenuItem === 'manageSeasons') {
      return <SeasonInfo seasonId={selectedSeason} />
    } else if (selectedMenuItem === 'manageAdvantages') {
      return <ManageAdvantages seasonId={selectedSeason} />
    }

    if (selectedSeason === 0) {
      return <h1>Select Season First</h1>
    }

    console.log(selectedSeason)
    switch (selectedMenuItem) {
      case 'seasonInfo':
        return <SeasonInfo seasonId={selectedSeason} />
      case 'episodes':
        return <Episodes seasonId={selectedSeason} />
      case 'players':
        return <Players seasonId={selectedSeason} />
      case 'alliances':
        return <Alliances seasonId={selectedSeason} />
      case 'advantages':
        return <Advantages seasonId={selectedSeason} />
      case 'events':
        return <Events seasonId={selectedSeason} />
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

export default MainContent