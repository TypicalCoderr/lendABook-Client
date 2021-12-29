import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Table, Badge, CardColumns } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//CSS
import "./viewReservationModal.scss";

import Book from "./reservedBooks";

//REDUX
import { connect } from "react-redux";

function ViewReservationModal(props) {
  const [edited, setEdited] = useState(false);
  const [_books, setBooks] = useState([]);
  const [bookPool, setBookPool] = useState([]);

  const {
    reservation,
    loading,
    UI,
    reservation: { books },
  } = props;

  // console.log(reservation && reservation.books && reservation.books);

  useEffect(() => {
    if (reservation.books) {
      setBooks(reservation.books);
      setBookPool(reservation.books);
    }
  }, [reservation.books]);

  const chunk = (arr, size) => {
    let clone = [...arr];
    let result = [];
    while (clone.length) {
      result.push(clone.splice(0, size));
    }
    return result;
  };

  let booksMarkup =
    _books.length > 0 &&
    _books.map((book) => (
      <div key={book.ISBN}>
        <Book book={book}></Book>
      </div>
    ));

  let chunkedBooksMarkup = booksMarkup.length > 0 ? chunk(booksMarkup, 3) : "";

  const newProps = { ...props };

  // let display = Object.keys(reservation.books).map((key) => (
  //   <div value={key}>{reservation.books[key]}</div>
  // ));

  // console.log(display);

  return (
    <Modal
      {...newProps}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="rent-vehicle-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Reserved Books
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="rent-vehicle-body" style={{ marginLeft: "4rem" }}>
          {_books.length > 0 &&
            chunkedBooksMarkup.map((chunk) => (
              <CardColumns style={{ marginTop: "10px", width: "60rem" }}>
                {chunk}
              </CardColumns>
            ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        {/* {edited && (
          <Button variant="primary" onClick={handleEdit} disabled={UI.loading}>
            Update Reservation
          </Button>
        )} */}
      </Modal.Footer>
    </Modal>
  );
}

ViewReservationModal.propTypes = {
  reservation: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  UI: PropTypes.object.isRequired,
};

const mapActionsToProps = {};

const mapStateToProps = (state) => ({
  loading: state.data.loading,
  UI: state.UI,
});

export default connect(
  mapStateToProps,
  mapActionsToProps
)(ViewReservationModal);
