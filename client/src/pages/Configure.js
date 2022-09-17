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
        axios.put("http://localhost:5000/api/auth/config/reset/dd_2");
        Swal.fire("Saved!", "", "success");
        <Navigate to="/" />;
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  const configLayoutApp = () => {
    Swal.fire({
      title: "Do you want to Reset Configure?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Reset",
      denyButtonText: `Don't Reset`,
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
      <Row>
        <p>Settings Position</p>
        <select
          value={idPosition}
          onChange={(e) => setIdPosition(e.target.value)}
        >
          {configPosition.map((data) => {
            return <option value={data.id}>{data.text}</option>;
          })}
        </select>
        <Button variant="primary" onClick={configLayoutApp}>
          Change
        </Button>
      </Row>
      <hr />
      <Button variant="primary" onClick={resetFunction}>
        Reset Configure
      </Button>
    </>
  );
}

export default Configure;
