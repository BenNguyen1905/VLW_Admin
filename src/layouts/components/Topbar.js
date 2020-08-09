import React from 'react';
import {
  Nav,
  Navbar,
//   NavDropdown,
} from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import ProfileDropdown from './ProfileDropdown';


// import StudentSearchList from "../../modules/students/StudentSearchList";

const Topbar = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand href="#home">Admin-Page</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <NavLink to="/" exact className="nav-link">Trang chủ</NavLink>
            {/* <NavLink to="/best-seller-page">
                        BestSellerPage</NavLink> */}
          {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav>
            <ProfileDropdown />
        </Nav>
        
      </Navbar.Collapse>
    </Navbar>
);
export default Topbar;