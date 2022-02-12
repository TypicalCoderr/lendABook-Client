import axios from "axios";

import {
  ADD_TO_LIST,
  REMOVE_FROM_LIST,
  ADD_TO_MOVIE_LIST,
  REMOVE_FROM_MOVIE_LIST,
} from "../types";

/* add books to cart*/
export const addToBookCart = (ISBN) => async (dispatch, getState) => {
  // dispatch({ type: LOADING_UI });
  let result = await axios.get(`/books/${ISBN}`);

  dispatch({
    type: ADD_TO_LIST,
    payload: result.data.book,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  // dispatch({ type: STOP_LOADING_UI });
};

/* remove books from cart*/
export const removeFromBookCart = (ISBN) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_LIST,
    payload: ISBN,
  });
  // console.log("id" + ISBN);
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

/* add movies to cart*/
export const addToMovieCart = (movieId) => async (dispatch, getState) => {
  // dispatch({ type: LOADING_UI });
  let result = await axios.get(`/movies/${movieId}`);

  dispatch({
    type: ADD_TO_MOVIE_LIST,
    payload: result.data.movie,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
  // dispatch({ type: STOP_LOADING_UI });
};

/* remove movies from cart*/
export const removeFromMovieCart = (movieId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_MOVIE_LIST,
    payload: movieId,
  });
  // console.log("id" + ISBN);
  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
