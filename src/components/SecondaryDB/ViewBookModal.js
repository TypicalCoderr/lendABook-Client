import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Table, Badge, Alert, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import { addBook } from "../../redux/actions/dataActions";

import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ViewBookModal(props) {
  const [ISBN, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [ratings, setRatings] = useState("");
  const [copies, setCopies] = useState("");

  const { _book } = props;

  useEffect(() => {
    if (_book) {
      setISBN(_book.ISBN);
      setTitle(_book.title);
      setSummary(_book.summary);
      setCategory(_book.category);
      setAuthor(_book.author);
      setPublisher(_book.publisher);
      setRatings("0");
      setCopies(_book.noOfCopies);
    }
  }, [_book]);

  const newProps = { ...props };

  const handleBookAdd = async (onBookClick) => {
    console.log(onBookClick);

    const data = {
      title,
      author,
      ISBN,
      publisher,
      category,
      summary,
      ratings,
      copies,
    };
    console.log(data);
    //Add book to backend
    let result = await props.addBook(data);

    if (result === true) {
      props.onHide();
      successToaster();
    } else {
      props.onHide();
      errorToster();
    }
  };

  const successToaster = () => {
    toast.success("Book was added to the main Database!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const errorToster = () => {
    toast.error("Book already exists in main Database!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  return (
    <Modal
      {...newProps}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="rent-vehicle-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {/* ISBN-{onBookClick.ISBN} book Details */}
          ISBN-{_book && _book.ISBN}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {_book && (
          <div className="rent-vehicle-body">
            <Row>
              <Col ms={6}>
                <img
                  className="book-cover-image"
                  style={{ marginLeft: "30px" }}
                  src={_book.bookCover}
                  alt="vehicle"
                />
                <div
                  className="d-grid gap-2"
                  style={{
                    marginTop: "1rem",
                    paddingLeft: "2rem",
                    paddingRight: "2rem",
                  }}
                >
                  <Button
                    variant="warning"
                    size="lg"
                    onClick={() => {
                      handleBookAdd();
                    }}
                  >
                    Add Book To Main DB
                  </Button>
                </div>
              </Col>
              <Col ms={6}>
                <div className="lable-row">{`${_book.summary}`}</div>

                <div className="lable-row">
                  Written by{" "}
                  <b style={{ fontWeight: "bold" }}>{_book.author}</b>
                </div>
                <div className="lable-row">
                  Published by{" "}
                  <b style={{ fontWeight: "bold" }}>{_book.publisher}</b>
                </div>
                <div className="lable-row">
                  Copies of books:{" "}
                  <b style={{ fontWeight: "bold" }}>{_book.noOfCopies}</b>
                </div>
                <div className="lable-row">
                  Categories :
                  <span className="badge bg-dark">
                    {" "}
                    {_book.category.toUpperCase()}
                  </span>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ViewBookModal.propTypes = {
  book: PropTypes.object,
  addBook: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  addBook,
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, mapActionsToProps)(ViewBookModal);
