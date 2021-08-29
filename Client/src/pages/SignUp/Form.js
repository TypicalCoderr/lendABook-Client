import React from "react";
import "./SignUp.css";
import signUpImg from "../../assets/images/sign-up-form.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "./UserValidation";

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const submitForm = (data) => {
    console.log(data);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-1">
          <img className="img-form" src={signUpImg} alt="" />
        </div>
        <div className="form">
          <h1>Create Account</h1>
          <hr />
          <p style={{ color: "gray" }}>
            {" "}
            Fill in this form to create a account.
          </p>
          <form className="form-details" onSubmit={handleSubmit(submitForm)}>
            <input
              type="Text"
              name="firstName"
              placeholder=" First Name"
              {...register("firstName")}
            />
            <p style={{ color: "red" }}>{errors.firstName?.message}</p>

            <input
              type="Text"
              name="lastName"
              placeholder=" Last Name"
              {...register("lastName")}
            />
            <p style={{ color: "red" }}>{errors.lastName?.message}</p>

            <input
              type="Text"
              name="email"
              placeholder=" Email"
              {...register("email")}
            />
            <p style={{ color: "red" }}>{errors.email?.message}</p>

            <input
              type="Text"
              name="age"
              placeholder=" Age"
              {...register("age")}
            />
            <p style={{ color: "red" }}>{errors.age?.message}</p>

            <input
              type="Text"
              name="phoneNo"
              placeholder=" Phone number"
              {...register("phoneNo")}
            />
            <p style={{ color: "red" }}>{errors.phoneNo?.message}</p>

            <input
              type="password"
              name="password"
              placeholder=" Password"
              {...register("password")}
            />
            <p style={{ color: "red" }}>{errors.password?.message}</p>

            <input
              type="password"
              name="confirmPassword"
              placeholder=" Confirm Password"
              {...register("confirmPassword")}
            />
            <p style={{ color: "red" }}>
              {errors.confirmPassword && "Password do not match"}
            </p>

            <hr />
            <p>
              By creating an account you agree to our{" "}
              <a href="#">Terms & Privacy</a>.
            </p>
            <hr />
            <input type="submit" value="SIGNUP"></input>
            <hr />
            <div className="login-link">
              <p>
                Already have an account? <a href="/login">Login</a>.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
