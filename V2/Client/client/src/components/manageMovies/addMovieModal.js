import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";
import { addMovie } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/uiActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

import { MOVIE_CATRGORIES } from "../../util/consts";

function AddMovieModal(props) {
  const [movieId, setMovieId] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState(MOVIE_CATRGORIES[0].id);
  const [director, setDirector] = useState("");
  const [production, setProduction] = useState("");
  const [ratings, setRatings] = useState("");
  const [copies, setCopies] = useState("");
  const [errors, setErrors] = useState({});

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  const {
    UI: { loading },
  } = props;

  const handleAddMovie = async (event) => {
    event.preventDefault();
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
    //Add book to backend
    let result = await props.addMovie(data);

    //If no errors are found clear the modal and hide it
    if (result === true) {
      props.onHide();
      clearFields();
      successToaster();
    }
  };

  //Method to clear all form fields and set them to default
  const clearFields = () => {
    setTitle("");
    setDirector("");
    setMovieId("");
    setProduction("");
    setCategory(MOVIE_CATRGORIES[0].id);
    setRatings("");
    setCopies("");
    setSummary("");
    props.clearErrors();
  };

  const successToaster = () => {
    toast.success("Movie added successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const newProps = { ...props };

  // Dropdown select for book categories
  const categoryDropdownMarkup = MOVIE_CATRGORIES.map((category, index) => (
    <option key={index} value={category.id}>
      {category.name}
    </option>
  ));

  delete newProps.UI;
  delete newProps.addMovie;
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
          <Modal.Title id="contained-modal-title-vcenter">
            Add Movie
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleAddMovie}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Movie Title </Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label> Director </Form.Label>
                <Form.Control
                  type="text"
                  value={director}
                  onChange={(e) => setDirector(e.target.value)}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={9}>
                <Form.Label> Movie ID </Form.Label>
                <Form.Control
                  type="number"
                  className={errors.movieId ? "is-invalid" : null}
                  value={movieId}
                  onChange={(e) => setMovieId(e.target.value)}
                  required
                />
                <p className="error-text" hidden={!errors.movieId}>
                  {errors.movieId}
                </p>
              </Form.Group>
              <Form.Group as={Col} md={3}>
                <Form.Label> Production </Form.Label>
                <Form.Control
                  type="text"
                  value={production}
                  onChange={(e) => setProduction(e.target.value)}
                  required
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} md={6}>
                <Form.Label> Category </Form.Label>
                <Form.Control
                  as="select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categoryDropdownMarkup}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col} md={3}>
                <Form.Label> Rating </Form.Label>
                <Form.Control
                  type="number"
                  value={ratings}
                  onChange={(e) => setRatings(e.target.value)}
                ></Form.Control>
              </Form.Group>
              <Form.Group as={Col} md={3}>
                <Form.Label> No. of Copies </Form.Label>
                <Form.Control
                  type="number"
                  value={copies}
                  onChange={(e) => setCopies(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label> Summary </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  maxLength={250}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form.Row>
            <Button type="submit" style={{ marginTop: 20 }} disabled={loading}>
              <span>
                <i className="fas fa-plus-square fa-plus-square-add"></i>
                {loading ? "Adding Movie..." : "Add Movie"}
              </span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

AddMovieModal.propTypes = {
  addMovie: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  addMovie,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(AddMovieModal);
