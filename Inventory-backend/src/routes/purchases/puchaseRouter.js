const router = require("express").Router();
const { userAuth } = require("../../middleware/authorise");
const {
  CreatePurchaseWithProduct,
  PurchaseList,
  DeletePurchaseWithProduct,
} = require("../../controller/purchases/purchaseController");

router.post("/create", [userAuth], CreatePurchaseWithProduct);
router.delete("/delete/:id", [userAuth], DeletePurchaseWithProduct);
router.get("/get/:pageNo/:perPage/:searchKeyword", [userAuth], PurchaseList);

module.exports = router;
