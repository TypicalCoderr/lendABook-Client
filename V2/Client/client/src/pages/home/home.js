import React from "react";
import Navbar from "../../components/navbar/navbar";
import { Container, Alert } from "react-bootstrap";
import "./home.scss";
import Info from "../landingPage/landingPage";

import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import Footer from "../../components/footer/footer";

function Home(props) {

  return (
    <div className="top_image">
      <Navbar />
      <Container>
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden = 
          {
            !props.authenticated ||
            props.role === "admin" ||
            (props.userImageURL && props.isVerified) ||
            props.isVerified
          }
        >
          {" "}
          {`Hello ${props.firstName}! `}
          You are <b>not verified</b>.{" "}
          <a href="/uploadImage">
            Click here to <b>upload verification image</b>
          </a>
        </Alert>
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={!props.isBlacklisted}
        >
          You have been <b>blacklisted</b>. You will not be able to rent any
          Books or Videos.
        </Alert>
        <h2 className="title">Reserve Now!</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
        <Alert variant="light" className="user-card" align="end"></Alert>
      </Container>

      <Info />
      <Footer />
    </div>
  );
}

const mapStateToProps = (state) => ({
  firstName: state.user.firstName,
  userImageURL: state.user.userImageURL,
  authenticated: state.user.authenticated,
  isVerified: state.user.isVerified,
  role: state.user.role,
  user: state.user,
});

Home.propTypes = {
  user: PropTypes.object,
};

export default connect(mapStateToProps)(Home);
