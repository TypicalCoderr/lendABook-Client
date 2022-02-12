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

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CartScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const subscription = useSelector((state) => state.user.subscription);
  const dates = useSelector((state) => state.data.dates);
  const user = useSelector((state) => state.user);
  const { cartItems } = cart;

  const [nofiy, setNotify] = useState("");
  const [errors, setErrors] = useState("");
  const [subBooks, setSubBooks] = useState(0);
  const [cartLength, setCartLength] = useState(0);

  const books = { cartItems };

  const removeFromCartHandler = (ISBN) => {
    dispatch(removeFromBookCart(ISBN));
    cartItemRemoveToster();
    setCartLength(cartLength - 1);
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

  useEffect(() => {
    props.UI.errors && setErrors(props.UI.errors.message);
  }, [props.UI.errors]);

  useEffect(() => {
    setSubBooks(subscription.noOfBooks);
    setCartLength(cartItems.length);
  }, []);

  // const getCartSubTotal = () => {
  //   return cartItems
  //     .reduce((price, item) => price + item.price * item.qty, 0)
  //     .toFixed(2);
  // };

  const handleCheckOut = async (event) => {
    if (cartLength === 0) {
      emptyCartToaster();
    }
    event.preventDefault();
    const data = {
      reserve: dates.reserveDate,
      returnDate: dates.returnDate,
      charge: getTotal(),
      userId: user.id,
      books: books,
      cartLength: cartLength,
      subBooks: subBooks,
    };
    console.log(data);

    // {
    //   cartItems.length <= subscription.noOfBooks
    //     ?
    //     : setShowB(true);
    // }
    console.log(cartLength);
    let result = await props.makeReservation(data, props.history);

    if (result == true) {
      successToaster();
    } else {
      errorToaster();
    }
  };

  const successToaster = () => {
    toast.success("reservation succeeded!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const errorToaster = () => {
    // console.log(errors);
    toast.error(
      " Sorry! You can not reserve more than " + subBooks + " Books at a time",
      {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        draggable: false,
      }
    );
  };

  const emptyCartToaster = () => {
    toast.warn("Book cart is empty", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const cartItemRemoveToster = () => {
    toast.success("Book was removed from the cart!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  // const [show, setShow] = useState(false);

  const [showA, setShowA] = useState(true);
  const [showB, setShowB] = useState(false);

  // const toggleShowA = () => setShowA(!showA, setNotify(""));
  const toggleShowB = () => setShowB(!showB);

  return (
    <div className="top_image">
      <Navbar />
      <ToastContainer style={{ width: "30rem" }} />
      <Container>
        {/* {!nofiy ? successToaster() : ""} */}
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
          books or videos.
        </Alert>
        <h2 className="title">Reservation Cart!</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
        <Alert variant="light" className="user-card" align="end"></Alert>

        {/* {
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
        } */}

      

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
