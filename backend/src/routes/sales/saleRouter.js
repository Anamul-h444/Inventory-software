const router = require("express").Router();
const { userAuth } = require("../../middleware/authorise");
const {
  CreateSaleWithProduct,
  SaleList,
  DeleteSaleWithProduct,
} = require("../../controller/sales/saleController");

router.post("/create", [userAuth], CreateSaleWithProduct);
router.delete("/delete/:id", [userAuth], DeleteSaleWithProduct);
router.get("/get/:pageNo/:perPage/:searchKeyword", [userAuth], SaleList);

module.exports = router;
