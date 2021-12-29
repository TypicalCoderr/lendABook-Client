import {
  ADD_TO_LIST,
  ADD_TO_MOVIE_LIST,
  CLEAR_CART,
  CLEAR_MOVIE_CART,
  REMOVE_FROM_LIST,
  REMOVE_FROM_MOVIE_LIST,
} from "../types";

const initialState = {
  cartItems: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_LIST:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.ISBN === item.ISBN);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.ISBN === existItem.ISBN ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_FROM_LIST:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.ISBN !== action.payload),
      };

    case CLEAR_CART:
      return initialState;
    case ADD_TO_MOVIE_LIST:
      const Movieitem = action.payload;

      const existMovieItem = state.cartItems.find(
        (x) => x.movieId === Movieitem.movieId
      );
      if (existMovieItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.movieId === existMovieItem.movieId ? Movieitem : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, Movieitem],
        };
      }
    case REMOVE_FROM_MOVIE_LIST:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.movieId !== action.payload),
      };

    default:
      return state;
  }
}
