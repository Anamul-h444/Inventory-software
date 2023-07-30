const router = require("express").Router();
const { userAuth } = require("../../middleware/authorise");

const {
  CreateCustomer,
  UpdateCustomer,
  ReadCustomer,
  ReadCustomerById,
  CustomerList,
} = require("../../controller/customers/customerController");

router.post("/create", [userAuth], CreateCustomer);
router.post("/update/:id", [userAuth], UpdateCustomer);
router.get("/get", [userAuth], ReadCustomer);
router.get("/get/:id", [userAuth], ReadCustomerById);
router.get("/get/:pageNo/:perPage/:searchKeyword", [userAuth], CustomerList);

module.exports = router;
