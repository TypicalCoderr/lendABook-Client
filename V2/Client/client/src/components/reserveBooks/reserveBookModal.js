import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Table, Badge, Alert } from "react-bootstrap";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import "./reserveBookModal.scss";

import { addToBookCart } from "../../redux/actions/cartActions";

import { connect, useDispatch } from "react-redux";

function ReserveBookModal(props) {
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const history = useHistory();

  const message = null;

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.reservation_errors
      ? setErrors(props.UI.reservation_errors)
      : setErrors({});
  }, [props.UI.reservation_errors]);

  //Destructure props
  const {
    data: { book, loading, dates },
    user: { subscription },
  } = props;
  //Calculate initial total
  const newProps = { ...props };

  const addToCartHandler = () => {
    dispatch(addToBookCart(book.ISBN));
    // props = props.onHide;

    // history.push(`/cart`);
  };

  return (
    !loading && (
      <Modal
        {...newProps}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="rent-vehicle-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.isVerified === false
              ? "You are not verified!"
              : props.isVerified === true && book
              ? `${book.title} `
              : "Not logged in"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            Name="alert alert-danger not-verified"
            role="alert"
            hidden={props.isVerified === true}
          >
            {props.isVerified === false
              ? "Please wait while an administrator verifies your account. Please upload verification images if you haven't already"
              : !props.isVerified && "Please login to Lend A Book!"}
            {/* should take subscription when signUp */}
          </div>

          {/* If user is verified and data is loaded */}
          {props.isVerified === true && book && (
            <div className="rent-vehicle-body">
              <img
                className="vehicle-image"
                style={{ marginLeft: "250px", padding: "10px" }}
                src={book.bookCover}
                alt="vehicle"
              />
              <Table striped bordered hover>
                <tbody className="rent-vehicle-table">
                  <tr>{`${book.summary}`}</tr>
                  <tr>
                    <td>Charge per day</td>
                    <td>{`${subscription.bookCharge}`}LKR</td>
                  </tr>
                  <tr>
                    <td>Reserve period</td>
                    <td>{`${dates.reserveDate} to  ${dates.returnDate}`}</td>
                  </tr>
                </tbody>
              </Table>
              <p
                className="error-text"
                style={{ textAlign: "center" }}
                hidden={!errors}
              >
                {errors.error}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
          {props.isVerified === true && book && (
            <Button
              variant="warning"
              onClick={() => {
                addToCartHandler();
                props.onHide();
              }}
            >
              Add to Cart
            </Button>
          )}
          {props.isVerified === false ? (
            <Button variant="info" href="/uploadImage">
              Upload Image
            </Button>
          ) : (
            !props.isVerified && (
              <Button variant="info" href="/user/login">
                Login
              </Button>
            )
          )}
        </Modal.Footer>
      </Modal>
    )
  );
}

ReserveBookModal.propTypes = {
  book: PropTypes.object,
  subscription: PropTypes.object,
  dates: PropTypes.object,
  user: PropTypes.object,
  UI: PropTypes.object.isRequired,
  addToBookCart: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  //add to cart
  addToBookCart,
};

const mapStateToProps = (state) => ({
  data: state.data,
  dates: state.data.dates,
  subscription: state.user.subscription,
  user: state.user,
  UI: state.UI,
  addToBookCart: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapActionsToProps)(ReserveBookModal);
