import React from "react";
import { Navbar } from "./components";
import "./App.css";
import Home from "./pages/homepage/homepage";
import SignUp from "./pages/SignUp/SignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login/Login";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/SignUp" exact component={SignUp} />
          <Route path="/Login" exact component={Login} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
