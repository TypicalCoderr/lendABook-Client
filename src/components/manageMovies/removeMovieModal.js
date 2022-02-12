import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//REDUX
import { connect } from "react-redux";
import { removeMovie } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/uiActions";

function RemoveMovieModal(props) {
  const [movieId, setMovieId] = useState("");
  const [errors, setErrors] = useState({});

  //Update state with errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  const { id } = props;

  useEffect(() => {
    if (id) {
      setMovieId(id.movieId);
    }
  }, [id]);
  //Destructure props
  const {
    UI: { loading },
  } = props;

  //Handle remove button click
  const handleRemove = async (event) => {
    event.preventDefault();
    // console.log(ISBN);
    let result = await props.removeMovie(movieId);
    if (result === true) {
      props.onHide();
      successToaster();
    } else {
      props.onHide();
      errorToaster();
    }
  };

  const successToaster = () => {
    toast.success("Movie removed successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const errorToaster = () => {
    toast.error("Movie can not be deleted as it has reservations", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const newProps = { ...props };

  //Remove unwanted props before passing props to modal
  delete newProps.UI;
  delete newProps.removeMovie;
  delete newProps.movieId;
  delete newProps.clearErrors;

  return (
    <div>
      <Modal
        {...newProps}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onExit={() => props.clearErrors()}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Remove Movie
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this Movie - movieId{" "}
            {id && id.movieId}?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          <Button variant="danger" onClick={handleRemove} disabled={loading}>
            Remove Book
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

RemoveMovieModal.propTypes = {
  removeMovie: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  removeMovie,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(RemoveMovieModal);
