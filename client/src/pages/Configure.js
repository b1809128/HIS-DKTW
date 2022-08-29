import React from "react";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { Redirect } from "react-router-dom";
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
        localStorage.removeItem("tagItems");
        localStorage.removeItem("layOutApp");
        Swal.fire("Saved!", "", "success");
        <Redirect to="/" />;
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
