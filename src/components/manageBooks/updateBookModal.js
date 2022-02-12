import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";

import { updateBook } from "../../redux/actions/dataActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateBookModal(props) {
  const [ISBN, setISBN] = useState("");
  const [_title, setTitle] = useState("");
  const [_summary, setSummary] = useState("");
  const [_author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [errors, setErrors] = useState({});

  const { updatedBook } = props;

  //   console.log(updateBook);

  //When errors are updated the component is re-rendered to display errors
  //   useEffect(() => {
  //     props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  //   }, [props.UI.errors]);

  useEffect(() => {
    if (updatedBook) {
      setISBN(updatedBook.ISBN);
      setTitle(updatedBook.title);
      setAuthor(updatedBook.author);
      setSummary(updatedBook.summary);
    }
  }, [updatedBook]);

  const {
    UI: { loading },
  } = props;

  const handleSaveUpdate = async (event) => {
    event.preventDefault();

    const data = {
      ISBN,
      title : _title,
      author : _author,
      summary: _summary,
    };

    let result = await props.updateBook(data);

    // If no errors are found clear the modal and hide it
    if (result === true) {
      props.onHide();
      successToaster();
    }
  };

  const clearFields = () => {
    setTitle("");
    setAuthor("");
    setPublisher("");
    setSummary("");
    // props.clearErrors();
  };

  const successToaster = () => {
    toast.success("Book updated successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const newProps = { ...props };

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
          <Modal.Title id="contained-modal-title-vcenter">
            Update Book Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveUpdate}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Book Title </Form.Label>
                <Form.Control
                  type="text"
                  value={_title}
                  placeholder={updatedBook && updatedBook.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Book Author </Form.Label>
                <Form.Control
                  type="text"
                  value={_author}
                  placeholder={updatedBook && updatedBook.author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label> Book Summary </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  maxLength={250}
                  value={_summary}
                  placeholder={updatedBook && updatedBook.summary}
                  onChange={(e) => setSummary(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form.Row>
            <Button type="submit" style={{ marginTop: 20 }} disabled={loading}>
              <span>
                <i className="fas fa-save"></i>{" "}
                {loading ? "Updating book..." : "Save Update"}
              </span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

UpdateBookModal.propTypes = {
  UI: PropTypes.object.isRequired,
  updateBook: PropTypes.func.isRequired,
  // addBook: PropTypes.func.isRequired,
  // clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  // addBook,
  // clearErrors,
  updateBook,
};

export default connect(mapStateToProps, mapActionsToProps)(UpdateBookModal);
