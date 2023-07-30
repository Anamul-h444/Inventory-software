const router = require("express").Router();

const { userAuth } = require("../../middleware/authorise");
const {
  CreateExpense,
  UpdateExpense,
  ReadExpense,
  DeleteExpense,
  ReadExpenseById,
  ExpenseList,
} = require("../../controller/expenses/expenseController");

router.post("/create", [userAuth], CreateExpense);
router.post("/update/:id", [userAuth], UpdateExpense);
router.get("/get", [userAuth], ReadExpense);
router.get("/get/:id", [userAuth], ReadExpenseById);
router.delete("/delete/:id", [userAuth], DeleteExpense);
router.get("/get/:pageNo/:perPage/:searchKeyword", [userAuth], ExpenseList);

module.exports = router;
