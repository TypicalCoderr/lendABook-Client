import React, { useState, useEffect } from "react";
import {
  InputGroup,
  Card,
  Button,
  Col,
  Row,
  FormControl,
  Dropdown,
  Container,
  Alert,
} from "react-bootstrap";
import PropTypes from "prop-types";

import "./manageMovies.scss";

import MovieCard from "./movieCard";
import AddMovieModal from "./addMovieModal";

//redux
import { connect } from "react-redux";
import { getAllMovies } from "../../redux/actions/dataActions";

import { MOVIE_CATRGORIES } from "../../util/consts";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ManageMovies(props) {
  const [_movies, setMovies] = useState([]);
  const [moviePool, setMoviePool] = useState([]);
  const [addMovieShow, setAddMovieShow] = useState(false);
  const [category, setCategory] = useState("Category");
  const [available, setAvailability] = useState("Availability");

  const {
    data: { movies, loading },
  } = props;

  //When component is initiated, get all movies from the backend
  useEffect(() => {
    props.getAllMovies();
  }, []);

  //When movies list passed from props are updated, update state variables
  useEffect(() => {
    if (movies) {
      setMovies(movies);
      setMoviePool(movies);
    }
  }, [movies]);

  //Function to create listof movie cards from movie list in state
  let moviesMarkup = _movies.map((movie) => (
    <MovieCard key={movie.movieId} movie={movie} />
  ));

  //Function to change displayed movies when category is set
  const setValue = (type, name, value) => {
    handleReset();

    //Depending on category update state
    if (type === "category") setCategory(name);
    else if (type === "isAvailable") setAvailability(name);

    //Filter book list
    const moviesCopy = movies.map((movie) => movie);
    const result = moviesCopy.filter((item) => {
      return item[type] === value;
    });

    //Set as state to re-render movie cards
    setMovies(result);
    setMoviePool(result);
  };

  //Function to search through movies
  const search = (input) => {
    //Get a copy of state
    const moviesCopy = moviePool.map((movie) => movie);

    //Array of search string after splitting by spaces
    const inputs = input.toLowerCase().split(" ");

    //Movie movieId, title and director will be searched through
    const searchKeys = ["title", "director"];
    let moviesArray = [];

    //If search criteria is null reset books to display all books
    if (inputs.length === 1 && inputs[0] === "") {
      moviesArray = moviesCopy;
    }
    //If search criteria is entered
    else {
      //Filter through movie list to find matches
      inputs.forEach((word) => {
        moviesCopy.filter((item) => {
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

  // Dropdown select for category
  const categoryDropdownMarkup = MOVIE_CATRGORIES.map((category, index) => (
    <Dropdown.Item
      key={index}
      onSelect={() => setValue("category", category.name, category.id)}
    >
      {category.name}
    </Dropdown.Item>
  ));

  const handleReset = () => {
    //Reset dropdown text

    setAvailability("Availability");
    setCategory("Category");

    //Reset state
    setMovies(movies);
    setMoviePool(movies);
  };

  return (
    <div>
      <ToastContainer style={{ width: "30rem" }} />
      <Card
        className="search-box-users"
        style={{ width: "70rem", height: "8rem" }}
      >
        <Card.Body>
          <Card.Title className="search-box-books">Search Movies</Card.Title>
          <Row>
            <Col xs={5}>
              <InputGroup>
                <InputGroup.Text>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
                <FormControl
                  placeholder="Search for movies"
                  aria-label="Search for movies"
                  aria-describedby="basic-addon2"
                  onChange={(e) => search(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={7}>
              <Row>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="outline-secondary"
                      id="dropdown-basic"
                      style={{ width: "100%" }}
                    >
                      {category}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>{categoryDropdownMarkup}</Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="danger"
                      id="dropdown-basic"
                      style={{ width: "100%" }}
                    >
                      {available}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("isAvailable", "Available", true)
                        }
                      >
                        Available
                      </Dropdown.Item>
                      <Dropdown.Item
                        onSelect={() =>
                          setValue("isAvailable", "Reserved", false)
                        }
                      >
                        Unavailable
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
                <Col xs={5}>
                  <Button
                    variant="outline-secondary"
                    style={{ width: "50%" }}
                    onClick={handleReset}
                  >
                    <span>
                      <i className="fas fa-times reset-icon"></i>
                    </span>
                    Reset
                  </Button>
                </Col>
              </Row>
              <Row></Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Row>
        <Col lg={4}>
          <Card className="book-card">
            <Card.Img
              variant="top"
              src="http://localhost:3001/books/default_movie.png"
            />
            <Card.Body>
              <Button
                variant="info"
                className="vehicle-card-button"
                onClick={() => setAddMovieShow(true)}
              >
                <span>
                  <i className="fas fa-plus-square fa-plus-square-add"></i>
                  Add Movie
                </span>
              </Button>
            </Card.Body>
          </Card>
        </Col>
        {!loading && moviesMarkup.length > 0 ? (
          moviesMarkup.map((card, index) => (
            <Col lg={4} md={4} sm={4} key={index}>
              {" "}
              {card}{" "}
            </Col>
          ))
        ) : moviesMarkup.length === 0 && !loading ? (
          <Alert variant="warning">No Movies to show!</Alert>
        ) : (
          <p>Loading...</p>
        )}
      </Row>
      <AddMovieModal
        show={addMovieShow}
        onHide={() => setAddMovieShow(false)}
      />
    </div>
  );
}

ManageMovies.propTypes = {
  getAllMovies: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

const mapActionsToProps = {
  getAllMovies,
};

export default connect(mapStateToProps, mapActionsToProps)(ManageMovies);
