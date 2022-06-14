import React, { useState, useEffect } from "react";
import "./personalDetails.scss";
import DownIcon from "../../../../assets/icons/select-down.svg";
import ProfileImage from "../../../../assets/images/profile.png";
import DragAndDrop from "../../../../assets/images/darg-and-drop.png";
import { Country, State, City } from "country-state-city";

export default function PersonalDetails(props) {
  const { pageChange, setPageChange, inputValue, setInputValue } = props;
  const [errors, setErrors] = useState({});
  const [getCountries, setGetCountries] = useState(Country.getAllCountries());
  const [getStates, setGetStates] = useState(State.getAllStates());
  const [filterState, setFilterState] = useState(State.getAllStates());

  useEffect(() => {
    let filteredData = getStates.filter(
      (item) => item?.countryCode === inputValue?.country
    );
    setFilterState(filteredData);
  }, [inputValue]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleOnChnageAddImg = (e) => {
    const { name } = e.target;
    setInputValue({ ...inputValue, [name]: e.target.files[0] });
    setErrors({ ...errors, [name]: "" });
  };

  console.log("inputValue", inputValue);

  const handleOnContinue = () => {
    // if (validationForProfile()) {
      setPageChange(2);
    // }
  };

  const validationForProfile = () => {
    let isFormValid = true;
    let errors = {};

    if (inputValue && !inputValue?.firstName) {
      isFormValid = false;
      errors["firstName"] = "Please enter your firstName!";
    }
    if (inputValue && !inputValue?.lastName) {
      isFormValid = false;
      errors["lastName"] = "Please enter your lastName!";
    }
    if (inputValue && !inputValue?.country && inputValue?.country === "" ) {
      isFormValid = false;
      errors["country"] = "Please enter your country!";
    }
    if (inputValue && !inputValue?.state && inputValue?.state != "" ) {
      isFormValid = false;
      errors["state"] = "Please enter your state!";
    }
    if (inputValue && !inputValue?.businessemail) {
      isFormValid = false;
      errors["businessemail"] = "Please enter your businessemail!";
    }
    if (inputValue && !inputValue?.businessaddress) {
      isFormValid = false;
      errors["businessaddress"] = "Please enter your businessaddress!";
    }
    if (inputValue && !inputValue?.image) {
      isFormValid = false;
      errors["image"] = "Please enter your image!";
    }
    if (inputValue && !inputValue?.description) {
      isFormValid = false;
      errors["description"] = "Please enter your description!";
    }
    console.log("errors", errors);
    setErrors(errors);
    return isFormValid;
  };

  return (
    <div>
      <div className="personal-details-section-alignment">
        <div className="form-box">
          <div className="input-grid">
            <div className="input-grid-items">
              <div className="form-control">
                <label>
                  First Name<a>*</a>
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder="John"
                    name="firstName"
                    value={inputValue?.firstName}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {errors["firstName"]}
                </span>
              </div>
            </div>
            <div className="input-grid-items">
              <div className="form-control">
                <label>
                  Last Name<a>*</a>
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    placeholder="Smith"
                    name="lastName"
                    value={inputValue?.lastName}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {errors["lastName"]}
                </span>
              </div>
            </div>
            <div className="input-grid-items">
              <div className="form-control">
                <label>
                  Country<a>*</a>
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div className="select-relative">
                    <select
                      name="country"
                      id="country"
                      value={inputValue?.country}
                      onChange={(e) =>
                        setInputValue((prevData) => ({
                          ...prevData,
                          country: e.target.value,
                        }))
                      }
                    >
                      <option value="Please Select" selected>
                        Please Select
                      </option>
                      {getCountries?.length > 0 &&
                        getCountries?.map((item) => {
                          return (
                            <>
                              <option value={item?.isoCode}>
                                {item?.name}
                              </option>
                            </>
                          );
                        })}
                    </select>
                    <div className="icon-alignment">
                      <img src={DownIcon} alt="DownIcon" />
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {inputValue?.country &&
                    (!inputValue?.country ||
                    inputValue?.country === "Please Select") &&
                      errors["country"]}
                </span>
              </div>
            </div>
            <div className="input-grid-items">
              <div className="form-control">
                <label>
                  State<a>*</a>
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div className="select-relative">
                    <select
                      name="state"
                      id="state"
                      value={inputValue?.state}
                      onChange={(e) =>
                        setInputValue((prevData) => ({
                          ...prevData,
                          state: e.target.value,
                        }))
                      }
                    >
                      <option value="Please Select" selected>
                        Please Select
                      </option>
                      {filterState.length > 0 &&
                        filterState.map((item) => {
                          return (
                            <>
                              <option>{item?.name}</option>
                            </>
                          );
                        })}
                    </select>
                    <div className="icon-alignment">
                      <img src={DownIcon} alt="DownIcon" />
                    </div>
                  </div>
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {errors["state"]}
                </span>
              </div>
            </div>
            <div className="input-grid-items">
              <div className="form-control">
                <label>
                  Primary Business Email<a>*</a>
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    // placeholder="aa"
                    name="businessemail"
                    value={inputValue?.businessemail}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {errors["businessemail"]}
                </span>
              </div>
            </div>
            <div className="input-grid-items">
              <div className="form-control">
                <label>
                  Business Address<a>*</a>
                </label>
                <div className="col-lg-9 col-xl-6">
                  <input
                    type="text"
                    // placeholder="aa"
                    name="businessaddress"
                    value={inputValue?.businessaddress}
                    onChange={(e) => handleOnChange(e)}
                  />
                </div>
                <span
                  style={{
                    color: "red",
                    top: "5px",
                    fontSize: "12px",
                  }}
                >
                  {errors["businessaddress"]}
                </span>
              </div>
            </div>
          </div>
          <div className="profile-upload-section-alignment">
            <div className="form-control">
              <label>
                Profile Picture<a>*</a>
              </label>
            </div>
            <div className="col-lg-9 col-xl-6">
              <div className="image-grid">
                <div className="image-grid-items">
                  <div>
                    <div className="image-center-alignment">
                      <img src={DragAndDrop} alt="DragAndDrop" />
                    </div>
                    <div className="button-relative">
                      <button>
                        <span>Browse</span>
                        <input
                          type="file"
                          className={`form-control form-control-lg form-control-solid `}
                          name="image"
                          // value={productValues.image || null}
                          onChange={(e) => {
                            handleOnChnageAddImg(e);
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="image-grid-items">
                  <div className="upload-image-style">
                    {inputValue?.image && (
                      <img
                        style={{ height: "128px", width: "128px" }}
                        src={URL.createObjectURL(inputValue?.image)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <span
              style={{
                color: "red",
                top: "5px",
                fontSize: "12px",
              }}
            >
              {errors["image"]}
            </span>
          </div>
          <div className="description-section-alignment">
            <div className="form-control">
              <label>
                Description<a>*</a>
              </label>
              <div className="col-lg-9 col-xl-6">
                <textarea
                  placeholder="Shareabit about your work experience,cool projects"
                  name="description"
                  value={inputValue?.description}
                  onChange={(e) => handleOnChange(e)}
                ></textarea>
              </div>
              <span
                style={{
                  color: "red",
                  top: "5px",
                  fontSize: "12px",
                }}
              >
                {errors["description"]}
              </span>
            </div>
          </div>
          <div className="medium-button">
            <button onClick={() => handleOnContinue()}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
