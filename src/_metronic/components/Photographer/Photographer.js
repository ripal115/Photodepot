import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ApiGet, ApiPut } from "../../../helpers/API/ApiData";
// import Slide from "@material-ui/core/Slide";
// import DeleteIcon from "@material-ui/icons/Delete";
// import { Modal } from "react-bootstrap";
// import { Button } from "react-bootstrap";
import { ToastContainer ,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import { Button, Modal } from "react-bootstrap";
// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

const Photographer = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const [photographer, setPhotographer] = useState()
  const [eId, setEmailId] = useState();
  const [statusName, setStatusName] = useState();
  const [countPerPage, setCountPerPage] = useState(10);
  const [filterPhotographer, setFilterPhotographer] = useState()

  useEffect(() => {
    getPhotographerData();
  }, []);

  const getPhotographerData = async () => {
    setIsLoaderVisible(true);
    await ApiGet("admin/get-admins?roleType=photographer")
      .then((res) => {
          console.log("get photographer",res);
        setPhotographer(res?.data?.payload?.admin)
        setFilterPhotographer(res?.data?.payload?.admin)
      })
      .catch((err) => {
        console.log("err", err);
      });

    setIsLoaderVisible(false);
  };

  const handleMenu = (name) => {
    console.log("name", name);
    setStatusName(name);
    setShow(true);
  };

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
        getPhotographerData();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log("err");
      });
  };

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
        getPhotographerData();
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        console.log("err");
      });
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    getPhotographerData();
  }, []);

  const columns = [
    {
      name: "SNo",
      cell: (row, index) => (page - 1) * countPerPage + (index + 1),
      width: "65px",
    },
    {
      name: "Email",
      cell: (row) => {
        return <>{row.email ? row.email : "-"}</>;
      },
      selector: "Email",
      sortable: true,
    },
    {
        name: "Registration Date",
        cell: (row) => {
          return <>{moment(row.registrationDate).format("Do MMMM YYYY ")}</>;
        },
        selector: "Date",
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
                <b>{row.status?.name ? (row.status?.name.charAt(0).toUpperCase() + row.status?.name.slice(1)): "-"}</b>
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

  console.log("filterPhotographer",filterPhotographer)

  const handleSearchData = (e) => {
    console.log("first", e.target.value);
    var value = e.target.value.toLowerCase();
    setPhotographer(() => 
    filterPhotographer.filter((item) => 
    // console.log("filterPhotographerr",item)
          item?.email?.toLowerCase().includes(value)

    ))
  }

  return (
    <>
      <div className="card p-1">
        <ToastContainer />
        <div className="p-2 mb-2">
          <div className="row mb-4 pr-3">
            <div className="col d-flex justify-content-between">
              <h2 className="pl-3 pt-2">Photographer</h2>
            </div>
            <div className="col">
              <div>
                
                <input
                   type="text"
                className={`form-control form-control-lg form-control-solid `}
                name="title"
                placeholder="Search Photographer"
                onChange={(e) => handleSearchData(e)}
              />
              </div>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={photographer}
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
              this email from photographer ??
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
    </>
  );
};

export default Photographer;
