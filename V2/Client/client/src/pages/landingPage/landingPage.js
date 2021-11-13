import React from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import img from "../../assets/book-lover.svg";
import "./landingPage.scss";
import Pricing from "../../components/pricing/priceChart";

function Home() {
  return (
    <>
      <Container className="container">
        <Row className="banner">
          <Col className="col1">
            <h5 className="sub-title">Explore</h5>
            <h2>Unlimited Books & Movies</h2>
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
        <div className="box">
          <h3 className="about-title">About us</h3>
          <p className="about-description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mauris
            commodo quis imperdiet massa tincidunt nunc pulvinar sapien. Magna
            fermentum iaculis eu non. Suspendisse interdum consectetur libero id
            faucibus nisl tincidunt eget. Adipiscing elit ut aliquam purus sit
            amet. Odio facilisis mauris sit amet massa. Faucibus scelerisque
            eleifend donec pretium vulputate sapien nec sagittis. Viverra nibh
            cras pulvinar mattis nunc sed. In nibh mauris cursus mattis molestie
            a iaculis. Scelerisque purus semper eget duis at tellus at.
          </p>
        </div>
      </Container>

      <Pricing />
    </>
  );
}

export default Home;
