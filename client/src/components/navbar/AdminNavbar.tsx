import React from 'react'
import { useDispatch } from 'react-redux'
import { Navbar, Dropdown } from 'react-bulma-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { setMenuItem } from '../../actions/menu'

const AdminNavbar: React.FC = () => {
  const dispatch = useDispatch()

  const handleItemClick = (item: string) => {
    dispatch(setMenuItem(item))
  }

  return (
    <Navbar.Item>
      <Dropdown
        right={true}
        icon={<FontAwesomeIcon icon={["fas", "caret-down"]} />}
        label="Global Admin"
        onChange={handleItemClick}
      >
        <Dropdown.Item 
          value="manageSeasons"
        >
          <FontAwesomeIcon icon={["fas", "compass"]} />
          <span>Manage Seasons</span>
        </Dropdown.Item>
        <Dropdown.Item
          value="manageAdvantages"
        >
          <FontAwesomeIcon icon={["fas", "trophy"]} />
          <span>Manage Advantages</span>
        </Dropdown.Item>
      </Dropdown>
    </Navbar.Item>
  )
}

export default AdminNavbar