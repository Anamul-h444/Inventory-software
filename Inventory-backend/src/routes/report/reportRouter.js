const router = require("express").Router();

const { userAuth } = require("../../middleware/authorise");
const {
  expenseReport,
  SaleReport,
  returnReport,
  purchaseReport,
} = require("../../controller/reports/reportController");

router.post("/expense", [userAuth], expenseReport);
router.post("/sale", [userAuth], SaleReport);
router.post("/return", [userAuth], returnReport);
router.post("/purchase", [userAuth], purchaseReport);

module.exports = router;
