import React, { useState } from "react";
import "./Login.css";
import loginImg from "../../assets/images/login-form.svg";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const data = { email: email, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data);
    });
  };

  return (
    <div className="container-login">
      <div className="row">
        <div className="form-login">
          <div className="topic">
            <h1 style={{ textAlign: "right" }}>Log In</h1>
          </div>
          <hr />
          <p style={{ color: "gray" }}> .Hi there! good to see you again</p>

          <div className="login-form-details">
            <input
              type="Text"
              name="email"
              placeholder=" Email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
            <input
              type="password"
              name="password"
              placeholder=" Password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <hr />
            <p style={{ color: "gray" }}>
              .Forget password? <a href="#">Click here</a>
            </p>
            <hr />

            <button onClick={login}>LOGIN</button>
            <hr />
            <div className="signup-link">
              <p>
                Don't have an account? <a href="/SignUp">SignUp</a>
              </p>
            </div>
          </div>
        </div>
        <div className="img-login">
          <img className="img-form" src={loginImg} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
