import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/sideBar/sideNavbar";
import ManageUsers from "../../components/manageUsers/manageUsers";
import ManageBooks from "../../components/manageBooks/manageBooks";
import ManageMovies from "../../components/manageMovies/manageMovies";
import ViewBook from "../../components/manageBooks/viewBook";
import ViewMovie from "../../components/manageMovies/viewMovie";
import ViewUser from "../../components/manageUsers/viewUser";
import ManageBookReservation from "../../components/manageReservation/manageReservation";
import ManageMovieReservation from "../../components/manageReservation/manageMovieReservation";
import BookPrices from "../../components/bookPrices/bookPrices";
import MoviePrices from "../../components/moviePrices/moviePrices";
import CompanyBookPurchases from "../../components/companyPurchases/companyBookPurchases";
import CompanyVideoPurchases from "../../components/companyPurchases/companyVideoPurchases";
import SearchBooks from "../../components/searchBooksAPI/searchBooks";
import BookDB from "../../components/SecondaryDB/bookDB";
// import ManageReservation from "../../components/manageReservation/manageReservation";

import "./dashboard.scss";

import { connect } from "react-redux";



const Dashboard = (props) => {
  const {
    UI: { dashboard },
  } = props;

  return (
    <>
      <Container fluid>
        <Row>
          <Col xs={2} id="sidebar-wrapper">
            <Sidebar />
          </Col>
          {dashboard === 3 ? (
            <Col xs={10} id="page-content-wrapper">
              <ManageBookReservation />
            </Col>
          ) : dashboard === 4 ? (
            <Col xs={10} id="page-content-wrapper">
              <ManageMovieReservation />
            </Col>
          ) : dashboard === 5 ? (
            <Col xs={10} id="page-content-wrapper">
              <BookPrices />
            </Col>
          ) : dashboard === 6 ? (
            <Col xs={10} id="page-content-wrapper">
              <MoviePrices />
            </Col>
          ) : dashboard === 7 ? (
            <Col xs={10} id="page-content-wrapper">
              <CompanyBookPurchases />
            </Col>
          ) : dashboard === 8 ? (
            <Col xs={10} id="page-content-wrapper">
              <CompanyVideoPurchases />
            </Col>
          ) : dashboard === 9 ? (
            <Col xs={10} id="page-content-wrapper">
              <SearchBooks />
            </Col>
          ) : dashboard === 10 ? (
            <Col xs={10} id="page-content-wrapper">
              <BookDB />
            </Col>
          ): (
            <>
              <Col xs={7} id="page-content-wrapper">
                {dashboard === 0 ? (
                  <ManageUsers />
                ) : dashboard === 1 ? (
                  <ManageBooks />
                ) : (
                  <ManageMovies />
                )}
              </Col>

              <Col xs={3} id="page-content-wrapper">
                {dashboard === 0 ? (
                  <ViewUser />
                ) : dashboard === 1 ? (
                  <ViewBook />
                ) : (
                  <ViewMovie />
                )}
              </Col>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

Dashboard.propTypes = {
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(Dashboard);
