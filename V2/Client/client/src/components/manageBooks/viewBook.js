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
import RemoveBookModal from "./removeBookModal";
import UpdateBookModal from "./updateBookModal";

import {
  uploadBookImage,
  toggleBookAvailability,
} from "../../redux/actions/dataActions";

import "./viewBook.scss";
import updateBookModal from "./updateBookModal";

function ViewBook(props) {
  const {
    UI: { loading },
    book,
  } = props;

  const [errors, setErrors] = useState({});
  const [removeModalShow, setRemoveModalShow] = useState(false);
  const [updateModalShow, setUpdateModalShow] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

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

  const handleBookUpdate = (book) => {
    console.log(book);
    setSelectedBook(book);
    setUpdateModalShow(true);
  };

  const handleRemoveBook = (book) => {
    console.log(book);
    setSelectedBook(book);
    setRemoveModalShow(true);
  };

  //Update state with errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  return loading ? (
    <p>Loading...</p>
  ) : book ? (
    <Fragment>
      <Card
        className="view-user-card"
        style={{ width: "22rem", height: "auto" }}
      >
        <Badge
          pill
          className="book-card-badge"
          variant={book.isAvailable ? "success" : "danger"}
        >
          {book.isAvailable ? "Available" : "Reserved"}
        </Badge>
        <Card.Body>
          <img className="book-image" src={book.bookCover} alt="book"></img>

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
            {!loading && book.noOfCopies > 0 ? (
              <ListGroup.Item variant="info text-center">
                <Badge variant="info">{book.noOfCopies} copies Available</Badge>
                <span></span>
              </ListGroup.Item>
            ) : (
              <ListGroup.Item variant="danger text-center">
                <Badge variant="danger">No copies Available</Badge>
                <span></span>
              </ListGroup.Item>
            )}
          </ListGroup>

          <ButtonGroup vertical className="view-book-image-options">
            <Button variant="outline-info" onClick={handleImageUpload}>
              Change Image
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => handleBookUpdate(book)}
            >
              Update details
            </Button>
            <Button
              variant={book.isAvailable ? "outline-warning" : "outline-success"}
              onClick={() => handleAvailabilityToggle()}
            >
              {book.isAvailable ? "Set Unavailable" : "Set Available"}
            </Button>
            <Button
              variant="outline-danger"
              disabled={!book.isAvailable}
              onClick={() => handleRemoveBook(book)}
            >
              Remove Book
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

      <RemoveBookModal
        id={selectedBook}
        show={removeModalShow}
        onHide={() => setRemoveModalShow(false)}
      />
      <UpdateBookModal
        // book={props}
        updatedBook={selectedBook}
        show={updateModalShow}
        onHide={() => setUpdateModalShow(false)}
      />
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
