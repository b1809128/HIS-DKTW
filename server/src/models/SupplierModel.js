const mongoose = require("mongoose");

const SupplierSchema = new mongoose.Schema({
  codeSupplier: { type: String, required: true },
  nameSupplier: { type: String, required: true },
  addressSupplier: { type: String, required: true },
  directorSupplier: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  editedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Supplier", SupplierSchema);
