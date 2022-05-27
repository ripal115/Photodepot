import React, { useEffect, useState } from "react";
import { ApiGet } from "../../../helpers/API/ApiData";
import moment from "moment";

const HiredViewMore = (props) => {
  const { photoEditorID } = props;
  const [getAdminData, setGetAdminData] = useState();

  // const handleOnChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log("2222222", e.target.value);
  //   setGetAdminData({ ...getAdminData, [name]: value });
  //   setErrors({ ...errors, [name]: "" });
  // };
  // const handleOnDateChnage = (e) => {
  //   const { name, value } = e.target;
  //   console.log("e.atrget", value);
  //   setGetAdminData(value);
  //   // setInputValueDate({ ...inputValueDate, [name]: moment(value, "YYYY-MM-DD").format("DD-MM-YYYY") });
  //   setErrors({ ...errors, [name]: "" });
  // };

  // const handleOnChnageAddImg = (e) => {
  //   const { name } = e.target;
  //   setGetAdminData({ ...getAdminData, [name]: e.target.files[0] });
  //   setErrors({ ...errors, [name]: "" });
  // };

  const getAllAdmin = () => {
    // let formData = new FormData();
    // formData.append("profilePhoto", getAdminData?.profilePhoto);
    // formData.append("coverPhoto", getAdminData?.coverPhoto);
    // formData.append("firstName", getAdminData?.firstName);
    // formData.append("lastName", getAdminData?.lastName);
    // formData.append("email", getAdminData?.email);
    // formData.append("aboutMe",getAdminData?.aboutMe);
    // formData.append("country", getAdminData?.country);
    // formData.append("registrationDate", getAdminData?.registrationDate);
    // formData.append("serviceDescription", getAdminData?.serviceDescription);
    ApiGet(`admin/get-admin/${photoEditorID}`)
      .then((res) => {
        console.log("updateAdmin", res);
        setGetAdminData(res?.data?.payload?.admin[0]);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    getAllAdmin();
  }, []);

  return (
    <div className="honda-container">
      <div className="other-information-child-text-style1">
        <h2>Profile Information</h2>
      </div>
      <div className="honda-text-grid12 honda-text-grid-border">
        <div class="customRow">
          <div class="customCol">
            <div className="honda-text-grid-items">
              <span>Profile Image:</span>
              <img
                src={getAdminData?.profilePhoto}
                alt=""
                height="90px"
                width="170px"
              />
            </div>
          </div>
          <div class="customCol">
            <div className="honda-text-grid-items">
              <span>Cover Image:</span>
              <img
                src={getAdminData?.coverPhoto}
                alt=""
                height="90px"
                width="170px"
              />
            </div>
          </div>
        </div>

        <div className="honda-text-grid-items">
          <span>First Name:</span>
          <p
            dangerouslySetInnerHTML={{
              __html: getAdminData?.firstName,
            }}
            className=""
          />
        </div>
        <div className="honda-text-grid-items">
          <span>Last Name:</span>
          <p
            dangerouslySetInnerHTML={{
              __html: getAdminData?.lastName,
            }}
            className=""
          />
        </div>
        <div className="honda-text-grid-items">
          <span>Email:</span>
          <p
            dangerouslySetInnerHTML={{
              __html: getAdminData?.email,
            }}
            className=""
          />
        </div>
        <div className="honda-text-grid-items">
          <span>About Me:</span>
          <p
            dangerouslySetInnerHTML={{
              __html: getAdminData?.aboutMe,
            }}
            className=""
          />
        </div>
        <div className="honda-text-grid-items">
          <span>Country:</span>
          <p className=""> {getAdminData?.country}</p>
        </div>
        <div className="honda-text-grid-items">
          <span>Registration Date:</span>
          <p className="">
            {moment(getAdminData?.registrationDate).format("Do MMMM YYYY")}
          </p>
        </div>
        <div className="honda-text-grid-items">
          <span>Services:</span>
          <p className=""> {getAdminData?.serviceDescription}</p>
        </div>
      </div>
    </div>
    //   <div className="card-spacer">
    //   <div>
    //     {/* <h2>Project Name : {}</h2> */}
    //     <div>
    //       {/* <!-- Page Content --> */}
    //       <div class="container">
    //         <div className="row">
    //         <div className="form-group row mx-4">
    //         <label className="col-lg-1 col-form-label">Profile Image</label>
    //         <div className="col-lg-5">
    //           <div style={{ height: "130px", width: "120px" }}>
    //             {getAdminData?.profilePhoto && (
    //               <img
    //                 style={{ height: "100%", width: "100%" }}
    //                 src={getAdminData?.profilePhoto}
    //                 // src={"https://source.unsplash.com/EUfxH-pze7s/400x300"}
    //               />
    //             )}
    //           </div>
    //         </div>
    //         <label className="col-lg-1 col-form-label">Cover Image</label>
    //         <div className="col-lg-5">
    //           <div
    //             className="image-wrapper"
    //             style={{ height: "120px", width: "140px" }}
    //           >
    //             {console.log(
    //               "getAdminData?.coverPhoto",
    //               getAdminData?.coverPhoto
    //             )}
    //             {getAdminData?.coverPhoto && (
    //               <img
    //                 style={{ height: "100%", width: "100%" }}
    //                 // src={"https://source.unsplash.com/EUfxH-pze7s/400x300"}
    //                 src={getAdminData?.coverPhoto}
    //               />
    //             )}
    //           </div>
    //         </div>
    //     </div>
    //           <div className="col-1"></div>
    //           <div className="col-6" style={{marginTop:"45px"}}>
    //             <h2 class="fw-light text-left text-lg-start mt-4 mb-5">
    //               Profile Information :
    //             </h2>

    //             <div className="col-12">
    //               <div className="row">
    //                 <div className="col-lg-3">
    //                   <div className="text-primary" style={{fontSize: "16px"}}>First Name</div>
    //                   <div className="text-primary" style={{fontSize: "16px"}}>Last Name</div>
    //                   <div className="text-primary" style={{fontSize: "16px"}}>Email</div>
    //                   <div className="text-primary" style={{fontSize: "16px"}}>About Me</div>
    //                   <div className="text-primary" style={{fontSize: "16px"}}>Country</div>
    //                   <div className="text-primary" style={{fontSize: "16px"}}>Registration Date</div>
    //                   <div className="text-primary" style={{fontSize: "16px"}}>Services</div>

    //                 </div>
    //                 <div className="col-lg-9">
    //                   <div style={{fontSize: "16px"}}>{getAdminData?.firstName}</div>
    //                   <div style={{fontSize: "16px"}}>{getAdminData?.lastName}</div>
    //                   <div style={{fontSize: "16px"}}>{getAdminData?.email}</div>
    //                   <div style={{fontSize: "16px"}}>{getAdminData?.aboutMe}</div>
    //                   <div style={{fontSize: "16px"}}>{getAdminData?.country}</div>
    //                   <div style={{fontSize: "16px"}}>{moment(getAdminData?.registrationDate).format(
    //                 "YYYY-MM-DD"
    //               )}</div>
    //                   <div style={{fontSize: "16px"}}>{getAdminData?.serviceDescription}</div>

    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>

    //          <hr class="mt-2 mb-5"/>

    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};

export default HiredViewMore;
