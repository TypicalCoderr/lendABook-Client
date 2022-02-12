import {
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_USER,
  SET_SUBSCRIPTION,
  LOADING_USER,
} from "../types";

const initialState = {
  authenticated: false,
  credentials: {},
  subscription: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case SET_SUBSCRIPTION:
      return {
        ...state,
        subscription: action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
}
