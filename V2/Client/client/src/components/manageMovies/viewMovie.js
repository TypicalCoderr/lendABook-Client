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
  uploadMovieImage,
  toggleMovieAvailability,
} from "../../redux/actions/dataActions";

import "./viewMovie.scss";

function ViewMovie(props) {
  const {
    UI: { loading },
    movie,
  } = props;

  const [errors, setErrors] = useState({});

  //Clicks on hidden input field
  const handleImageUpload = () => {
    const fileInput = document.getElementById("movieImageInput");
    fileInput.click();
  };

  //Activates when input field file is changed
  const handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append("image", image, image.name);
    props.uploadMovieImage(formData, movie.movieId);
  };

  //Handle toggle activate
  const handleAvailabilityToggle = () => {
    props.toggleMovieAvailability(movie.movieId);
  };

  //Update state with errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  return loading ? (
    <p>Loading...</p>
  ) : movie ? (
    <Fragment>
      <Card
        className="view-user-card"
        style={{ width: "22rem", height: "auto" }}
      >
        <Badge
          pill
          className="book-card-badge"
          variant={movie.isAvailable ? "success" : "danger"}
        >
          {movie.isAvailable ? "Available" : "Reserved"}
        </Badge>
        <Card.Body>
          <img className="book-image" src={movie.movieCover} alt="movie"></img>

          <hr />

          <ListGroup>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Movie ID</Badge>
              <span> {movie.movieId}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Movie Name</Badge>
              <span> {movie.title}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Movie Director</Badge>
              <span> {movie.director}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Production Com.</Badge>
              <span> {movie.production}</span>
            </ListGroup.Item>
            <ListGroup.Item variant="light">
              <Badge variant="secondary">Category</Badge>
              <span> {movie.category}</span>
            </ListGroup.Item>
          </ListGroup>

          <ButtonGroup vertical className="view-book-image-options">
            <Button variant="outline-info" onClick={handleImageUpload}>
              Change Image
            </Button>
            <Button
              variant={
                movie.isAvailable ? "outline-warning" : "outline-success"
              }
              onClick={() => handleAvailabilityToggle()}
            >
              {movie.isAvailable ? "Set Unavailable" : "Set Available"}
            </Button>
          </ButtonGroup>
        </Card.Body>
        <input
          type="file"
          id="movieImageInput"
          onChange={handleImageChange}
          hidden="hidden"
          accept=".png, .jpeg, .jpg"
        />

        <p
          className="error-text"
          hidden={!errors.movieImage}
          style={{ textAlign: "center" }}
        >
          {errors.movieImage}
        </p>

        <Card.Footer>
          {" "}
          <small className="text-muted">
            {`Added on ${dayjs(movie.createdAt)
              .format("DD/MM/YYYY h:mm:ss A [GMT]ZZ", {
                timeZone: "Asia/Colombo",
              })
              .toString()}`}
          </small>
        </Card.Footer>
      </Card>
    </Fragment>
  ) : (
    <Alert variant="warning">No Movie selected</Alert>
  );
}

ViewMovie.propTypes = {
  movie: PropTypes.object,
  UI: PropTypes.object.isRequired,
  uploadMovieImage: PropTypes.func.isRequired,
  toggleMovieAvailability: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  movie: state.data.movie,
  UI: state.UI,
});

const mapActionsToProps = {
  uploadMovieImage,
  toggleMovieAvailability,
};

export default connect(mapStateToProps, mapActionsToProps)(ViewMovie);
