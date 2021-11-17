import React from "react";
import PropTypes from "prop-types";

import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "../../components/sideBar/sideNavbar";
import ManageUsers from "../../components/manageUsers/manageUsers";
import ManageBooks from "../../components/manageBooks/manageBooks";
import ViewBook from "../../components/manageBooks/viewBook";
import ViewUser from "../../components/manageUsers/viewUser";
// import ManageReservation from "../../components/manageReservation/manageReservation";

import "./dashboard.scss";

import { connect } from "react-redux";
import viewUser from "../../components/manageUsers/viewUser";

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
          <>
            <Col xs={7} id="page-content-wrapper">
              {dashboard === 0 ? <ManageUsers /> : <ManageBooks />}
            </Col>
            <Col xs={3} id="page-content-wrapper">
              {dashboard === 0 ? <ViewUser /> : <ViewBook />}
            </Col>
          </>
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
