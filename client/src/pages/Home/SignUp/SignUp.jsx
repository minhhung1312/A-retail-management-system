import React from "react";
import "./SignUp.scss";
import background from "../../../assets/login-background.png";
function SignUpPage() {
  return (
    <>
      <div className="login-form">
        <div className="title">
          <h1>Welcome to your Business!</h1>
          <h3>
            Create an account to run wild through our curated experiences.
          </h3>
          <img src={background} alt="" className="img" />
        </div>
        <div className="form_container  rounded ">
          <form className="form_container1">
            <div className="form-box">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
              />
            </div>
            <div className="form-box">
              <input
                type="password"
                placeholder="Password"
                className="form-control"
              />
            </div>
            <div className="form-box">
              <input
                type="password"
                placeholder="Confirm Password"
                className="form-control"
              />
            </div>
            <div>
              <button className="btn ">Create Account</button>
            </div>
            <div className="">
              <input type="checkbox" className="" id="check" />
              <label htmlFor="check" className="custom-input-label ms-2">
                Remember me for 30 days
              </label>
            </div>

            <p className="text-center">
              Forgot <a href="/forgot">Password ?</a>
            </p>
            <p className="text-center">
              You already have account? <a href="/login">Log in</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUpPage;
