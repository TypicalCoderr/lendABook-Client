import axios from "axios";

import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  STOP_LOADING_UI,
} from "../types";

/*Handle user resgistration*/
export const registerUser = (user_data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let result = await axios.post("/user/register", user_data);

    dispatch({ type: CLEAR_ERRORS, payload: result.data });
    history.push("/");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data,
    });
  }
};

/*Get logged in user's details*/
export const getUserData = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    let result = await axios.get("/user/LoggedUser");
    dispatch({
      type: SET_USER,
      payload: result.data,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};
