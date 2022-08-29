import React, { useState, useEffect } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const columns = [
  { field: "id", headerName: "ID", width: 30 },

  { field: "codeReceipt", headerName: "Mã Đơn", width: 60 },
  {
    field: "codeMedical",
    headerName: "Mã Thuốc",
    width: 60,
  },
  {
    field: "nameMedical",
    headerName: "Tên Thuốc",
    width: 200,
  },
  {
    field: "codeSupplier",
    headerName: "Mã NSX",
    width: 100,
  },
  {
    field: "priceReceipt",
    headerName: "Giá Đơn Hàng",
    width: 150,
  },
  {
    field: "amountReceipt",
    headerName: "Số Lượng",
    width: 50,
  },
  { field: "statusReceipt", headerName: "Tình Trạng Đơn", width: 150 },
  {
    field: "createdAt",
    headerName: "Ngày Tạo",
    width: 150,
  },
  {
    field: "detailReceipt",
    headerName: "Chi tiết",
    width: 100,
    renderCell: (params) => (
      <Link to={`/Receipt?id=${params.value}`}>Chi Tiết</Link>
    ),
  },
];
function ReceiptTable({ idProps }) {
  const [receiptData, setReceiptData] = useState([]);

  useEffect(() => {
    const searchProduct = async () => {
      try {
        if (idProps) {
          const getReceiptData = await axios.get(
            `http://localhost:5000/api/receipt/${idProps}`
          );
          setReceiptData(getReceiptData.data);
        } else {
          const getReceiptData = await axios.get(
            "http://localhost:5000/api/receipt"
          );
          setReceiptData(getReceiptData.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    searchProduct();
  }, [idProps]);

  var rows = [];

  for (var i = 0; i < receiptData.length; i++) {
    rows[i] = {
      id: i,
      codeReceipt: receiptData[i].codeReceipt,
      codeMedical: receiptData[i].codeMedical,
      nameMedical: receiptData[i].nameMedical,
      codeSupplier: receiptData[i].codeSupplier,
      priceReceipt: receiptData[i].priceReceipt,
      amountReceipt: receiptData[i].amountReceipt,
      statusReceipt: receiptData[i].statusReceipt,
      createdAt: receiptData[i].createdAt,
      detailReceipt: receiptData[i].codeReceipt,
    };
  }

  return (
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
  );
}

export default ReceiptTable;
