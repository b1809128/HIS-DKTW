import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Row from "react-bootstrap/esm/Row";
function Configure() {
  const [idPosition, setIdPosition] = useState(0);
  const configPosition = [
    { id: 1, text: "2 - 10", pos: [2, 10] },
    { id: 2, text: "10 - 2", pos: [10, 2] },
  ];

  const resetFunction = () => {
    Swal.fire({
      title: "Do you want to Reset Configure?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Reset",
      denyButtonText: `Don't Reset`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        axios.put("http://localhost:5000/api/auth/config/reset/usr1");
        Swal.fire("Saved!", "", "success");
        <Navigate to="/" />;
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const configLayoutApp = () => {
    Swal.fire({
      title: "Do you want to Change Configure?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Change",
      denyButtonText: `Don't Change`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const posArray = configPosition.filter(
          (data) => data.id === Number(idPosition)
        );
        axios.patch("http://localhost:5000/api/auth/config/set/usr1", {
          content: posArray[0].pos,
        });
        Swal.fire("Saved!", "", "success");
        <Navigate to="/" />;
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <>
      <Row style={{ marginBottom: "20px" }}>
        <div className="col-sm-4">
          <p>Settings Position</p>
          <div style={{ display: "flex" }}>
            <select
              value={idPosition}
              onChange={(e) => setIdPosition(e.target.value)}
              className="form-select"
            >
              {configPosition.map((data) => {
                return <option value={data.id}>{data.text}</option>;
              })}
            </select>
            <Button variant="primary" onClick={configLayoutApp}>
              Change
            </Button>
          </div>
        </div>
        <div className="col-sm-4"></div>
        <div className="col-sm-4"></div>
      </Row>
      <hr />
      <Button variant="primary" onClick={resetFunction}>
        Reset Configure
      </Button>
    </>
  );
}

export default Configure;
