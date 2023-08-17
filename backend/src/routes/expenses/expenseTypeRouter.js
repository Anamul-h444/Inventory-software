const router = require("express").Router();
const { userAuth } = require("../../middleware/authorise");
const {
  CreateExpenseType,
  updatedExpenseType,
  ReadExpenseType,
  ReadExpenseTypeById,
  ExpenseTypeList,
  DeleteExpenseType,
} = require("../../controller/expenses/expenseTypeController");

router.post("/create", [userAuth], CreateExpenseType);
router.post("/update/:id", [userAuth], updatedExpenseType);
router.get("/get", [userAuth], ReadExpenseType);
router.get("/get/:id", [userAuth], ReadExpenseTypeById);
router.delete("/delete/:id", [userAuth], DeleteExpenseType);
router.get("/get/:pageNo/:perPage/:searchKeyword", [userAuth], ExpenseTypeList);

module.exports = router;
