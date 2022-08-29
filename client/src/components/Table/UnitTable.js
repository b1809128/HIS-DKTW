import React from "react";
import { DataGrid } from "@mui/x-data-grid";

const columns = [
  { field: "id", headerName: "ID", width: 50 },

  { field: "codeUnit", headerName: "Mã Khoa - Phòng", width: 100 },
  {
    field: "nameUnit",
    headerName: "Tên Khoa",
    width: 200,
  },
  {
    field: "leaderUnit",
    headerName: "Lãnh đạo khoa",
    width: 200,
  },
  {
    field: "phoneNumber",
    headerName: "Số điện thoại",
    width: 150,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
  },
  {
    field: "createdAt",
    headerName: "Ngày tạo",
    width: 150,
  },
];
function UnitTable({ unitData }) {
  var rows = [];

  for (let i = 0; i < unitData.length; i++) {
    rows[i] = {
      id: i,
      codeUnit: unitData[i].codeUnit,
      nameUnit: unitData[i].nameUnit,
      leaderUnit: unitData[i].memberUnit.leaderUnit,
      phoneNumber: unitData[i].memberUnit.phoneNumber,
      email: unitData[i].memberUnit.email,
      createdAt: unitData[i].createdAt,
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

export default UnitTable;
