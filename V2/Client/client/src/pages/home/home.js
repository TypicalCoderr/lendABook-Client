import React from "react";
import Navbar from "../../components/navbar/navbar";
import { Container } from "react-bootstrap";
import "./home.scss";
import Info from "../landingPage/landingPage";

import { connect } from "react-redux";
import { PropTypes } from "prop-types";

function customerHome(props) {
  return (
    <div className="top_image">
      <Navbar />
      <Container>
        <h2 className="title">Reserve Now!</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
      </Container>
      <Info />
    </div>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

customerHome.propTypes = {};

export default connect(mapStateToProps)(customerHome);
