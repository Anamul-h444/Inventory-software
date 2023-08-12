const { Sale } = require("../../models/sales/Sale");
const { SaleProduct } = require("../../models/sales/SaleProduct");
const mongoose = require("mongoose");

module.exports.CreateSaleWithProduct = async (req, res) => {
  const saleData = req.body.saleData;
  saleData.userEmail = req.headers.email;

  const saleProduct = req.body.saleProduct.map((product) => ({
    userEmail: req.headers.email,
    saleId: null,
    productId: product.productId,
    qty: product.qty,
    unitCost: product.unitCost,
    total: product.total,
  }));

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const createSale = await Sale.create([saleData], { session });

    const saleId = createSale[0]._id; // Get the saleId

    const createSaleProduct = await SaleProduct.insertMany(
      saleProduct.map((data) => ({ ...data, saleId })),
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Sale and Sale Product created successfully!",
      sale: createSale,
      saleProduct: createSaleProduct,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message: "Error creating Sale and Sale Product.",
      error: error.message,
    });
  }
};

exports.SaleList = async (req, res) => {
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
          { "customers.name": searchRegex },
          { "customers.phone": searchRegex },
          { "customers.email": searchRegex },
          { "customers.address": searchRegex },
          { note: searchRegex },
        ],
      };

      data = await Sale.aggregate([
        { $match: { userEmail: email } },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customers",
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
      data = await Sale.aggregate([
        { $match: { userEmail: email } },
        {
          $lookup: {
            from: "customers",
            localField: "customerId",
            foreignField: "_id",
            as: "customers",
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

module.exports.DeleteSaleWithProduct = async (req, res) => {
  const id = req.params.id;
  const userEmail = req.headers.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //Delete the Sale
    const deletedSale = await Sale.findOneAndDelete({
      _id: id,
      userEmail: userEmail,
    }).session(session);

    //Delete the Sale products
    const deletedProduct = await SaleProduct.deleteMany({
      saleId: id,
      userEmail: userEmail,
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Sale and saleProduct deleted successfully!",
      deletedSale,
      deletedProduct,
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
