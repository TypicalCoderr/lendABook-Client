import React from "react";
import "./Login.css";
import loginImg from "../../assets/images/login-form.svg";

function login() {
  return (
    <div className="container-login">
      <div className="row">
        <div className="form-login">
          <div className="topic">
            <h1 style={{ textAlign: "right" }}>Log In</h1>
          </div>
          <hr />
          <p style={{ color: "gray" }}> .Hi there! good to see you again</p>

          <form className="login-form-details">
            <label>:Email</label>
            <input type="Text" />
            <label>:Password</label>
            <input type="password" />

            <input type="submit" value="LOGIN"></input>
            <hr />
            <div className="signup-link">
              <p>
                Don't have an account? <a href="/SignUp">SignUp</a>
              </p>
            </div>
          </form>
        </div>
        <div className="col-1">
          <img className="img-form" src={loginImg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default login;
