import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//REDUX
import { connect } from "react-redux";
import { removeBook } from "../../redux/actions/dataActions";
import { clearErrors } from "../../redux/actions/uiActions";

function RemoveBookModal(props) {
  const [ISBN, setISBN] = useState("");
  const [errors, setErrors] = useState({});

  //Update state with errors
  useEffect(() => {
    props.UI.errors ? setErrors(props.UI.errors.error) : setErrors({});
  }, [props.UI.errors]);

  const { id } = props;

  useEffect(() => {
    if (id) {
      setISBN(id.ISBN);
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
    let result = await props.removeBook(ISBN);
    if (result === true) {
      props.onHide();
      successToaster();
    } else {
      props.onHide();
      errorToaster();
    }
  };

  const successToaster = () => {
    toast.success("Book removed successfully!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const errorToaster = () => {
    toast.error("Book can not be deleted as it has reservations", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const newProps = { ...props };

  //Remove unwanted props before passing props to modal
  delete newProps.UI;
  delete newProps.removeBook;
  delete newProps.ISBN;
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
            Remove Book
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure you want to delete this Book - ISBN {id && id.ISBN}?
          </p>
          {/* <p
            className="error-text"
            hidden={!errors.deleteBook}
            style={{ textAlign: "center" }}
          >
            {errors.deleteBook}
          </p> */}
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

RemoveBookModal.propTypes = {
  removeBook: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  UI: state.UI,
});

const mapActionsToProps = {
  removeBook,
  clearErrors,
};

export default connect(mapStateToProps, mapActionsToProps)(RemoveBookModal);
