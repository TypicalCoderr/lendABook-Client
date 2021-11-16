import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { addBook } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/uiActions";

import { BOOK_CATRGORIES } from "../../util/consts";

function AddBookModal(props) {
  const [ISBN, setISBN] = useState("");
  const [title, setTitle] = useState("");
  // const [summary, setSummary] = useState("");
  const [category, setCategory] = useState(BOOK_CATRGORIES[0].id);
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  // const [ratings, setRatings] = useState("");
  const [errors, setErrors] = useState({});

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  const {
    UI: { loading },
  } = props;

  const handleAddBook = async (event) => {
    event.preventDefault();
    const data = {
      title,
      author,
      ISBN,
      publisher,
      category,
    };
    //Add book to backend
    let result = await props.addBook(data);

    //If no errors are found clear the modal and hide it
    if (result === true) {
      props.onHide();
      clearFields();
    }
  };

  //Method to clear all form fields and set them to default
  const clearFields = () => {
    setTitle("");
    setAuthor("");
    setISBN("");
    setPublisher("");
    setCategory(BOOK_CATRGORIES[0].id);
    props.clearErrors();
  };

  const newProps = { ...props };

  // Dropdown select for book categories
  const categoryDropdownMarkup = BOOK_CATRGORIES.map((category, index) => (
    <option key={index} value={category.id}>
      {category.name}
    </option>
  ));

  delete newProps.UI;
  delete newProps.addBook;
  // delete newProps.clearErrors;

  return (
    <div>
      <Modal
        {...newProps}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onExit={clearFields}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleAddBook}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Book Title </Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label> Author </Form.Label>
                <Form.Control
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={9}>
                <Form.Label> ISBN </Form.Label>
                <Form.Control
                  type="number"
                  className={errors.ISBN ? "is-invalid" : null}
                  value={ISBN}
                  onChange={(e) => setISBN(e.target.value)}
                  required
                />
                <p className="error-text" hidden={!errors.ISBN}>
                  {errors.ISBN}
                </p>
              </Form.Group>
              <Form.Group as={Col} md={3}>
                <Form.Label> Publisher </Form.Label>
                <Form.Control
                  type="text"
                  value={publisher}
                  onChange={(e) => setPublisher(e.target.value)}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label> Category </Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categoryDropdownMarkup}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button type="submit" style={{ marginTop: 20 }} disabled={loading}>
              <span>
                <i className="fas fa-plus-square fa-plus-square-add"></i>
                {loading ? "Adding book..." : "Add book"}
              </span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

AddBookModal.propTypes = {
  addBook: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  addBook,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(AddBookModal);
