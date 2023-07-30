const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    name: { type: String, unique: true },
    CreatedDate: { type: Date, default: Date.now() },
  },
  { versionKey: false }
);
module.exports.ExpenseType = mongoose.model("expensetypes", DataSchema);
