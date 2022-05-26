import React, { useState, useEffect } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";

import { ApiGet } from "../../../helpers/API/ApiData";

const ReportAbuse = () => {
  const [reportAbuse, setReportAbuse] = useState();
  const [countPerPage, setCountPerPage] = useState(10);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);

  const getAllReportAbuse = () => {
    ApiGet(`reportAbuse/getReportAbuse`)
      .then((res) => {
        console.log("getabusers", res);
        setReportAbuse(res?.data?.payload?.reportAbuse);
      })
      .catch((err) => {
        console.log("err", err);
      });
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

  return (
    <>
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
    </>
  );
};

export default ReportAbuse;
