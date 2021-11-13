import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  Form,
  Alert,
  Modal,
} from "react-bootstrap";
import img from "../../assets/sign-up-form.svg";
import "./signUp.scss";
import Navbar from "../../components/navbar/navbar";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { registerUser } from "../../redux/actions/userAction";

function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [age, setAge] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [errors, setErrors] = useState("");
  const [nofiy, setNotify] = useState("");

  const role = "customer";
  const accountType = "not verified";

  //Alert
  const [show, setShow] = useState(true);

  //Function to generate form control inputs for each field
  const useInput = ({
    type,
    className,
    value,
    label,
    placeholder,
    changeHandler,
    id,
    pattern,
  }) => {
    const input = (
      <Form.Group controlId={id}>
        <Form.Label className="label"> {label} </Form.Label>
        <Form.Control
          type={type}
          className={className}
          placeholder={placeholder}
          value={value}
          onChange={(e) => changeHandler(e.target.value)}
          required
          name={id}
          pattern={pattern}
        />
      </Form.Group>
    );
    return input;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      age,
      contactNo,
      role,
      accountType,
    };

    props.registerUser(data, props.history);
  };

  useEffect(() => {
    props.UI.errors && setErrors(props.UI.errors.message);
  }, [props.UI.errors]);

  useEffect(() => {
    props.UI.success && setNotify(props.UI.success.message);
  }, [props.UI.success]);

  // Generate fields using function
  const firstNameInput = useInput({
    type: "text",
    className: "mb-2",
    placeholder: "Jane",
    value: firstName,
    label: "First Name",
    changeHandler: setFirstName,
    id: "firstName",
  });
  const lastNameInput = useInput({
    type: "text",
    className: "mb-2",
    placeholder: "Doe",
    value: lastName,
    label: "Last Name",
    changeHandler: setLastName,
    id: "lastName",
  });
  const emailInput = useInput({
    type: "email",
    className: "mb-2",
    placeholder: "name@example.com",
    value: email,
    label: "Email address",
    changeHandler: setEmail,
    id: "email",
  });
  const passwordInput = useInput({
    type: "password",
    className: "mb-2",
    placeholder: "Password",
    value: password,
    label: "Password",
    changeHandler: setPassword,
    id: "password",
  });
  const confirmPasswordInput = useInput({
    type: "password",
    className: "mb-2",
    placeholder: "retyp password",
    value: confirmPassword,
    label: "Confirm Password",
    changeHandler: setConfirmPassword,
    id: "confirmPassword",
  });
  const ageInput = useInput({
    type: "number",
    className: "mb-2",
    placeholder: "21..",
    value: age,
    label: "Age",
    changeHandler: setAge,
    id: "age",
  });
  const contactNumberInput = useInput({
    type: "number",
    className: "mb-2",
    placeholder: "xxxxxxxxxx",
    value: contactNo,
    label: "Contact Number",
    changeHandler: setContactNo,
    id: "contactNo",
    pattern: "[0-9]{9}",
  });

  return (
    <div>
      <Navbar />
      <Container className="register">
        <Row className="content">
          <Col className="form-signup">
            <Form onSubmit={handleSubmit}>
              <Modal.Title className="mb-2">Sign Up</Modal.Title>
              <Form.Text className="text-muted">
                <h6>Fill in this form to procced.</h6>
              </Form.Text>

              {/* <Form.Group>
                <Form.Label htmlFor="inlineFormInput">First Name</Form.Label>
                <Form.Control
                  className="mb-2"
                  id="firstName"
                  placeholder="Jane"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group> */}
              {firstNameInput}

              {/* <Form.Group>
                <Form.Label htmlFor="inlineFormInput">Last Name</Form.Label>
                <Form.Control
                  className="mb-2"
                  id="lastName"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group> */}
              {lastNameInput}

              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  id="email"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group> */}
              {emailInput}

              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group> */}
              {passwordInput}

              {/* <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group> */}
              {confirmPasswordInput}
              <Form.Text id="passwordHelpBlock" muted>
                password must be 8-20 characters long
              </Form.Text>

              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="21.."
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group> */}
              {ageInput}

              {/* <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="xxxxxxxxxx"
                  value={contactNo}
                  onChange={(e) => setContactNo(e.target.value)}
                />
              </Form.Group> */}
              {contactNumberInput}
              {/* {nofiy && (
                <Alert variant="success" hidden={!nofiy}>
                  {" "}
                  {nofiy}
                </Alert>
              )}
              {!nofiy && (
                <Alert variant="danger" hidden={!errors}>
                  {" "}
                  {errors}
                </Alert>
              )} */}
              <Alert variant="success" hidden={!nofiy}>
                {!nofiy ? "nofiy" : nofiy}
              </Alert>
              <Alert variant="danger" hidden={!errors}>
                {!errors ? "error" : errors}
              </Alert>

              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary"
                  type="submit"
                  size="lg"
                  className="btn-submit"
                  // href="/img-upload"
                >
                  Create Account
                </Button>
              </div>
            </Form>
          </Col>
          <Col className="signup-img">
            <Image src={img} alt="books" className="img-signup" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

SignUp.propTypes = {
  registerUser: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapActionsToProps)(SignUp);
