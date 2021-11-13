import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";
import img from "../../assets/login-form.svg";
import "./login.scss";
import Navbar from "../../components/navbar/navbar";

import { connect } from "react-redux";
import { loginUser } from "../../redux/actions/userAction";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const {
    UI: { loading },
  } = props;

  useEffect(() => {
    props.UI.errors && setErrors(props.UI.errors.message);
  }, [props.UI.errors]);

  const handleLogin = async (event) => {
    event.preventDefault();
    const data = { email, password };
    props.loginUser(data, props.history);
  };

  return (
    <>
      <Navbar />
      <Container className="login">
        <Row>
          <Col className="img-box">
            <Image src={img} alt="books" className="booklogin" />
          </Col>
          <Col className="form-box">
            <Form className="login-form" onSubmit={handleLogin}>
              <Modal.Title>Welcome back!</Modal.Title>
              <Form.Text className="text-muted">
                <h6> </h6>
              </Form.Text>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Text className="text-muted">forget password?</Form.Text>
              </Form.Group>

              <Alert variant="danger" hidden={!errors}>
                {!errors ? "error" : errors}
              </Alert>
              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary"
                  type="submit"
                  size="lg"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  loginUser,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
