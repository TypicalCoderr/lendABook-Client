import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Image,
  InputGroup,
  Form,
} from "react-bootstrap";
import Navbar from "../../components/navbar/navbar";

function ImageForm() {
  const [selectedImage, setSelectedImage] = useState();

  // This function will be triggered when the file field change
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
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
            <Form>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Text className="text-muted">
                  <h5>Step 2</h5>
                  Upload your image to verify the identity.
                </Form.Text>
                <Form.Control onChange={imageChange} type="file" />
                <Form.Text className="text-muted">
                  maximum file size : 10MB
                </Form.Text>
              </Form.Group>

              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <Button
                  variant="outline-primary"
                  type="submit"
                  size="sm"
                  href=""
                >
                  Upload
                </Button>
                <Button
                  variant="outline-primary"
                  type="submit"
                  size="sm"
                  href=""
                >
                  Skip for now
                </Button>
              </div>
              {selectedImage && (
                <div className="text-center">
                  <Form.Text className="text-muted">
                    Preview of uploaded image will be rendered below.
                  </Form.Text>
                  <Image
                    className="preview-box"
                    src={URL.createObjectURL(selectedImage)}
                    alt="Thumb"
                  />
                  <div className="text=center">
                    <Button
                      onClick={removeSelectedImage}
                      class="d-grid gap-2 col-6 mx-auto"
                      size="sm"
                    >
                      Deselect this Image
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default ImageForm;
