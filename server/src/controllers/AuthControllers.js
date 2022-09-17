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

exports.getAuthControllerById = async (req, res) => {
  try {
    const usr = await Auth.find({ codeAuth: req.params.codeAuth });
    res.status(200).json(usr);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.updateLayoutAuthControllerById = async (req, res) => {
  const usr = await Auth.updateOne(
    { codeAuth: req.params.codeAuth },
    {
      $set: req.body,
    }
  );
  let message = {
    code: "addAuth",
    name: "_addUser",
    receiver: "backend",
    content: { code: "_write" },
  };
  vasdHubConnect.SendMessage("1809128", message);
  res.status(200).json({ message: "update success" });
};

exports.updateResetConfigAuthControllerById = async (req, res) => {
  const usr = await Auth.updateOne(
    { codeAuth: req.params.codeAuth },
    {
      $set: {
        tags: ["Medical", "Supplier", "Unit", "User"],
        chart: ["STAVW_0001", "STAVW_0002", "STAVW_0003", "STAVW_0004"],
        content: [2, 10],
      },
    }
  );

  let message = {
    code: "addAuth",
    name: "_addUser",
    receiver: "backend",
    content: { code: "_write" },
  };
  vasdHubConnect.SendMessage("1809128", message);
  res.status(200).json({ message: "update success" });
};

exports.createAuthController = (req, res) => {
  const createAuth = new Auth({
    codeAuth: req.body.codeAuth,
    username: req.body.username,
    password: req.body.password,
    permission: req.body.permission,
    tags: ["Medical", "Supplier", "Unit", "User"],
    chart: ["STAVW_0001", "STAVW_0002", "STAVW_0003", "STAVW_0004"],
    content: [2, 10],
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
  // console.log(getDataAuthorize);
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
  createAuth
    .save()
    .then((data) => {
      let message = {
        code: "addAuth",
        name: "_addUser",
        receiver: "backend",
        content: { code: "_write", data: data },
      };
      vasdHubConnect.SendMessage("1809128", message);
      res.send("Send Message Success");
    })
    .catch((err) => {
      res.json({ message: err });
    });
};
