const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("./config/Database");

const medicalRoutes = require("./src/routes/MedicalRoutes");
const supplierRoutes = require("./src/routes/SupplierRoutes");
const unitRoutes = require("./src/routes/UnitRoutes");
const receiptRoutes = require("./src/routes/ReceiptRoutes");
const authRoutes = require("./src/routes/AuthRoutes");

const port = 5000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

//Routes API
app.use("/api/medical", medicalRoutes);
app.use("/api/supplier", supplierRoutes);
app.use("/api/unit", unitRoutes);
app.use("/api/receipt", receiptRoutes);
app.use("/api/auth", authRoutes);

//SignalR Require
const vasdHubConnect = require("./signalR/vasdRequire");

//SignalR Route

app.get("/send", async (req, res) => {
  let message = {
    code: "sendData",
    name: "_addUser",
    receiver: "backend",
    content: { code: "_write" },
  };
  connection.send("SendMessage", "1809128", mess);
  vasdHubConnect.SendMessage("1809128", message);

  res.send("Send Message Success");
});

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`)
);
