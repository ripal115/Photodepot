import React, { useEffect, useState } from "react";
import { ApiGet } from "../../../helpers/API/ApiData";
import DataTable, { defaultThemes } from "react-data-table-component";

const AdminReview = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [adminReview, setAdminReview] = useState();
  const [countPerPage, setCountPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const getAllAdminReview = async () => {
    setIsLoaderVisible(true)
    await ApiGet(`review`)
      .then((res) => {
        console.log("getadminreview", res);
        setAdminReview(res?.data?.payload?.review)
      })
      .catch((err) => {
        console.log("err", err);
      });
      setIsLoaderVisible(false)
  };

  useEffect(() => {
    getAllAdminReview();
  }, []);

//   columns
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
            {row?.form?.firstName + row?.form?.lastName
              ? row?.form?.firstName + " " + row?.form?.lastName
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
            {row?.to?.firstName + row?.to?.lastName
              ? row?.to?.firstName + " " + row?.to?.lastName
              : "-"}
          </>
        );
      },
      selector: "projectName",
      sortable: true,
    },
  ];
//   columns

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
   // * Table Style

  return (
    <>
      <DataTable
        columns={columns}
        data={adminReview}
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

export default AdminReview;
