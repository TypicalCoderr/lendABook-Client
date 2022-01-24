import React, { useState, useEffect } from "react";
import { Alert, Button, Col, Container, Row, Toast } from "react-bootstrap";

import "./cartScreen.scss";

import Navbar from "../../components/navbar/navbar";
import MovieCartItem from "../../components/movieCart/movieCartItem";

import { removeFromMovieCart } from "../../redux/actions/cartActions";
import { makeMovieReservation } from "../../redux/actions/dataActions";

import PropTypes from "prop-types";

import { connect, useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MovieCartScreen(props) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const subscription = useSelector((state) => state.user.subscription);
  const dates = useSelector((state) => state.data.dates);
  const user = useSelector((state) => state.user);
  const { cartItems } = cart;

  const [nofiy, setNotify] = useState("");
  const [subMovies, setSubMovies] = useState(0);
  const [cartLength, setCartLength] = useState(0);

  const movies = { cartItems };

  const removeFromCartHandler = (movieId) => {
    dispatch(removeFromMovieCart(movieId));
    cartItemRemoveToster();
    setCartLength(cartLength - 1);
  };

  const getTotal = () => {
    const price = subscription.video_charge * cartItems.length;
    return price;
  };

  const getCartCount = () => {
    return cartItems.length;
  };

  useEffect(() => {
    props.UI.success && setNotify(props.UI.success.message);
  }, [props.UI.success]);

  useEffect(() => {
    setSubMovies(subscription.noOfVideos);
    setCartLength(cartItems.length);
  }, []);

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
      movies: movies,
      cartLength: cartLength,
      subVideos: subMovies,
    };
    console.log(data);
    //Make the rent
    let result = await props.makeMovieReservation(data, props.history);

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
    toast.error(
      " Sorry! You can not reserve more than " +
        subMovies +
        " Movies at a time",
      {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 4000,
        draggable: false,
      }
    );
  };

  const emptyCartToaster = () => {
    toast.warn("Movie cart is empty", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const cartItemRemoveToster = () => {
    toast.success("Movie was removed from the cart!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 4000,
      draggable: false,
    });
  };

  const [showA, setShowA] = useState(true);

  const toggleShowA = () => setShowA(!showA, setNotify(""));

  return (
    <div className="top_image">
      <Navbar />
      <ToastContainer style={{ width: "30rem" }} />
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
          books or videos.
        </Alert>
        <h2 className="title">Reservation cart!</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
        <Alert variant="light" className="user-card" align="end"></Alert>

      

       
        {/*start of  cart */}
        <Row>
          <Col md={10}>
            {" "}
            <h4>Movie Cart</h4>
          </Col>
          <Col md={2}>
            <Link to="/lend-videos">
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
                <MovieCartItem
                  key={item.movie}
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

MovieCartScreen.propTypes = {
  makeMovieReservation: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ UI: state.UI });

const mapActionsToProps = {
  makeMovieReservation,
};

export default connect(mapStateToProps, mapActionsToProps)(MovieCartScreen);
