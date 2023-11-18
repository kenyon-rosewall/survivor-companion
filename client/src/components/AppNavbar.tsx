import React from 'react'
import { Navbar } from 'react-bulma-components'
import logo from '../images/logo.png'
import { SeasonDropdown, AppMenu, AdminNavbar } from './navbar'

export default class AppNavbar extends React.Component {
  render() {
    return (
      <Navbar color={"dark"}>
        <Navbar.Brand>
          <Navbar.Item href="/">
            <img src={logo} height="35" alt="Logo" />
          </Navbar.Item>
        </Navbar.Brand>
        <Navbar.Menu>
          <AppMenu />
        </Navbar.Menu>
        <Navbar.Container align="right">
          <Navbar.Item href="#">
            <SeasonDropdown />
          </Navbar.Item>
          <AdminNavbar />
        </Navbar.Container>
      </Navbar>
    )
  }
}
