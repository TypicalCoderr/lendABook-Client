import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Image,
  InputGroup,
  Form,
  Badge,
} from "react-bootstrap";
import Navbar from "../../components/navbar/navbar";
import PropTypes from "prop-types";
//REDUX
import { connect } from "react-redux";
import ChangeSubModal from "./changeSubscriptionModal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  uploadUserImage,
  updateUserdetails,
} from "../../redux/actions/userAction";

function ImageForm(props) {
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState();
  const [isUserImageUploaded, setIsUserImageUploaded] = useState(false);
  const [_firstName, setFirstName] = useState("");
  const [_lastName, setLastName] = useState("");
  const [_contact, setContactNo] = useState("");
  const [_email, setEmail] = useState("");
  const [subscriptionModalShow, setSubscriptionModalShow] =
    React.useState(false);

  //Destructure props
  const {
    UI: { loading },
    user: {
      userImageURL,
      email,
      firstName,
      lastName,
      contactNo,
      subscription,
      role,
    },
    user,
  } = props;

  //Update error state when errors passed from props is changed
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  useEffect(() => {
    userImageURL && setIsUserImageUploaded(true);
  }, [userImageURL]);

  useEffect(() => {
    if (user) {
      setFirstName(firstName);
      setLastName(lastName);
      setContactNo(contactNo);
      setEmail(email);
    }
  }, [user]);

  //Clicks on hidden input field
  const handleUserImageUpload = () => {
    const fileInput = document.getElementById("userImageInput");
    fileInput.click();
  };

  //Activates when input field file is changed
  const handleUserImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);

    console.log(formData);
    props.uploadUserImage(formData);
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const handleUpdateUserDetails = async (e) => {
    e.preventDefault();

    const data = {
      email: _email,
      firstName: _firstName,
      lastName: _lastName,
      contactNo: _contact,
    };

    let result = await props.updateUserdetails(data);

    if (result == true) {
      successToaster();
    }
  };

  const successToaster = () => {
    toast.success("User details updated!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const handlechangeSub = () => {
    setSubscriptionModalShow(true);
  };

  return (
    <div>
      <Navbar />
      <ToastContainer style={{ width: "30rem" }} />
      <Container className="img-uploader">
        <h3 className="heading">User Profile</h3>
        <hr />
        <Row>
          <Col>
            {/* <h2 className="title" style={{ color: "black" }}>
              User details
            </h2>
            <p className="description" style={{ color: "black" }}>
              Fringilla ut morbi tincidunt augue interdum velit euismod in
              pellentesque. At risus viverra adipiscing at in tellus integer. Id
              aliquet lectus proin nibh nisl condimentum id venenatis. Laoreet
              id donec ultrices tincidunt. Bibendum at varius vel pharetra.
              Viverra adipiscing at in tellus integer. Amet volutpat consequat
              mauris nunc congue nisi vitae suscipit. Pretium viverra
              suspendisse potenti nullam ac tortor. Et egestas quis ipsum
              suspendisse. Cursus in hac habitasse platea dictumst quisque. Mi
              proin sed libero enim sed faucibus turpis in eu.
            </p>
            <Button
              variant="primary"
              type="submit"
              disabled={!isUserImageUploaded}
              href="/"
              style={{ marginLeft: "12rem" }}
            >
              Proceed to home
            </Button> */}
            <Form onSubmit={handleUpdateUserDetails}>
              {/* {error && <ErrorMessage variant="danger">{error}</ErrorMessage>} */}
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Email"
                  value={_email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter FirstName"
                  value={_firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter LastName"
                  value={_lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="contactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter contactNumber"
                  value={_contact}
                  onChange={(e) => setContactNo(e.target.value)}
                ></Form.Control>
              </Form.Group>

              <Button type="submit" varient="primary">
                Update UserDetails
              </Button>
            </Form>
            {/* <Button
              type="submit"
              varient="primary"
              style={{ marginTop: "10px" }}
            >
              Change password
            </Button> */}

            {role == "customer" ? (
              <>
                <hr />
                <p className="heading">
                  Subscrption :
                  <Badge variant="warning">
                    {" "}
                    {subscription && subscription.type}{" "}
                  </Badge>
                </p>
                <Button
                  type="submit"
                  varient="primary"
                  onClick={() =>
                    handlechangeSub(subscription && subscription.type)
                  }
                >
                  Change subscription
                </Button>
              </>
            ) : (
              ""
            )}
          </Col>
          <Col>
            {/* <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Text className="text-muted">
                  <h5> Upload your image to verify the identity.</h5>
                </Form.Text>
                <Form.Control onChange={imageChange} type="file" />
                <input
                  type="file"
                  id="userImageInput"
                  onChange={handleUserImageChange}
                  hidden="hidden"
                  accept=".png, .jpeg, .jpg"
                />
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleUserImageUpload}
                  disabled={loading}
                >
                  {isUserImageUploaded ? "Upload Again" : "Upload user image"}
                </Button>

                <p className="error-text" hidden={!errors.userImage}>
                  {errors.userImage}
                </p>
                <Form.Text className="text-muted">
                  maximum file size : 10MB
                </Form.Text>
              </Form.Group>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end"></div>
              <Button
                variant="primary"
                type="submit"
                disabled={!isUserImageUploaded}
                href="/"
              >
                Proceed to home
              </Button>
              
            </Form> */}
            <Card
              className="card img-upload-card"
              style={{ marginLeft: "3rem" }}
            >
              <Card.Body>
                <Row>
                  <Col>
                    <p className="upload-label">Upload user image</p>
                    <p
                      hidden={!isUserImageUploaded}
                      className="image-uploaded-text"
                      style={{ color: "green" }}
                    >
                      Successfully uploaded!
                    </p>
                  </Col>
                  <Col>
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleUserImageUpload}
                      disabled={loading}
                      className="upload-label "
                    >
                      {isUserImageUploaded
                        ? "Upload Again"
                        : "Upload user image"}
                    </Button>
                  </Col>
                </Row>

                <input
                  type="file"
                  id="userImageInput"
                  onChange={handleUserImageChange}
                  hidden="hidden"
                  accept=".png, .jpeg, .jpg"
                />

                <p className="error-text" hidden={!errors.userImage}>
                  {errors.userImage}
                </p>
              </Card.Body>
              {isUserImageUploaded && (
                <div
                  className="text-center"
                  style={{ marginTop: "10rem", marginBottom: "10rem" }}
                >
                  <Image
                    hidden={!userImageURL}
                    className="preview-box"
                    src={userImageURL}
                    alt="Thumb"
                  />
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Container>
      <ChangeSubModal
        history={props.history}
        isVerified={props.isVerified}
        show={subscriptionModalShow}
        onHide={() => setSubscriptionModalShow(false)}
      />
    </div>
  );
}

ImageForm.propTypes = {
  uploadUserImage: PropTypes.func.isRequired,
  updateUserdetails: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  uploadUserImage,
  updateUserdetails,
};

export default connect(mapStateToProps, mapActionsToProps)(ImageForm);
