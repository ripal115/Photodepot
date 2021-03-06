import React, { useState } from "react";
import { ApiPost } from "../../../helpers/API/ApiData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./otherUsersSignup.scss";
import "../../../_metronic/_assets/sass/layout/_basic.scss";
import { useHistory } from "react-router-dom";

export default function OtherUsersSignup() {
  const [loginData, setLoginData] = useState({});
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const [thankYou, setThankYou] = useState(false);
  const [signup, setSignup] = useState(true);

const history = useHistory()

  const regexEmail =
    /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;

  //For handle change otheruser signup input
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  //For number validation
  const bindInput = (value) => {
    var regex = new RegExp("^[^0-9]*$");
    var key = String.fromCharCode(
      !value.charCode ? value.which : value.charCode
    );
    if (regex.test(key)) {
      value.preventDefault();
      return false;
    }
  };

  //for input fild validation
  const validation = () => {
    let isFormValid = true;
    let errors = {};

    if (!loginData.firstname || loginData.firstname === "") {
      isFormValid = false;
      errors["firstname"] = "Please Enter firstname!";
    }
    if (!loginData.lastname || loginData.lastname === "") {
      isFormValid = false;
      errors["lastname"] = "Please Enter lastname!";
    }
    if (!loginData.email || loginData.email === "") {
      isFormValid = false;
      errors["email"] = "Please Enter email!";
    }
    if (!loginData.email || regexEmail.test(loginData.email) === false) {
      isFormValid = false;
      errors["email"] = "Email is not valid!";
    }
    if (!loginData.password || loginData.password === "") {
      isFormValid = false;
      errors["password"] = "Please Enter password!";
    }
    if (!loginData.phone || loginData.phone === "") {
      isFormValid = false;
      errors["phone"] = "Please Enter phone!";
    }

    setErrors(errors);
    return isFormValid;
  };

  // For other user signup api call
  const handleSubmit = async (e) => {
    setLoader(true);
    e.preventDefault();
    let data = {
      email: loginData.email,
      password: loginData.password,
      contact: loginData.phone,
      firstName: loginData.firstname,
      lastName: loginData.lastname,
      role: "6283240ebb6a3e0cac847a13",
    };

    console.log("signup data", data);
    if (validation()) {
      await ApiPost("admin/signup", data)
        .then((res) => {
          console.log("signup", res);
          if (res?.status === 200) {
            console.log("res");
            // setThankYou(true);
            setSignup(false);
            toast.success(res?.data?.message);
            history.push("http://localhost:3001/login")
          }
        })
        .catch((err) => {
          console.log("err--------->", err.response.data.message);
          toast.error(err?.response?.data?.message);
        });
    }
    setLoader(false);
  };

  return (
    <>
      {signup && (
        <div className="login-form otherUsers-signup" id="kt_login_signin_form">
          <div className="text-center mb-10 mb-lg-20">
            <h3 className="font-size-h1">Miscellaneous Affiliates Signup</h3>
            <p className="text-muted font-weight-bold">Create Your Account.</p>
            <span className="text-danger h6">{errors.user}</span>
          </div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover
          />
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="First name"
              type="text"
              className={`form-control form-control-solid h-auto py-5 px-6  `}
              name="firstname"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <span className="text-danger">{errors.firstname}</span>
          </div>
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Last name"
              type="text"
              className={`form-control form-control-solid h-auto py-5 px-6  `}
              name="lastname"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <span className="text-danger">{errors.lastname}</span>
          </div>
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Email"
              type="email"
              className={`form-control form-control-solid h-auto py-5 px-6  `}
              name="email"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <span className="text-danger">{errors.email}</span>
          </div>
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Password"
              type="password"
              className={`form-control form-control-solid h-auto py-5 px-6 `}
              name="password"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            <span className="text-danger">{errors.password}</span>
          </div>
          <div className="form-group fv-plugins-icon-container">
            <input
              placeholder="Phone number"
              type="text"
              className={`form-control form-control-solid h-auto py-5 px-6 `}
              name="phone"
              onChange={(e) => {
                handleChange(e);
              }}
              onKeyPress={bindInput}
              maxLength="10"
            />
            <span className="text-danger">{errors.phone}</span>
          </div>
          <div className="form-group d-flex flex-wrap justify-content-center align-items-center">
            <button
              id="kt_login_signin_submit"
              type="submit"
              className={`align-items-center d-flex btn btn-primary font-weight-bold px-9 py-4 my-3`}
              onClick={(e) => {
                handleSubmit(e);
              }}
            >
              <span className="pr-2">Sign up</span>
              {loader && (
                <div class="spinner-grow text-dark" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              )}
            </button>
          </div>
        </div>
      )}
      {/* thankYou message */}
      {/* {thankYou && (
        <>
          <div
            className="login-form photoeditor-signup"
            id="kt_login_signin_form"
          >
            <div className="text-center mb-10 mb-lg-20">
              <h3 className="font-size-h1">Your Photo Editor Signup is done</h3>
              <p className="text-muted font-weight-bold">Thank You.</p>
              <span className="text-danger h6">{errors.user}</span>
            </div>
          </div>
        </>
      )} */}
    </>
  );
}
