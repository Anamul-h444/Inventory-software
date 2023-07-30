const mongoose = require("mongoose");
const DataSchema = mongoose.Schema(
  {
    userEmail: { type: String },
    categoryId: { type: mongoose.Schema.Types.ObjectId },
    brandId: { type: mongoose.Schema.Types.ObjectId },
    name: { type: String },
    unit: { type: String },
    details: { type: String },
  },
  { versionKey: false, timestamps: true }
);
module.exports.Product = mongoose.model("products", DataSchema);
