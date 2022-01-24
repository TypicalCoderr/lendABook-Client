import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Fragment } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";

//redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUser, getUserData } from "./redux/actions/userAction";

//utils
import AuthRoute from "./util/authRoute";
import AuthRouteAdmin from "./util/authRouteAdmin";
import AuthRouteAll from "./util/authRouteAll";
import AuthRouteUser from "./util/authRouteUser";

import Landing from "./pages/landingPage/landingPage";
import Login from "./pages/login/login";
import Signup from "./pages/signUp/signUp";
import UserImgUpload from "./pages/signUp/imageForm";
import Home from "./pages/home/home";
import Books from "./pages/books/books";
import Dashboard from "./pages/dashboard/dashboard";
import CartScreen from "./pages/cartScreen/cartScreen";
import MovieCartScreen from "./pages/cartScreen/movieCartScreen";
import Movies from "./pages/movies/movies";
import MyBookReservations from "./pages/myReservations/myBookReservations";
import MyMovieReservations from "./pages/myReservations/myMovieReservations";
import MyBookFavorites from "./pages/myFavorites/myBookFavorites";

axios.defaults.baseURL = "http://localhost:3001";

const token = localStorage.LenderToken;

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href = "user/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <>
      <Fragment>
        <Provider store={store}>
          <Router>
            <Switch>
              {/* <Route exact path="/welcome" component={Landing} /> */}
              <AuthRoute exact path="/user/login" component={Login} />
              <AuthRoute exact path="/user/register" component={Signup} />
              <AuthRouteAll
                exact
                path="/uploadImage"
                component={UserImgUpload}
              />
              <Route exact path="/" component={Home} />
              <Route exact path="/lend-books" component={Books} />
              <Route exact path="/lend-videos" component={Movies} />
              <AuthRouteUser exact path="/cart-books" component={CartScreen} />
              <AuthRouteUser
                exact
                path="/cart-movies"
                component={MovieCartScreen}
              />
              <AuthRouteUser
                exact
                path="/myReservations-books"
                component={MyBookReservations}
              />
              <AuthRouteUser
                exact
                path="/myReservations-movies"
                component={MyMovieReservations}
              />
              <AuthRouteUser
                exact
                path="/myFavorites-books"
                component={MyBookFavorites}
              />
              <AuthRouteAdmin
                exact
                path="/Admin-dashboard"
                component={Dashboard}
              />
            </Switch>
          </Router>
        </Provider>
      </Fragment>
    </>
  );
}

export default App;
