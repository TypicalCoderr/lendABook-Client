import axios from "axios";

import {
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOADING_UI,
  SET_UNAUTHENTICATED,
  LOADING_USER,
  SET_SUBSCRIPTION,
  SET_RESERVATION,
  STOP_LOADING_UI,
} from "../types";

/*Handle user resgistration*/
export const registerUser = (user_data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let result = await axios.post("/user/register", user_data);
    dispatch({ type: CLEAR_ERRORS, payload: result.data });
    history.push("/user/register");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data,
    });
  }
};

/*Log user into the system*/
export const loginUser = (user_data, history) => async (dispatch) => {
  dispatch({ type: LOADING_UI });

  try {
    let results = await axios.post("/user/login", user_data);
    setAuthorizationHeader(results.data.token);
    await dispatch(getUserData());

    dispatch({ type: CLEAR_ERRORS });
    history.push("/");
  } catch (error) {
    dispatch({
      type: SET_ERRORS,
      payload: error.response?.data,
    });
  }
};

/*Log user out of the system*/
export const logoutUser = (history) => (dispatch) => {
  localStorage.removeItem("LenderToken");
  delete axios.defaults.headers.common["Authorization"];
  dispatch({ type: SET_UNAUTHENTICATED });
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
    await dispatch(getUserSubscription());
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUserSubscription = () => async (dispatch) => {
  dispatch({ type: LOADING_USER });
  try {
    let result = await axios.get("/user/getSubscription");
    dispatch({
      type: SET_SUBSCRIPTION,
      payload: result.data,
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUser = (UserId) => async (dispatch) => {
  dispatch({ type: LOADING_USER });
};

/*Set authorization header*/
const setAuthorizationHeader = (token) => {
  const LenderToken = `Bearer ${token}`;
  localStorage.setItem("LenderToken", LenderToken);
  axios.defaults.headers.common["Authorization"] = LenderToken;
};

/*Handle user image upload*/
export const uploadUserImage = (formData) => async (dispatch) => {
  dispatch({ type: LOADING_UI });
  try {
    console.log("sss" + formData);
    await axios.post("/user/user-image", formData);
    dispatch(getUserData());
    dispatch({ type: CLEAR_ERRORS });
    dispatch({ type: STOP_LOADING_UI });
  } catch (error) {
    dispatch({
      type: SET_ERRORS,

      payload: { error: { userImage: error.response.data.error.message } },
    });
    console.log(error.response.data.error.message);
  }
};
