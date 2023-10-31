import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';

function Header() {
  return (
      <header>
          <Navbar bg="dark" variant="dark" expand="sm" collapseOnSelect>
              <Container>
                  <LinkContainer to="/">
                  <Navbar.Brand ><img src={logo} alt="techno" height="50px" /> Techno</Navbar.Brand>
                  </LinkContainer>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className='ms-auto'>
                          <LinkContainer to="/cart">
                          <Nav.Link><FaShoppingCart/> Cart</Nav.Link>
                          </LinkContainer>
                          <LinkContainer to="/login">
                          <Nav.Link><FaUser/> Login</Nav.Link>
                          </LinkContainer>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
    </header>
  )
}

export default Header