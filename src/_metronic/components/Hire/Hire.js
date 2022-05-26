import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiGet, ApiPut } from "../../../helpers/API/ApiData";

const Hire = (props) => {
  const { photoEditorID } = props;
  const [photoEditorData, setPhotoEditorData] = useState();
  console.log("photoEditorID", photoEditorID);
  const getViewPhotoEditordetails = () => {
    ApiGet(`hire/getAllHire`)
      .then((res) => {
        console.log("getAllHire", res?.data?.payload?.hire);
        setPhotoEditorData(res?.data?.payload?.hire);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  console.log("photoEditorData", photoEditorData);

  useEffect(() => {
    getViewPhotoEditordetails();
  }, []);

  return (
    <div className="card-spacer">
        <div>
          {/* <!-- Page Content --> */}
          <div class="container">
            <div className="row">
              {photoEditorData?.map((res) => {
                return (
                  <>
                    <Card style={{ width: "18rem",margin:"30px"}} >
                      <Card.Body>
                        <Card.Title>{res?.photographer_id?.firstName}{res?.lastName}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">
                          Project Name :{res?.projectName}
                        </Card.Subtitle>
                        <Card.Text>
                          
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">
                          Photo Editor
                        </Card.Subtitle>
                        <Card.Link href="#">{res?.photoeditor_id?.firstName}</Card.Link>
                        <Card.Link href="#">Another Link</Card.Link>
                      </Card.Body>
                    </Card>
                  </>
                );
              })}
            </div>

            <hr class="mt-2 mb-5" />
          </div>
        </div>
    </div>
  );
};

export default Hire;
