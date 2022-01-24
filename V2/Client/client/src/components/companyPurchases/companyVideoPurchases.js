import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  CardColumns,
  Row,
  FormControl,
  Dropdown,
  Badge,
  Image,
  Container,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";
import "../manageBooks/manageBooks.scss";

import VideosPurchaseModal from "./VideosPurchaseModal";

//redux
import { connect } from "react-redux";
import { getCompanyPurchasedMovies } from "../../redux/actions/dataActions";

function CompanyVideoPurchases(props) {
  const [_movies, setMovies] = useState([]);
  const [selectMovie, setSelectMovie] = useState(null);
  const [moviePool, setMoviePool] = useState([]);
  const [category, setCategory] = useState([]);
  const [movieModalShow, setMovieModalShow] = React.useState(false);

  const {
    data: { moviePurchases, loading },
  } = props;

  useEffect(() => {
    props.getCompanyPurchasedMovies();
  }, []);

  useEffect(() => {
    if (moviePurchases) {
      setMovies(moviePurchases);
      setMoviePool(moviePurchases);
    }
  }, [moviePurchases]);

  const handleMovieClick = (movieId, movie) => {
    if (_movies.some((movie) => movie.movieId == movieId)) {
      setSelectMovie(movie);
      setMovieModalShow(true);
    }
  };

  let moviesMarkup = _movies.map((movie) => (
    <Card
      className="book-card"
      key={movie.movieId}
      onClick={() => handleMovieClick(movie.movieId, movie)}
    >
      <Image
        variant="top"
        src="http://localhost:3001/books/default_movie.png"
        className="book-card-image"
        style={{ marginLeft: "5rem" }}
      />
      {/* <img src="http://localhost:3001/books/default_book.png" /> */}
      <Badge
        pill
        className="book-card-badge"
        style={{ marginLeft: "4rem" }}
        variant={movie.isNewMovie ? "success" : "warning"}
      >
        {movie.isNewMovie ? "New" : "Copies"}
      </Badge>
      <Card.Body>
        <Badge variant="secondary">Title</Badge>
        <span>
          {"	"}
          {movie.title.substring(0, 35)}
        </span>
        <br />
        <Badge variant="secondary">Author</Badge>
        <span>
          {"	"}
          {movie.director.substring(0, 35)}
        </span>
      </Card.Body>
    </Card>
  ));

  //Divide cards into arrays of given size
  const chunk = (arr, size) => {
    let clone = [...arr];
    let result = [];
    while (clone.length) {
      result.push(clone.splice(0, size));
    }
    return result;
  };

  let chunkedMoviesMarkup = chunk(moviesMarkup, 3);

  const setAllMovies = () => {
    setCategory(0);
    const moviesCopy = moviePurchases.map((moviesPurchase) => moviesPurchase);
    setMoviePool(moviesCopy);
    setMovies(moviesCopy);
  };

  const setNewMovies = () => {
    setCategory(1);
    const moviesCopy = moviePurchases.map((moviesPurchase) => moviesPurchase);
    const result = moviesCopy.filter((item) => {
      return item.isNewMovie;
    });
    setMoviePool(result);
    setMovies(result);
  };

  const setNewCopies = () => {
    setCategory(2);
    const moviesCopy = moviePurchases.map((moviesPurchase) => moviesPurchase);
    const result = moviesCopy.filter((item) => {
      return !item.isNewMovie;
    });
    setMoviePool(result);
    setMovies(result);
  };

  //Function to search through movies
  const search = (input) => {
    //Get a copy of state
    const movieCopy = moviePool.map((movie) => movie);

    //Array of search string after splitting by spaces
    const inputs = input.toLowerCase().split(" ");

    //title and director will be searched through
    const searchKeys = ["title", "director"];
    let moviesArray = [];

    //If search criteria is null reset books to display all books
    if (inputs.length === 1 && inputs[0] === "") {
      moviesArray = movieCopy;
    }
    //If search criteria is entered
    else {
      //Filter through movie list to find matches
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

    //Remove duplicates and set state to be dispayed
    const result = [...new Set(moviesArray)];
    setMovies(result);
  };

  return (
    <div>
      <Card style={{ width: "87rem", height: "10rem" }}>
        <Card.Body>
          <Card.Title className="search-card-title">
            Search Purchase Books
          </Card.Title>
          <Row>
            <Col>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <i className="fas fa-search"></i>
                  </InputGroup.Text>
                </InputGroup.Prepend>

                <FormControl
                  placeholder="Search for a user"
                  aria-label="Search for a user"
                  aria-describedby="basic-addon1"
                  onChange={(e) => search(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={7}>
              <Button
                className="search-user-button"
                variant="outline-primary"
                active={category === 0}
                onClick={setAllMovies}
              >
                All Movies
              </Button>{" "}
              <Button
                className="search-user-button"
                variant="outline-success"
                active={category === 1}
                onClick={setNewMovies}
              >
                New Movies
              </Button>{" "}
              <Button
                className="search-user-button"
                variant="outline-warning"
                active={category === 2}
                onClick={setNewCopies}
              >
                New Copies
              </Button>{" "}
            </Col>
          </Row>
        </Card.Body>
      </Card>
      {!loading && moviesMarkup.length > 0 ? (
        chunkedMoviesMarkup.map((chunk, index) => (
          <CardColumns key={index} style={{ width: "87rem" }}>
            {" "}
            {chunk}{" "}
          </CardColumns>
        ))
      ) : moviesMarkup.length === 0 && !loading ? (
        <Alert variant="warning">No movies to show!</Alert>
      ) : (
        <p>Loading...</p>
      )}

      <VideosPurchaseModal
        book={props}
        show={movieModalShow}
        onMovieClick={selectMovie}
        onHide={() => setMovieModalShow(false)}
      />
    </div>
  );
}

CompanyVideoPurchases.propTypes = {
  getCompanyPurchasedMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getCompanyPurchasedMovies,
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(CompanyVideoPurchases);
