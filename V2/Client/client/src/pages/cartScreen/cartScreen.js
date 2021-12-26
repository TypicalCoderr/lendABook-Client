import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Container, Row, Toast } from "react-bootstrap";

import "./cartScreen.scss";

import Navbar from "../../components/navbar/navbar";
import CartItem from "../../components/bookCart/cartItem";

import { removeFromBookCart } from "../../redux/actions/cartActions";
import { makeReservation } from "../../redux/actions/dataActions";

import PropTypes from "prop-types";

import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const subscription = useSelector((state) => state.user.subscription);
  const dates = useSelector((state) => state.data.dates);
  const user = useSelector((state) => state.user);
  const { cartItems } = cart;

  const [nofiy, setNotify] = useState("");

  const books = { cartItems };

  const removeFromCartHandler = (ISBN) => {
    dispatch(removeFromBookCart(ISBN));
  };

  const getTotal = () => {
    const price = subscription.bookCharge * cartItems.length;
    return price;
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  useEffect(() => {
    props.UI.success && setNotify(props.UI.success.message);
  }, [props.UI.success]);

  // const getCartSubTotal = () => {
  //   return cartItems
  //     .reduce((price, item) => price + item.price * item.qty, 0)
  //     .toFixed(2);
  // };

  const handleCheckOut = async (event) => {
    event.preventDefault();
    const data = {
      reserve: dates.reserveDate,
      returnDate: dates.returnDate,
      charge: getTotal(),
      userId: user.id,
      books: books,
    };
    console.log(data);
    //Make the rent
    let result = await props.makeReservation(data, props.history);
  };

  // const [show, setShow] = useState(false);

  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA, setNotify(""));

  return (
    <div className="top_image">
      <Navbar />
      <Container>
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={
            !props.authenticated ||
            props.role === "admin" ||
            (props.userImageURL && props.isVerified) ||
            props.isVerified
          }
        >
          {" "}
          {`Hello ${props.firstName}! `}
          You are <b>not verified</b>.{" "}
          <a href="/uploadImage">
            Click here to <b>upload verification image</b>
          </a>
        </Alert>
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={!props.isBlacklisted}
        >
          You have been <b>blacklisted</b>. You will not be able to rent any
          vehicles.
        </Alert>
        <h2 className="title">Reserve Now!</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
        <Alert variant="light" className="user-card" align="end"></Alert>

        {
          <Alert
            variant="success"
            align="center"
            show={showA}
            onClose={toggleShowA}
            hidden={!nofiy}
            dismissible
          >
            <Alert.Heading> {!nofiy ? "nofiy" : nofiy}</Alert.Heading>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
              eget lacinia odio sem nec elit. Cras mattis consectetur purus sit
              amet fermentum.
            </p>
          </Alert>
        }

        {/* <Toast show={showA} onClose={toggleShowA}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Bootstrap</strong>
          </Toast.Header>
          <Toast.Body>{!nofiy ? "nofiy" : nofiy}</Toast.Body>
        </Toast> */}
        {/*start of  cart */}
        <Row>
          <Col md={10}>
            {" "}
            <h4>Book Cart</h4>
          </Col>
          <Col md={2}>
            <Link to="/lend-books">
              <Button renderAs="button" variant="outline-primary">
                <span>
                  <i class="fas fa-store"></i>{" "}
                </span>
                Back to Store
              </Button>
            </Link>
          </Col>
        </Row>
        <div className="cartscreen">
          <div className="cartscreen__left">
            {cartItems.length === 0 ? (
              <div>Your Cart Is Empty</div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.book}
                  item={item}
                  removeHandler={removeFromCartHandler}
                />
              ))
            )}
          </div>

          <div className="cartscreen__right">
            <div className="cartscreen__info">
              <p>Subtotal {getCartCount()} Books</p>
              <p>Lend Charge: {getTotal() ? getTotal() : 0} LKR</p>
            </div>
            <div>
              <Button variant="dark" onClick={handleCheckOut}>
                Proceed To Checkout
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

// CartScreen.proTypes = {};

CartScreen.propTypes = {
  makeReservation: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ UI: state.UI });

const mapActionsToProps = {
  makeReservation,
};

export default connect(mapStateToProps, mapActionsToProps)(CartScreen);
