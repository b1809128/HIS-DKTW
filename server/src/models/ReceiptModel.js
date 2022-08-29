const mongoose = require("mongoose");

const ReceiptSchema = new mongoose.Schema({
  codeReceipt: { type: String, required: true },
  codeMedical: { type: String, required: true },
  nameMedical: { type: String, required: true },
  codeSupplier: { type: String, required: true },
  priceReceipt: { type: Number, required: true },
  amountReceipt: { type: Number, required: true },
  customer: {
    code: { type: String, required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
  },
  statusReceipt: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Receipt", ReceiptSchema);
