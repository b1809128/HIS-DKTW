const mongoose = require("mongoose");

const AuthShema = new mongoose.Schema({
  codeAuth: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  permission: { type: Number, required: true },
  tags: [String],
  chart: [String],
  content: [Number],
  createdAt: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Auth", AuthShema);
