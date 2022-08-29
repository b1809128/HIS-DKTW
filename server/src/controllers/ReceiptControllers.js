const Receipt = require("../models/ReceiptModel");
const vasdHubConnect = require("../../signalR/vasdRequire")

exports.getReceiptController = async (req, res) => {
  try {
    const rcp = await Receipt.find();
    res.status(200).json(rcp);
  } catch (error) {
    res.status(404).send(error);
  }
};

exports.getSingleReceiptController = async (req, res) => {
  try {
    const getSingleData = await Receipt.find({
      codeReceipt: req.params.id,
    });
    res.status(200).json(getSingleData);
  } catch (error) {
    console.error(error);
  }
};

exports.createReceiptController = (req, res) => {
  const createReceipt = new Receipt({
    codeReceipt: req.body.codeReceipt,
    codeMedical: req.body.codeMedical,
    nameMedical: req.body.nameMedical,
    codeSupplier: req.body.codeSupplier,
    priceReceipt: req.body.priceReceipt,
    amountReceipt: req.body.amountReceipt,
    customer: {
      code: req.body.customer.code,
      name: req.body.customer.name,
      phone: req.body.customer.phone,
      email: req.body.customer.email,
      address: req.body.customer.address,
    },
    statusReceipt: req.body.statusReceipt,
  });

  createReceipt
    .save()
    .then((data) => {
      let message = {
        code: "addReceipt",
        name: "_addReceipt",
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
