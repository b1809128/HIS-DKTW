//SignalR Require
const vasdHubConnect = require("./signalR/signalrMessage");

//SignalR Route

app.get("/send", async (req, res) => {
  let message = {
    code: "sendData",
    name: "_addUser",
    receiver: "backend",
    content: { code: "_write" },
  };
  vasdHubConnect.SendMessage("1809128", message);

  res.send("Send Message Success");
});
