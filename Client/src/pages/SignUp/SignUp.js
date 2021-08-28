import React from "react";
import "./SignUp.css";
import { useHistory } from "react-router-dom";
import signUpImg from "../../assets/images/sign-up-form.svg";
import { Form } from "./Form";

function SignUp() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-1">
          <img className="img-form" src={signUpImg} alt="" />
        </div>
        <div className="form">
          <h1>Create Account</h1>
          <form className="form-details">
            <label>First Name:</label>
            <input type="Text" />
            <label>Last Name:</label>
            <input type="Text" />
            <label>Email:</label>
            <input type="Text" />
            <label>Age:</label>
            <input type="Text" />
            <label>Phone no:</label>
            <input type="Text" />
            <label>Password:</label>
            <input type="password" />
            <label>Confirm password:</label>
            <input type="password" />
            <hr />
            <p>
              By creating an account you agree to our{" "}
              <a href="#">Terms & Privacy</a>.
            </p>
            <hr />
            <input type="submit" value="SIGNUP"></input>
            <hr />
            <div className= "login-link">
              <p>
                Already have an account? <a href="/login">Login</a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
