const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    name: { type: String, unique: true },
  },
  { versionKey: false, timestamps: true }
);
module.exports.Brand = mongoose.model("brands", DataSchema);
