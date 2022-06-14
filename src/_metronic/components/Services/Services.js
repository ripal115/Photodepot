import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ApiGet, ApiPost, ApiPut } from "../../../helpers/API/ApiData";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import CreateIcon from "@material-ui/icons/Create";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Tooltip } from "@material-ui/core";
import Slide from "@material-ui/core/Slide";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Services = () => {
  const [addAllServices, setAddAllServices] = useState(false);
  const [filterService, setFilterServices] = useState();
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allServices, setAllServices] = useState();
  const [inputValue, setInputValue] = useState({});
  const [errors, setErrors] = useState({});
  const [countPerPage, setCountPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [show, setShow] = useState(false);
  const [isEditApi, setIsEditApi] = useState(false);
  const [idForEditServices, setIdForEditServices] = useState();
  const [idForChangeStatus, setIdForChangeStatus] = useState();
  const [displayModal, setDisplayModal] = useState();

  const userInfo = JSON.parse(localStorage.getItem("userinfo"));

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleOnClose = (e) => {
    setAddAllServices(false);
    setIsEditApi(false);
    setErrors({});
    setInputValue({});
  };

  const handleCloseShowStatus = () => {
    setShow(false);
  };

  const handleSearchData = (e) => {
    var value = e.target.value.toLowerCase();
    setAllServices(() =>
      filterService.filter(
        (item) =>
          item?.name?.toLowerCase().includes(value) ||
          item?.description?.toLowerCase().includes(value)
      )
    );
  };

  const getAllServices = async () => {
    setLoading(true);
    await ApiGet(`service/getService`)
      .then((res) => {
        console.log("getServices", res?.data?.payload?.token);
        setAllServices(res?.data?.payload?.token);
        setFilterServices(res?.data?.payload?.token);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err?.response?.data?.message);
      });
  };

  useEffect(() => {
    getAllServices();
  }, []);

  const validationforAddServices = () => {
    let isFormValid = true;
    let errors = {};

    if (inputValue && !inputValue?.name) {
      isFormValid = false;
      errors["name"] = "Please enter name!!";
    }
    if (inputValue && !inputValue?.description) {
      isFormValid = false;
      errors["description"] = "Please enter description!!";
    }
    setErrors(errors);
    return isFormValid;
  };

  const addServices = async (e) => {
    e.preventDefault();
    //   debugger
    if (validationforAddServices()) {
      setLoading(true);
      let data = {
        name: inputValue?.name,
        description: inputValue?.description,
        aid: userInfo?._id,
      };
      console.log("data", data);
      await ApiPost(`service/addService`, data)
        .then((res) => {
          if (res?.status === 200) {
            console.log("addServices", res);
            getAllServices();
            setAddAllServices(false);
            toast.success(res?.data?.message);
            setLoading(false);
          } else {
            toast.error(res?.data?.message);
            setLoading(false);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          setLoading(false);
        });
    }
  };

  const editServices = async (e) => {
    e.preventDefault();
    setLoading(true);
    let data = {
      name: inputValue?.name,
      description: inputValue?.description,
      aid: userInfo?._id,
    };
    await ApiPut(`service/updateService/${idForEditServices}`, data)
      .then((res) => {
        if (res?.status === 200) {
          console.log("editServices", res);
          setAddAllServices(false);
          toast.success(res?.data?.message);
          getAllServices();
          setLoading(false);
          window.location.reload();
        } else {
          toast.error(res?.data?.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
      });
  };

  const handleUpdateStatus = async (status) => {
    setLoading(true);
    let data = {
      isActive: status,
    };
    await ApiPut(`service/updateService/${idForChangeStatus}`, data)
      .then((res) => {
        console.log("updateStatus", res);
        setShow(false);
        getAllServices();
        toast.success(res?.data?.message);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setLoading(false);
      });
  };

  const columns = [
    {
      name: "name",
      selector: (row) => row.name,
    },
    {
      name: "Description",
      selector: (row) => row.description,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <div className="d-flex justify-content-between">
              <div
                className="cursor-pointer pl-2"
                onClick={() => {
                  setAddAllServices(true);
                  setIsEditApi(true);
                  console.log("roeeeee", row);
                  setIdForEditServices(row?._id);
                  getAllServices();
                  setInputValue({
                    name: row?.name,
                    description: row?.description,
                    // aid : userInfo?._id
                  });
                }}
              >
                <Tooltip title="Edit Services" arrow>
                  <CreateIcon />
                </Tooltip>
              </div>
            </div>
            <div className="cus-medium-button-style button-height">
              <Tooltip
                title={row?.isActive ? "Deactivated Combo" : "Activated Combo"}
              >
                <button
                  // className="btn btn-success mr-2"
                  className={
                    row?.isActive
                      ? "btn btn-primary maxwidth mr-2"
                      : "btn btn-success maxwidth mr-2"
                  }
                  onClick={() => {
                    setDisplayModal(row.isActive);
                    setShow(true);
                    setIdForChangeStatus(row?._id);
                    // handleDeleteAnnouncement(row?._id)
                  }}
                >
                  {row.isActive ? "Active" : "Deactive"}
                </button>
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

  return (
    <>
      <ToastContainer />
      <div className="card p-1">
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Services</h2>
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
                onClick={() => setAddAllServices(true)}
              >
                Add Services
              </button>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={allServices}
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
          <Modal show={show} onHide={handleCloseShowStatus}>
            <Modal.Header closeButton>
              <Modal.Title className="text-danger">Alert!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Are You Sure To Want To{" "}
              {displayModal === true ? "Deactive" : "Active"} this Combo
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseShowStatus}>
                Cancel
              </Button>
              <Button
                variant={displayModal === true ? "danger" : "primary"}
                onClick={(e) => {
                  handleUpdateStatus(!displayModal);
                }}
              >
                {displayModal === true ? "Deactive" : "Active"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
      {addAllServices && (
        <Dialog fullScreen open={addAllServices} onClose={handleOnClose}>
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
                  Enter Name
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="name"
                      name="name"
                      value={inputValue.name}
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
                    {errors["name"]}
                  </span>
                </div>
              </div>
            </div>
            <div className="form ml-30 ">
              <div className="form-group row">
                <label className="col-xl-3 col-lg-3 col-form-label">
                  Enter Description
                </label>
                <div className="col-lg-9 col-xl-6">
                  <div>
                    <input
                      type="text"
                      className={`form-control form-control-lg form-control-solid `}
                      id="description"
                      name="description"
                      value={inputValue.description}
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
                    {errors["description"]}
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-center">
              {loading ? (
                <button className="btn btn-success mr-2">
                  <span>{isEditApi ? "Edit" : "Add"} Services</span>
                  {loading && (
                    <span className="mx-3 spinner spinner-white"></span>
                  )}
                </button>
              ) : (
                <button
                  className="btn btn-success mr-2"
                  onClick={(e) => {
                    isEditApi ? editServices(e) : addServices(e);
                  }}
                >
                  <span>{isEditApi ? "Edit Services" : "Add Services"}</span>
                  {loading && (
                    <span className="mx-3 spinner spinner-white"></span>
                  )}
                </button>
              )}
            </div>
          </>
        </Dialog>
      )}
    </>
  );
};

export default Services;
