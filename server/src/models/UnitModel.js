const mongoose = require("mongoose");

const UnitSchema = new mongoose.Schema({
  codeUnit: { type: String, required: true },
  nameUnit: { type: String, required: true },
  memberUnit: {
    leaderUnit: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    email: { type: String, required: true },
  },
  createdAt: { type: Date, default: Date.now() },
  editedAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Unit", UnitSchema);
