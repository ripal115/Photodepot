import React, { useState } from "react";
import { useFormik } from "formik";
import {
  ApiPost,
  ApiPostNoAuth,
  ApiPut,
} from "../../../../helpers/API/ApiData";
import { Link, Redirect, useHistory } from "react-router-dom";
import * as authUtil from "../../../../utils/auth.util";
import * as userUtil from "../../../../utils/user.util";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ForgotPassword() {
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});
  const [inputValueEmail, setInputValueEmail] = useState({});
  const [inputValueOtp, setInputValueOtp] = useState({});
  const [inputValueForgotPass, setInputValueForgotPass] = useState({});
  const [sendMail, setSendMail] = useState(true);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const history = useHistory();
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputValueEmail({ ...inputValueEmail, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const handleChangeOtp = (e) => {
    setInputValueOtp({ ...inputValueOtp, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  const handleChangeForgotPass = (e) => {
    setInputValueForgotPass({
      ...inputValueForgotPass,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };
  console.log("errors", errors);

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

  const validation = () => {
    let isFormValid = true;
    let errors = {};
    // setLoader(false);
    console.log("inputValueEmail", inputValueEmail);
    if (!inputValueEmail?.email1 || inputValueEmail?.email1 === "") {
      isFormValid = false;
      errors["email1"] = "Email is required*!";
      setLoader(false);
    }
    setErrors(errors);
    return isFormValid;
  };

  const validationotp = () => {
    let isFormValid = true;
    let errors = {};
    // setLoader(false);
    if (!inputValueOtp.otp || inputValueOtp.otp === "") {
      isFormValid = false;
      errors["otp"] = "OTP is required*!";
      setLoader(false);
    }
    setErrors(errors);
    return isFormValid;
  };

  const validationForgotpass = () => {
    let isFormValid = true;
    let errors = {};
    // setLoader(false);
    if (!inputValueForgotPass?.email || inputValueForgotPass?.email === "") {
      isFormValid = false;
      errors["email"] = "Email is required*!";
      setLoader(false);
    }
    if (
      !inputValueForgotPass.password ||
      inputValueForgotPass.password === ""
    ) {
      isFormValid = false;
      errors["password"] = "Password is required*!";
      setLoader(false);
    }
    setErrors(errors);
    return isFormValid;
  };

  const handleSubmit = async (e) => {
    setLoader(true);
    let data = {
      email: inputValueEmail.email1,
    };
    if (validation()) {
      await ApiPut("admin/verify-email", data)
        .then((res) => {
          if (res?.status === 200) {
            console.log("res verify-email", res);
            toast.success(res.data.message);
            setSendMail(false);
            setVerifyOtp(true);
            setLoader(false);
          } else {
            setLoader(false);
            console.log("error"); 
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          setLoader(false);
          console.log("err--------->", err);
        });
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setLoader(true);
    let OtpData = {
      email: inputValueEmail?.email1,
      code: inputValueOtp?.otp,
    };
    if (validationotp()) {
      await ApiPut("admin/verify-code", OtpData)
        .then((res) => {
          if (res?.status === 200) {
            console.log("res verify-code", res);
            toast.success(res.data.message);
            setVerifyOtp(false);
            setForgotPassword(true);
            setLoader(false);
          } else {
            console.log("error");
            setLoader(false);
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
          console.log("err--------->", err);
          setLoader(false);
        });
    }
  };

  const handleSubmitForgotPass = async (e) => {
    e.preventDefault();
    setLoader(true);
    let Data = {
      email: inputValueForgotPass.email,
      password: inputValueForgotPass.password,
    };
    if (validationForgotpass()) {
      await ApiPost("admin/after-forget", Data)
        .then((res) => {
          if (res?.status === 200) {
            console.log("res after-forget", res);
            history.push("/auth/login");
            toast.success(res.data.message);
            setLoader(false);
          } else {
            console.log("error");
            setLoader(false);
          }
        })
        .catch((err) => {
          console.log("err--------->", err);
          setLoader(false);
          toast.error(err.response.data.message);
        });
    }
  };

  return (
    <>
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
      {/*----- Send mail -----*/}
      <>
        {sendMail == true && (
          <div className="login-form login-forgot" style={{ display: "block" }}>
            <div className="text-center pb-8">
              <h3 className="font-size-h1">Forgotten Password ?</h3>
              <div className="text-muted font-weight-bold">
                Please enter your email address. We will send you an email to
                Forgot your password.
              </div>
            </div>
            <div className="form-group fv-plugins-icon-container">
              <input
                type="email"
                className={
                  errors?.email1
                    ? "bordersDanger form-control form-control-solid h-auto py-5 px-6"
                    : "form-control form-control-solid h-auto py-5 px-6"
                }
                placeholder="Enter your Email"
                name="email1"
                onChange={(e) => handleChange(e)}
              />
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
                <span className="pr-2">Send Mail</span>
                {loader && (
                  <div class="spinner-grow text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
              </button>

              <Link to="/auth">
                <button
                  type="button"
                  id="kt_login_forgot_cancel"
                  className="btn btn-light-primary font-weight-bold px-9 py-4 my-3 mx-4"
                >
                  Cancel
                </button>
              </Link>
            </div>
          </div>
        )}
      </>
      {/*----- Verify Password -----*/}
      <>
        {verifyOtp && (
          <div className="login-form login-forgot" style={{ display: "block" }}>
            <div className="text-center pb-8">
              <h3 className="font-size-h1">Forgotten Password ?</h3>
              <div className="text-muted font-weight-bold">
                Please enter your OTP.
              </div>
            </div>
            <div className="form-group fv-plugins-icon-container">
              <input
                type="text"
                className={
                  errors?.otp
                    ? "bordersDanger form-control form-control-solid h-auto py-5 px-6"
                    : "form-control form-control-solid h-auto py-5 px-6"
                }
                placeholder="Enter your OTP"
                name="otp"
                onChange={(e) => handleChangeOtp(e)}
                onKeyPress={bindInput}
              />
            </div>

            <div className="form-group d-flex flex-wrap justify-content-center align-items-center">
              <button
                id="kt_login_signin_submit"
                type="submit"
                className={`align-items-center d-flex btn btn-primary font-weight-bold px-9 py-4 my-3`}
                onClick={(e) => {
                  handleSubmitOtp(e);
                }}
              >
                <span className="pr-2">Verify OTP</span>
                {loader && (
                  <div class="spinner-grow text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </>
      <>
        {forgotPassword && (
          <div className="login-form login-forgot" style={{ display: "block" }}>
            <div className="text-center pb-8">
              <h3 className="font-size-h1">Forgotten Password ?</h3>
              <div className="text-muted font-weight-bold">
                Please enter your new password.
              </div>
            </div>
            <div className="form-group fv-plugins-icon-container">
              <input
                type="text"
                className={
                  errors?.email
                    ? "bordersDanger form-control form-control-solid h-auto py-5 px-6"
                    : "form-control form-control-solid h-auto py-5 px-6"
                }
                placeholder="Enter your email"
                name="email"
                onChange={(e) => handleChangeForgotPass(e)}
              />
            </div>
            <div className="form-group fv-plugins-icon-container">
              <input
                type="text"
                className={
                  errors?.password
                    ? "bordersDanger form-control form-control-solid h-auto py-5 px-6"
                    : "form-control form-control-solid h-auto py-5 px-6"
                }
                placeholder="Enter your new password"
                name="password"
                onChange={(e) => handleChangeForgotPass(e)}
              />
            </div>

            <div className="form-group d-flex flex-wrap justify-content-center align-items-center">
              <button
                id="kt_login_signin_submit"
                type="submit"
                className={`align-items-center d-flex btn btn-primary font-weight-bold px-9 py-4 my-3`}
                onClick={(e) => {
                  handleSubmitForgotPass(e);
                }}
              >
                <span className="pr-2">Submit</span>
                {loader && (
                  <div class="spinner-grow text-light" role="status">
                    <span class="sr-only">Loading...</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </>
    </>
  );
}

export default ForgotPassword;
