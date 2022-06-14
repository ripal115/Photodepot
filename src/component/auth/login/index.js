import React, { useState, useEffect } from "react";
import Logo from "../../logo";
import "./login.scss";
import EmailIcon from "../../../assets/icons/email.svg";
import { ApiPost } from "../../../helpers/API/ApiData";
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import * as authUtil from "../../../utils/auth.util";
import * as userUtil from "../../../utils/user.util";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [inputValue, setInputValue] = useState({});
  const [errors, setErrors] = useState({});
  const history = useHistory();

  let userInfo = authUtil.getToken();
  if (userInfo) {
    history.push("/");
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  console.log("inputValue", inputValue);
  console.log("eroors", errors);

  const validationForLogin = () => {
    console.log("efjfjj");
    let isFormValid = true;
    let errors = {};

    if (inputValue && !inputValue?.email) {
      isFormValid = false;
      errors["email"] = "Please enter your email!";
    }
    if (inputValue && !inputValue?.password) {
      isFormValid = false;
      errors["password"] = "Please enter your password!";
    }
    setErrors(errors);
    return isFormValid;
  };

  const handleLogin = async (e) => {
    if (validationForLogin()) {
      await ApiPost(`admin/login`, inputValue)
        .then((res) => {
          console.log("userlogin", res);
          if (res?.status === 200) {
            if (res?.data.result >= 0) {
              authUtil.setToken(res?.data?.payload?.token);
              userUtil.setUserInfo(res?.data?.payload?.admin);
              toast.success(res?.data?.message);
              console.log(
                "rolename",
                res?.data?.payload?.admin?.role?.roleName
              );
              if (res?.data?.payload?.admin?.role?.roleName === "photoeditor") {
                history.push("/photoeditors/personal-info");
              } else {
                history.push("/");
              }
            } else {
              toast.error(res?.data.message);
            }
          } else {
            console.log("eeeeeeee", toast.error);
            toast.error(res?.data?.message);
            toast.error("Something wants wrong");
          }
        })
        .catch((err) => {
          console.log("err", err);
          // toast.error(err?.response.data.message);
        });
    }
  };

  return (
    <div>
      <div className="login-banner">
        <ToastContainer />
        <div className="container">
          <div className="auth-box-center-alignment">
            <div className="auth-box">
              <div className="logo-center-alignment">
                <Logo />
              </div>
              <div className="login-text-style">
                <h1>
                  <span>Log in to</span> Photo depot
                </h1>
              </div>
              <div className="input">
                <input
                  type="text"
                  placeholder="photodepot@gmail.com"
                  name="email"
                  value={inputValue?.email}
                  onChange={(e) => handleOnChange(e)}
                />
                <span className="input-error-message-style">
                  {errors.email}
                </span>
                <div className="icon-alignment">
                  <svg
                    width="22"
                    height="17"
                    viewBox="0 0 22 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.8889 1H2.11111C1.49746 1 1 1.47969 1 2.07143V14.9286C1 15.5203 1.49746 16 2.11111 16H19.8889C20.5025 16 21 15.5203 21 14.9286V2.07143C21 1.47969 20.5025 1 19.8889 1Z"
                      stroke="#CCCCCC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M1 3L11 9L21 3"
                      stroke="#CCCCCC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="input">
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={inputValue?.password}
                  onChange={(e) => handleOnChange(e)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin(e)}
                />
                <span className="input-error-message-style">
                  {errors.password}
                </span>
                <div className="icon-alignment">
                  <svg
                    width="22"
                    height="17"
                    viewBox="0 0 22 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.8889 1H2.11111C1.49746 1 1 1.47969 1 2.07143V14.9286C1 15.5203 1.49746 16 2.11111 16H19.8889C20.5025 16 21 15.5203 21 14.9286V2.07143C21 1.47969 20.5025 1 19.8889 1Z"
                      stroke="#CCCCCC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                    <path
                      d="M1 3L11 9L21 3"
                      stroke="#CCCCCC"
                      stroke-width="1.5"
                      stroke-linecap="round"
                    />
                  </svg>
                </div>
                <div className="right-icon-alignment">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.33333 9.53C8.95896 9.9539 8.76029 10.5046 8.77781 11.0699C8.79532 11.6351 9.02771 12.1725 9.42761 12.5724C9.82752 12.9723 10.3649 13.2047 10.9301 13.2222C11.4954 13.2397 12.0461 13.041 12.47 12.6667M1 1L21 21L1 1Z"
                      stroke="#CCCCCC"
                      stroke-width="1.875"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M5.88466 6C4.00112 7.3553 2.43225 9.28652 1 11.1028C3.11534 14.541 6.91489 18 11.0784 18C12.8141 18 14.486 17.3988 16 16.4481"
                      stroke="#CCCCCC"
                      stroke-width="1.875"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11 4C15.4533 4 18.4456 7.36853 21 10.4C20.6339 10.9555 20.2339 11.4898 19.8022 12"
                      stroke="#CCCCCC"
                      stroke-width="1.875"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="remember-alignment">
                <div>
                  <input type="checkbox" />
                  <label>Remember Me</label>
                </div>
                <div>
                  <a>Forgot Password?</a>
                </div>
              </div>
              <div className="fill-button">
                <button onClick={(e) => handleLogin(e)}>Login</button>
              </div>
              <div className="account-text">
                <span>Don't have an Photo depot account?</span>
              </div>
              {/* {() => {
                if (userInfo?.role.roleName) { */}
              <div className="outline-button">
                <a href="/sign-up">
                  <button>Sign Up</button>
                </a>
              </div>
              {/* }else {
                  
                }
              }} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
