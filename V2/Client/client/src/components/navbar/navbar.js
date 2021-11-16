import React, { Fragment } from "react";
import { Nav, Container, Navbar, Button } from "react-bootstrap";
import { ImBooks } from "react-icons/im";
import { IconContext } from "react-icons/lib";
import "./navbar.scss";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { logoutUser } from "../../redux/actions/userAction";

function navbar(props) {
  const {
    authenticated,
    user: { role },
  } = props;

  const handleLogout = () => {
    props.logoutUser();
  };
  return (
    <div>
      <IconContext.Provider value={{ color: "white", size: "30px" }}>
        <Navbar collapseOnSelect bg="primary" variant="dark" className="nav">
          <Container className="nav-container">
            <ImBooks className="logo-icon" />
            <Navbar.Brand className="logo-name" href="/">
              Lend A Book
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto" bg="dark">
                {!authenticated ? (
                  <Nav.Link href="/Home">Explore</Nav.Link>
                ) : (
                  <Fragment>
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="#Books">Lend books</Nav.Link>
                    <Nav.Link href="#Movies">Lend Movies</Nav.Link>
                    {role === "admin" ? (
                      <Nav.Link href="/Admin-dashboard">
                        Admin Dashboard
                      </Nav.Link>
                    ) : (
                      <Nav.Link href="#MyReservations">MyReservations</Nav.Link>
                    )}
                  </Fragment>
                )}
              </Nav>
              <Nav>
                {authenticated && (
                  <Fragment>
                    <Button
                      className="btn-settings"
                      variant="outline-light"
                      size="lg"
                      href="/settings"
                    >
                      settings
                    </Button>{" "}
                  </Fragment>
                )}
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
                  <Button
                    className="btn-signUp"
                    variant="outline-light"
                    size="lg"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
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
