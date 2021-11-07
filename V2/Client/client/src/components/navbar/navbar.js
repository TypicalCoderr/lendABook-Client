import React from "react";
import { Nav, Container, Navbar, NavDropdown, Button } from "react-bootstrap";
import { ImBooks } from "react-icons/im";
import { IconContext } from "react-icons/lib";
import "./navbar.scss";

function navbar() {
  return (
    <div>
      <IconContext.Provider value={{ color: "white", size: "30px" }}>
        <Navbar
          collapseOnSelect
          expand="lg"
          bg="primary"
          variant="dark"
          className="nav"
        >
          <Container className="nav-container">
            <ImBooks className="logo-icon" />
            <Navbar.Brand className="logo-name" href="/">
              Lend A Book
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#features">Explore</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
                <NavDropdown title="About Us" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    Something
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                <Button
                  className="btn-login"
                  variant="outline-light"
                  size="lg"
                  href="/login"
                >
                  Login
                </Button>{" "}
                <Button
                  className="btn-signUp"
                  variant="outline-light"
                  size="lg"
                  href="/register"
                >
                  SignUp
                </Button>{" "}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </IconContext.Provider>
    </div>
  );
}

export default navbar;
