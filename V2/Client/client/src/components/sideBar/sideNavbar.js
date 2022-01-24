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
    } else if (
      id == "book-prices-dashboard-button" ||
      id == "book-prices-dashboard-button-icon"
    ) {
      props.setDashboard(5);
    } else if (
      id == "video-prices-dashboard-button" ||
      id == "video-prices-dashboard-button-icon"
    ) {
      props.setDashboard(6);
    } else if (
      id == "company-purchase-books-dashboard-button" ||
      id == "company-purchase-books-dashboard-button-icon"
    ) {
      props.setDashboard(7);
    } else if (
      id == "company-purchase-videos-dashboard-button" ||
      id == "company-purchase-videos-dashboard-button-icon"
    ) {
      props.setDashboard(8);
    } else if (
      id == "search-books-dashboard-button" ||
      id == "search-books-dashboard-button-icon"
    ) {
      props.setDashboard(9);
    } else if (
      id == "secondary-book-db-dashboard-button" ||
      id == "secondary-book-db-dashboard-button-icon"
    ) {
      props.setDashboard(10);
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
            className={`sidebar-button ${
              dashboard === 5 && "sidebar-button-active"
            }`}
            size="lg"
            id="book-prices-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span
              id="book-prices-dashboard-button-icon"
              onClick={handleSetDashboard}
            >
              <i class="fas fa-dollar-sign icon"></i>
              Compare Prices / Books
            </span>
          </Button>
        </Nav.Item>

        <Nav.Item className="sidebar-item">
          <Button
            variant="primary"
            className={`sidebar-button ${
              dashboard === 6 && "sidebar-button-active"
            }`}
            size="lg"
            id="video-prices-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span
              id="video-prices-dashboard-button-icon"
              onClick={handleSetDashboard}
            >
              <i class="fas fa-dollar-sign icon"></i>
              Compare Prices / Videos
            </span>
          </Button>
        </Nav.Item>

        <Nav.Item className="sidebar-item">
          <Button
            variant="primary"
            className={`sidebar-button ${
              dashboard === 7 && "sidebar-button-active"
            }`}
            size="lg"
            id="company-purchase-books-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span
              id="company-purchase-books-dashboard-button-icon"
              onClick={handleSetDashboard}
            >
              <i class="fas fa-cart-arrow-down icon"></i>
              Company purchases/ books
            </span>
          </Button>
        </Nav.Item>

        <Nav.Item className="sidebar-item">
          <Button
            variant="primary"
            className={`sidebar-button ${
              dashboard === 8 && "sidebar-button-active"
            }`}
            size="lg"
            id="company-purchase-videos-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span
              id="company-purchase-videos-dashboard-button-icon"
              onClick={handleSetDashboard}
            >
              <i class="fas fa-cart-arrow-down icon"></i>
              Company purchases/ videos
            </span>
          </Button>
        </Nav.Item>

        <Nav.Item className="sidebar-item">
          <Button
            variant="primary"
            className={`sidebar-button ${
              dashboard === 9 && "sidebar-button-active"
            }`}
            size="lg"
            id="search-books-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span
              id="search-books-dashboard-button-icon"
              onClick={handleSetDashboard}
            >
              <i class="fas fa-search icon"></i>
              Search books
            </span>
          </Button>
        </Nav.Item>

        <Nav.Item className="sidebar-item">
          <Button
            variant="primary"
            className={`sidebar-button ${
              dashboard === 10 && "sidebar-button-active"
            }`}
            size="lg"
            id="secondary-book-db-dashboard-button"
            onClick={handleSetDashboard}
          >
            <span
              id="secondary-book-db-dashboard-button-icon"
              onClick={handleSetDashboard}
            >
             <i class="fas fa-database icon"></i>
              Secondary Book DB
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
