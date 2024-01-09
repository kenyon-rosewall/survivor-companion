import React from 'react'
import { useDispatch } from 'react-redux'
import { Navbar, Dropdown } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setMenuItem } from '../../actions/menu'

const AdminNavbar: React.FC = () => {
  const dispatch = useDispatch()
  const menuItems: any[] = [
    { name: 'manageSeasons', icon: 'compass', text: 'Manage Seasons' },
    { name: 'managePlayers', icon: 'users', text: 'Manage Players' },
    { name: 'manageAdvantages', icon: 'trophy', text: 'Manage Advantages' }
  ]

  const handleItemClick = (item: string) => {
    dispatch(setMenuItem(item))
  }

  const renderMenuItem = (menuItem: any) => {
    return (
      <Dropdown.Item
        key={menuItem.name}
        value={menuItem.name}
      >
        <FontAwesomeIcon icon={["fas", menuItem.icon]} />
        <span>{menuItem.text}</span>
      </Dropdown.Item>
    )
  }

  const renderMenuItems = () => {
    return menuItems.map((menuItem) => renderMenuItem(menuItem))
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