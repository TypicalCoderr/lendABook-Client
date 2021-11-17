import axios from "axios";

import {
  SET_USERS,
  LOADING_DATA,
  SET_SELECTED_USER,
  LOADING_UI,
  STOP_LOADING_UI,
  SET_BOOK,
  SET_BOOKS,
  SET_ERRORS,
  CLEAR_ERRORS,
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

/* Get single vehicle info */
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

/* Get single user info */
export const getUser = (id) => async (dispatch) => {
  try {
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
