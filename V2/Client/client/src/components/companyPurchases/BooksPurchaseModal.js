import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Table, Badge, Alert, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import {
  addBook,
  updateBookCSV,
  updateBookCopies,
} from "../../redux/actions/dataActions";

import { connect } from "react-redux";

function BooksPurchaseModal(props) {
  const [ISBN, setISBN] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [ratings, setRatings] = useState("");
  const [copies, setCopies] = useState("");
  const [errors, setErrors] = useState({});
  //Destructure props
  const { onBookClick } = props;
  // console.log(onBookClick);
  //Calculate initial total

  useEffect(() => {
    if (onBookClick) {
      setISBN(onBookClick.ISBN);
      setTitle(onBookClick.title);
      setSummary(onBookClick.summary);
      setCategory(onBookClick.category);
      setAuthor(onBookClick.author);
      setPublisher(onBookClick.publisher);
      setRatings("0");
      setCopies(onBookClick.noOfCopies);
    }
  }, [onBookClick]);

  const newProps = { ...props };

  const handleBookUpdate = async (onBookClick) => {
    const data = {
      copies,
      ISBN,
    };
    console.log(data);

    let result = await props.updateBookCopies(data);
    console.log(result);
    if (result === true) {
      props.updateBookCSV(ISBN);
      props.onHide();
    }
  };

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
      props.updateBookCSV(ISBN);
      props.onHide();
    }
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
          ISBN-{onBookClick && onBookClick.ISBN}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {onBookClick && (
          <div className="rent-vehicle-body">
            <Col>
              <div className="lable-row">{`${onBookClick.summary}`}</div>

              <div className="lable-row">
                Written by{" "}
                <b style={{ fontWeight: "bold" }}>{onBookClick.author}</b>
              </div>
              <div className="lable-row">
                Published by{" "}
                <b style={{ fontWeight: "bold" }}>{onBookClick.publisher}</b>
              </div>
              <div className="lable-row">
                Copies of books:{" "}
                <b style={{ fontWeight: "bold" }}>{onBookClick.noOfCopies}</b>
              </div>
              <div className="lable-row">
                Categories :
                <span className="badge bg-dark">
                  {" "}
                  {onBookClick.category.toUpperCase()}
                </span>
              </div>
              <div
                className="d-grid gap-2"
                style={{
                  marginTop: "1rem",
                  paddingLeft: "2rem",
                  paddingRight: "2rem",
                }}
              >
                {onBookClick.isNewBook === true && onBookClick ? (
                  <Button
                    variant="success"
                    size="lg"
                    onClick={() => {
                      handleBookAdd(onBookClick);
                    }}
                  >
                    Add Book
                  </Button>
                ) : (
                  <Button
                    variant="warning"
                    size="lg"
                    onClick={() => {
                      handleBookUpdate(onBookClick);
                    }}
                  >
                    Update book
                  </Button>
                )}
              </div>
            </Col>
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

BooksPurchaseModal.propTypes = {
  book: PropTypes.object,
  addBook: PropTypes.func.isRequired,
  updateBookCSV: PropTypes.func.isRequired,
  updateBookCopies: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  addBook,
  updateBookCSV,
  updateBookCopies,
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, mapActionsToProps)(BooksPurchaseModal);
