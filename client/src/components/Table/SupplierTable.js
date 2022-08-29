import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 50 },

  { field: "codeSupplier", headerName: "Mã NXS", width: 100 },
  {
    field: "nameSupplier",
    headerName: "Tên công ty",
    width: 200,
  },
  {
    field: "addressSupplier",
    headerName: "Địa chỉ",
    type: "number",
    width: 400,
  },
  {
    field: "directorSupplier",
    headerName: "Giám đốc",
    type: "number",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 150,
  },
];
function SupplierTable({ supplierData }) {
  var rows = [];

  for (let i = 0; i < supplierData.length; i++) {
    rows[i] = {
      id: i,
      codeSupplier: supplierData[i].codeSupplier,
      nameSupplier: supplierData[i].nameSupplier,
      addressSupplier: supplierData[i].addressSupplier,
      directorSupplier: supplierData[i].directorSupplier,
      createdAt: supplierData[i].createdAt,
    };
  }

  return (
    <>
      <div style={{ height: 361, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={50}
          pageSize={5}
          rowsPerPageOptions={[5]}
          // checkboxSelection
        />
      </div>
    </>
  );
}

export default SupplierTable;
