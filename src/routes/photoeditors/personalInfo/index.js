import React, { useState } from "react";
import CompanyInfo from "../../../component/photoeditors/companyInfo";
import OverviewInformation from "../../../component/photoeditors/overviewInformation";
import PhotoeditorsSteper from "../../../component/photoeditors/photoeditorsSteper";
import Portfolio from "../../../component/photoeditors/portfolio";
import PersonalDetails from "./personalDetails/index";
import "./personalInfo.scss";
export default function PersonalInfo() {
  const [pageChange, setPageChange] = useState(1);
  // const [key, setKey] = useState("personalDetails")
  const [inputValue, setInputValue] = useState({
    files: [],
    data: [],
  });

  // console.log("key",key)
  console.log("pageChange", pageChange);
  console.log("inputValue", inputValue);
  return (
    <div>
      <div className="personal-info-section-alignment">
        <div className="container-md">
          <>
            <PhotoeditorsSteper
              setPageChange={setPageChange}
              pageChange={pageChange}
            />
          </>
          {pageChange == 1 && (
            <>
              <PersonalDetails
                pageChange={pageChange}
                setPageChange={setPageChange}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </>
          )}
          {pageChange == 2 && (
            <>
              <CompanyInfo
                pageChange={pageChange}
                inputValue={inputValue}
                setPageChange={setPageChange}
                setInputValue={setInputValue}
              />
            </>
          )}
          {pageChange == 3 && (
            <>
              <OverviewInformation
                setPageChange={setPageChange}
                pageChange={pageChange}
                setInputValue={setInputValue}
                inputValue={inputValue}
              />
            </>
          )}
          {pageChange == 4 && (
            <>
              <Portfolio
                setPageChange={setPageChange}
                pageChange={pageChange}
                inputValue={inputValue}
                setInputValue={setInputValue}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
