import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Table, Badge, Alert, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import {
  addMovie,
  updateMovieCSV,
  updateMovieCopies,
} from "../../redux/actions/dataActions";

import { connect } from "react-redux";

function VideosPurchaseModal(props) {
  const [movieId, setMovieId] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("");
  const [director, setDirector] = useState("");
  const [production, setProduction] = useState("");
  const [ratings, setRatings] = useState("");
  const [copies, setCopies] = useState("");
  const [errors, setErrors] = useState({});

  //Destructure props
  const { onMovieClick } = props;

  useEffect(() => {
    if (onMovieClick) {
      setMovieId(onMovieClick.movieId);
      setTitle(onMovieClick.title);
      setSummary(onMovieClick.summary);
      setCategory(onMovieClick.category);
      setDirector(onMovieClick.director);
      setProduction(onMovieClick.production);
      setRatings("0");
      setCopies(onMovieClick.noOfCopies);
    }
  }, [onMovieClick]);

  const handleMovieUpdate = async (onMovieClick) => {
    const data = {
      copies,
      movieId,
    };
    console.log(data);

    let result = await props.updateMovieCopies(data);
    console.log(result);
    if (result === true) {
      props.updateMovieCSV(movieId);
      props.onHide();
    }
  };

  const handleMovieAdd = async (onMovieClick) => {
    console.log(onMovieClick);

    const data = {
      title,
      director,
      movieId,
      production,
      category,
      summary,
      ratings,
      copies,
    };
    console.log(data);
    //Add book to backend
    let result = await props.addMovie(data);

    if (result === true) {
      props.updateMovieCSV(movieId);
      props.onHide();
    }
  };

  const newProps = { ...props };

  return (
    <div>
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
            Movie Id-{onMovieClick && onMovieClick.movieId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {onMovieClick && (
            <div className="rent-vehicle-body">
              <Col>
                <div className="lable-row">{`${onMovieClick.summary}`}</div>

                <div className="lable-row">
                  Directed by{" "}
                  <b style={{ fontWeight: "bold" }}>{onMovieClick.director}</b>
                </div>
                <div className="lable-row">
                  Production by{" "}
                  <b style={{ fontWeight: "bold" }}>
                    {onMovieClick.production}
                  </b>
                </div>
                <div className="lable-row">
                  Copies of movie:{" "}
                  <b style={{ fontWeight: "bold" }}>
                    {onMovieClick.noOfCopies}
                  </b>
                </div>
                <div className="lable-row">
                  Categories :
                  <span className="badge bg-dark">
                    {" "}
                    {onMovieClick.category.toUpperCase()}
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
                  {onMovieClick.isNewMovie === true && onMovieClick ? (
                    <Button
                      variant="success"
                      size="lg"
                      onClick={() => {
                        handleMovieAdd(onMovieClick);
                      }}
                    >
                      Add Movie
                    </Button>
                  ) : (
                    <Button
                      variant="warning"
                      size="lg"
                      onClick={() => {
                        handleMovieUpdate(onMovieClick);
                      }}
                    >
                      Update Copies
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
    </div>
  );
}

VideosPurchaseModal.propTypes = {
  movie: PropTypes.object,
  addMovie: PropTypes.func.isRequired,
  updateMovieCSV: PropTypes.func.isRequired,
  updateMovieCopies: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  addMovie,
  updateMovieCSV,
  updateMovieCopies,
};

const mapStateToProps = (state) => ({
  data: state.data,
  UI: state.UI,
});

export default connect(mapStateToProps, mapActionsToProps)(VideosPurchaseModal);
