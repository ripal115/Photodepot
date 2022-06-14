import React, { useState, useEffect } from "react";
import EditorsFilter from "../../component/editorsFilter";
import "./editordFilter.scss";
import CardImage from "../../assets/images/card-image.png";
import FillStar from "../../assets/icons/fill-star.svg";
import OutlineStar from "../../assets/icons/outline-star.svg";
import HeartIcon from "../../assets/icons/heart.svg";
import ProfileImage from "../../assets/images/profile-image.png";
import { ApiGet } from "../../helpers/API/ApiData";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function EditordFilter() {
  const [photoEditor, setPhotoEditor] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getPhotoEditorData();
  }, []);

  console.log("photoEditor", photoEditor);

  const getPhotoEditorData = () => {
    ApiGet(`admin/get-admins?roleType=photoeditor`)
      .then((res) => {
        console.log("updateAdmin", res);
        setPhotoEditor(res?.data?.payload?.admin);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleProfile = (e, item) => {
    history.push(`/photoeditors-profile/${item?._id}`);
  };

  return (
    <div>
      <div className="editord-filter-section-alignment">
        <div className="container">
          <div className="grid">
            <div className="grid-items">
              <>
                <EditorsFilter />
              </>
            </div>
            <div className="grid-items">
              <div className="card-grid">
                {photoEditor.map((item) => {
                  return (
                    // <NavLink to={`/photoeditors-profile/${item?._id}`}>
                    <div
                      className="card-grid-items"
                      onClick={(e) => handleProfile(e, item)}
                    >
                      <div className="card-image">
                        <img src={item?.coverPhoto} alt="CardImage" />
                      </div>
                      <div className="card-details">
                        <div className="profile-section-alignment">
                          <div className="profile-section">
                            <div>
                              <img
                                src={item?.profilePhoto}
                                alt="ProfileImage"
                              />
                            </div>
                            <div>
                              <span>
                                {item?.firstName + " " + item?.lastName}
                              </span>
                              <div className="rating-alignment">
                                <img src={FillStar} alt="FillStar" />
                                <img src={FillStar} alt="FillStar" />
                                <img src={FillStar} alt="FillStar" />
                                <img src={OutlineStar} alt="OutlineStar" />
                                <img src={OutlineStar} alt="OutlineStar" />
                                <a>(3.0)</a>
                              </div>
                            </div>
                          </div>
                          <div className="like-button">
                            <img src={HeartIcon} alt="HeartIcon" />
                          </div>
                        </div>
                        <p>{item?.serviceDescription}</p>
                        <h4>
                          ₹{item?.price}/ <sub>Per hour</sub>
                        </h4>
                      </div>
                    </div>
                    // </NavLink>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
