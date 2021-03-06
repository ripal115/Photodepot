import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { ApiGet } from "../../../helpers/API/ApiData";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const PropertyBuilder = () => {
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  // const [eId, setEmailId] = useState();
  const [photoEditor, setPhotoEditor] = useState();
  const [filterPhotoEditor, setFilterPhotoEditor] = useState();
  const [countPerPage, setCountPerPage] = useState(10);

  useEffect(() => {
    getNewsData();
  }, []);

  const getNewsData = async () => {
    setIsLoaderVisible(true);
    await ApiGet("admin/get-admins?roleType=propertybuilder")
      .then((res) => {
        console.log("get photoeditor", res);
        setPhotoEditor(res?.data?.payload?.admin);
        setFilterPhotoEditor(res?.data?.payload?.admin);
      })
      .catch((err) => {
        console.log("err", err);
      });
    setIsLoaderVisible(false);
  };

  const handleClose = () => {
    setShow(false);
  };

  // const removeEmail = async () => {
  //   await ApiDelete(`newsletter/remove/${eId}`)
  //     .then((res) => {
  //       setShow(false);
  //       getNewsData();
  //       toast.success("Email Removed");
  //     })
  //     .catch((err) => {
  //       console.log("err");
  //     });
  // };

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
    setPhotoEditor(() =>
      filterPhotoEditor.filter((item) =>
        // console.log("filterPhotographerr",item)
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
              <h2 className="pl-3 pt-2">Realestate Agent</h2>
            </div>
            <div className="col">
              <div>
                <input
                  type="text"
                  className={`form-control form-control-lg form-control-solid `}
                  name="title"
                  placeholder="Search Photo Builder"
                  onChange={(e) => handleSearchData(e)}
                />
              </div>
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
              Are you want to remove this email from newsletter ??
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                cancel
              </Button>
              {/* <Button variant="danger" onClick={() => removeEmail()}>
                Delete
              </Button> */}
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default PropertyBuilder;
