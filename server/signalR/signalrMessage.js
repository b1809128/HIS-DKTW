const urlArray = [
  "http://14.241.182.251:55078/chathub",
  "http://localhost:5011/chatHub",
  "http://localhost:5036/signalHub",
];
let connection = new signalR.HubConnectionBuilder()
  .withUrl(urlArray[0])
  .configureLogging(signalR.LogLevel.Information)
  .build();

connection.start();

//For Arrays[0]
connection.on("ReceiveMessage", (dataReceive, message) => {
  console.log({
    code: dataReceive.code,
    data: dataReceive.data,
  });
});

app.get("/send", async (req, res) => {
  const getAuthData = await Auth.find();
  const getMedicalData = await Medical.find();
  const getSupplierData = await Supplier.find();
  const getUnitData = await Unit.find();

  connection.invoke("SendMessage", "_nodejs", {
    code: 01,
    authData: JSON.stringify(getAuthData),
    medicalData: JSON.stringify(getMedicalData),
    supplierData: JSON.stringify(getSupplierData),
    unitData: JSON.stringify(getUnitData),
  });

  res.send("Send Message Success");
});
