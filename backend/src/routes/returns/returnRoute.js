const router = require("express").Router();
const { userAuth } = require("../../middleware/authorise");
const {
  CreateReturnWithProduct,
  DeleteReturnWithProduct,
  ReturnList,
} = require("../../controller/returns/returnController");

router.post("/create", [userAuth], CreateReturnWithProduct);
router.delete("/delete/:id", [userAuth], DeleteReturnWithProduct);
router.get("/get/:pageNo/:perPage/:searchKeyword", [userAuth], ReturnList);

module.exports = router;
