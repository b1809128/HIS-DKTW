const mongoose = require("mongoose");

const MedicalShema = new mongoose.Schema({
  codeMedical: { type: String, required: true },
  nameMedical: { type: String, required: true },
  nameUnitHospital: { type: String, required: true },
  codeSupplier: { type: String, required: true },
  amount: { type: Number, required: true},
  costInput: { type: Number, required: true },
  costOutput: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now() },
  editedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Medical", MedicalShema);
