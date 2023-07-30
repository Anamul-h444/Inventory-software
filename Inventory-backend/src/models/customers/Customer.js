const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    name: { type: String },
    phone: { type: String, unique: true },
    email: { type: String },
    address: { type: String },
  },
  { versionKey: false, timestamps: true }
);
module.exports.Customer = mongoose.model("customers", DataSchema);
