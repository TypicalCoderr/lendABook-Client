import React from 'react';
import {Navbar} from './components';
import './App.css';
import Home from './components/pages/homepage/homepage';
import SignUp from './components/pages/SignUp/SignUp';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';


function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/SignUp" exact component={SignUp} />
          {/* <Route path="*" exact component={PageNotFound} /> */}
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
