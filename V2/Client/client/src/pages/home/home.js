import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import img from "../../assets/book-lover.svg";
import "./home.scss";
import Pricing from "../../components/pricing/priceChart";

function home() {
  return (
    <>
      <Container className="container">
        <Row className="row">
          <Col className="col1">
            <h5 className="sub-title">Explore</h5>
            <h2>Unlimited Books & Videos</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercita
            </p>
            <Button>Get Started</Button>
          </Col>
          <Col className="col2">
            <Image src={img} alt="books" className="booklover" />
          </Col>
        </Row>
      </Container>
      <Pricing />
    </>
  );
}

export default home;
