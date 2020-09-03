import React from 'react';
import { Nav, Navbar, Dropdown} from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div
`
  .navbar { background-color: #365; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #000000;
    &:hover { color: #365; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #000000;
    &:hover { color: #365; }
  }
  .dropdown-center {
    position: absolute !important;
    left: 50%;
    right: 50%;
  }
  .color-nav {
      background-color : rgb(255,255,255);
  }
`;

export const NavigationBar = () => (
  <Styles>  
    <Navbar className = "color-nav" expand="lg">
      <Navbar.Brand href="/">SwatKats</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/register">Register</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
          <Dropdown class = "dropdown-center">
                <Dropdown.Toggle variant = "info" id = "dropdown-basic">
                    Language Options
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">English</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Chinese</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Japanese</Dropdown.Item>
                </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </Styles>
)

export default NavigationBar;