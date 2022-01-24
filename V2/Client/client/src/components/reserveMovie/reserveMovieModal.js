import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Table, Badge, Alert, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import "./reserveMovieModal.scss";

import { addToMovieCart } from "../../redux/actions/cartActions";

import { connect, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ReserveMovieModal(props) {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.reservation_errors
      ? setErrors(props.UI.reservation_errors)
      : setErrors({});
  }, [props.UI.reservation_errors]);

  //Destructure props
  const {
    data: { movie, loading, dates },
    user: { subscription },
  } = props;
  //Calculate initial total
  const newProps = { ...props };

  const successToaster = () => {
    toast.success("Movie was added to the cart!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const addToCartHandler = () => {
    dispatch(addToMovieCart(movie.movieId));
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
              : props.isVerified === true && movie
              ? `${movie.title} `
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
              : !props.isVerified && "Please login to Lend Movies!"}
            {/* should take subscription when signUp */}
          </div>

          {/* If user is verified and data is loaded */}
          {props.isVerified === true && movie && (
            <div className="rent-vehicle-body">
              <Row>
                <Col xm={6}>
                  <img
                    className="book-cover-image"
                    style={{ marginLeft: "30px" }}
                    src={movie.movieCover}
                    alt="vehicle"
                  />
                  <div
                    className="d-grid gap-2"
                    style={{
                      marginTop: "1rem",
                      paddingLeft: "2rem",
                      paddingRight: "2rem",
                    }}
                  >
                    {props.isVerified === true && movie && (
                      <Button
                        variant="warning"
                        onClick={() => {
                          addToCartHandler();
                          props.onHide();
                          successToaster();
                        }}
                      >
                        Add to Cart
                      </Button>
                    )}
                  </div>
                </Col>
                <Col xm={6}>
                  <div className="lable-row">{`${movie.summary}`}</div>

                  <div className="lable-row">
                    Directered by{" "}
                    <b style={{ fontWeight: "bold" }}>{movie.director}</b>
                  </div>
                  <div className="lable-row">
                    Production by{" "}
                    <b style={{ fontWeight: "bold" }}>{movie.production}</b>
                  </div>
                  <div className="lable-row">
                    Lending Charge{" "}
                    <b style={{ fontWeight: "bold", color: "red" }}>
                      {subscription.video_charge}LKR
                    </b>
                  </div>
                  <div
                    style={{
                      fontStyle: "italic",
                      color: "grey",
                      fontSize: "13px",
                    }}
                  >
                    {" "}
                    late return will add {subscription.overdue}LKR of Overdue
                    charge per day
                  </div>
                  <div className="lable-row">
                    Reserve period{" "}
                    <b
                      style={{ fontWeight: "bold" }}
                    >{`${dates.reserveDate} to  ${dates.returnDate}`}</b>
                  </div>
                  <div className="lable-row">
                    Categories :
                    <span className="badge bg-dark">
                      {" "}
                      {movie.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="lable-row"></div>
                </Col>
              </Row>

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

          {props.isVerified === false ? (
            <Button variant="info" href="/uploadImages">
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

ReserveMovieModal.propTypes = {
  movie: PropTypes.object,
  subscription: PropTypes.object,
  dates: PropTypes.object,
  user: PropTypes.object,
  UI: PropTypes.object.isRequired,
  addToMovieCart: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  //add to cart
  addToMovieCart,
};

const mapStateToProps = (state) => ({
  data: state.data,
  dates: state.data.dates,
  subscription: state.user.subscription,
  user: state.user,
  UI: state.UI,
  addToMovieCart: PropTypes.func.isRequired,
});

export default connect(mapStateToProps, mapActionsToProps)(ReserveMovieModal);
