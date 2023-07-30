const router = require("express").Router();
const { userAuth } = require("../../middleware/authorise");
const { checkValidation } = require("../../middleware/checkValidation");
const {
  CreateProduct,
  UpdateProduct,
  ReadProductById,
  ProductList,
  DeleteProduct,
} = require("../../controller/products/poductController");

router.post("/create", [userAuth], CreateProduct);
router.post("/update/:id", [userAuth], UpdateProduct);
router.get("/get/:id", [userAuth], ReadProductById);
router.delete("/delete/:id", [userAuth], DeleteProduct);
router.get("/get/:pageNo/:perPage/:searchKeyword", [userAuth], ProductList);

module.exports = router;
