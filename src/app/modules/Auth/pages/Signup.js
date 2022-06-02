import React, { useState } from "react"; //
import { useHistory } from "react-router-dom";
import { ApiPost } from "../../../../helpers/API/ApiData";
import { ToastContainer } from "react-toastify";
import { Link } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import "../../../../_metronic/_assets/sass/layout/_basic.scss";

export default function Signup() {
  // const [loading, setLoading] = useState(false);
  const history = useHistory();
  const [loginData, setLoginData] = useState({});
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  // const regexEmail =
  //   /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
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

  // const validation = (e) => {
  //   if (!loginData.email && !loginData.password) {
  //     setErrors({
  //       email: "*Email is required*",
  //       password: "*Password is required*",
  //       firstname: "*Firstname is required*",
  //       lastname: "*Lastname is required*",
  //       phone: "*Phone number is required*",
  //     });
  //   } else if (loginData.email === "" && loginData.password === "") {
  //     setErrors({ ...errors, email: "Email is required*" });
  //   } else if (!loginData.email || loginData.email === "") {
  //     setErrors({ ...errors, email: "Email is required*" });
  //   } else if (!loginData.email || regexEmail.test(loginData.email) === false) {
  //     setErrors({ ...errors, email: "Email is not valid*" });
  //   } else if (!loginData.password || loginData.password === "") {
  //     setErrors({ ...errors, password: "Password is required*" });
  //   } else {
  //     loginData.email = loginData.email.toLowerCase();
  //   }
  // };

  const validateforSignupData = () => {
    let isFormValid = true;
    let errors = {};

    if (loginData && !loginData?.firstname) {
      isFormValid = false;
      errors["firstname"] = "Please enter your name!";
    }
    if (loginData && !loginData?.lastname) {
      isFormValid = false;
      errors["lastname"] = "Please enter your lastname!";
    }
    if (loginData && !loginData?.email) {
      isFormValid = false;
      errors["email"] = "Please enter your email!";
    }
    if (loginData && !loginData?.password) {
      isFormValid = false;
      errors["password"] = "Please enter your password!";
    }
    if (loginData && !loginData?.phone) {
      isFormValid = false;
      errors["phone"] = "Please enter your phone!";
    }
    
    setErrors(errors);
    return isFormValid;
  };

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
    console.log("signup data",data);
    if (validateforSignupData()) {
      await ApiPost("admin/signup", data)
        .then((res) => {
            console.log("signup",res);
            if (res?.status === 200) {
                console.log("ifff");
                history.push("/auth/login");
            }
        })
        .catch((err) => {
          console.log("err--------->", err);
        });
    }
    setLoader(false);
  };

  return (
    <div className="login-form login-signin" id="kt_login_signin_form">
      <div className="text-center mb-10 mb-lg-20">
        <h3 className="font-size-h1">Admin Dashboard</h3>
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
            <span className="mx-3 spinner spinner-white"></span>
          )}
        </button>
      </div>
      <div className="d-flex justify-content-center">
          <span className="font-weight-bold text-dark-50">
            Don't have an account yet?
          </span>
          <Link
            to="/auth/login"
            className="font-weight-bold ml-2"
            id="kt_login_signup"
          >
            Sign In!
          </Link>
        </div>
      {/* <div className="d-flex justify-content-center">
          <span className="font-weight-bold text-dark-50">
            Read our <Link>Onboarding Policy</Link> here.
          </span>
        </div> */}
      {/* </form> */}

      {/*end::Form*/}
    </div>
  );
}
