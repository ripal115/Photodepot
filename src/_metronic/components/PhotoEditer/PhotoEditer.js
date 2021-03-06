import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ApiGet, ApiPut } from "../../../helpers/API/ApiData";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { Tooltip } from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import HiredViewMore from "../HiredViewMore/HiredViewMore";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PhotoEditor = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [eId, setEmailId] = useState();
  const [photoEditor, setPhotoEditor] = useState();
  const [filterPhotoEditor, setFilterPhotoEditor] = useState();
  const [countPerPage, setCountPerPage] = useState(10);
  const [addPhotoEditor, setAddPhotoEditor] = useState(false);
  const [inputValue, setInputValue] = useState([]);
  const [errors, setErrors] = useState("");
  const [dataViewMore, setDataViewMore] = useState(false);
  const [statusName, setStatusName] = useState();
  const [photoEditorID, setPhotoEditorID] = useState();
  const [loading, setLoading] = useState(false);

  console.log("photoEditorID", photoEditorID);
  useEffect(() => {
    getPhotoEditorData();
  }, []);

  // For view more
  const handleViewMore = (row) => {
    setDataViewMore(true);
    console.log("row photoeditor", row);
    setPhotoEditorID(row?._id);
  };

  // For view more close modal
  const handleViewMoreClose = () => {
    setDataViewMore(false);
  };

  // For input handle change
  const handleOnChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  //For get photoeditor data api
  const getPhotoEditorData = async () => {
    setIsLoaderVisible(true);
    await ApiGet("admin/get-admins?roleType=photoeditor")
      .then((res) => {
        console.log("get photoeditor", res?.data?.payload?.admin);
        setPhotoEditor(res?.data?.payload?.admin);
        setFilterPhotoEditor(res?.data?.payload?.admin);
      })
      .catch((err) => {
        console.log("err", err);
      });

    setIsLoaderVisible(false);
  };

  // For statu name set
  const handleMenu = (name) => {
    console.log("name", name);
    setStatusName(name);
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const regexEmail =
    /^(([^<>()[\],;:\s@]+([^<>()[\],;:\s@]+)*)|(.+))@(([^<>()[\],;:\s@]+)+[^<>()[\],;:\s@]{2,})$/i;

  // For email validation
  const validation = () => {
    let isFormValid = true;
    let errors = {};
    if (!inputValue.email || regexEmail.test(inputValue.email) === false) {
      setLoading(false);
      isFormValid = false;
      errors["email"] = "Please Enter email!";
    }
    setErrors(errors);
    return isFormValid;
  };

  // For new photoEditor invitation api
  const handleOnAdd = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (validation()) {
      await ApiPut("admin/invite", inputValue)
        .then((res) => {
          setLoading(false);
          console.log("res admin/invite", res);
          toast.success(res?.data?.message);
          setAddPhotoEditor(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("err");
          toast.error(err?.response?.data?.message);
        });
    }
  };

  // For active / inactive status (admin/block api call)
  const HandleonActive = async (e, id, name) => {
    let data = {
      id: id,
      status: name === "active" ? "inactive" : "active",
      // status:"active"
    };
    await ApiPut("admin/block", data)
      .then((res) => {
        console.log("res", res);
        setShow(false);
        getPhotoEditorData();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log("err");
      });
  };
  console.log("statusName", statusName);

  // For block / unblock status (admin/block api call)
  const statusBlock = async () => {
    console.log("statusName", statusName);
    let data = {
      id: eId,
      status: statusName === "blocked" ? "inactive" : "blocked",
    };
    await ApiPut("admin/block", data)
      .then((res) => {
        console.log("res", res);
        setShow(false);
        getPhotoEditorData();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log("err");
      });
  };

  // For close modal
  const handleOnClose = (e) => {
    setAddPhotoEditor(false);
    setErrors({});
    setInputValue({});
  };

  //For table columns
  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "5%",
    },
    {
      name: "Emails",
      width: "25%",
      cell: (row) => {
        console.log("firstemail", row);
        return <>{row.email ? row.email : "-"}</>;
      },
      selector: "projectName",
      sortable: true,
    },
    {
      name: "Date",
      width: "20%",
      cell: (row) => {
        return <>{moment(row.registrationDate).format("Do MMMM YYYY ")}</>;
      },
      selector: "projectName",
      sortable: true,
    },
    {
      name: "Status",
      width: "20%",
      color: "red",
      fontWeight: 500,
      cell: (row) => {
        //text-success text-warning
        return (
          <>
            {
              <div
                className={
                  row.status?.name === "blocked"
                    ? "text-danger"
                    : row.status?.name === "inactive"
                    ? "text-warning"
                    : row.status?.name === "active"
                    ? "text-success"
                    : null
                }
              >
                <b>
                  {row.status?.name
                    ? row.status?.name.charAt(0).toUpperCase() +
                      row.status?.name.slice(1)
                    : "-"}
                </b>
              </div>
            }
          </>
        );
      },
      selector: "projectName",
    },
    {
      name: "Actions",
      width: "20%",
      cell: (row) => {
        return (
          <>
            <div className=" d-flex justify-content-center w-100">
              <div
                className="pl-3 cursor-pointer d-flex"
                style={{ columnGap: "50px" }}
              >
                <div>
                  {row?.status?.name === "active" ? (
                    <button
                      className="btn btn-secondary btn-sm text-nowrap"
                      style={{ minWidth: "80px" }}
                      onClick={(e) =>
                        HandleonActive(e, row._id, row?.status?.name)
                      }
                    >
                      Inactive
                    </button>
                  ) : row?.status?.name === "inactive" ? (
                    <button
                      className="btn btn-primary btn-sm text-nowrap"
                      style={{ minWidth: "80px" }}
                      onClick={(e) =>
                        HandleonActive(e, row._id, row?.status?.name)
                      }
                    >
                      Active
                    </button>
                  ) : (
                    <div style={{ minWidth: "80px" }} />
                  )}
                </div>
                <div>
                  {row?.status?.name === "blocked" ? (
                    <button
                      className="btn btn-danger btn-sm text-nowrap"
                      style={{ minWidth: "80px" }}
                      onClick={() => {
                        handleMenu(row?.status?.name);
                        setEmailId(row._id);
                      }}
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger btn-sm text-nowrap"
                      style={{ minWidth: "80px" }}
                      onClick={() => {
                        handleMenu(row?.status?.name);
                        setEmailId(row._id);
                      }}
                    >
                      Block
                    </button>
                  )}
                </div>
              </div>
            </div>
          </>
        );
      },
      selector: "website",
    },
    {
      name: "View more",
      width: "10%",
      color: "red",
      fontWeight: 500,
      cell: (row) => {
        console.log("rowsffbnmj", row);
        //text-success text-warning
        return (
          <>
            <div
              className="cursor-pointer pl-2"
              onClick={() => handleViewMore(row)}
            >
              <Tooltip title="Show More" arrow>
                <InfoOutlinedIcon />
              </Tooltip>
            </div>
          </>
        );
      },
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

  //For search input
  const handleSearchData = (e) => {
    console.log("search", e.target.value);
    var value = e.target.value.toLowerCase();
    setPhotoEditor(() =>
      filterPhotoEditor.filter((item) =>
        // console.log("filterPhotographerr",item)
        item?.email?.toLowerCase().includes(value)
      )
    );
  };

  return (
    <>
      <ToastContainer />
      <div className="card p-1">
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Photo Editor</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="title"
                  placeholder="Search Photo Editor"
                  onChange={(e) => handleSearchData(e)}
                />
              </div>
            </div>
            <div className="cus-medium-button-style button-height">
              <button
                className="btn btn-warning mr-2"
                // style={{ minWidth: "100px" }}
                onClick={() => setAddPhotoEditor(true)}
              >
                Add Photo Editor
              </button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={photoEditor}
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
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are you want to{" "}
              {statusName === "blocked"
                ? "Unblock"
                : statusName === "active" || "inactive"
                ? "Block"
                : null}{" "}
              this email from photoEditor ??
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
              <Button variant="info " onClick={() => statusBlock()}>
                {statusName === "blocked"
                  ? "Unblock"
                  : statusName === "active" || "inactive"
                  ? "Block"
                  : null}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      {addPhotoEditor && (
        <Dialog fullScreen open={addPhotoEditor} onClose={handleOnClose}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleOnClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <>
            <div className="form ml-30 ">
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Enter email
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="email"
                      name="email"
                      // value={inputValue.email}
                      onChange={(e) => {
                        handleOnChange(e);
                      }}
                    />
                  </div>
                  <span
                    style={{
                      color: "red",
                      top: "5px",
                      fontSize: "12px",
                    }}
                  >
                    {errors["email"]}
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              <button
                className="btn btn-warning mr-2"
                onClick={(e) => handleOnAdd(e)}
              >
                Add Photo Editor
                {loading && (
                  <span className="mx-3 spinner spinner-white"></span>
                )}
              </button>
            </div>
          </>
        </Dialog>
      )}
      {dataViewMore && (
        <Dialog
          fullScreen
          open={dataViewMore}
          onClose={handleViewMoreClose}
          TransitionComponent={Transition}
        >
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleViewMoreClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
          <HiredViewMore photoEditorID={photoEditorID} />
        </Dialog>
      )}
    </>
  );
};

export default PhotoEditor;
