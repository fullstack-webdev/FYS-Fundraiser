import './public-pages.scss'

import {
  Col,
  Collapse,
  Container,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
  NavLink,
  Row
} from 'reactstrap'

const NavBar = () => {
  return (
    <div id="Navbar" style={{borderBottom: "solid 1px rgb(200, 200, 200)"}}>
        <Container fluid="md" style={{maxWidth: "1100px"}}>
          <Row>
            <Col md="4" className='myFlex'>
              <NavLink href='https://fundyouthsports.com/' className="myLeft">
                <img src={require('@src/assets/images/public_pages/logo.png').default} className='logo'></img>
              </NavLink>
            </Col>
            <Col md="7" className='myFlex'>
              <Navbar className='myCenter Navbar'
                color="light"
                container="md"
                expand="md"
                light
              >
                <NavbarToggler onClick={() => {}} />
                <Collapse navbar>
                  <Nav
                    className="me-auto"
                    navbar
                  >
                    <NavItem className='NavItem'>
                      <NavLink href="" className='NavLink'>
                        Home
                      </NavLink>
                    </NavItem>
                    <NavItem className='NavItem'>
                      <NavLink href="https://fundyouthsports.com/how-it-works/" className='NavLink'>
                        How It Works
                      </NavLink>
                    </NavItem>
                    <NavItem className='NavItem'>
                      <NavLink href="https://fundyouthsports.com/our-story/" className='NavLink'>
                        Our Story
                      </NavLink>
                    </NavItem>
                    <NavItem className='NavItem'>
                      <NavLink href="https://fundyouthsports.com/contact-us/" className='NavLink'>
                        Contact-Us
                      </NavLink>
                    </NavItem>
                  </Nav>
                </Collapse>
              </Navbar>
            </Col>
            <Col md="1" className='myFlex'>
              <Dropdown toggle={() => {}} className="myRight">
                <DropdownToggle className='dropdownToogle'
                  data-toggle="dropdown"
                  tag="span" caret
                >
                    <img src={require('@src/assets/images/public_pages/avatar.png').default} className='avatar'></img>
                </DropdownToggle>
                <DropdownMenu>
                  <div onClick={() => {}}>
                    profile
                  </div>
                  <div onClick={() => {}}>
                    Another action
                  </div>
                  <div onClick={() => {}}>
                    Something
                  </div>
                  <div onClick={() => {}}>
                    Separated Link
                  </div>
                </DropdownMenu>
              </Dropdown>
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default NavBar
