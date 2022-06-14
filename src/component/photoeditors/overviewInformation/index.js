import React, { useState, useEffect } from "react";
import "./overviewInformation.scss";
// import DataTable, { defaultThemes } from "react-data-table-component";
import EditIcon from "../../../assets/icons/edit.svg";
import DeleteIcon from "../../../assets/icons/delete.svg";
import ShortImage from "../../../assets/images/short.png";
import DragAndDrop from "../../../assets/images/darg-and-drop.png";
import { ApiGet, ApiPost } from "../../../helpers/API/ApiData";
import { toast } from "react-toastify";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

export default function OverviewInformation(props) {
  const { setPageChange, inputValue, setInputValue } = props;
  const [allServices, setAllServices] = useState();
  const [serviceInput, setServiceInput] = useState({});
  const [errors, setErrors] = useState();
  const [selectedDropItem, setSelectedDropItem] = useState(true);
  const [serviceDropDown, setServiceDropDown] = useState(false);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [customService, setCustomService] = useState();
  const [selectedItem, setSelectedItem] = useState(inputValue?.service);
  const [selectedservicceId, setSelectedservicceId] = useState("");
  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [editorService, setEditorService] = useState([]);

  const handleOnChnageAddImg = (e) => {
    const { name } = e.target;
    setServiceInput({ ...serviceInput, [name]: e.target.files[0] });
    setInputValue({ ...inputValue, [name]: e.target.files[0] });
    setErrors({ ...errors, [name]: "" });
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const handleEditorChange = (value) => {
    setInputValue({ ...inputValue, editorvalue: value });
  };

  const handleAddService = (e) => {
    const { name, value } = e.target;
    setServiceInput({ ...serviceInput, [name]: value });
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  useEffect(() => {
    console.log("selectedItem", selectedItem);
    setInputValue({ ...inputValue, ["service"]: selectedItem });
  }, [selectedItem]);

  const handleAddCustomService = (e) => {
    const { name, value } = e.target;
    setCustomService({ ...customService, [name]: value });
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const addCustomService = async (e) => {
    let data = {
      name: customService.customService,
      description: customService.customService,
      aid: userInfo?.id,
    };
    console.log("data", data);
    await ApiPost(`service/addService`, data)
      .then((res) => {
        if (res?.status === 200) {
          console.log("addServices", res);
          setServiceDropDown(false);
          setSelectedDropItem(true);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const getAllServices = async () => {
    await ApiGet(`service/getService`)
      .then((res) => {
        console.log("getServices", res?.data?.payload?.token);
        setAllServices(res?.data?.payload?.token);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  console.log("inputValue", inputValue);
  console.log("serviceInput", serviceInput);
  // console.log("customService", customService.customService);
  console.log("selectedservicceId", selectedservicceId);

  const addService = async (e) => {
    let data = {
      serviceName: selectedservicceId,
      profileTitle: inputValue?.profileTitle,
      price: inputValue?.servicePrice,
      description: inputValue?.serviceDescription,
      profileDescription: inputValue?.editorvalue,
      uid: userInfo?.id,
    };
    console.log("data", data);
    await ApiPost(`editorService/addEditorService`, data)
      .then((res) => {
        if (res?.status === 200) {
          console.log("addServices", res);
          setServiceDropDown(false);
          setSelectedDropItem(true);
        } else {
          toast.error(res?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  const getService = async () => {
    await ApiGet(`editorService/getEditorService`)
      .then((res) => {
        console.log("getServicesssss", res?.data?.payload?.hire);
        setEditorService(res?.data?.payload?.hire);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    getAllServices();
    getService();
  }, []);

  return (
    <div>
      <div className="overview-information-section-alignment">
        <div className="form-box">
          <div className="input-grid">
            <div className="input-grid-items company-add-full-col">
              <div className="form-control">
                <label>Profile main Title</label>
                <input
                  type="text"
                  placeholder="Enter Your Work Title"
                  name="profileTitle"
                  value={inputValue?.profileTitle}
                  onChange={(e) => handleOnChange(e)}
                />
              </div>
            </div>
          </div>
          {/* Services added */}
          <div className="service-input-grid service-input-grid-line-remove">
            <div className="service-input-grid-items">
              <div className="sub-grid">
                {selectedDropItem === true && (
                  <>
                    <div className="sub-grid-items">
                      <div className="form-control">
                        <label>Service</label>
                        {/*--------------*/}
                        <div
                          className="mine-drop"
                          onClick={() => setDropdownMenu(!dropdownMenu)}
                        >
                          <div className="dropername">
                            {selectedItem < 1 ? (
                              <p className="selectedItem">Select Option</p>
                            ) : (
                              <p className="selectedItem">{selectedItem}</p>
                            )}
                          </div>
                          {dropdownMenu && (
                            <div className="dropdown-lists">
                              <h5
                                className="custom-service"
                                onClick={() => (
                                  setServiceDropDown(true),
                                  setSelectedDropItem(false)
                                )}
                              >
                                + Add Customs Service
                              </h5>
                              {allServices?.map((item) => {
                                return (
                                  <h5
                                    className="drop-item"
                                    onClick={() => {
                                      setSelectedItem(item?.name);
                                      setSelectedservicceId(item?._id);
                                    }}
                                  >
                                    {item?.name}
                                  </h5>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="sub-grid-items">
                      <div className="form-control">
                        <label>Price</label>
                        <input
                          type="text"
                          name="servicePrice"
                          placeholder="Price"
                          value={inputValue?.servicePrice}
                          onChange={(e) => handleAddService(e)}
                        />
                      </div>
                    </div>
                  </>
                )}
                {serviceDropDown === true && (
                  <>
                    <div className="sub-grid-items">
                      <div className="form-control">
                        <label>Service</label>
                        <input
                          type="text"
                          placeholder="Custom Service"
                          name="customService"
                          id="service"
                          value={customService?.customService}
                          onChange={(e) => handleAddCustomService(e)}
                        />
                      </div>
                    </div>
                    <div className="sub-grid-items custom-add">
                      <div className="form-control">
                        <div className="medium-button">
                          <button onClick={(e) => addCustomService(e)}>
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="description-section-alignment">
            <div className="form-control">
              <label>
                Description<a>*</a>
              </label>
              <textarea
                placeholder="Shareabit about your work experience,cool projects"
                name="serviceDescription"
                value={inputValue?.serviceDescription}
                onChange={(e) => handleAddService(e)}
              ></textarea>
            </div>
          </div>
          <div className="profile-upload-section-alignment">
            <div className="form-control">
              <label>
                Service Imge<a>*</a>
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
                        name="serviceimage"
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
                  {inputValue?.serviceimage && (
                    <img
                      style={{ height: "128px", width: "128px" }}
                      src={URL.createObjectURL(inputValue?.serviceimage)}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="add-col-button">
            <div className="medium-button">
              <button onClick={(e) => addService(e)}>Add</button>
            </div>
          </div>
        </div>

        <div className="service-show-table">
          <table>
            <tr>
              <th align="left">Service</th>
              <th align="left">Service</th>
              <th align="left">Price</th>
              <th align="left">Description</th>
              <th align="right">Add New</th>
            </tr>
            {editorService?.map((service) => {
              console.log("serviceeee", service);
              return (
                <>
                  <tr>
                    <td>
                      <div className="images-alignment">
                        <img src={ShortImage} alt="ShortImage" />
                        <img src={ShortImage} alt="ShortImage" />
                        <img src={ShortImage} alt="ShortImage" />
                      </div>
                    </td>
                    <td>{service?.profileTitle}</td>
                    <td>$ {service?.price}</td>
                    <td>{service?.description}</td>
                    <td>
                      <div className="icon-right-alignment-table">
                        <img src={EditIcon} alt="EditIcon" />
                        <img src={DeleteIcon} alt="DeleteIcon" />
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </table>
        </div>

        {/* ------------------ */}
        <div className="description-section-alignment">
          <div className="form-control">
            <label>Profile Description</label>
            <ReactQuill
              name="profileDescription"
              value={inputValue?.editorvalue || ""}
              placeholder="Shareabit about your work experience,cool projects"
              onChange={handleEditorChange}
            />
          </div>
        </div>
        <div className="all-button-same-alignment">
          <div className="medium-button">
            <button onClick={() => setPageChange(2)}>Previous</button>
          </div>
          <div className="medium-button">
            <button onClick={() => setPageChange(4)}>Continue</button>
          </div>
        </div>
      </div>
    </div>
  );
}
