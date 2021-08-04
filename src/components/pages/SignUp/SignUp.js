import React from "react";
import Link from "react-dom";

const SignUp = () => {
  return (
    <div className="form-content-right">
      <form className="form">
        <h1>Get Started with us today!</h1>
        <div className="form-inputs">
          <lable className="form-lable">Username</lable>
          <input
            type="text"
            name="username"
            className="form-input"
            placeholder=" Enter your username"
          />
        </div>

        <div className="form-inputs">
          <lable className="form-lable">Email</lable>
          <input
            type="email"
            name="email"
            className="form-input"
            placeholder=" Enter your email"
          />
        </div>


      </form>
    </div>
  );
};

export default SignUp;