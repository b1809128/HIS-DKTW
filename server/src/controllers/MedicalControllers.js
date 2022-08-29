const Medical = require("../models/MedicalModel");
const vasdHubConnect = require("../../signalR/vasdRequire")
exports.getMedicalController = async (req, res) => {
  try {
    const mdc = await Medical.find();
    res.status(200).json(mdc);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.createMedicalController = (req, res) => {
  const createMedical = new Medical({
    codeMedical: req.body.codeMedical,
    nameMedical: req.body.nameMedical,
    nameUnitHospital: req.body.nameUnitHospital,
    codeSupplier: req.body.codeSupplier,
    amount: req.body.amount,
    costInput: req.body.costInput,
    costOutput: req.body.costOutput,
  });

  createMedical
    .save()
    .then((data) => {
      let message = {
        code: "addMedical",
        name: "_addMedical",
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
