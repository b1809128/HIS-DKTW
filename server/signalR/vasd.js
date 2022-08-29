setTimeout(async () => {
  const getAuthData = await Auth.find();
  connection.invoke("SendMessage", "_nodejs", "sendData", {
    token: JSON.stringify(getAuthData),
  });
}, 5000);

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
  console.log(dataReceive, message);
});

app.get("/send", async (req, res) => {
  let mess = {
    code: "add",
    name: "_addUser",
    receiver: "backend",
    content: { code: "_write" },
  };
  connection.send("SendMessage", "huy", mess);
  res.send("Send Message Success");
});
