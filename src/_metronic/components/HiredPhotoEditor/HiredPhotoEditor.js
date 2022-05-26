import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ApiGet, ApiPut } from "../../../helpers/API/ApiData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import { Tooltip } from "@material-ui/core";
import style from "react-syntax-highlighter/dist/esm/styles/hljs/a11y-dark";
import ViewHiredPhotoEditor from "./ViewHiredPhotoEditor";

const HiredPhotoEditor = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [hirePhotoEditor, setHirePhotoEditor] = useState();
  const [countPerPage, setCountPerPage] = useState(10);
  const [showViewMore, setShowViewMore] = useState(false);
  const [photoEditorID, setPhotoEditorID] = useState();

  const getHirePhotoEditorData = async () => {
    setIsLoaderVisible(true);
    await ApiGet("hire/getAllHire?photoeditor_id=62832545bb6a3e0cac847a2d")
      .then((res) => {
        console.log("get photoeditor", res?.data?.payload.hire);
        setHirePhotoEditor(res?.data?.payload?.hire);
      })
      .catch((err) => {
        console.log("err", err);
      });

    setIsLoaderVisible(false);
  };

  const handleViewMore = (e,rowid) => {
    setPhotoEditorID(rowid)
    setShowViewMore(true);
  };

  const handleOnClose = (e) => {
    setShowViewMore(false);
  };

  useEffect(() => {
    getHirePhotoEditorData();
  }, []);

  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "5%",
    },
    {
      name: "Project Name",
      width: "25%",
      cell: (row) => {
        return <>{row.projectName ? row.projectName : "-"}</>;
      },
      sortable: true,
    },
    {
      name: "Price",
      width: "25%",
      cell: (row) => {
        return <>{row.price ? row.price : "-"}</>;
      },
      sortable: true,
    },
    {
      name: "Date",
      width: "20%",
      cell: (row) => {
        return <>{moment(row.createdAt).format("Do MMMM YYYY ")}</>;
      },
      sortable: true,
    },
    {
      name: "View More",
      width: "20%",
      color: "red",
      fontWeight: 500,
      cell: (row) => {
        //text-success text-warning
        return (
          <>
            {
              <div
                className="cursor-pointer pl-2"
                onClick={(e) => handleViewMore(e,row?._id)}
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
            data={hirePhotoEditor}
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
                  <ViewHiredPhotoEditor 
                  photoEditorID={photoEditorID}/>
                </div>
              </div>
            </>
          </Dialog>
        )
        // <ViewHiredPhotoEditor/>
      }
    </>
  );
};

export default HiredPhotoEditor;
