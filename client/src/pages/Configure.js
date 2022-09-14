import React from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import axios from "axios";
function Configure() {
  // const history = useHistory();

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
        axios.patch("http://localhost:5000/api/auth/config/reset/usr1");
        Swal.fire("Saved!", "", "success");
        <Navigate to="/" />;
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };
  return (
    <Button variant="primary" onClick={resetFunction}>
      Reset Configure
    </Button>
  );
}

export default Configure;
