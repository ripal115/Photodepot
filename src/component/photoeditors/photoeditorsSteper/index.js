import React from "react";
import "./photoeditorsSteper.scss";
export default function PhotoeditorsSteper(props) {
  const { key, setKey, setPageChange, pageChange } = props;

  const handleOnChange = (item) => {
    setPageChange(item);
  };

  return (
    <div>
      <div className="photoeditors-steper-section-alignment">
        <div className="container-md">
          <div className="left-right-alignment">
            <div className="steper-all-alignment">
              {/* {key === "personalDetails" && ( */}
              <div className="steper-style">
                <div className="steper-content-alignment">
                  <div
                    className={
                      pageChange === "1"
                        ? "stper-icon-design stper-icon-design-avtive"
                        : "stper-icon-design"
                    }
                    onClick={() => handleOnChange("1")}
                  >
                    1
                  </div>
                </div>
                <p>Personal Info</p>
              </div>
              {/* )} */}
              <div className="steper-style">
                <div className="steper-content-alignment">
                  <div
                    className={
                      pageChange === "2"
                        ? "stper-icon-design stper-icon-design-avtive"
                        : "stper-icon-design "
                    }
                    onClick={() => handleOnChange("2")}
                  >
                    2
                  </div>
                </div>
                <p>Company Info</p>
              </div>
              <div className="steper-style">
                <div className="steper-content-alignment">
                  <div
                    className={
                      pageChange === "3"
                        ? "stper-icon-design stper-icon-design-avtive"
                        : "stper-icon-design "
                    }
                    onClick={() => handleOnChange("3")}
                  >
                    3
                  </div>
                </div>
                <p>Overview</p>
              </div>
              <div className="steper-style">
                <div className="steper-content-alignment">
                  <div
                    className={
                      pageChange === "4"
                        ? "stper-icon-design stper-icon-design-avtive"
                        : "stper-icon-design "
                    }
                    onClick={() => handleOnChange("4")}
                  >
                    4
                  </div>
                </div>
                <p>Portfolio</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
