import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ApiGet } from "../../../helpers/API/ApiData";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Tooltip } from "@material-ui/core";
import ViewHiredPhotoEditor from "../HiredPhotoEditor/ViewHiredPhotoEditor";

const HiredPhotoGrapher = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hireAllData, setHireAllData] = useState();
  const [countPerPage, setCountPerPage] = useState(10);
  const [showViewMore, setShowViewMore] = useState(false);
  const [photoEditorID, setPhotoEditorID] = useState();

  // For get Hire photoEditor
  const getHirePhotoEditorData = async () => {
    setIsLoaderVisible(true);
    await ApiGet(`hire/getAllHire`)
      .then((res) => {
        console.log("get All Hire", res?.data?.payload.hire);
        setHireAllData(res?.data?.payload?.hire);
      })
      .catch((err) => {
        console.log("err", err);
      });
    setIsLoaderVisible(false);
  };

  //For viewmore 
  const handleViewMore = (e, rows) => {
    console.log("rows", rows);
    setPhotoEditorID(rows);
    setShowViewMore(true);
  };

  //For modal close
  const handleOnClose = (e) => {
    setShowViewMore(false);
  };

  useEffect(() => {
    getHirePhotoEditorData();
  }, []);

  //For Table columns
  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "5%",
    },
    {
      name: "Photographer",
      width: "20%",
      cell: (row) => {
        return (
          <>
            {row?.photographer_id?.firstName
              ? row?.photographer_id?.firstName
              : "-"}{" "}
            {row?.photographer_id?.lastName
              ? row?.photographer_id?.lastName
              : "-"}
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Registration Date",
      width: "20%",
      cell: (row) => {
        return (
          <>
            {moment(row?.photoeditor_id?.registrationDate).format(
              "Do MMMM YYYY "
            )}
          </>
        );
      },
      sortable: true,
    },
    {
      name: "PhotoEditor name",
      width: "20%",
      cell: (row) => {
        return (
          <>
            {row?.photoeditor_id?.firstName
              ? row?.photoeditor_id?.firstName
              : "-"}{" "}
            {row?.photoeditor_id?.lastName
              ? row?.photoeditor_id?.lastName
              : "-"}
          </>
        );
      },
      sortable: true,
    },
    {
      name: "Payment_status",
      width: "15%",
      cell: (row) => {
        return <>{
          <div
                className={
                  row?.paymentStatus === "pending"
                    ? "text-warning"
                    : row?.paymentStatus === "done"
                    ? "text-success"
                    : null
                }
              >
                <b>{row?.paymentStatus ? row?.paymentStatus : "-"}</b>
                </div>
      }</>;
      },
      sortable: true,
    },
    {
      name: "Price",
      width: "10%",
      cell: (row) => {
        return <>{row?.price ? row?.price : "-"}</>;
      },
      sortable: true,
    },
    {
      name: "View More",
      width: "10%",
      color: "red",
      fontWeight: 500,
      cell: (row) => {
        return (
          <>
            {
              <div
                className="cursor-pointer pl-2"
                onClick={(e) => handleViewMore(e, row)}
              >
                <Tooltip title="Show More" arrow>
                  <InfoOutlinedIcon />
                </Tooltip>
              </div>
            }
          </>
        );
      },
      selector: "projectName",
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
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">HiredPhotoEditor</h2>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={hireAllData}
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
      {
        showViewMore && (
          <Dialog
            fullScreen
            open={showViewMore}
            onClose={(e) => handleOnClose(e)}
          >
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={(e) => handleOnClose(e)}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
            <>
              <div className="form ml-30 ">
                <div className="form-group row">
                  <ViewHiredPhotoEditor photoEditorID={photoEditorID} />
                </div>
              </div>
            </>
          </Dialog>
        )
      }
    </>
  );
};

export default HiredPhotoGrapher;
