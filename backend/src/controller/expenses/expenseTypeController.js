const { ExpenseType } = require("../../models/expenses/ExpenseType");
const { Expense } = require("../../models/expenses/Expense");

exports.CreateExpenseType = async (req, res) => {
  const name = req.body.name;
  const email = req.headers.email;
  try {
    let expenseType = {};
    expenseType = await ExpenseType.findOne({ name: name, userEmail: email });
    if (expenseType) {
      return res.status(400).send("ExpenseType already exist");
    } else {
      expenseType = new ExpenseType({ name: name, userEmail: email });
      const newExpenseType = await expenseType.save();
      res.status(201).json({
        success: true,
        message: "ExpenseType create successful",
        newExpenseType,
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updatedExpenseType = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const email = req.headers.email;

  try {
    let expenseType = {};
    expenseType = await ExpenseType.findOne({ _id: id, userEmail: email });
    if (!expenseType) {
      res.status(400).send("ExpenseType is not found");
    } else {
      const updatedExpenseType = await ExpenseType.updateOne(expenseType, {
        name: name,
      });
      res.status(201).json({
        success: true,
        message: "ExpenseType update successful",
        updatedExpenseType,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("ExpenseType is not found");
    } else if (error.KeyPattern && error.KeyPattern.name === 1) {
      return res.status(400).send("ExpenseType already exists");
    }
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.ReadExpenseType = async (req, res) => {
  try {
    const expenseType = await ExpenseType.find({ userEmail: req.headers.email });
    res.status(200).json({
      success: true,
      message: "ExpenseType retrieved successful",
      expenseType,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.ReadExpenseTypeById = async (req, res) => {
  const id = req.params.id;
  const email = req.headers.email;
  try {
    const expenseType = await ExpenseType.find({ _id: id, userEmail: email });
    if (expenseType.length === 0) {
      // ExpenseType not found
      throw new Error("ExpenseType not found");
    }
    res.status(200).json({
      success: true,
      message: "ExpenseType retrieved successful",
      expenseType,
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("ExpenseType is not found");
    }
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.ExpenseTypeList = async (req, res) => {
  const email = req.headers.email;
  const searchKeyword = req.params.searchKeyword;
  const pageNo = Number(req.params.pageNo);
  const perPage = Number(req.params.perPage);
  const skipRow = (pageNo - 1) * perPage;

  try {
    let data;
    if (searchKeyword !== "0") {
      let searchRegex = { $regex: searchKeyword, $options: "i" };
      let searchQuery = { $or: [{ name: searchRegex }] };

      data = await ExpenseType.aggregate([
        { $match: { userEmail: email } },
        { $match: searchQuery },
        {
          $facet: {
            total: [{ $count: "total" }],
            rows: [{ $skip: skipRow }, { $limit: perPage }],
          },
        },
      ]);
    } else {
      data = await ExpenseType.aggregate([
        { $match: { userEmail: email } },
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

exports.DeleteExpenseType = async (req, res) => {
  let id = req.params.id;
  const userEmail = req.headers.email;

  try {
    // Check if the expenseType is associated with a product
    const expenseType = await Expense.findOne({
      typeId: id,
      userEmail: userEmail,
    });
    if (expenseType) {
      return res
        .status(200)
        .json({ status: "associate", data: "Associate with expense" });
    } else {
      // Delete the expenseType
      const deletedexpenseType = await ExpenseType.findOneAndDelete({
        _id: id,
        userEmail: userEmail,
      });

      if (deletedexpenseType === null) {
        throw new Error("Expense type is not found");
      }
      res.status(200).json({
        status: "success",
        data: deletedexpenseType,
      });
    }
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(400).send("Expense type is not found");
    }
    res.status(500).json({
      status: "error",
      message: "Error deleting Expense.",
      error: error.message,
    });
  }
};
