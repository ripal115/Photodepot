import React, { useEffect, useState } from "react";
import { ApiGet } from "../../../helpers/API/ApiData";
import { CartesianGrid, XAxis, YAxis } from "recharts";
import OtherUsers from "../../components/OtherUsers/OtherUsers";
import PhotoEditor from "../../components/PhotoEditer/PhotoEditer";
import Photographer from "../../components/Photographer/Photographer";
import PropertyBuilder from "../../components/PropertyBuilder/PropertyBuilder";
import { LineChart, Line } from "recharts";
export function Demo1Dashboard() {
  // let userInfo =getUserInfo()
  const [selectedTable, setSelectedTable] = useState("Photographer");
  const [userCountsData, setUserCountsData] = useState();

  const userCounts = async () => {
    await ApiGet("admin/count")
      .then((res) => {
        console.log("get userCounts", res);
        setUserCountsData(res?.data?.payload);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  useEffect(() => {
    userCounts();
  }, []);

  // const countsData = ["Miscellaneous Affiliates","photoEditordata","photographerAata","propertyBuilder"]
  // const countValue = [userCountsData?.anonymous,userCountsData?.photoEditordata,userCountsData?.photographerAata,userCountsData?.propertyBuilder,userCountsData?.photographerAata]

  const data = [
    {
      name: "photographer",
      uv: userCountsData?.photographerAata,
    },
    {
      name: "photoEditor",
      uv: userCountsData?.photoEditordata,
    },
    {
      name: "propertyBuilder",
      uv: userCountsData?.propertyBuilder,
    },
    {
      name: "miscellaneous Affiliates",
      uv: userCountsData?.anonymous,
    },
  ];

  console.log("data CHART", data);

  return (
    <div
      className={`card card-custom `}
      style={{ backgroundColor: "rgb(187 187 204)" }}
    >
      {/* Header */}
      <div className="card-header border-0  py-1 px-1 m-5">
        <div className="card-body p-0 position-relative overflow-hidden">
          {/* Stat */}
          <div
            // id="kt_mixed_widget_1_chart"
            className="card-rounded-bottom "
            style={{ height: "30px" }}
          >
            <h2 className="card-title font-weight-bolder text-white pt-2 pl-6">
              Dashboard
            </h2>
          </div>
          {/* {userInfo?.user.role === "Admin" ? ( */}
          <>
            <div className="card-spacer">
              <div
                className="carder-box"
                style={{
                  display: "grid",
                  gap: "12px",
                  gridTemplateColumns: "repeat(2,1fr)",
                  padding: "10px",
                  marginLeft: "15px",
                  marginRight: "15px",
                }}
              >
                <div
                  className="bg-light-warning px-6 py-8 rounded-xl"
                  onClick={() => setSelectedTable("Photographer")}
                  style={{cursor:"pointer"}}
                >
                  <p className="text-warning font-weight-bold" style={{minHeight: "24px", fontSize: "20px"}}>
                    {userCountsData?.photographerAata}
                  </p>
                  <span className="text-warning font-weight-bold font-size-h3 d-block my-2">
                    Photographer
                  </span>
                </div>
                <div
                  className="bg-light-danger px-6 py-8 rounded-xl"
                  onClick={() => setSelectedTable("PhotoEditor")}
                  style={{cursor:"pointer"}}
                >
                  <p className="text-warning font-weight-bold mt-2" style={{minHeight: "24px", fontSize: "20px"}}>
                    {userCountsData?.photoEditordata}
                  </p>
                  <span className="text-warning font-weight-bold font-size-h3 d-block my-2">
                    PhotoEditor
                  </span>
                </div>
                <div
                  className="bg-light-secondary px-6 py-8 rounded-xl"
                  onClick={() => setSelectedTable("PropertyBuilder")}
                  style={{cursor:"pointer"}}
                >
                  <p className="text-warning font-weight-bold" style={{minHeight: "24px", fontSize: "20px"}}>
                    {userCountsData?.propertyBuilder}
                  </p>
                  <span className="text-warning font-weight-bold font-size-h3 d-block my-2">
                    Realestate Agent
                  </span>
                </div>
                <div
                  className="bg-light-success px-6 py-8 rounded-xl"
                  onClick={() => setSelectedTable("OtherUsers")}
                  style={{cursor:"pointer"}}
                >
                  <p className="text-warning font-weight-bold" style={{minHeight: "24px", fontSize: "20px"}}>
                    {userCountsData?.anonymous}
                  </p>
                  <span className="text-warning font-weight-bold font-size-h3 d-block my-2">
                    Miscellaneous Affiliates
                  </span>
                </div>
                {/* <div className="bg-light-success px-6 py-8 rounded-xl">
                  <span className="text-warning font-weight-bold font-size-h3 d-block my-2">Hired Photographer _{userCountsData?.anonymous}</span>
                  <a
                    // href="#"
                    className="text-warning font-weight-bold font-size-h6"
                    onClick={() => setSelectedTable("OtherUsers")}
                  >
                    Hired Photographer
                  </a>
                </div> */}
              </div>
            </div>
            <div className="my-5 mx-5">
              {selectedTable === "Photographer" ? (
                <Photographer />
              ) : selectedTable === "PhotoEditor" ? (
                <PhotoEditor />
              ) : selectedTable === "PropertyBuilder" ? (
                <PropertyBuilder />
              ) : selectedTable === "OtherUsers" ? (
                <OtherUsers />
              ) : (
                <></>
              )}
            </div>
          </>
        </div>
      </div>
      <div className="row clearfix m-5">
        <div className="col-md-12 col-lg-8">
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <h2>
                  <strong>Registration</strong>
                </h2>
              </div>
              <div className="card ">
                <div className="body text-center">
                  <div className="App">
                    <>
                      <LineChart
                        width={900}
                        height={400}
                        data={data}
                        margin={{ top: 30, right: 30, left: 20, bottom: 30 }}
                      >
                        <XAxis dataKey="name" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="uv" stroke="#8884d8" />
                        <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                      </LineChart>
                    </>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
