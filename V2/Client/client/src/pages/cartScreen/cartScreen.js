import React from "react";
import { Alert, Button, Col, Container, Row } from "react-bootstrap";

import "./cartScreen.scss";

import Navbar from "../../components/navbar/navbar";
import CartItem from "../../components/bookCart/cartItem";

import {
  addToBookCart,
  removeFromBookCart,
} from "../../redux/actions/cartActions";

import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function CartScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const subscription = useSelector((state) => state.user.subscription);
  const { cartItems } = cart;

  const books = [cartItems];

  const handleCheckOut = () => {};

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

  const getCartSubTotal = () => {
    return cartItems
      .reduce((price, item) => price + item.price * item.qty, 0)
      .toFixed(2);
  };

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

        {/*start of  cart */}
        <Row>
          <Col md={10}>
            {" "}
            <h2>Book Cart</h2>
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
                  key={item.product}
                  item={item}
                  removeHandler={removeFromCartHandler}
                />
              ))
            )}
          </div>

          <div className="cartscreen__right">
            <div className="cartscreen__info">
              <p>Subtotal ({getCartCount()}) Books</p>
              <p>Lend Charge: {getTotal()} LKR</p>
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

CartScreen.proTypes = {};

export default CartScreen;
