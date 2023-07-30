const { Expense } = require("../../models/expenses/Expense");
const { Purchase } = require("../../models/purchases/Purchase");
const { Return } = require("../../models/returns/Return");
const { Sale } = require("../../models/sales/Sale");

module.exports.ExpenseSummary = async (req, res) => {
  try {
    let userEmail = req.headers["email"];
    let data = await Expense.aggregate([
      { $match: { userEmail: userEmail } },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$amount" },
              },
            },
          ],
          Last30Days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                TotalAmount: { $sum: "$amount" },
              },
            },
            { $sort: { _id: -1 } },
            { $limit: 30 },
          ],
        },
      },
    ]);

    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.PurchaseSummary = async (req, res) => {
  try {
    let userEmail = req.headers["email"];

    let data = await Purchase.aggregate([
      { $match: { userEmail: userEmail } },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$grandTotal" },
              },
            },
          ],
          Last30Days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                TotalAmount: { $sum: "$grandTotal" },
              },
            },
            { $sort: { _id: -1 } },
            { $limit: 30 },
          ],
        },
      },
    ]);

    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.ReturnSummary = async (req, res) => {
  try {
    let userEmail = req.headers["email"];
    let data = await Return.aggregate([
      { $match: { userEmail: userEmail } },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$grandTotal" },
              },
            },
          ],
          Last30Days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                TotalAmount: { $sum: "$grandTotal" },
              },
            },
            { $sort: { _id: -1 } },
            { $limit: 30 },
          ],
        },
      },
    ]);
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.SaleSummary = async (req, res) => {
  try {
    let userEmail = req.headers["email"];
    let data = await Sale.aggregate([
      { $match: { userEmail: userEmail } },
      {
        $facet: {
          Total: [
            {
              $group: {
                _id: 0,
                TotalAmount: { $sum: "$grandTotal" },
              },
            },
          ],
          Last30Days: [
            {
              $group: {
                _id: {
                  $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
                },
                TotalAmount: { $sum: "$grandTotal" },
              },
            },
            { $sort: { _id: -1 } },
            { $limit: 30 },
          ],
        },
      },
    ]);
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
