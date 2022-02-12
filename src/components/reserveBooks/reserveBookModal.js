import React, { useState, useEffect, Fragment } from "react";
import { Modal, Button, Table, Badge, Alert, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import "./reserveBookModal.scss";

import { addToBookCart } from "../../redux/actions/cartActions";

import { addBooksToFavorites } from "../../redux/actions/dataActions";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { connect, useDispatch } from "react-redux";

function ReserveBookModal(props) {
  const [total, setTotal] = useState(0);
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const message = null;

  useEffect(() => {
    if (id) {
      setUserId(id);
    }
  }, []);

  //When errors are updated the component is re-rendered to display errors
  useEffect(() => {
    props.UI.reservation_errors
      ? setErrors(props.UI.reservation_errors)
      : setErrors({});
  }, [props.UI.reservation_errors]);

  //Destructure props
  const {
    data: { book, loading, dates },
    user: { subscription, id },
  } = props;
  //Calculate initial total
  const newProps = { ...props };

  const successToaster = () => {
    toast.success("Book was added to the cart!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const addToCartHandler = () => {
    dispatch(addToBookCart(book.ISBN));
    // props = props.onHide;

    // history.push(`/cart`);
  };

  const handleFavorite = async () => {
    // event.preventDefault();
    console.log(id);
    const data = {
      userId: id,
      ISBN: book.ISBN,
    };

    let result = await props.addBooksToFavorites(data);

    if (result == true) {
      props.onHide();
      favAddedToaster();
    } else {
      props.onHide();
      favExistsToaster();
    }
  };

  const favAddedToaster = () => {
    toast.success("book was added to favorites!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const favExistsToaster = () => {
    // console.log(errors);
    toast.warn(" Book is already in Favorites", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
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
              <Row>
                <Col xm={6}>
                  <img
                    className="book-cover-image"
                    style={{ marginLeft: "30px" }}
                    src={book.bookCover}
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
                    {props.isVerified === true && book && (
                      <Button
                        variant="warning"
                        size="lg"
                        onClick={() => {
                          addToCartHandler();
                          props.onHide();
                          successToaster();
                        }}
                      >
                        Add to Cart
                      </Button>
                    )}
                    {props.isVerified === true && book && (
                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          handleFavorite();
                        }}
                      >
                        <i class="far fa-star"></i> Add to Favorites
                      </Button>
                    )}
                  </div>
                </Col>
                <Col xm={6}>
                  <div className="lable-row">{`${book.summary}`}</div>

                  <div className="lable-row">
                    Written by{" "}
                    <b style={{ fontWeight: "bold" }}>{book.author}</b>
                  </div>
                  <div className="lable-row">
                    Published by{" "}
                    <b style={{ fontWeight: "bold" }}>{book.publisher}</b>
                  </div>
                  <div className="lable-row">
                    Lending Charge{" "}
                    <b
                      style={{
                        fontWeight: "bold",
                        color: "red",
                      }}
                    >
                      {subscription.bookCharge}LKR
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
                      {book.category.toUpperCase()}
                    </span>
                  </div>
                  <div className="lable-row"></div>
                  {/* <Table striped bordered hover>
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
                  </Table> */}
                </Col>
              </Row>
              {/* <hr />
              <Row style={{ marginTop: "1rem", marginLeft: "1rem" }}>
                <h5>Reveiws : {book.title}</h5>
              </Row> */}

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
  user: PropTypes.object,
  addBooksToFavorites: PropTypes.func.isRequired,
};

const mapActionsToProps = {
  //add to cart
  addToBookCart,
  addBooksToFavorites,
};

const mapStateToProps = (state) => ({
  data: state.data,
  dates: state.data.dates,
  subscription: state.user.subscription,
  user: state.user,
  UI: state.UI,
  addToBookCart: PropTypes.func.isRequired,
  user: state.user,
  id: state.user.id,
});

export default connect(mapStateToProps, mapActionsToProps)(ReserveBookModal);
