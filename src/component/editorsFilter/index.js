import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ApiGet } from "../../helpers/API/ApiData";
import "./editorsFilter.scss";
export default function EditorsFilter() {
  const [filterShow, setFilterShow] = useState(false);
  const [allServices, setAllServices] = useState({});

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

  return (
    <div className="filter-sticky">
      <div className="editors-filter-sidebar">
        <div className="filter-title">
          <h1>Filters</h1>
        </div>
        <div className="filter-body">
          {/* <div className='filter-main-title'>
                    <div className='first-text-alignment' onClick={()=> handlePhotoEditorDropDown()}>
                        <p>Photo Editor’s</p>
                        <i className="fa-solid fa-angle-down"></i>
                    </div>
                    <div className={filterShow ? 'all-checkbox-text-alignment filter-show' : 'all-checkbox-text-alignment filter-hidden'}>
                        <div className='checkbox-text-alignment'>
                            <div>
                                <input type="checkbox" />
                            </div>
                            <div>
                                <span>Favorites</span>
                            </div>
                        </div>
                        <div className='checkbox-text-alignment'>
                            <div>
                                <input type="checkbox" />
                            </div>
                            <div>
                                <span>Highest Rated</span>
                            </div>
                        </div>
                        <div className='checkbox-text-alignment'>
                            <div>
                                <input type="checkbox" />
                            </div>
                            <div>
                                <span>Fastest Turnaround</span>
                            </div>
                        </div>
                        <div className='checkbox-text-alignment'>
                            <div>
                                <input type="checkbox" />
                            </div>
                            <div>
                                <span>Cheapest</span>
                            </div>
                        </div>
                        <div className='checkbox-text-alignment'>
                            <div>
                                <input type="checkbox" />
                            </div>
                            <div>
                                <span>Most Expensive</span>
                            </div>
                        </div>
                        <div className='checkbox-text-alignment'>
                            <div>
                                <input type="checkbox" />
                            </div>
                            <div>
                                <span>Editors You Have Worked With In The Past</span>
                            </div>
                        </div>
                        <div className='checkbox-text-alignment'>
                            <div>
                                <input type="checkbox" />
                            </div>
                            <div>
                                <span>Popular</span>
                            </div>
                        </div>
                    </div>
                </div> */}

          <div className="filter-main-title">
            <div
              className="first-text-alignment"
              onClick={() => setFilterShow(!filterShow)}
            >
              <p>Services </p>
              <i className="fa-solid fa-angle-down"></i>
            </div>
            <div
              className={
                filterShow
                  ? "all-checkbox-text-alignment filter-show"
                  : "all-checkbox-text-alignment filter-hidden"
              }
            >
              {allServices?.length > 0 &&
                allServices.map((item) => {
                  return (
                    <>
                      <div className="checkbox-text-alignment">
                        <div>
                          <input type="checkbox" />
                        </div>
                        <div>
                          <span>{item?.name}</span>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
