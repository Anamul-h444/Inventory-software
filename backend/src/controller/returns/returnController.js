const { Return } = require("../../models/returns/Return");
const { ReturnProduct } = require("../../models/returns/ReturnProduct");
const mongoose = require("mongoose");

module.exports.CreateReturnWithProduct = async (req, res) => {
  const returnData = req.body.returnData;
  returnData.userEmail = req.headers.email;

  const returnProduct = req.body.returnProduct.map((product) => ({
    userEmail: req.headers.email,
    returnId: null,
    productId: product.productId,
    qty: product.qty,
    unitCost: product.unitCost,
    total: product.total,
  }));

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const createReturn = await Return.create([returnData], { session });

    const returnId = createReturn[0]._id; // Get the returnId

    const createReturnProduct = await ReturnProduct.insertMany(
      returnProduct.map((data) => ({ ...data, returnId })),
      { session }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "Return and RetunrProduct created successfully!",
      return: createReturn,
      returnProduct: createReturnProduct,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message: "Error creating Retun and ReturnProduct.",
      error: error.message,
    });
  }
};

exports.ReturnList = async (req, res) => {
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

      data = await Return.aggregate([
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
      data = await Return.aggregate([
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

module.exports.DeleteReturnWithProduct = async (req, res) => {
  const id = req.params.id;
  const userEmail = req.headers.email;

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    //Delete the return
    const deletedReturn = await Return.findOneAndDelete({
      _id: id,
      userEmail: userEmail,
    }).session(session);

    //Delete the return products
    const deletedProduct = await ReturnProduct.deleteMany({
      returnId: id,
      userEmail: userEmail,
    }).session(session);

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Return and ReturnProduct deleted successfully!",
      deletedReturn,
      deletedProduct,
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message: "Error deleting Return and ReturnProduct.",
      error: error.message,
    });
  }
};
