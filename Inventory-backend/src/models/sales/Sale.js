const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    customerId: { type: mongoose.Schema.Types.ObjectId },
    vatTax: { type: Number },
    discount: { type: Number },
    otherCost: { type: Number },
    shippingCost: { type: Number },
    grandTotal: { type: Number },
    note: { type: String },
  },
  { versionKey: false, timestamps: true }
);
module.exports.Sale = mongoose.model("sales", DataSchema);
