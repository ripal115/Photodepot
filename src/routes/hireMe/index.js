import React, { useState, useEffect } from "react";
import "./hireMe.scss";
import DownArrow from "../../assets/icons/select-down.svg";
import ProfileImage from "../../assets/images/profile.png";
import DragAndDrop from "../../assets/images/darg-and-drop.png";
import { ApiGet } from "../../helpers/API/ApiData";
import { toast } from "react-toastify";

export default function HireMe() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    })
  }, [])

  const [hireData, setHireData] = useState();
  const [pictures, setPictures] = useState([]);
  const [errors, setErrors] = useState();
  const [allServices, setAllServices] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setHireData({ ...hireData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleOnChnageAddImg = (e) => {
    const { name } = e.target;
    setHireData({ ...hireData, [name]: e.target.files[0] });
    setErrors({ ...errors, [name]: "" });
  };

  console.log("allServices", allServices);

  const getAllServices = async () => {
    await ApiGet(`service/getService?isActive=true`)
      .then((res) => {
        console.log("getServices", res?.data?.payload?.token);
        setAllServices(res?.data?.payload?.token);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    getAllServices();
  }, []);

  console.log("hireData", hireData);

  return (
    <div>
      <div className="hire-me-section-alignment">
        <div className="container">
          <div className="hire-me-box-design">
            <div className="first-box-content-alignment">
              <div className="service-select">
                <div className="form-control">
                  <label>Service</label>
                  <div className="select-relative">
                    <select
                      id="service"
                      name="service"
                      value={hireData?.service}
                      onChange={(e) => handleOnChange(e)}
                    >
                      <option selected>Please Select</option>
                     {allServices?.length > 0 &&
                allServices.map((item) => {
                  return (
                    <>
                    <option>{item?.name}</option>
                    </>
                  );
                })}
                    </select>
                    <div className="select-icon-alignment">
                      <img src={DownArrow} alt="DownArrow" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="add-more-service-align">
                <div className="fill-button">
                  <button>Add more Service</button>
                </div>
              </div>
            </div>
            <div className="hire-now-profile-alignment">
              <div className="profile-upload-section-alignment">
                <div className="form-control">
                  <label>Company Logo</label>
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
                        //   multiple
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
                  <div>
                    {hireData?.image && (
                      <img
                        style={{ height: "128px", width: "128px" }}
                        src={URL.createObjectURL(hireData?.image)}
                      />
                    )}
                  </div>
                  {/* <div className='image-grid-items'>
                                    <div className='upload-image-style'>
                                        <img src={ProfileImage} alt="ProfileImage"/>
                                    </div>
                                </div> */}
                </div>
              </div>
            </div>
            <div className="description-section-alignment">
              <div className="form-control">
                <label>Description</label>
                <textarea
                  placeholder="Add description about your test job"
                  name="description"
                  value={hireData?.description}
                  onChange={(e) => handleOnChange(e)}
                ></textarea>
              </div>
            </div>
            <div className="medium-button">
              <button>Pay now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
