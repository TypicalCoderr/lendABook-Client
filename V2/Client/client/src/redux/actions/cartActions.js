import axios from "axios";

import { ADD_TO_LIST, REMOVE_FROM_LIST } from "../types";

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

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
