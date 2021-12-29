import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Table, Badge, CardColumns } from "react-bootstrap";
import PropTypes from "prop-types";
import dayjs from "dayjs";

//CSS
import "./viewReservationModal.scss";

import Movie from "./reservedMovies";

//REDUX
import { connect } from "react-redux";

function ViewReservationMovieModal(props) {
  // const [edited, setEdited] = useState(false);
  const [_movies, setMovies] = useState([]);
  const [moviePool, setMoviePool] = useState([]);

  const {
    reservation,
    loading,
    UI,
    reservation: { movies },
  } = props;

  useEffect(() => {
    if (reservation.movies) {
      setMovies(reservation.movies);
      setMoviePool(reservation.movies);
    }
  }, [reservation.movies]);

  const chunk = (arr, size) => {
    let clone = [...arr];
    let result = [];
    while (clone.length) {
      result.push(clone.splice(0, size));
    }
    return result;
  };

  let moviesMarkup =
    _movies.length > 0 &&
    _movies.map((movie) => (
      <div key={movie.movieId}>
        <Movie movie={movie}></Movie>
      </div>
    ));

  let chunkedMoviesMarkup =
    moviesMarkup.length > 0 ? chunk(moviesMarkup, 3) : "";

  const newProps = { ...props };

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
          Reserved Movies
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="rent-vehicle-body" style={{ marginLeft: "4rem" }}>
          {_movies.length > 0 &&
            chunkedMoviesMarkup.map((chunk) => (
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

ViewReservationMovieModal.propTypes = {
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
  )(ViewReservationMovieModal);
  