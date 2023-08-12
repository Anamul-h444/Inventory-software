const { Expense } = require("../../models/expenses/Expense");
const { SaleProduct } = require("../../models/sales/SaleProduct");
const { ReturnProduct } = require("../../models/returns/ReturnProduct");
const { PurchaseProduct } = require("../../models/purchases/PurchaseProduct");

module.exports.expenseReport = async (req, res) => {
  const userEmail = req.headers.email;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;

  try {
    let data = await Expense.aggregate([
      {
        $match: {
          userEmail: userEmail,
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
      },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                totalAmount: { $sum: "$amount" },
              },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: "expensetypes",
                localField: "typeId",
                foreignField: "_id",
                as: "type",
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.SaleReport = async (req, res) => {
  const userEmail = req.headers.email;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;

  try {
    let data = await SaleProduct.aggregate([
      {
        $match: {
          userEmail: userEmail,
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
      },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$total" },
              },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "products",
              },
            },
            { $unwind: "$products" },
            {
              $lookup: {
                from: "brands",
                localField: "products.brandId",
                foreignField: "_id",
                as: "brands",
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "products.categoryId",
                foreignField: "_id",
                as: "categories",
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.returnReport = async (req, res) => {
  const userEmail = req.headers.email;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;

  try {
    let data = await ReturnProduct.aggregate([
      {
        $match: {
          userEmail: userEmail,
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
      },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$total" },
              },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "products",
              },
            },
            { $unwind: "$products" },
            {
              $lookup: {
                from: "brands",
                localField: "products.brandId",
                foreignField: "_id",
                as: "brands",
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "products.categoryId",
                foreignField: "_id",
                as: "categories",
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.purchaseReport = async (req, res) => {
  const userEmail = req.headers.email;
  const fromDate = req.body.fromDate;
  const toDate = req.body.toDate;

  try {
    let data = await PurchaseProduct.aggregate([
      {
        $match: {
          userEmail: userEmail,
          createdAt: { $gte: new Date(fromDate), $lte: new Date(toDate) },
        },
      },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$total" },
              },
            },
          ],
          Rows: [
            {
              $lookup: {
                from: "products",
                localField: "productId",
                foreignField: "_id",
                as: "products",
              },
            },
            { $unwind: "$products" },
            {
              $lookup: {
                from: "brands",
                localField: "products.brandId",
                foreignField: "_id",
                as: "brands",
              },
            },
            {
              $lookup: {
                from: "categories",
                localField: "products.categoryId",
                foreignField: "_id",
                as: "categories",
              },
            },
          ],
        },
      },
    ]);
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
