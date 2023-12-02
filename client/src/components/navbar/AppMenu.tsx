import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconName } from '@fortawesome/fontawesome-svg-core'
import { Navbar } from 'react-bulma-components'
import { setMenuItem } from '../../actions/menu'

interface LevelItem {
  icon: IconName,
  text: string,
  name: string,
}

const AppMenu: React.FC = () => {
  const dispatch = useDispatch()
  const selectedMenuItem: string = useSelector((state: any) => state.menu.selectedMenuItem)
  const levelItems: LevelItem[] = [
    { icon: 'circle-info', text: 'Season Information', name: 'seasonInfo' },
    { icon: 'users', text: 'Players', name: 'players' },
    { icon: 'campground', text: 'Tribes', name: 'tribes' },
    { icon: 'tv', text: 'Episodes', name: 'episodes' },
    // { icon: 'heart', text: 'Alliances', name: 'alliances' },
    // { icon: 'list', text: 'Events', name: 'events' },
  ]

  const handleItemClick = (itemName: string) => {
    dispatch(setMenuItem(itemName))
  }

  const renderLevelItems = () => {
    return levelItems.map((item, index) => (
      <Navbar.Item
        key={index}
        active={selectedMenuItem === item.name}
        onClick={() => handleItemClick(item.name)}
      >
        <FontAwesomeIcon icon={["fas", item.icon]} />
        <span>{item.text}</span>
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
