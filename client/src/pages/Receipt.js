import React from "react";
import { useLocation } from "react-router-dom";
import ReceiptDetails from "../components/ReceiptDetails/ReceiptDetails";
import ReceiptTable from "../components/Table/ReceiptTable";

function Receipt() {
  const query = new URLSearchParams(useLocation().search);
  const getParams = query.get("id");
  // console.log(getParams);
  return !getParams ? (
    <>
      <h4>Receipt Manage</h4>
      <ReceiptTable />
    </>
  ) : (
    <ReceiptDetails id={getParams} />
  );
}

export default Receipt;
