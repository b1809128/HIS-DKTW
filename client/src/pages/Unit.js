import React from "react";
import Row from "react-bootstrap/esm/Row";
import UnitTable from "../components/Table/UnitTable";

function Unit() {
  return (
    <>
      <h4 id="Unit">Manage Unit</h4>
      <Row>
        <UnitTable />
      </Row>
    </>
  );
}

export default Unit;
