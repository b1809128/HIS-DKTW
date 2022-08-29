const Supplier = require("../models/SupplierModel");
const vasdHubConnect = require("../../signalR/vasdRequire")

exports.getSupplierController = async (req, res) => {
  try {
    const spl = await Supplier.find();
    res.json(spl);
  } catch (error) {
    console.error(error);
  }
};

exports.createSupplierController = (req, res) => {
  const createSupplier = new Supplier({
    codeSupplier: req.body.codeSupplier,
    nameSupplier: req.body.nameSupplier,
    addressSupplier: req.body.addressSupplier,
    directorSupplier: req.body.directorSupplier,
  });

  createSupplier
    .save()
    .then((data) => {
      let message = {
        code: "addSupplier",
        name: "_addSupplier",
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
