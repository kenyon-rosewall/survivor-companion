import React from 'react'
import { useDispatch } from 'react-redux'
import { Navbar, Dropdown } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setMenuItem } from '../../actions/menu'
import { IconName } from '@fortawesome/fontawesome-svg-core'

type MenuItem = {
  label: string
  icon: IconName
  name: string
}

const AdminNavbar: React.FC = () => {
  const dispatch = useDispatch()
  const menuItems: MenuItem[] = [
    { name: 'manageSeasons', icon: 'compass', label: 'Manage Seasons' },
    { name: 'managePlayers', icon: 'users', label: 'Manage Players' },
    { name: 'manageAdvantages', icon: 'trophy', label: 'Manage Advantages' }
  ]

  const handleItemClick = (item: string) => {
    dispatch(setMenuItem(item))
  }

  const renderMenuItem = (menuItem: MenuItem): React.ReactNode => {
    return (
      <Dropdown.Item
        key={menuItem.name}
        value={menuItem.name}
      >
        <FontAwesomeIcon icon={["fas", menuItem.icon]} />
        <span>{menuItem.label}</span>
      </Dropdown.Item>
    )
  }

  const renderMenuItems = (): React.ReactNode => {
    return menuItems.map((menuItem: MenuItem) => renderMenuItem(menuItem))
  }

  return (
    <Navbar.Item>
      <Dropdown
        right={true}
        icon={<FontAwesomeIcon icon={["fas", "caret-down"]} />}
        label="Global Admin"
        onChange={handleItemClick}
      >
        {renderMenuItems()}
      </Dropdown>
    </Navbar.Item>
  )
}

export default AdminNavbar