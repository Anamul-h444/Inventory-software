const { Purchase } = require("../../models/purchases/Purchase");
const { PurchaseProduct } = require("../../models/purchases/PurchaseProduct");
const mongoose = require("mongoose");

module.exports.CreatePurchaseWithProduct = async (req, res) => {
  const purchaseData = {
    userEmail: req.headers.email,
    supplierId: req.body.purchaseData.supplierId,
    vatTax: req.body.purchaseData.vatTax,
    discount: req.body.purchaseData.discount,
    otherCost: req.body.purchaseData.otherCost,
    shippingCost: req.body.purchaseData.shippingCost,
    grandTotal: req.body.purchaseData.grandTotal,
    note: req.body.purchaseData.note,
  };

  const purchaseProductData = req.body.purchaseProduct.map((product) => ({
    userEmail: req.headers.email,
    purchaseId: null,
    productId: product.productId,
    qty: product.qty,
    unitCost: product.unitCost,
    total: product.total,
  }));

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const createdPurchase = await Purchase.create([purchaseData], { session });

    const purchaseId = createdPurchase[0]._id; // Get the purchase ID

    const createdPurchaseProduct = await PurchaseProduct.insertMany(
      purchaseProductData.map((data) => ({ ...data, purchaseId })),
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Purchase and PurchaseProduct created successfully!",
      purchase: createdPurchase,
      purchaseProduct: createdPurchaseProduct,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message: "Error creating Purchase and PurchaseProduct.",
      error: error.message,
    });
  }
};

exports.PurchaseList = async (req, res) => {
  const email = req.headers.email;
  const searchKeyword = req.params.searchKeyword;
  const pageNo = Number(req.params.pageNo);
  const perPage = Number(req.params.perPage);
  const skipRow = (pageNo - 1) * perPage;

  try {
    let data;
    if (searchKeyword !== "0") {
      let searchRegex = { $regex: searchKeyword, $options: "i" };
      let searchQuery = {
        $or: [
          { "suppliers.name": searchRegex },
          { "suppliers.phone": searchRegex },
          { "suppliers.email": searchRegex },
          { "suppliers.address": searchRegex },
          { note: searchRegex },
        ],
      };

      data = await Purchase.aggregate([
        { $match: { userEmail: email } },
        {
          $lookup: {
            from: "suppliers",
            localField: "supplierId",
            foreignField: "_id",
            as: "suppliers",
          },
        },
        { $match: searchQuery },
        {
          $facet: {
            total: [{ $count: "total" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    } else {
      data = await Purchase.aggregate([
        { $match: { userEmail: email } },
        {
          $lookup: {
            from: "suppliers",
            localField: "supplierId",
            foreignField: "_id",
            as: "suppliers",
          },
        },
        {
          $facet: {
            total: [{ $count: "total" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    }
    return res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.DeletePurchaseWithProduct = async (req, res) => {
  const id = req.params.id;
  const userEmail = req.headers.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // Delete the purchase
    const deletedPurchase = await Purchase.findOneAndDelete({
      _id: id,
      userEmail: userEmail,
    }).session(session);

    // Delete the purchase products
    await PurchaseProduct.deleteMany({
      purchaseId: id,
      userEmail: userEmail,
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Purchase and PurchaseProduct deleted successfully!",
      purchase: deletedPurchase,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message: "Error deleting Purchase and PurchaseProduct.",
      error: error.message,
    });
  }
};
