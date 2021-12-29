import React from "react";
import { Nav, Button, Navbar } from "react-bootstrap";
import PropTypes from "prop-types";
import { ImBooks } from "react-icons/im";
import { IconContext } from "react-icons/lib";

import "./sideNavbar.scss";

//redux
import { connect } from "react-redux";
import { setDashboard } from "../../redux/actions/uiActions";

const SideNavbar = (props) => {
  const {
    UI: { dashboard },
  } = props;

  const handleSetDashboard = (event) => {
    const id = event.target.id;
    console.log("Click", id);
    if (id === "user-dashboard-button" || id === "user-dashboard-icon") {
      props.setDashboard(0);
    } else if (id === "book-dashboard-button" || id === "book-dashboard-icon") {
      props.setDashboard(1);
    } else if (
      id === "movie-dashboard-button" ||
      id === "movie-dashboard-icon"
    ) {
      props.setDashboard(2);
    } else if (
      id === "reservation-dashboard-button" ||
      id === "reservation-dashboard-icon"
    ) {
      props.setDashboard(3);
    } else if (
      id == "video-reservation-dashboard-button" ||
      id == "video-reservation-dashboard-icon"
    ) {
      props.setDashboard(4);
    }
  };

  return (
    <div>
      <Nav
        className="col-md-12 d-none d-md-block sidebar"
        activeKey="/home"
        onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
      >
        <IconContext.Provider value={{ color: "white", size: "35px" }}>
          <Navbar className="side-logo-name">
            <ImBooks className="side-logo-icon" /> Lend A Book
          </Navbar>
        </IconContext.Provider>

        <Nav.Item className="sidebar-item">
          <Button
            variant="primary"
            className={`sidebar-button ${
              dashboard === 0 && "sidebar-button-active"
            }`}
            size="lg"
            id="user-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span id="user-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-users icon"></i>
              Users
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="primary"
            className={`sidebar-button ${
              dashboard === 1 && "sidebar-button-active"
            }`}
            size="lg"
            id="book-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span id="book-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-book icon"></i>
              Books
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="primary"
            className={`sidebar-button ${
              dashboard === 2 && "sidebar-button-active"
            }`}
            size="lg"
            id="movie-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span id="movie-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-film icon"></i>
              Videos
            </span>
          </Button>
        </Nav.Item>
        <Nav.Item className="sidebar-item">
          <Button
            variant="primary"
            className={`sidebar-button ${
              dashboard === 3 && "sidebar-button-active"
            }`}
            size="lg"
            id="reservation-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span id="reservation-dashboard-icon" onClick={handleSetDashboard}>
              {/* <i className="fas fa-file-invoice-dollar icon"></i> */}
              <i className="fas fa-money-check-alt icon"></i>
              Reservations / Books
            </span>
          </Button>
        </Nav.Item>

        <Nav.Item className="sidebar-item">
          <Button
            variant="primary"
            className={`sidebar-button ${
              dashboard === 4 && "sidebar-button-active"
            }`}
            size="lg"
            id="video-reservation-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span
              id="video-reservation-dashboard-icon"
              onClick={handleSetDashboard}
            >
              <i className="fas fa-money-check-alt icon"></i>
              Reservations / Videos
            </span>
          </Button>
        </Nav.Item>

        <Nav.Item className="sidebar-item">
          <Button
            variant="primary"
            className="sidebar-button"
            size="lg"
            href="/"
          >
            <span id="home-dashboard-icon" onClick={handleSetDashboard}>
              <i className="fas fa-home icon"></i>
              Home
            </span>
          </Button>
        </Nav.Item>
        <p className="sidebar-item-footer">Administrator Dashboard </p>
      </Nav>
    </div>
  );
};

SideNavbar.propTypes = {
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  setDashboard,
};

export default connect(mapStateToProps, mapActionsToProps)(SideNavbar);
