import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const ViewHiredPhotoEditor = (props) => {
  const { photoEditorID } = props;
  console.log("photoEditorID", photoEditorID);
  // const getViewPhotoEditordetails = () => {
  //   ApiGet(
  //     `hire/getAllHire?photoeditor_id=${photoEditorID?.photoeditor_id?.role}`
  //   )
  //     .then((res) => {
  //       console.log("getAllHire", res?.data?.payload?.hire?.[0]);
  //       setPhotoEditorData(res?.data?.payload?.hire?.[0]);
  //       toast.success(res?.data?.message);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  console.log("photoEditorID?.image", photoEditorID?.image);

  useEffect(() => {
    // getViewPhotoEditordetails();
  }, []);

  return (
    <div className="honda-container" style={{ width: "100%" }}>
      <div className="other-information-child-text-style1">
        <h2>Project Description :</h2>
      </div>
      <div className="honda-text-grid12 honda-text-grid-border">
        <div
          className="honda-text-grid-items d-flex"
          style={{ columnGap: "20px" }}
        >
          {photoEditorID?.image?.map((res) => {
            return (
              <>
                <div class="text-center text-lg-start">
                  <div class="d-block mb-4 h-100">
                      <img
                        src={res?.media}
                        alt=""
                        height="90px"
                        width="170px"
                      />
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <div className="honda-text-grid-items">
          <span>Project Name</span>
          <p className="">{photoEditorID?.projectName}</p>
        </div>
        <div className="honda-text-grid-items">
          <span>Project Task</span>
          <p className="">{photoEditorID?.task}</p>
        </div>
        <div className="honda-text-grid-items">
          <span>Price:</span>
          <p className="">{photoEditorID?.price}</p>
        </div>
        <div className="honda-text-grid-items">
          <span>Payment Status:</span>
          <p className="">{photoEditorID?.paymentStatus}</p>
        </div>
        <div className="honda-text-grid-items">
          <span> Start date:</span>
          <p className="">
            {moment(photoEditorID?.sdate).format("Do MMMM YYYY")}
          </p>
        </div>
        <div className="honda-text-grid-items">
          <span>End date:</span>
          <p className="">
            {moment(photoEditorID?.edate).format("Do MMMM YYYY")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewHiredPhotoEditor;
