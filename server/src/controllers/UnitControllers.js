const Unit = require("../models/UnitModel");
const vasdHubConnect = require("../../signalR/vasdRequire")

exports.getUnitController = async (req, res) => {
  try {
    const mdc = await Unit.find();
    res.status(200).json(mdc);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.createUnitController = (req, res) => {
  const createUnit = new Unit({
    codeUnit: req.body.codeUnit,
    nameUnit: req.body.nameUnit,
    memberUnit: {
      leaderUnit: req.body.memberUnit.leaderUnit,
      phoneNumber: req.body.memberUnit.phoneNumber,
      email: req.body.memberUnit.email,
    },
  });

  createUnit
    .save()
    .then((data) => {
      let message = {
        code: "addUnit",
        name: "_addUnit",
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
