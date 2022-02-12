import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import img from "../../assets/book-lover.svg";
import "./landingPage.scss";
import Pricing from "../../components/pricing/priceChart";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Home(props) {
  const {
    authenticated,
    user: { role },
  } = props;

  return (
    <>
      <Container className="container">
        <Row className="banner" hidden={role === "admin"}>
          <Col className="col1">
            <h5 className="sub-title">Explore</h5>
            <h2>Unlimited Books & Movies</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur.
            </p>
            {!authenticated ? (
              <Button href="/user/register">Get Started</Button>
            ) : (
              <Button href="/lend-books">Reserve now</Button>
            )}
          </Col>
          <Col className="col2">
            <Image src={img} alt="books" className="booklover" />
          </Col>
        </Row>
        <div className="box-1">
          <h3 className="about-title">About us</h3>
          <p className="about-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur.
          </p>
        </div>
      </Container>
      {!authenticated && <Pricing />}
    </>
  );
}

Home.propTypes = {
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  authenticated: state.user.authenticated,
  user: state.user,
});

export default connect(mapStateToProps)(Home);
