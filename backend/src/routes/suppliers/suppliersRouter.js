const router = require("express").Router();
const { userAuth } = require("../../middleware/authorise");
const {
  CreateSupplier,
  UpdateSupplier,
  ReadSupplier,
  ReadSupplierById,
  SupplierList,
  DeleteSupplier
} = require("../../controller/suppliers/supplierController");

router.post("/create", [userAuth], CreateSupplier);
router.get("/get", [userAuth], ReadSupplier);
router.get("/get/:id", [userAuth], ReadSupplierById);
router.post("/update/:id", [userAuth], UpdateSupplier);
router.delete("/delete/:id", [userAuth], DeleteSupplier);
router.get("/get/:pageNo/:perPage/:searchKeyword", [userAuth], SupplierList);

module.exports = router;
