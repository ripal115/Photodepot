import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ApiGet, ApiPut } from "../../../helpers/API/ApiData";
import { Modal } from "react-bootstrap";
import IconButton from "@material-ui/core/IconButton";
import { Button } from "react-bootstrap";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import { ToastContainer, toast } from "react-toastify";
import CloseIcon from "@material-ui/icons/Close";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const OtherUsers = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [eId, setEmailId] = useState();
  const [otherUsers, setOtherUsers] = useState();
  const [filterOtherUsers, setFilterOtherUsers] = useState();
  const [countPerPage, setCountPerPage] = useState(10);
  const [statusName, setStatusName] = useState();
  const [addOtherUsers, setAddOtherUsers] = useState(false);
  const [inputValue, setInputValue] = useState([]);
  const [errors, setErrors] = useState("");

  //For add new user input handle change
  const handleOnChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  useEffect(() => {
    getOtherUser();
  }, []);

  //For active / Inactive button
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
        getOtherUser();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log("err");
      });
  };

  //For email input validation
  const validation = () => {
    let isFormValid = true;
    let errors = {};
    if (!inputValue.email.trim() || inputValue.email === "") {
      isFormValid = false;
      errors["email"] = "Please Enter email!";
    }
    setErrors(errors);
    return isFormValid;
  };

  //For new other user add api
  const handleOnAdd = async () => {
    if (validation()) {
      setLoading(true);
      await ApiPut("admin/invite", inputValue)
        .then((res) => {
          console.log("res admin/invite", res);
          toast.success(res?.data?.message);
          setAddOtherUsers(false);
          setLoading(false);
        })
        .catch((err) => {
          console.log("err");
          toast.error(err?.response?.data?.message);
          setLoading(false);
        });
    }
  };

  // For block / unblock button (admin/block api)
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
        getOtherUser();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log("err");
      });
  };

  //For get other user api
  const getOtherUser = async () => {
    setIsLoaderVisible(true);
    await ApiGet("admin/get-admins?roleType=anonymous")
      .then((res) => {
        console.log("get photoeditor", res);
        setOtherUsers(res?.data?.payload?.admin);
        setFilterOtherUsers(res?.data?.payload?.admin);
      })
      .catch((err) => {
        console.log("err", err);
      });

    setIsLoaderVisible(false);
  };

  //For status name set
  const handleMenu = (name) => {
    setStatusName(name);
    setShow(true);
  };

  // For modal close
  const handleClose = () => {
    setShow(false);
  };

  // For modal close
  const handleOnClose = (e) => {
    setAddOtherUsers(false);
    setErrors({});
    setInputValue({});
  };

  // For table columns
  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "65px",
    },
    {
      name: "Emails",
      cell: (row) => {
        return <>{row.email ? row.email : "-"}</>;
      },
      selector: "projectName",
      sortable: true,
    },
    {
      name: "Date",
      cell: (row) => {
        return <>{moment(row.createdAt).format("Do MMMM YYYY ")}</>;
      },
      selector: "projectName",
      sortable: true,
      width: "200px",
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

  // for handle search input
  const handleSearchData = (e) => {
    console.log("first", e.target.value);
    var value = e.target.value.toLowerCase();
    setOtherUsers(() =>
      filterOtherUsers.filter((item) =>
        item?.email?.toLowerCase().includes(value)
      )
    );
  };

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Miscellaneous Affiliates</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="title"
                  placeholder="Search Miscellaneous Affiliates"
                  onChange={(e) => handleSearchData(e)}
                />
              </div>
            </div>
            <button
              className="btn btn-warning btn-sm"
              onClick={() => setAddOtherUsers(true)}
            >
              Add Miscellaneous Affiliates
            </button>
          </div>

          <DataTable
            columns={columns}
            data={otherUsers}
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
      {addOtherUsers && (
        <Dialog
          fullScreen
          open={addOtherUsers}
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
                Add Miscellaneous Affiliates
                {loading && (
                  <span className="mx-3 spinner spinner-white"></span>
                )}
              </button>
            </div>
          </>
        </Dialog>
      )}
    </>
  );
};

export default OtherUsers;
