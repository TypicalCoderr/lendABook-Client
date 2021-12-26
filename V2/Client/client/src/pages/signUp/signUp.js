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
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [subscriptionType, setSubscriptionType] = useState(1);
  const [errors, setErrors] = useState({});
  const [nofiy, setNotify] = useState("");

  const role = "customer";

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
    maxLength,
  }) => {
    const input = (
      <Form.Group controlId={id}>
        <Form.Label className="label"> {label} </Form.Label>
        <Form.Control
          type={type}
          className={errors[id] ? "form is-invalid" : "form"}
          placeholder={placeholder}
          value={value}
          onChange={(e) => changeHandler(e.target.value)}
          required
          name={id}
          pattern={pattern}
          maxLength={maxLength}
        />
        <p className="error-text" hidden={!errors[id]}>
          {errors[id]}
        </p>
      </Form.Group>
    );
    return input;
  };

  useEffect(() => {
    props.UI.errors && setErrors(props.UI.errors.error);
  }, [props.UI.errors]);

  useEffect(() => {
    props.UI.success && setNotify(props.UI.success.message);
  }, [props.UI.success]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      dateOfBirth,
      contactNo,
      role,
      subscriptionType,
    };
    console.log(data);
    props.registerUser(data, props.history);
  };

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
  const dateOfBirthInput = useInput({
    type: "date",
    value: dateOfBirth,
    label: "Date of birth",
    changeHandler: setDateOfBirth,
    id: "dateOfBirth",
  });
  const contactNumberInput = useInput({
    type: "text",
    className: "mb-2",
    placeholder: "xxxxxxxxxx",
    value: contactNo,
    label: "Contact Number",
    changeHandler: setContactNo,
    id: "contactNo",
    pattern: "[0-9]{10}",
    maxLength: "10",
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

              {firstNameInput}

              {lastNameInput}

              {emailInput}

              {passwordInput}

              {confirmPasswordInput}
              <Form.Text id="passwordHelpBlock" muted>
                password must be 8-20 characters long
              </Form.Text>

              {dateOfBirthInput}

              {contactNumberInput}

              <Form.Text id="passwordHelpBlock" muted>
                select your subscrption package
              </Form.Text>

              <Row>
                <Col md={3}>
                  <div
                    className="radio-btn"
                    onClick={() => {
                      setSubscriptionType(1);
                    }}
                  >
                    <input
                      type="radio"
                      value={subscriptionType}
                      name="subscriptionType"
                      checked={subscriptionType == 1}
                    />{" "}
                    Bronze
                  </div>
                </Col>

                <Col md={3}>
                  {" "}
                  <div
                    className="radio-btn"
                    onClick={() => {
                      setSubscriptionType(2);
                    }}
                  >
                    <input
                      type="radio"
                      value={subscriptionType}
                      name="subscriptionType"
                      checked={subscriptionType == 2}
                    />{" "}
                    Silver
                  </div>
                </Col>

                <Col md={3}>
                  {" "}
                  <div
                    className="radio-btn"
                    onClick={() => {
                      setSubscriptionType(3);
                    }}
                  >
                    <input
                      type="radio"
                      value={subscriptionType}
                      name="subscriptionType"
                      checked={subscriptionType == 3}
                    />{" "}
                    Gold
                  </div>
                </Col>

                <Col md={3}>
                  {" "}
                  <div
                    className="radio-btn"
                    onClick={() => {
                      setSubscriptionType(4);
                    }}
                  >
                    <input
                      type="radio"
                      value={subscriptionType}
                      name="subscriptionType"
                      checked={subscriptionType == 4}
                    />{" "}
                    Platinum
                  </div>
                </Col>
              </Row>

              <Alert variant="success" hidden={!nofiy}>
                {!nofiy ? "nofiy" : nofiy}
              </Alert>

              <div className="d-grid gap-2">
                <Button
                  variant="outline-primary"
                  type="submit"
                  size="lg"
                  className="btn-submit"
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
