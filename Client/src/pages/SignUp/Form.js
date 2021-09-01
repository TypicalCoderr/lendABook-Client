import React from "react";
import "./SignUp.css";
import signUpImg from "../../assets/images/sign-up-form.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "./UserValidation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";

export const FormSignUp = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    age: "",
    phoneNo: "",
    password: "",
  };

  const {
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const submitForm = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
    });
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
            Fill in this form to create a account.
          </p>
          {/* <Formik
            initialValues={initialValues}
            onSubmit={submitForm}
            validationSchema={signupSchema}
          >
            <Form className="form-details">
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
                type="Number"
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
            </Form>
          </Formik> */}
          <div>
            <Formik
              initialValues={initialValues}
              onSubmit={submitForm}
              validationSchema={signupSchema}
            >
              {(Formik) => (
                <Form className="formDetails">
                  <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="firstName"
                    placeholder=" FirstName"
                  />
                  <ErrorMessage name="firstName" component="span" />

                  <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="lastName"
                    placeholder=" LastName"
                  />
                  <ErrorMessage name="lastName" component="span" />

                  <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="email"
                    placeholder=" Email"
                  />
                  <ErrorMessage name="email" component="span" />

                  <Field
                    autocomplete="off"
                    type="number"
                    id="inputCreatePost"
                    name="age"
                    placeholder=" Age"
                  />
                  <ErrorMessage name="age" component="span" />

                  <Field
                    autocomplete="off"
                    id="inputCreatePost"
                    name="phoneNo"
                    placeholder=" Phone Number"
                  />
                  <ErrorMessage name="phoneNo" component="span" />

                  <Field
                    autocomplete="off"
                    type="password"
                    id="inputCreatePost"
                    name="password"
                    placeholder=" Password"
                  />
                  <ErrorMessage name="password" component="span" />

                  <Field
                    autocomplete="off"
                    type="password"
                    id="inputCreatePost"
                    name="confirmPassword"
                    placeholder=" Confirm Password"
                  />
                  <ErrorMessage name="confirmPassword" component="span" />

                  <button type="submit"> Register</button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
