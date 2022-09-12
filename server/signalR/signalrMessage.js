const signalR = require("@microsoft/signalr");

const urlArray = [
  "http://14.241.182.251:55078/chathub",
  "http://localhost:5011/chatHub",
  "http://localhost:5036/signalHub",
];
let connection = new signalR.HubConnectionBuilder()
  .withUrl(urlArray[2])
  .configureLogging(signalR.LogLevel.Information)
  .build();
connection.start();

connection.on("ReceiveMessage", (dataReceive, message) => {
  console.log(dataReceive, message);
});

exports.SendMessage = (id, message) => {
  connection.invoke("SendMessage", id, message);
};
