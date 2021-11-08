import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import axios from "axios";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Signup from "./pages/signUp/signUp";
import UserImgUpload from "./pages/signUp/imageForm";


axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <>
      <Fragment>
      
          <Router>
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/user/login" element={<Login />} />
              <Route exact path="/user/register" element={<Signup />} />
              <Route exact path="/img-upload" element={<UserImgUpload />} />
            </Routes>
          </Router>
       
      </Fragment>
    </>
  );
}

export default App;
