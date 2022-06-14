import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import "./signup.scss";
import Logo from "../../logo/index";
import { ApiPost } from "../../../helpers/API/ApiData";
import { toast, ToastContainer } from "react-toastify";
export default function SignUp() {

const [inputValue, setInputValue] = useState({})
const [errors, setErrors] = useState({})
const history = useHistory();


const handleOnChange = (e) => {
  const {name,value} = e.target;
  setInputValue({...inputValue, [name]:value});
  setErrors({...errors, [name] : ""});
}

console.log("errors",errors)

const validateforSignupData = () => {
  console.log("efjfjj");
  let isFormValid = true;
  let errors = {};

  if (inputValue && !inputValue?.firstname) {
    isFormValid = false;
    errors["firstname"] = "Please enter your name!";
  }
  if (inputValue && !inputValue?.lastname) {
    isFormValid = false;
    errors["lastname"] = "Please enter your lastname!";
  }
  if (inputValue && !inputValue?.email) {
    isFormValid = false;
    errors["email"] = "Please enter your email!";
  }
  if (inputValue && !inputValue?.password) {
    isFormValid = false;
    errors["password"] = "Please enter your password!";
  }
  if (inputValue && !inputValue?.cpassword) {
    isFormValid = false;
    errors["cpassword"] = "Please enter your confirm password!";
  }
  console.log("firstllll",errors)
  setErrors(errors);
  return isFormValid;
};

const handleSubmit = async (e) => {
  // setLoader(true);
  e.preventDefault();
  let data = {
    email: inputValue?.email,
    password: inputValue?.password,
    // cpassword: inputValue?.cpassword,
    firstName: inputValue?.firstname,
    lastName: inputValue?.lastname,
    role: "628323dcbb6a3e0cac847a09"
  };
  console.log("signup data",data)
  if (validateforSignupData()) {
    await ApiPost("admin/signup",data)
      .then((res) => {
          console.log("signup",res);
          if (res?.status === 200) {
              console.log("ifff");
              toast.success(res?.data.message)
              history.push("/login");
          }
      })
      .catch((err) => {
        console.log("err--------->", err);
      });
  }
};

console.log("inputValue",inputValue)

  return (
    <div className="signup-banner">
      <ToastContainer />
      <div className="container">
        <div className="auth-box-center-alignment">
          <div className="auth-box-signup">
            <div className="logo-center-alignment">
              <Logo />
            </div>
            <div className="login-text-style">
              <h1>
                <span>Sign Up to</span> Photo depot
              </h1>
            </div>
            <div className="input-grid">
              <div className="input-grid-items">
                <div className="input">
                  <input 
                  type="text" 
                  placeholder="First name"
                  name="firstname"
                  value={inputValue?.firstname}
                  onChange={(e) => handleOnChange(e)}
                  />
                
                  <div className="icon-alignment">
                      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.7978 17.3883C18.3188 16.2538 17.6238 15.2232 16.7513 14.3541C15.8815 13.4825 14.8512 12.7875 13.7171 12.3076C13.707 12.3025 13.6968 12.3 13.6867 12.2949C15.2685 11.1523 16.2968 9.29121 16.2968 7.19141C16.2968 3.71289 13.4785 0.894531 9.99994 0.894531C6.52143 0.894531 3.70307 3.71289 3.70307 7.19141C3.70307 9.29121 4.73139 11.1523 6.31322 12.2975C6.30307 12.3025 6.29291 12.3051 6.28275 12.3102C5.14525 12.79 4.12455 13.4781 3.24857 14.3566C2.37694 15.2264 1.68198 16.2568 1.20209 17.3908C0.730642 18.501 0.47638 19.6913 0.453066 20.8973C0.452389 20.9244 0.457142 20.9513 0.467046 20.9766C0.47695 21.0018 0.491805 21.0248 0.510735 21.0442C0.529664 21.0636 0.552286 21.079 0.577268 21.0895C0.602249 21.1001 0.629084 21.1055 0.656191 21.1055H2.17963C2.29135 21.1055 2.38022 21.0166 2.38275 20.9074C2.43354 18.9473 3.22064 17.1115 4.61205 15.7201C6.0517 14.2805 7.96361 13.4883 9.99994 13.4883C12.0363 13.4883 13.9482 14.2805 15.3878 15.7201C16.7792 17.1115 17.5663 18.9473 17.6171 20.9074C17.6197 21.0191 17.7085 21.1055 17.8203 21.1055H19.3437C19.3708 21.1055 19.3976 21.1001 19.4226 21.0895C19.4476 21.079 19.4702 21.0636 19.4891 21.0442C19.5081 21.0248 19.5229 21.0018 19.5328 20.9766C19.5427 20.9513 19.5475 20.9244 19.5468 20.8973C19.5214 19.6836 19.2701 18.5029 18.7978 17.3883Z" fill="#CCCCCC"/>
                      </svg>
                  </div>
                </div>
                <span className="input-error-message-style">{errors.firstname}</span>
              </div>  
              <div className="input-grid-items">
                <div className="input">
                  <input 
                  type="text" 
                  placeholder="Last name" 
                  name="lastname"
                  value={inputValue?.lastname}
                  onChange={(e) => handleOnChange(e)}
                  />

                  <div className="icon-alignment">
                      <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M18.7978 17.3883C18.3188 16.2538 17.6238 15.2232 16.7513 14.3541C15.8815 13.4825 14.8512 12.7875 13.7171 12.3076C13.707 12.3025 13.6968 12.3 13.6867 12.2949C15.2685 11.1523 16.2968 9.29121 16.2968 7.19141C16.2968 3.71289 13.4785 0.894531 9.99994 0.894531C6.52143 0.894531 3.70307 3.71289 3.70307 7.19141C3.70307 9.29121 4.73139 11.1523 6.31322 12.2975C6.30307 12.3025 6.29291 12.3051 6.28275 12.3102C5.14525 12.79 4.12455 13.4781 3.24857 14.3566C2.37694 15.2264 1.68198 16.2568 1.20209 17.3908C0.730642 18.501 0.47638 19.6913 0.453066 20.8973C0.452389 20.9244 0.457142 20.9513 0.467046 20.9766C0.47695 21.0018 0.491805 21.0248 0.510735 21.0442C0.529664 21.0636 0.552286 21.079 0.577268 21.0895C0.602249 21.1001 0.629084 21.1055 0.656191 21.1055H2.17963C2.29135 21.1055 2.38022 21.0166 2.38275 20.9074C2.43354 18.9473 3.22064 17.1115 4.61205 15.7201C6.0517 14.2805 7.96361 13.4883 9.99994 13.4883C12.0363 13.4883 13.9482 14.2805 15.3878 15.7201C16.7792 17.1115 17.5663 18.9473 17.6171 20.9074C17.6197 21.0191 17.7085 21.1055 17.8203 21.1055H19.3437C19.3708 21.1055 19.3976 21.1001 19.4226 21.0895C19.4476 21.079 19.4702 21.0636 19.4891 21.0442C19.5081 21.0248 19.5229 21.0018 19.5328 20.9766C19.5427 20.9513 19.5475 20.9244 19.5468 20.8973C19.5214 19.6836 19.2701 18.5029 18.7978 17.3883Z" fill="#CCCCCC"/>
                      </svg>
                  </div>
                </div>
                <span className="input-error-message-style">{errors.lastname}</span>
              </div>
            </div>
            <div className="input">
              <input 
              type="text" 
              placeholder="photodepot@gmail.com" 
              name="email"
              value={inputValue?.email}
              onChange={(e) => handleOnChange(e)}
              />
                <span className="input-error-message-style">{errors.email}</span>

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
              />
                <span className="input-error-message-style">{errors.password}</span>

              <div className="icon-alignment">
                <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6364 14.7857C10.6364 15.2214 10.464 15.6393 10.1571 15.9474C9.85021 16.2555 9.43399 16.4286 9 16.4286C8.56601 16.4286 8.14979 16.2555 7.84292 15.9474C7.53604 15.6393 7.36364 15.2214 7.36364 14.7857C7.36364 14.35 7.53604 13.9321 7.84292 13.624C8.14979 13.3159 8.56601 13.1429 9 13.1429C9.43399 13.1429 9.85021 13.3159 10.1571 13.624C10.464 13.9321 10.6364 14.35 10.6364 14.7857ZM4.09091 6.57143V4.92857C4.09091 3.62143 4.60812 2.36783 5.52875 1.44355C6.44938 0.519259 7.69803 0 9 0C10.302 0 11.5506 0.519259 12.4713 1.44355C13.3919 2.36783 13.9091 3.62143 13.9091 4.92857V6.57143H15.1364C15.8958 6.57143 16.6242 6.87433 17.1613 7.4135C17.6983 7.95266 18 8.68393 18 9.44643V20.125C18 20.8875 17.6983 21.6188 17.1613 22.1579C16.6242 22.6971 15.8958 23 15.1364 23H2.86364C2.10415 23 1.37578 22.6971 0.83874 22.1579C0.301704 21.6188 0 20.8875 0 20.125V9.44643C0 8.68393 0.301704 7.95266 0.83874 7.4135C1.37578 6.87433 2.10415 6.57143 2.86364 6.57143H4.09091ZM5.72727 4.92857V6.57143H12.2727V4.92857C12.2727 4.05715 11.9279 3.22141 11.3142 2.60522C10.7004 1.98903 9.86798 1.64286 9 1.64286C8.13202 1.64286 7.29959 1.98903 6.68583 2.60522C6.07208 3.22141 5.72727 4.05715 5.72727 4.92857ZM2.86364 8.21429C2.53814 8.21429 2.22598 8.3441 1.99582 8.57517C1.76567 8.80624 1.63636 9.11964 1.63636 9.44643V20.125C1.63636 20.4518 1.76567 20.7652 1.99582 20.9963C2.22598 21.2273 2.53814 21.3571 2.86364 21.3571H15.1364C15.4619 21.3571 15.774 21.2273 16.0042 20.9963C16.2343 20.7652 16.3636 20.4518 16.3636 20.125V9.44643C16.3636 9.11964 16.2343 8.80624 16.0042 8.57517C15.774 8.3441 15.4619 8.21429 15.1364 8.21429H2.86364Z" fill="#CCCCCC"/>
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
            <div className="input">
              <input 
              type="password" 
              placeholder="Confirm Password" 
              name="cpassword"
              value={inputValue?.cpassword}
              onChange={(e) => handleOnChange(e)}
              />
              <span className="input-error-message-style">{errors.cpassword}</span>

              <div className="icon-alignment">
                <svg width="18" height="23" viewBox="0 0 18 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10.6364 14.7857C10.6364 15.2214 10.464 15.6393 10.1571 15.9474C9.85021 16.2555 9.43399 16.4286 9 16.4286C8.56601 16.4286 8.14979 16.2555 7.84292 15.9474C7.53604 15.6393 7.36364 15.2214 7.36364 14.7857C7.36364 14.35 7.53604 13.9321 7.84292 13.624C8.14979 13.3159 8.56601 13.1429 9 13.1429C9.43399 13.1429 9.85021 13.3159 10.1571 13.624C10.464 13.9321 10.6364 14.35 10.6364 14.7857ZM4.09091 6.57143V4.92857C4.09091 3.62143 4.60812 2.36783 5.52875 1.44355C6.44938 0.519259 7.69803 0 9 0C10.302 0 11.5506 0.519259 12.4713 1.44355C13.3919 2.36783 13.9091 3.62143 13.9091 4.92857V6.57143H15.1364C15.8958 6.57143 16.6242 6.87433 17.1613 7.4135C17.6983 7.95266 18 8.68393 18 9.44643V20.125C18 20.8875 17.6983 21.6188 17.1613 22.1579C16.6242 22.6971 15.8958 23 15.1364 23H2.86364C2.10415 23 1.37578 22.6971 0.83874 22.1579C0.301704 21.6188 0 20.8875 0 20.125V9.44643C0 8.68393 0.301704 7.95266 0.83874 7.4135C1.37578 6.87433 2.10415 6.57143 2.86364 6.57143H4.09091ZM5.72727 4.92857V6.57143H12.2727V4.92857C12.2727 4.05715 11.9279 3.22141 11.3142 2.60522C10.7004 1.98903 9.86798 1.64286 9 1.64286C8.13202 1.64286 7.29959 1.98903 6.68583 2.60522C6.07208 3.22141 5.72727 4.05715 5.72727 4.92857ZM2.86364 8.21429C2.53814 8.21429 2.22598 8.3441 1.99582 8.57517C1.76567 8.80624 1.63636 9.11964 1.63636 9.44643V20.125C1.63636 20.4518 1.76567 20.7652 1.99582 20.9963C2.22598 21.2273 2.53814 21.3571 2.86364 21.3571H15.1364C15.4619 21.3571 15.774 21.2273 16.0042 20.9963C16.2343 20.7652 16.3636 20.4518 16.3636 20.125V9.44643C16.3636 9.11964 16.2343 8.80624 16.0042 8.57517C15.774 8.3441 15.4619 8.21429 15.1364 8.21429H2.86364Z" fill="#CCCCCC"/>
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
            <div className="fill-button">
              <button onClick={(e) => handleSubmit(e)}>sign Up</button>
            </div>
            <div className="account-text">
              <span>Already have an Photo depot account?</span>
            </div>
            <div className="outline-button">
              <a href="/login">
                <button>Log In</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
