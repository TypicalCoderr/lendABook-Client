import {
  SET_USERS,
  LOADING_DATA,
  SET_SELECTED_USER,
  SET_BOOKS,
  SET_BOOK,
  SET_DATES,
  SET_MOVIES,
  SET_MOVIE,
  SET_BOOK_PRICES,
  SET_MOVIE_PRICES,
  SET_RESERVATIONS,
} from "../types";

const initialState = {
  users: [],
  books: [],
  movies: [],
  reservations: [],
  bookPrices: [],
  videoPrices: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_SELECTED_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false,
      };
    case SET_BOOK:
      return {
        ...state,
        book: action.payload,
      };
    case SET_MOVIES:
      return {
        ...state,
        movies: action.payload,
        loading: false,
      };
    case SET_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };
    case SET_DATES:
      return {
        ...state,
        dates: action.payload,
      };
    case SET_RESERVATIONS:
      return {
        ...state,
        reservations: action.payload,
        user: action.payload.reservations,
        loading: false,
      };
    case SET_BOOK_PRICES:
      return {
        ...state,
        bookPrices: action.payload,
        loading: false,
      };
    case SET_MOVIE_PRICES:
      return {
        ...state,
        videoPrices: action.payload,
        loading: false,
      };

    default:
      return state;
  }
}
