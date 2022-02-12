import React, { Fragment } from "react";
import { Nav, Container, Navbar, Button, NavDropdown } from "react-bootstrap";
import { ImBooks } from "react-icons/im";
import { IconContext } from "react-icons/lib";
import "./navbar.scss";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";

function navbar(props) {
  const {
    authenticated,
    user: { role, firstName, lastName },
  } = props;

  const handleLogout = () => {
    props.logoutUser();
  };
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
              <Nav className="me-auto" bg="dark">
                {!authenticated ? (
                  <Fragment>
                    <Nav.Link href="/lend-books">Books</Nav.Link>
                    <Nav.Link href="/lend-videos">Movies</Nav.Link>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Nav.Link href="/">Home</Nav.Link>
                    {role === "customer" && (
                      <Fragment>
                        <Nav.Link href="/lend-books">Lend books</Nav.Link>
                        <Nav.Link href="/lend-videos">Lend Movies</Nav.Link>
                      </Fragment>
                    )}
                    {/* <Nav.Link href="/lend-books">Lend books</Nav.Link>
                    <Nav.Link href="/lend-videos">Lend Videos</Nav.Link> */}
                    {role === "admin" ? (
                      <Nav.Link href="/Admin-dashboard">
                        Admin Dashboard
                      </Nav.Link>
                    ) : (
                      <NavDropdown
                        title="myReservations"
                        id="basic-nav-dropdown"
                      >
                        <NavDropdown.Item href="/myReservations-books">
                          Books
                        </NavDropdown.Item>
                        <NavDropdown.Item href="/myReservations-movies">
                          Movies
                        </NavDropdown.Item>
                      </NavDropdown>
                    )}
                    {role === "customer" && (
                      <NavDropdown title="myFavorites" id="basic-nav-dropdown">
                        <NavDropdown.Item href="/myFavorites-books">
                          Books
                        </NavDropdown.Item>
                        {/* <NavDropdown.Item href="/myFavorites-movies">
                          Movies
                        </NavDropdown.Item> */}
                      </NavDropdown>
                    )}
                  </Fragment>
                )}
              </Nav>
              <Nav>
                {/* {authenticated && (
                  <Fragment>
                    <Button
                      className="btn-settings"
                      variant="outline-light"
                      size="lg"
                      href="/uploadImage"
                    >
                      Profile
                    </Button>{" "}
                  </Fragment>
                )} */}
                {!authenticated ? (
                  <Fragment>
                    <Button
                      className="btn-login"
                      variant="outline-light"
                      size="lg"
                      href="/user/login"
                    >
                      Login
                    </Button>{" "}
                    <Button
                      className="btn-signUp"
                      variant="outline-light"
                      size="lg"
                      href="/user/register"
                    >
                      SignUp
                    </Button>{" "}
                  </Fragment>
                ) : (
                  // <Button
                  //   className="btn-signUp"
                  //   variant="outline-light"
                  //   size="lg"
                  //   onClick={handleLogout}
                  // >
                  //   Logout
                  // </Button>
                  <NavDropdown
                    title={"Hello, " + firstName}
                    id="basic-nav-dropdown"
                    active="true"
                  >
                    <NavDropdown.Item href="/uploadImage">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </IconContext.Provider>
    </div>
  );
}

navbar.propTypes = {
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  user: state.user,
});

export default connect(mapStateToProps, { logoutUser })(navbar);
