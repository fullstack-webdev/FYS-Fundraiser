// ** Third Party Components
import {
  Moon,
  Sun
} from 'react-feather'

import { NavItem, NavLink } from 'reactstrap'
import NotificationDropdown from './NotificationDropdown'
import UserDropdown from './UserDropdown'

const NavbarUser = props => {
  // ** Props
  const { skin, setSkin } = props

  // ** Function to toggle Theme (Light/Dark)
  const ThemeToggler = () => {
    if (skin === 'dark') {
      return <Sun className='ficon' onClick={() => setSkin('light')} />
    } else {
      return <Moon className='ficon' onClick={() => setSkin('dark')} />
    }
  }

  return (
    <ul className='nav navbar-nav align-items-center ms-auto'>
      {/* <IntlDropdown /> */}
      <NavItem className='d-none d-lg-block'>
        <NavLink className='nav-link-style'>
          <ThemeToggler />
        </NavLink>
      </NavItem>
      {/* <NavbarSearch />
      <CartDropdown /> */}
      <NotificationDropdown />
      <UserDropdown />
    </ul>
  )
}
export default NavbarUser
