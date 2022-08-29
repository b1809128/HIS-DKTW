const Auth = require("../models/AuthModel");
const vasdHubConnect = require("../../signalR/vasdRequire");

exports.getAuthController = async (req, res) => {
  try {
    const usr = await Auth.find();
    res.status(200).json(usr);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.createAuthController = (req, res) => {
  const createAuth = new Auth({
    codeAuth: req.body.codeAuth,
    username: req.body.username,
    password: req.body.password,
    permission: req.body.permission,
  });

  createAuth
    .save()
    .then((data) => {
      let message = {
        code: "addAuth",
        name: "_addUser",
        receiver: "backend",
        content: { code: "_write" },
      };
      vasdHubConnect.SendMessage("1809128", message);
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: err });
    });
};

exports.loginAuthController = (req, res) => {
  const getDataAuthorize = req.authenticatedUser;
  console.log(getDataAuthorize);
  if (getDataAuthorize) {
    res.json(getDataAuthorize);
  } else {
    res.json({ error: "Access Denied" });
  }
};

exports.signalRGetDataAuth = async (req, res) => {
  const getAuthData = await Auth.find();
  connection.invoke("SendMessage", "_nodejs", "sendData", {
    token: JSON.stringify(getAuthData),
  });
  res.send("Send Message Success");
};
