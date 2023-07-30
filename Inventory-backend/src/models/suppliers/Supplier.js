const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    name: { type: String },
    address: { type: String },
    phone: { type: String, unique: true },
    email: { type: String },
  },
  { versionKey: false, timestamps: true }
);
module.exports.Supplier = mongoose.model("suppliers", DataSchema);
