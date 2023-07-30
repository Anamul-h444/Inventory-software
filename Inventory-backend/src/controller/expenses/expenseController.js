const { Expense } = require("../../models/expenses/Expense");

module.exports.CreateExpense = async (req, res) => {
  const { typeId, amount, note } = req.body;
  const userEmail = req.headers.email;
  try {
    let expense = {};
    expense = new Expense({
      typeId,
      amount,
      note,
      userEmail: userEmail,
    });
    const newExpense = await expense.save();
    res.status(201).json({
      success: true,
      message: "Expense create successful",
      newExpense,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports.UpdateExpense = async (req, res) => {
  const { typeId, amount, note } = req.body;
  const userEmail = req.headers.email;
  const id = req.params.id;
  try {
    let expense = {};
    expense = await Expense.findOne({ _id: id, userEmail: userEmail });
    if (!expense) {
      res.status(400).send("Expense not found");
    } else {
      const updatedExpense = await Expense.updateOne(expense, {
        typeId,
        amount,
        note,
      });
      res.status(201).json({
        success: true,
        message: "Expense list update successful",
        updatedExpense,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Expense not found");
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.DeleteExpense = async (req, res) => {
  const id = req.params.id;
  const userEmail = req.headers.email;
  try {
    let expense = {};
    expense = await Expense.findOne({ _id: id, userEmail: userEmail });
    if (!expense) {
      res.status(400).send("Expense is not found");
    } else {
      const deletedExpense = await Expense.deleteOne(expense);
      res.status(200).json({
        success: true,
        message: "Expense delete successful",
        deletedExpense,
      });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports.ReadExpense = async (req, res) => {
  try {
    let data = await Expense.aggregate([
      {
        $lookup: {
          from: "expensetypes",
          localField: "typeId",
          foreignField: "_id",
          as: "type",
        },
      },
    ]);
    res
      .status(200)
      .json({ success: true, message: "Expense retrieved successful", data });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.ReadExpenseById = async (req, res) => {
  const id = req.params.id;
  const email = req.headers.email;
  try {
    const expense = await Expense.find({ _id: id, userEmail: email });
    if (expense.length === 0) {
      // Expense not found
      throw new Error("Expense not found");
    }
    res.status(200).json({
      success: true,
      message: "Expense retrieved successful",
      expense,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Expense is not found");
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.ExpenseList = async (req, res) => {
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
        $or: [{ "type.name": searchRegex }, { note: searchRegex }],
      };

      data = await Expense.aggregate([
        { $match: { userEmail: email } },
        {
          $lookup: {
            from: "expensetypes",
            localField: "typeId",
            foreignField: "_id",
            as: "type",
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
      data = await Expense.aggregate([
        { $match: { userEmail: email } },
        {
          $lookup: {
            from: "expensetypes",
            localField: "typeId",
            foreignField: "_id",
            as: "type",
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
