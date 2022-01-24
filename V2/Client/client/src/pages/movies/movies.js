import React, { useEffect, useState } from "react";
import {
  Container,
  CardColumns,
  InputGroup,
  FormControl,
  Row,
  Col,
  Dropdown,
  Button,
  Alert,
} from "react-bootstrap";

import MovieDates from "../../components/movie_dates/movie_dates";
import Navbar from "../../components/navbar/navbar";
import Movie from "../../components/movie/movie";
import ReserveMovieModal from "../../components/reserveMovie/reserveMovieModal";
import Footer from "../../components/footer/footer";

import "./movies.scss";

import { connect, useSelector } from "react-redux";
import { getMovie } from "../../redux/actions/dataActions";

import { MOVIE_CATRGORIES } from "../../util/consts";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Movies(props) {
  const [_movies, setMovies] = useState([]);
  const [moviePool, setMoviePool] = useState([]);
  const [category, setCategory] = useState("Category");
  const [movieModalShow, setMovieModalShow] = React.useState(false);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    return cartItems.length;
  };

  const {
    data: { movies, loading },
  } = props;

  useEffect(() => {
    if (movies) {
      setMovies(movies);
      setMoviePool(movies);
    }
  }, [movies]);

  const handleMovieClick = (movieId) => {
    if (!props.isBlacklisted) {
      setMovieModalShow(true);
    }
    if (props.isVerified && !props.isBlacklisted) {
      props.getMovie(movieId);
    }
  };

  const chunk = (arr, size) => {
    let clone = [...arr];
    let result = [];
    while (clone.length) {
      result.push(clone.splice(0, size));
    }
    return result;
  };

  let moviesMarkup =
    _movies.length > 0 &&
    _movies.map((movie) => (
      <div key={movie.movieId} onClick={() => handleMovieClick(movie.movieId)}>
        <Movie movie={movie}></Movie>
      </div>
    ));

  let chunkedmoviesMarkup =
    moviesMarkup.length > 0 ? chunk(moviesMarkup, 3) : "";

  const search = (input) => {
    if (movies.length > 0) {
      const movieCopy = moviePool.map((movie) => movie);
      const inputs = input.toLowerCase().split(" ");
      const searchKeys = ["title", "director", "summary"];
      let moviesArray = [];
      if (inputs.length === 1 && inputs[0] === "") {
        moviesArray = movieCopy;
      } else {
        inputs.forEach((word) => {
          movieCopy.filter((item) => {
            // eslint-disable-next-line array-callback-return
            return Object.keys(item).some((key) => {
              if (searchKeys.includes(key)) {
                if (word.length > 0 && item[key].toLowerCase().includes(word))
                  if (item) moviesArray.push(item);
              }
            });
          });
        });
      }
      const result = [...new Set(moviesArray)];
      setMovies(result);
    }
  };

  const setValue = (type, name, value) => {
    if (movies.length > 0) {
      handleReset();

      if (type === "category") setCategory(name);

      const moviesCopy = movies.map((movie) => movie);
      const result = moviesCopy.filter((item) => {
        return item[type] === value;
      });

      setMovies(result);
      setMoviePool(result);
    }
  };

  const handleReset = () => {
    //Reset dropdown text
    setCategory("Category");

    //Reset state
    setMovies(movies);
    setMoviePool(movies);
  };

  const categoryDropdownMarkup = MOVIE_CATRGORIES.map((category) => (
    <Dropdown.Item
      onSelect={() => setValue("category", category.name, category.id)}
    >
      {category.name}
    </Dropdown.Item>
  ));

  return (
    <div className="top_image-books">
      <Navbar />
      <ToastContainer/>
      <Container style={{ textAlign: "center" }}>
        {/* Alert message to be shown if user has not yet uploaded ID images */}
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={
            !props.authenticated ||
            props.role === "admin" ||
            props.userImageURL ||
            props.isVerified
          }
        >
          {`Hello ${props.firstName}! `}
          You are <b>not verified</b>.{" "}
          <a href="/uploadImages">
            Click here to <b>upload verification images</b>
          </a>
        </Alert>
        <Alert
          variant="danger"
          className="not-verified-message"
          hidden={!props.isBlacklisted}
        >
          You have been <b>blacklisted</b>. You will not be able to reserve
          books.
        </Alert>

        <h2 className="title">Reserve Videos</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>

        <MovieDates history={props.history} />

        <Row className="book-search">
          <Col md={4} style={{ paddingRight: 0, marginRight: -60 }}>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                placeholder="Search video"
                aria-label="Search video"
                aria-describedby="basic-addon2"
                onChange={(e) => search(e.target.value)}
              />
            </InputGroup>
          </Col>

          <Col md={4}>
            <Dropdown>
              <Dropdown.Toggle
                variant="outline-secondary"
                id="dropdown-basic"
                style={{ width: "55%" }}
              >
                {category}
              </Dropdown.Toggle>
              <Dropdown.Menu>{categoryDropdownMarkup}</Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col md={2} style={{ marginLeft: -120, marginRight: 160 }}>
            <Button
              onClick={handleReset}
              variant="outline-danger"
              style={{ width: "70%" }}
            >
              <span>
                <i className="fas fa-times reset-icon"></i>{" "}
              </span>
              Reset
            </Button>
          </Col>
          <Col md={2}>
            <Link
              variant="outline-primary"
              style={{ width: "100%" }}
              to="/cart-movies"
            >
              <Button renderAs="button" variant="outline-primary">
                <span>
                  <i className="fas fa-cart-plus" aria-hidden="true">
                    {" "}
                  </i>{" "}
                </span>
                Video Cart
                <div className="item_count">{getCartCount()}</div>
              </Button>
            </Link>
          </Col>
        </Row>
        {!loading &&
          (_movies.length === 0 || Object.keys(_movies).length === 0) && (
            <Alert
              variant="warning"
              className="no-vehicle-alert"
              style={{ marginBottom: "10rem" }}
            >
              No videos found! Try changing the reservation dates.
            </Alert>
          )}
        {!loading &&
          _movies.length > 0 &&
          chunkedmoviesMarkup.map((chunk) => (
            <CardColumns style={{ marginTop: 20 }}>{chunk}</CardColumns>
          ))}
      </Container>

      <ReserveMovieModal
        history={props.history}
        isVerified={props.isVerified}
        show={movieModalShow}
        onHide={() => setMovieModalShow(false)}
      />
      <Footer />
    </div>
  );
}

Movies.propTypes = {
  getMovie: PropTypes.func.isRequired,
  user: PropTypes.object,
  subscription: PropTypes.object,
};

const mapStateToProps = (state) => ({
  data: state.data,
  firstName: state.user.firstName,
  isVerified: state.user.isVerified,
  isBlacklisted: state.user.isBlacklisted,
  userImageURL: state.user.userImageURL,
  authenticated: state.user.authenticated,
  role: state.user.role,
  getMovie: PropTypes.func.isRequired,
  movies: state.data.movies,
  subscription: state.user.subscription,
});

const mapActionsToProps = {
  getMovie,
};

export default connect(mapStateToProps, mapActionsToProps)(Movies);
