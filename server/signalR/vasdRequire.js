const signalR = require("@microsoft/signalr");
let connection = new signalR.HubConnectionBuilder()
  .withUrl("http://14.241.182.251:55078/chathub")
  .configureLogging(signalR.LogLevel.Information)
  .build();

connection.start();
connection.on("ReceiveMessage", (dataReceive, message) => {
  console.log(dataReceive, message);
  // return dataReceive, message;
});
// exports.startHubConnection = () => {
//   connection.start();
// };

exports.ReceiveMessage = () => {};

exports.SendMessage = (id, message) => {
  connection.send("SendMessage", id, message);
};
