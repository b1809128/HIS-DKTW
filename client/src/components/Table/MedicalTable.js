import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 50 },
  { field: "codeMedical", headerName: "Mã sản phẩm", width: 100 },
  { field: "nameMedical", headerName: "Tên sản phẩm", width: 250 },

  { field: "codeSupplier", headerName: "Nhà sản xuất", width: 100 },
  {
    field: "amount",
    headerName: "Số lượng",
    width: 80,
  },
  {
    field: "costInput",
    headerName: "Giá nhập hàng",
    type: "number",
    width: 150,
  },
  {
    field: "costOutput",
    headerName: "Giá bán",
    type: "number",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Ngày nhập",
    width: 150,
  },
];
function MedicalTable({ medicalData }) {
  var rows = [];

  for (let i = 0; i < medicalData.length; i++) {
    rows[i] = {
      id: i,
      codeMedical: medicalData[i].codeMedical,
      nameMedical: medicalData[i].nameMedical,
      codeSupplier: medicalData[i].codeSupplier,
      amount: medicalData[i].amount,
      costInput: medicalData[i].costInput,
      costOutput: medicalData[i].costOutput,
      createdAt: medicalData[i].createdAt,
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

export default MedicalTable;
