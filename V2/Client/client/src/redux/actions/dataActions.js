import axios from "axios";
import dayjs from "dayjs";

import {
  SET_USERS,
  LOADING_DATA,
  SET_SELECTED_USER,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_BOOK,
  SET_DATES,
  SET_BOOKS,
  SET_MOVIE,
  SET_MOVIES,
  SET_ERRORS,
  SET_RESERVATION,
  CLEAR_ERRORS,
  CLEAR_CART,
  SET_RESERVATIONS,
} from "../types";

/* Add a book */
export const addBook = (book) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/books/add-book", book);
    await dispatch(getAllBooks());
    dispatch({ type: CLEAR_ERRORS });

    //Prevent modal from closing after errors are displayed
    if (results.data.ISBN) return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

/* Get all books */
export const getAllBooks = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/books");
    console.log(results);
    dispatch({
      type: SET_BOOKS,
      payload: results.data.books,
    });
  } catch (error) {
    dispatch({ type: SET_BOOKS, payload: [] });
    console.log(error);
  }
};

/* Add a movie */
export const addMovie = (movie) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/movies/add-movie", movie);
    await dispatch(getAllMovies());
    dispatch({ type: CLEAR_ERRORS });

    //Prevent modal from closing after errors are displayed
    if (results.data.movieId) return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

/* Get all movies */
export const getAllMovies = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/movies");
    console.log(results);
    dispatch({
      type: SET_MOVIES,
      payload: results.data.movies,
    });
  } catch (error) {
    dispatch({ type: SET_MOVIES, payload: [] });
    console.log(error);
  }
};

/* Get single book info */
export const getBook = (ISBN) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    let result = await axios.get(`/books/${ISBN}`);
    dispatch({ type: SET_BOOK, payload: result.data.book });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({ type: SET_BOOK, payload: {} });
    console.log(error);
  }
};

/* Get single movie info */
export const getMovie = (movieId) => async (dispatch) => {
  try {
    dispatch({ type: LOADING_UI });
    let result = await axios.get(`/movies/${movieId}`);
    dispatch({ type: SET_MOVIE, payload: result.data.movie });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({ type: SET_MOVIE, payload: {} });
    console.log(error);
  }
};

/* Get single user info */
export const getUser = (id) => async (dispatch) => {
  try {
    console.log("hello");
    dispatch({ type: LOADING_UI });
    let result = await axios.get(`/user/${id}`);
    dispatch({ type: SET_SELECTED_USER, payload: result.data });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({ type: SET_SELECTED_USER, payload: {} });
    console.log(error);
  }
};

/* Get all users */
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/user");

    dispatch({
      type: SET_USERS,
      payload: results.data.users,
    });
  } catch (error) {
    dispatch({ type: SET_USERS, payload: [] });
    console.log(error);
  }
};

/* Set verified */
export const setVerified = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/user/set-verified/${id}`);
    console.log(result);
    dispatch(getAllUsers());
  } catch (error) {
    console.log(error);
  }
};

/* Set blacklisted */
export const setBlacklisted = (id) => async (dispatch) => {
  try {
    let result = await axios.get(`/user/set-blacklisted/${id}`);
    console.log(result);
    dispatch(getAllUsers());
  } catch (error) {
    console.log(error);
  }
};

/* Upload book Image */
export const uploadBookImage = (formData, ISBN) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    await axios.post(`books/book-image/${ISBN}`, formData);
    dispatch(getAllBooks());
    dispatch(getBook(ISBN));
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { bookImage: error.response.data.error.message } },
    });
  }
};

/* Upload book Movie */
export const uploadMovieImage = (formData, movieId) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    console.log("sss" + movieId);
    await axios.post(`movies/movie-image/${movieId}`, formData);
    dispatch(getAllMovies());
    dispatch(getMovie(movieId));
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { movieImage: error.response.data.error.message } },
    });
  }
};

/* Toggle availability of book */
export const toggleBookAvailability = (ISBN) => async (dispatch) => {
  //dispatch({ type: LOADING_UI });
  try {
    await axios.get(`books/book-availability/${ISBN}`);
    dispatch(getAllBooks());
    dispatch(getBook(ISBN));
    dispatch({ type: CLEAR_ERRORS });
    //dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    console.log(error);
  }
};

/* Toggle availability of movie */
export const toggleMovieAvailability = (movieId) => async (dispatch) => {
  //dispatch({ type: LOADING_UI });
  try {
    await axios.get(`movies/movie-availability/${movieId}`);
    dispatch(getAllMovies());
    dispatch(getMovie(movieId));
    dispatch({ type: CLEAR_ERRORS });
    //dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    console.log(error);
  }
};

/* Set reserve and return date when finding books*/
export const setDates = (dates, history) => async (dispatch) => {
  //Validate pickup and dropoff times
  const reserve = dayjs(`${dates.reserveDate}`, "YYY-MM-DD");
  const returning = dayjs(`${dates.returnDate}`, "YYY-MM-DD");

  const diff = returning.diff(reserve, "minutes");

  console.log(reserve, returning, diff);

  dispatch({
    type: SET_BOOKS,
    payload: {},
  });

  if (diff < 4320) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { message: "Minimum reserve period is 3 days" } },
    });
  } else if (diff > 20160) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { message: "Maximum reserve period is 2 weeks" } },
    });
  } else {
    dates.diff = diff;
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: SET_DATES, payload: dates });
    dispatch({ type: LOADING_DATA });
    history.push("/lend-books");
    try {
      let results = await axios.get(
        `books/available-books/${dates.reserveDate}/${dates.returnDate}`
      );
      dispatch({
        type: SET_BOOKS,
        payload: results.data.books,
      });
    } catch (error) {
      dispatch({ type: SET_BOOKS, payload: [] });
      console.log(error);
    }
  }
};

/* Set reserve and return date when finding books*/
export const setMovieDates = (dates, history) => async (dispatch) => {
  //Validate pickup and dropoff times
  const reserve = dayjs(`${dates.reserveDate}`, "YYY-MM-DD");
  const returning = dayjs(`${dates.returnDate}`, "YYY-MM-DD");

  const diff = returning.diff(reserve, "minutes");

  console.log(reserve, returning, diff);

  dispatch({
    type: SET_MOVIES,
    payload: {},
  });

  if (diff < 4320) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { message: "Minimum reserve period is 3 days" } },
    });
  } else if (diff > 20160) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { message: "Maximum reserve period is 2 weeks" } },
    });
  } else {
    dates.diff = diff;
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: SET_DATES, payload: dates });
    dispatch({ type: LOADING_DATA });
    history.push("/lend-videos");
    try {
      let results = await axios.get(
        `movies/available-movies/${dates.reserveDate}/${dates.returnDate}`
      );
      dispatch({
        type: SET_MOVIES,
        payload: results.data.movies,
      });
    } catch (error) {
      dispatch({ type: SET_MOVIES, payload: [] });
      console.log(error);
    }
  }
};

export const makeReservation = (data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    let results = await axios.post(`/reserve/books`, data);
    dispatch({ type: CLEAR_ERRORS, payload: results.data });
    dispatch({ type: STOP_LOADING_UI });
    localStorage.clear("cart");
    dispatch({ type: CLEAR_CART });

    //Prevent modal from closing after errors are displayed
    // if (results.data._id) return true;
  } catch (error) {
    console.log(error.response.message);
  }
};

export const makeMovieReservation = (data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    let results = await axios.post(`/reserve/movies`, data);
    dispatch({ type: CLEAR_ERRORS, payload: results.data });
    dispatch({ type: STOP_LOADING_UI });
    localStorage.clear("cart");
    dispatch({ type: CLEAR_CART });

    //Prevent modal from closing after errors are displayed
    // if (results.data._id) return true;
  } catch (error) {
    console.log(error.response.message);
  }
};

/* Remove Book */
export const removeBook = (ISBN) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    let results = await axios.delete(`/books/${ISBN}`);
    dispatch(getAllBooks());
    dispatch({ type: SET_BOOK, payload: null });
    dispatch({ type: CLEAR_ERRORS });

    //Prevent modal from closing after errors are displayed
    if (results.data.message === "Successfully deleted") return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

/* Remove Movie */
export const removeMovie = (movieId) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    let results = await axios.delete(`/movies/${movieId}`);
    dispatch(getAllMovies());
    dispatch({ type: SET_MOVIE, payload: null });
    dispatch({ type: CLEAR_ERRORS });

    //Prevent modal from closing after errors are displayed
    if (results.data.message === "Successfully deleted") return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

/* Get all bookreservations */
export const getAllBookReservations = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/reserve/allBookReservations");
    dispatch({
      type: SET_RESERVATIONS,
      payload: results.data.reservations,
    });
    console.log("ss" + results.data.reservations);
  } catch (error) {
    dispatch({ type: SET_RESERVATIONS, payload: [] });
    console.log(error);
  }
};

/* Get all bookreservations */
export const getAllMovieReservations = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/reserve/allMovieReservations");
    dispatch({
      type: SET_RESERVATIONS,
      payload: results.data.reservations,
    });
    console.log("ss" + results.data.reservations);
  } catch (error) {
    dispatch({ type: SET_RESERVATIONS, payload: [] });
    console.log(error);
  }
};

/* Change book reservation status */
export const changeBookReservationStatus = (id, status) => async (dispatch) => {
  try {
    await axios.post(`/reserve/bookReservation-status/${id}`, { status });
    dispatch(getAllBookReservations());
  } catch (error) {
    console.log(error);
  }
};

/* Change book reservation status */
export const changeMovieReservationStatus =
  (id, status) => async (dispatch) => {
    try {
      await axios.post(`/reserve/movieReservation-status/${id}`, { status });
      dispatch(getAllMovieReservations());
    } catch (error) {
      console.log(error);
    }
  };

/* Get Bookreservations of logged in user */
export const getMyBookReservations = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/reserve/my-bookReservations");
    console.log(results.data);
    dispatch({
      type: SET_RESERVATIONS,
      payload: results.data.reservations,
    });
  } catch (error) {
    dispatch({ type: SET_RESERVATIONS, payload: [] });
    console.log(error);
  }
};

/* Get moviereservations of logged in user */
export const getMyMovieReservations = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/reserve/my-movieReservations");
    console.log(results.data);
    dispatch({
      type: SET_RESERVATIONS,
      payload: results.data.reservations,
    });
  } catch (error) {
    dispatch({ type: SET_RESERVATIONS, payload: [] });
    console.log(error);
  }
};