import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { Navbar } from 'react-bulma-components'
import { setMenuItem } from '../../actions/menu'
import { setSelectedPlayer, setSelectedEpisode, setSelectedAdvantage, setSelectedTribe } from '../../actions/seasons'
import { RootState } from '../../reducers'

interface LevelItem {
  icon: IconName,
  name: string,
  label: string,
}

const AppMenu: React.FC = () => {
  const dispatch = useDispatch()
  const selectedMenuItem: string = useSelector((state: RootState) => state.menu.selectedMenuItem)
  const levelItems: LevelItem[] = [
    { icon: 'circle-info', label: 'Season Info', name: 'seasonInfo' },
    { icon: 'users', label: 'Players', name: 'players' },
    { icon: 'campground', label: 'Tribes', name: 'tribes' },
    { icon: 'tv', label: 'Episodes', name: 'episodes' }
  ]

  const handleItemClick = (itemName: string) => {
    dispatch(setMenuItem(itemName))
    dispatch(setSelectedPlayer(0))
    dispatch(setSelectedEpisode(0))
    dispatch(setSelectedAdvantage(0))
    dispatch(setSelectedTribe(0))
  }

  const renderLevelItems = (): React.ReactNode => {
    return levelItems.map((item: LevelItem, index: number) => (
      <Navbar.Item
        key={index}
        active={selectedMenuItem === item.name}
        onClick={() => handleItemClick(item.name)}
      >
        <FontAwesomeIcon icon={["fas", item.icon]} />
        <span>{item.label}</span>
      </Navbar.Item>
    ))
  }

  return (
    <Navbar.Container>
      {renderLevelItems()}
      <Navbar.Divider />
    </Navbar.Container>
  )
}

export default AppMenu
