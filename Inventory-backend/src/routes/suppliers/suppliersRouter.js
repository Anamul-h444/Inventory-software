const router = require("express").Router();
const { userAuth } = require("../../middleware/authorise");
const {
  CreateSupplier,
  UpdateSupplier,
  ReadSupplier,
  ReadSupplierById,
  SupplierList,
} = require("../../controller/suppliers/supplierController");

router.post("/create", [userAuth], CreateSupplier);
router.post("/update/:id", [userAuth], UpdateSupplier);
router.get("/get", [userAuth], ReadSupplier);
router.get("/get/:id", [userAuth], ReadSupplierById);
router.get("/get/:pageNo/:perPage/:searchKeyword", [userAuth], SupplierList);

module.exports = router;
