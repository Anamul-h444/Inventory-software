const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    typeId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    amount: { type: Number },
    note: { type: String },
  },
  { versionKey: false, timestamps: true }
);
module.exports.Expense = mongoose.model("expenses", DataSchema);
