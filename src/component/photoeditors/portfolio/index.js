import React, { useState } from "react";
import "./portfolio.scss";
import DownIcon from "../../../assets/icons/select-down.svg";
import CloseIcon from "../../../assets/icons/close-file.svg";
import ProfileImage from "../../../assets/images/profile.png";
import DragAndDrop from "../../../assets/images/darg-and-drop.png";
import { toast } from "react-toastify";
import { ApiPost, ApiPut } from "../../../helpers/API/ApiData";
import { useHistory } from "react-router-dom";

export default function Portfolio(props) {
  const { setPageChange, inputValue, setInputValue } = props;

  const userInfo = JSON.parse(localStorage.getItem("userinfo"));
  const [errors, setErrors] = useState();
  const history = useHistory();

  const handleOnChnageAddImg = (e) => {
    const { files } = e.target;
    console.log("filesssss", validateSize(files));
    if (validateSize(files)) {
      setInputValue({
        ...inputValue,
        files: [...inputValue?.files, ...e.target.files],
        data: [...inputValue?.data],
      });
      // setInputValueData((item) => [...item, ...e.target.files]);
    }
  };

  const handleOnChange = (e) => {
    const { data } = e.target;
    console.log("dataaaaayy", validateSize(data));
    if (validateSizeForVideo(data)) {
      setInputValue({
        ...inputValue,
        files: [...inputValue?.files],
        data: [...inputValue?.data, ...e.target.files],
      });
    }
  };

  const handleRemoveImage = (index) => {
    console.log("inputValuemmm", inputValue.files);
    console.log("indexxxx", index);
    let data = inputValue?.files?.filter((item, i) => {
      return i != index;
    });

    console.log("darreee", data);
    setInputValue({ files: [...data], data: [...inputValue?.data] });
  };
  const handleRemoveVideo = (index) => {
    console.log("inputValuemmm", inputValue.data);
    let data = inputValue?.data?.filter((item, i) => {
      return i != index;
    });
    console.log("darreee", data);
    setInputValue({ files: [...inputValue?.files], data: [...data] });
  };

  function validateSize(files) {
    if (files?.length > 2 || inputValue?.files.length > 2) {
      toast.error("Only 2 files accepted!");
      return false;
    }
    return true;
  }
  function validateSizeForVideo(data) {
    if (data?.length > 2 || inputValue?.data.length > 1) {
      toast.error("Only 2 files accepted!");
      return false;
    }
    return true;
  }

  const handlePublishImage = async () => {
    let formData = new FormData();
    Array.from(inputValue?.files).forEach((file) => {
      formData.append("image", file);
    });
    console.log("dataimage", formData);
    await ApiPost(`admin/addImage/${userInfo._id}`, formData)
      .then((res) => {
        console.log("addPhoto", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handlePublishVideo = async () => {
    let formData = new FormData();
    Array.from(inputValue?.data).forEach((file) => {
      formData.append("video", file);
    });
    console.log("datavideo", formData);
    await ApiPost(`admin/addVideo/${userInfo?._id}`, formData)
      .then((res) => {
        console.log("addVideo", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleOnPublishData = async () => {
    let formData = new FormData();
    formData.append("firstName", inputValue?.firstName);
    formData.append("lastName", inputValue?.lastName);
    formData.append("country", inputValue?.country);
    formData.append("state", inputValue?.state);
    formData.append("businessEmail", inputValue?.businessemail);
    formData.append("businessAddress", inputValue?.businessaddress);
    formData.append("profilePhoto", inputValue?.image);
    formData.append("aboutMe", inputValue?.description);
    formData.append("companyName", inputValue?.displayName);
    formData.append("companyPhoto", inputValue?.dispalyLogo);
    formData.append("noOfEditors", inputValue?.editors);
    console.log("data", formData);
    await ApiPut(`admin/updateAdmin/${userInfo?._id}`, formData)
      .then((res) => {
        console.log("updateAdmin", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleOnPublish = () => {
    let data = handleOnPublishData();
    let data1 = handlePublishImage();
    let data2 = handlePublishVideo();
    // history.push("/")
  };

  console.log("inputValue", inputValue);

  return (
    <div>
      <div className="portfolio-infor-section-alignment">
        <div className="form-box">
          <div className="profile-upload-style">
            <div className="profile-upload-section-alignment">
              <div className="form-control">
                <label>
                  Image<a>*</a>
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
                          name="image"
                          multiple
                          accept="image/png, image/gif, image/jpeg"
                          // value={productValues.image || null}
                          onChange={(e) => {
                            handleOnChnageAddImg(e);
                          }}
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {inputValue?.files?.map((item, index) => {
                  return (
                    // console.log("item",item)
                    <div className="image-grid-items">
                      {inputValue?.files?.length !== 0 && (
                        <img
                          className="closeIcon"
                          src={CloseIcon}
                          alt="crossicon"
                          onClick={() => handleRemoveImage(index)}
                        ></img>
                      )}

                      <div className="upload-image-style">
                        <img
                          style={{ height: "128px", width: "128px" }}
                          src={URL.createObjectURL(item)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="profile-upload-section-alignment">
              <div className="form-control">
                <label>
                  Video<a>*</a>
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
                          name="video"
                          // value={productValues.image || null}
                          onChange={(e) => {
                            handleOnChange(e);
                          }}
                          accept="video/mp4,video/x-m4v,video/*"
                        />
                      </button>
                    </div>
                  </div>
                </div>
                {inputValue?.data.map((item, index) => {
                  return (
                    <div className="image-grid-items">
                      {inputValue?.data?.length !== 0 && (
                        <img
                          className="closeIcon"
                          src={CloseIcon}
                          alt="crossicon"
                          onClick={() => handleRemoveVideo(index)}
                        ></img>
                      )}
                      <div className="upload-image-style">
                        <video
                          controls
                          style={{ height: "128px", width: "128px" }}
                          src={URL.createObjectURL(item)}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="all-button-same-alignment">
            <div className="medium-button">
              <button onClick={() => setPageChange(3)}>Previous</button>
            </div>
            <div className="medium-button">
              <button onClick={(e) => handleOnPublish(e)}>Publish</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
