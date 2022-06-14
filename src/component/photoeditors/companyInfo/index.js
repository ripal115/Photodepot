import React, { useState, useEffect } from "react";
import "./companyInfo.scss";
import DownIcon from "../../../assets/icons/select-down.svg";
import ProfileImage from "../../../assets/images/profile.png";
import DragAndDrop from "../../../assets/images/darg-and-drop.png";
export default function CompanyInfo(props) {
  const { setPageChange, inputValue, setInputValue } = props;

  const [errors, setErrors] = useState();

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

  console.log("props2", props);
  return (
    <div>
      <div className="company-infor-section-alignment">
        <div className="form-box">
          <div className="input-grid">
            <div className="input-grid-items">
              <div className="form-control">
                <label>Display Name</label>
                <input
                  type="text"
                  placeholder="Photo depot"
                  name="displayName"
                  value={inputValue.displayName}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
            </div>
            <div className="input-grid-items">
              <div className="form-control">
                <label>No. of Editors</label>
                <div className="select-relative">
                  <select
                    name="editors"
                    id="editors"
                    value={inputValue?.editors}
                    onChange={(e) =>
                      setInputValue((prevData) => ({
                        ...prevData,
                        editors: e.target.value,
                      }))
                    }
                  >
                    <option value="Please Select" selected>
                      Please Select
                    </option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6-10</option>
                    <option>11-20</option>
                    <option>20+</option>
                  </select>
                  <div className="icon-alignment">
                    <img src={DownIcon} alt="DownIcon" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="profile-upload-section-alignment">
            <div className="form-control">
              <label>
                Profile Picture<a>*</a>
              </label>
            </div>
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
                        name="dispalyLogo"
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
                  {inputValue?.dispalyLogo && (
                    <img
                      style={{ height: "128px", width: "128px" }}
                      src={URL.createObjectURL(inputValue?.dispalyLogo)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="all-button-same-alignment">
            <div className="medium-button">
              <button onClick={() => setPageChange(1)}>Previous</button>
            </div>
            <div className="medium-button">
              <button onClick={() => setPageChange(3)}>Continue</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
