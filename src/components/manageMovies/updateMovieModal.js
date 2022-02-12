import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Col } from "react-bootstrap";
import PropTypes from "prop-types";

//REDUX
import { connect } from "react-redux";

import { updateMovie } from "../../redux/actions/dataActions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateMovieModal(props) {
  const [movieId, setMovieId] = useState("");
  const [_title, setTitle] = useState("");
  const [_summary, setSummary] = useState("");
  const [_director, setDirector] = useState("");
  const [production, setProduction] = useState("");
  const [errors, setErrors] = useState({});

  const { updatedMovie } = props;

  useEffect(() => {
    if (updatedMovie) {
      setMovieId(updatedMovie.movieId);
      setTitle(updatedMovie.title);
      setDirector(updatedMovie.director);
      setSummary(updatedMovie.summary);
    }
  }, [updatedMovie]);

  const {
    UI: { loading },
  } = props;

  const handleSaveUpdate = async (event) => {
    event.preventDefault();

    const data = {
      movieId,
      title: _title,
      director: _director,
      summary: _summary,
    };

    let result = await props.updateMovie(data);

    // If no errors are found clear the modal and hide it
    if (result === true) {
      props.onHide();
      successToaster();
    }
  };

  const clearFields = () => {
    setTitle("");
    setDirector("");
    setProduction("");
    setSummary("");
    // props.clearErrors();
  };

  const successToaster = () => {
    toast.success("Movie updated successfully!", {
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
            Update Movie Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSaveUpdate}>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Movie Title </Form.Label>
                <Form.Control
                  type="text"
                  value={_title}
                  placeholder={updatedMovie && updatedMovie.title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Movie Director </Form.Label>
                <Form.Control
                  type="text"
                  value={_director}
                  placeholder={updatedMovie && updatedMovie.director}
                  onChange={(e) => setDirector(e.target.value)}
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label> Movie Summary </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  maxLength={250}
                  value={_summary}
                  placeholder={updatedMovie && updatedMovie.summary}
                  onChange={(e) => setSummary(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Form.Row>
            <Button type="submit" style={{ marginTop: 20 }} disabled={loading}>
              <span>
                <i className="fas fa-save"></i>{" "}
                {loading ? "Updating movie..." : "Save Update"}
              </span>
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

UpdateMovieModal.propTypes = {
  UI: PropTypes.object.isRequired,
  updateMovie: PropTypes.func.isRequired,
  // addBook: PropTypes.func.isRequired,
  // clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  // addBook,
  // clearErrors,
  updateMovie,
};

export default connect(mapStateToProps, mapActionsToProps)(UpdateMovieModal);
