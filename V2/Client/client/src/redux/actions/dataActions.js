import axios from "axios";
import dayjs from "dayjs";
import request from "superagent";

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
  SET_BOOK_PRICES,
  SET_MOVIE_PRICES,
  CLEAR_ERRORS,
  CLEAR_CART,
  SET_RESERVATIONS,
  SET_COMPANY_PURCHASES_BOOKS,
  SET_UPDATE_CSV,
  SET_COMPANY_PURCHASES_MOVIES,
  SET_API_RESULT,
  SET_BOOK_FAVORITES,
  SET_BOOKS_SECONDARY_DB,
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
    console.log(error.message);
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

/* Get books from google book api*/
export const getAPIbooks = (searchKey) => async (dispatch) => {
  let query = searchKey;
  const apiKey = "AIzaSyAg8IbVp8wbqOJU3POUUDiDM0qUpy08afk";
  let url =
    "https://www.googleapis.com/books/v1/volumes?q=" +
    query +
    "&maxResults=40&key=" +
    apiKey;

  if (searchKey != null) {
    dispatch({ type: LOADING_DATA });
    try {
      console.log();
      let results = await request.get(url);
      console.log(results.body);
      dispatch({
        type: SET_API_RESULT,
        payload: results.body.items,
      });
    } catch (error) {
      dispatch({ type: SET_API_RESULT, payload: [] });
      console.log(error.message);
    }
  }
};

export const updateBook = (book) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/books/update-book", book);
    await dispatch(getAllBooks());
    dispatch({ type: CLEAR_ERRORS });

    if (results) return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
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

/*add books to favorites*/
export const addBooksToFavorites = (data) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  console.log(data);
  try {
    let results = await axios.post("/bookFavorites/add-favorite", data);
    // await dispatch(getAllMovies());
    dispatch({ type: CLEAR_ERRORS });

    //Prevent modal from closing after errors are displayed
    if ((results.data.message = "successfully added to favorites")) return true;
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
export const setDates = (dates, history) => async (dispatch, getState) => {
  //Validate pickup and dropoff times
  const reserve = dayjs(`${dates.reserveDate}`, "YYY-MM-DD");
  const returning = dayjs(`${dates.returnDate}`, "YYY-MM-DD");

  const diff = returning.diff(reserve, "minutes");

  console.log(reserve, returning, diff);

  dispatch({
    type: SET_BOOKS,
    payload: {},
  });

  let max =
    getState() &&
    getState().user &&
    getState().user.subscription &&
    getState().user.subscription.duration_books;

  let d = Math.floor(max / (60 * 24 * 7));
  const weeks = d > 0 ? d + (d == 1 ? " week " : " weeks ") : "";

  if (diff < 4320) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { message: "Minimum reserve period is 3 days" } },
    });
  } else if (diff > max) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { message: "Maximum reserve period is " + weeks } },
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
      // console.log("sss" + max);
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
export const setMovieDates = (dates, history) => async (dispatch, getState) => {
  //Validate pickup and dropoff times
  const reserve = dayjs(`${dates.reserveDate}`, "YYY-MM-DD");
  const returning = dayjs(`${dates.returnDate}`, "YYY-MM-DD");

  const diff = returning.diff(reserve, "minutes");

  console.log(reserve, returning, diff);

  dispatch({
    type: SET_MOVIES,
    payload: {},
  });

  let max =
    getState() &&
    getState().user &&
    getState().user.subscription &&
    getState().user.subscription.duration_videos;

  let d = Math.floor(max / (60 * 24));
  const days = d > 0 ? d + (d == 1 ? " day " : " days ") : "";

  if (diff < 4320) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { message: "Minimum reserve period is 3 days" } },
    });
  } else if (diff > max) {
    dispatch({
      type: SET_ERRORS,
      payload: { error: { message: "Maximum reserve period is " + days } },
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
    dispatch({ type: CLEAR_CART });

    //Prevent modal from closing after errors are displayed
    if (results.data.message === "Reservation succeeded!") return true;
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const makeMovieReservation = (data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    let results = await axios.post(`/reserve/movies`, data);
    dispatch({ type: CLEAR_ERRORS, payload: results.data });
    dispatch({ type: STOP_LOADING_UI });
    dispatch({ type: CLEAR_CART });

    //Prevent modal from closing after errors are displayed
    if (results.data.message === "Reservation succeeded!") return true;
  } catch (error) {
    console.log(error.response.message);
    // dispatch({
    //   type: SET_ERRORS,
    //   payload: error.response.data,
    // });
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
    if (results.data.message === "Book Successfully deleted") return true;
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

/* Get my book favorites*/
export const getMyBookFavorites = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/bookFavorites/");
    console.log(results.data._favBooks);
    dispatch({
      type: SET_BOOK_FAVORITES,
      payload: results.data._favBooks,
    });
  } catch (error) {
    dispatch({ type: SET_BOOK_FAVORITES, payload: [] });
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

/* Get all competitive book prices */
export const getBookPrices = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/getBookPrices");
    dispatch({
      type: SET_BOOK_PRICES,
      payload: results.data.bookPrices,
    });
  } catch (error) {
    dispatch({ type: SET_BOOK_PRICES, payload: [] });
    console.log(error);
  }
};

/* Get all competitive movie prices */
export const getMoviePrices = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/getMoviePrices");
    dispatch({
      type: SET_MOVIE_PRICES,
      payload: results.data.videoPrices,
    });
  } catch (error) {
    dispatch({ type: SET_MOVIE_PRICES, payload: [] });
    console.log(error);
  }
};

/*read csv file of company purchases books */
export const getCompanyPurchasedBooks = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/csv/books");
    dispatch({
      type: SET_COMPANY_PURCHASES_BOOKS,
      payload: results.data._booksPurchases,
    });
  } catch (error) {
    dispatch({ type: SET_COMPANY_PURCHASES_BOOKS, payload: [] });
    console.log(error);
  }
};

/*read csv file of company purchases movies */
export const getCompanyPurchasedMovies = () => async (dispatch) => {
  dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.get("/csv/movies");
    dispatch({
      type: SET_COMPANY_PURCHASES_MOVIES,
      payload: results.data._moviesPurchases,
    });
  } catch (error) {
    dispatch({ type: SET_COMPANY_PURCHASES_MOVIES, payload: [] });
    console.log(error);
  }
};

/*update csv file of company purchases books */
export const updateBookCSV = (ISBN) => async (dispatch) => {
  console.log(ISBN);
  // dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.post(`/csv/update/${ISBN}`);
    await dispatch(getCompanyPurchasedBooks());
  } catch (error) {
    dispatch({ type: SET_UPDATE_CSV, payload: [] });
    console.log(error);
  }
};

/*update csv file of company purchases movies */
export const updateMovieCSV = (movieId) => async (dispatch) => {
  console.log(movieId);
  // dispatch({ type: LOADING_DATA });
  try {
    let results = await axios.post(`/csv/updateMovies/${movieId}`);
    await dispatch(getCompanyPurchasedMovies());
  } catch (error) {
    dispatch({ type: SET_UPDATE_CSV, payload: [] });
    console.log(error);
  }
};

/* update book copies */
export const updateBookCopies = (book) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  // console.log("sdsd"+book);
  try {
    let results = await axios.post("/books/update-copies", book);

    console.log(results);
    if (results) return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
    console.log(error.message);
  }
};

/* update movie copies */
export const updateMovieCopies = (movie) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  // console.log("sdsd"+book);
  try {
    let results = await axios.post("/movies/update-copies", movie);

    console.log(results);
    if (results) return true;
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response.data,
    });
    console.log(error.message);
  }
};

export const getExternalBooks = () => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    let results = await axios.get("/sencondDB/");
    console.log(results);
    dispatch({
      type: SET_BOOKS_SECONDARY_DB,
      payload: results.data.books,
    });
  } catch (error) {
    dispatch({ type: SET_BOOKS_SECONDARY_DB, payload: [] });
    console.log(error);
  }
};
