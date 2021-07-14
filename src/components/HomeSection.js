import React from "react";
import "../App.css";
import { Button } from "./Button";
import "./HomeSection.css";
import backgroundImage from "../images/bg2.gif";

function HomeSection() {
  return (
    <div
      className="home-container"
      style={{ background: `url(${backgroundImage})` }}
    >
      <div className="get-started">
        <h1>Start reading, start inspiring</h1>
        <p>What are you waiting for?</p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            GET STARTED
          </Button>
        </div>
      </div>
    </div>
  );
}

export default HomeSection;
