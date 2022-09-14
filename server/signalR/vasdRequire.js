const signalR = require("@microsoft/signalr");
let connection = new signalR.HubConnectionBuilder()
  .withUrl("http://14.241.182.251:55078/chathub")
  .configureLogging(signalR.LogLevel.Information)
  .build();

connection.start();
connection.on("ReceiveMessage", (id, message) => {
  console.log(id, message);
});

exports.SendMessage = (id, message) => {
  connection.send("SendMessage", id, message);
};
