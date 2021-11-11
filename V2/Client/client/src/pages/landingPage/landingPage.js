import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import img from "../../assets/book-lover.svg";
import "./landingPage.scss";
import Navbar from "../../components/navbar/navbar";
import Pricing from "../../components/pricing/priceChart";

function Home() {
  return (
    <>
      <Navbar />
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
        <h3 className="about-title">About us</h3>
        <p className="about-description">
          Fringilla ut morbi tincidunt augue interdum velit euismod in
          pellentesque. At risus viverra adipiscing at in tellus integer. Id
          aliquet lectus proin nibh nisl condimentum id venenatis. Laoreet id
          donec ultrices tincidunt. Bibendum at varius vel pharetra. Viverra
          adipiscing at in tellus integer. Amet volutpat consequat mauris nunc
          congue nisi vitae suscipit. Pretium viverra suspendisse potenti nullam
          ac tortor. Et egestas quis ipsum suspendisse. Cursus in hac habitasse
          platea dictumst quisque. Mi proin sed libero enim sed faucibus turpis
          in eu.
        </p>
      </Container>

      <Pricing />
    </>
  );
}

export default Home;
