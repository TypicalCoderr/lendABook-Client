import React, { Fragment, useEffect, useState } from "react";
import {
  Card,
  Alert,
  Badge,
  ListGroup,
  Button,
  ButtonGroup,
} from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

import { connect } from "react-redux";

import {
  uploadBookImage,
  toggleBookAvailability,
} from "../../redux/actions/dataActions";

import "./viewBook.scss";

function ViewBook(props) {
  const {
    UI: { loading },
    book,
  } = props;

  const [errors, setErrors] = useState({});

  //Clicks on hidden input field
  const handleImageUpload = () => {
    const fileInput = document.getElementById("bookImageInput");
    fileInput.click();
  };

  //Activates when input field file is changed
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadBookImage(formData, book.ISBN);
  };

  //Handle toggle activate
  const handleAvailabilityToggle = () => {
    props.toggleBookAvailability(book.ISBN);
  };

  //Update state with errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  return loading ? (
    <p>Loading...</p>
  ) : book ? (
    <Fragment>
      <Card className="view-user-card" style={{ width: "24rem" }}>
        <Badge
          pill
          className="book-card-badge"
          variant={book.isAvailable ? "success" : "danger"}
        >
          {book.isAvailable ? "Available" : "Reserved"}
        </Badge>
        <Card.Body>
          <img className="vehicle-image" src={book.bookCover} alt="book"></img>

          <hr />

          <ListGroup>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Book ISBN</Badge>
              <span> {book.ISBN}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Book title</Badge>
              <span> {book.title}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Book author</Badge>
              <span> {book.author}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Book publisher</Badge>
              <span> {book.publisher}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Category</Badge>
              <span> {book.category}</span>
            </ListGroup.Item>
          </ListGroup>

          <ButtonGroup vertical className="view-vehicle-image-options">
            <Button variant="outline-info" onClick={handleImageUpload}>
              Change Image
            </Button>
            <Button
              variant={book.isAvailable ? "outline-warning" : "outline-success"}
              onClick={() => handleAvailabilityToggle()}
            >
              {book.isAvailable ? "Set Unavailable" : "Set Available"}
            </Button>
          </ButtonGroup>
        </Card.Body>
        <input
          type="file"
          id="bookImageInput"
          onChange={handleImageChange}
          hidden="hidden"
          accept=".png, .jpeg, .jpg"
        />

        <p
          className="error-text"
          hidden={!errors.bookImage}
          style={{ textAlign: "center" }}
        >
          {errors.bookImage}
        </p>

        <Card.Footer>
          {" "}
          <small className="text-muted">
            {`Added on ${dayjs(book.createdAt)
              .format("DD/MM/YYYY h:mm:ss A [GMT]ZZ", {
                timeZone: "Asia/Colombo",
              })
              .toString()}`}
          </small>
        </Card.Footer>
      </Card>
    </Fragment>
  ) : (
    <Alert variant="warning">No Book selected</Alert>
  );
}

ViewBook.propTypes = {
  book: PropTypes.object,
  UI: PropTypes.object.isRequired,
  uploadBookImage: PropTypes.func.isRequired,
  toggleBookAvailability: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  book: state.data.book,
  UI: state.UI,
});

const mapActionsToProps = {
  uploadBookImage,
  toggleBookAvailability,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewBook);
