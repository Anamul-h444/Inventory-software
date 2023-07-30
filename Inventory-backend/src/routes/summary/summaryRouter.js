const router = require("express").Router();

const { userAuth } = require("../../middleware/authorise");
const {
  SaleSummary,
  ReturnSummary,
  PurchaseSummary,
  ExpenseSummary,
} = require("../../controller/summary/summaryController");

router.get("/expense", [userAuth], ExpenseSummary);
router.get("/sale", [userAuth], SaleSummary);
router.get("/return", [userAuth], ReturnSummary);
router.get("/purchase", [userAuth], PurchaseSummary);

module.exports = router;
