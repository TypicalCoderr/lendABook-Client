import React from "react";
import { Container, Row, Col, Button, Image, Form } from "react-bootstrap";
import img from "../../assets/login-form.svg";
import "./login.scss";

function login() {
  return (
    <>
      <Container className="login">
        <Row>
          <Col className="img-box">
            <Image src={img} alt="books" className="booklogin" />
          </Col>
          <Col className="form-box">
            <Form className="login-form">
              <Form.Text className="text-muted">
                <h2>Welcome back.</h2>
              </Form.Text>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Text className="text-muted">forget password?</Form.Text>
              </Form.Group>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" type="submit" size="lg">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default login;
