import React, { useEffect, useState } from "react";
import { getUserInfo } from "../../../../utils/user.util";
import Logo from "../../../layout/components/Logos/logo.svg";

export function MixedWidget1({ className }) {
  let userInfo = getUserInfo();

  const [
    countDataAll,
    // , setCountDataAll
  ] = useState("");

  console.log("countDataAll", countDataAll);

  useEffect(() => {
    document.title = "Photo Depot | Admin";
  }, []);

  // useEffect(() => {
  //   getcount();
  // }, []);

  // const getcount = async () => {
  //   // if (userInfo?.admin?.role === "superadmin") {
  //   await ApiGet(`user/count`)
  //     .then((res) => {
  //       console.log("getcountAdmin", res);
  //       setCountData(res?.data?.payload);
  //       // setMonthData(res?.data?.payload?.countProperty);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // }
  // };

  return (
    <div>
      {/* Header */}
      <div>
        <div className="honda-logo-center-alignment-page">
          <img alt="" src={Logo} />
          {/* Stat */}
          <div></div>
          
            <>
              <div className="card-spacer">
                <div className="row m-5"></div>
              </div>
            </>
         
        </div>
      </div>
    </div>
  );
}
