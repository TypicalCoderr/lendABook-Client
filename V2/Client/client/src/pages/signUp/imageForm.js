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
} from "react-bootstrap";
import Navbar from "../../components/navbar/navbar";
import PropTypes from "prop-types";
//REDUX
import { connect } from "react-redux";

import { uploadUserImage } from "../../redux/actions/userAction";

function ImageForm(props) {
  const [errors, setErrors] = useState({});
  const [selectedImage, setSelectedImage] = useState();
  const [isUserImageUploaded, setIsUserImageUploaded] = useState(false);

  //Destructure props
  const {
    UI: { loading },
    user: { userImageURL },
  } = props;

  //Update error state when errors passed from props is changed
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  useEffect(() => {
    userImageURL && setIsUserImageUploaded(true);
  }, [userImageURL]);

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
  const removeSelectedImage = () => {
    setSelectedImage();
  };
  return (
    <div>
      <Navbar />
      <Container className="img-uploader">
        <Row>
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
            <Card className="card img-upload-card">
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
                <div className="text-center" style={{ marginTop: "10rem" }}>
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
          <Col style={{ alignItem: "center" }}>
            <h2 className="title" style={{ color: "black" }}>
              UPLOAD IDENTIFICATION IMAGE
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
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

ImageForm.propTypes = {
  uploadUserImage: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  uploadUserImage,
};

export default connect(mapStateToProps, mapActionsToProps)(ImageForm);
