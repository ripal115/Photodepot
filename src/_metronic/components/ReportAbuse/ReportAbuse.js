import React, { useState, useEffect } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ToastContainer } from "react-toastify";

import { ApiGet } from "../../../helpers/API/ApiData";

const ReportAbuse = () => {
  const [reportAbuse, setReportAbuse] = useState();
  const [filterReportAbuse, setFilterReportAbuse] = useState();
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [countPerPage, setCountPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const getAllReportAbuse = async () => {
    setIsLoaderVisible(true)
    await ApiGet(`reportAbuse/getReportAbuse`)
      .then((res) => {
        console.log("getabusers", res);
        setReportAbuse(res?.data?.payload?.reportAbuse);
        setFilterReportAbuse(res?.data?.payload?.reportAbuse);
      })
      .catch((err) => {
        console.log("err", err);
      });
      setIsLoaderVisible(false)
  };

  useEffect(() => {
    getAllReportAbuse();
  }, []);

  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "10%",
    },
    {
      name: "Description",
      width: "25%",
      cell: (row) => {
        return <>{row.description ? row.description : "-"}</>;
      },
      selector: "projectName",
      sortable: true,
    },
    {
      name: "From",
      width: "25%",
      cell: (row) => {
        console.log("roooooooow", row);
        return (
          <>
            {row?.from_id?.firstName + row?.from_id?.lastName
              ? row?.from_id?.firstName + " " + row?.from_id?.lastName
              : "-"}
          </>
        );
      },
      selector: "projectName",
      sortable: true,
    },
    {
      name: "To",
      width: "25%",
      cell: (row) => {
        return (
          <>
            {row?.to_id?.firstName + row?.to_id?.lastName
              ? row?.to_id?.firstName + " " + row?.to_id?.lastName
              : "-"}
          </>
        );
      },
      selector: "projectName",
      sortable: true,
    },
  ];

  // * Table Style
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
  };

  const handleSearchData = (e) => {
    console.log("first", e.target.value);
    var value = e.target.value.toLowerCase();
    setReportAbuse(() => 
    filterReportAbuse.filter((item) => 
    // console.log("filterPhotographerr",item)
          item?.from_id?.firstName?.toLowerCase().includes(value) ||
          item?.from_id?.lastName?.toLowerCase().includes(value) ||
          item?.to_id?.firstName?.toLowerCase().includes(value) ||
          item?.to_id?.lastName?.toLowerCase().includes(value)

    ))
  }

  return (
    <>
    <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
        <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Report Abuse</h2>
            </div>
            <div className="col">
              <div>
                
                <input
                   type="text"
                className={`form-control form-control-lg form-control-solid `}
                name="title"
                placeholder="Search Report Abuse"
                onChange={(e) => handleSearchData(e)}
              />
              </div>
            </div>
          </div>
      <DataTable
        columns={columns}
        data={reportAbuse}
        customStyles={customStyles}
        style={{
          marginTop: "-3rem",
        }}
        progressPending={isLoaderVisible}
        highlightOnHover
        pagination
        onChangePage={(page) => {
          setPage(page);
        }}
        onChangeRowsPerPage={(rowPerPage) => {
          setCountPerPage(rowPerPage);
        }}
      />
      </div>
      </div>
    </>
  );
};

export default ReportAbuse;
