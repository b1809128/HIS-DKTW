import React from "react";
import Row from "react-bootstrap/esm/Row";
import MedicalTable from "../components/Table/MedicalTable";
import ReceiptTable from "../components/Table/ReceiptTable";
import SupplierTable from "../components/Table/SupplierTable";
import UnitTable from "../components/Table/UnitTable";

function Table() {
  return (
    <>
      <h4 id="Medical">Manage Medical</h4>
      <Row>
        <MedicalTable />
      </Row>
      <h4 id="Supplier">Manage Supplier</h4>
      <Row>
        <SupplierTable />
      </Row>
      <h4 id="Unit">Manage Unit</h4>
      <Row>
        <UnitTable />
      </Row>
      <h4 id="Unit">Manage Receipt</h4>
      <Row>
        <ReceiptTable />
      </Row>
    </>
  );
}

export default Table;
