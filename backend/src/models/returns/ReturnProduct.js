const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    returnId: { type: mongoose.Schema.Types.ObjectId },
    productId: { type: mongoose.Schema.Types.ObjectId },
    qty: { type: Number },
    unitCost: { type: Number },
    total: { type: Number },
  },
  { versionKey: false, timestamps: true }
);
module.exports.ReturnProduct = mongoose.model("returnproducts", DataSchema);
