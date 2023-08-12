const router = require("express").Router();
const { userAuth } = require("../../middleware/authorise");
const {
  CreateBrand,
  UpdateBrnad,
  ReadBrand,
  ReadBrandById,
  BrandList,
  DeleteBrand,
} = require("../../controller/brands/brandController");

router.post(
  "/create",
  [userAuth],

  CreateBrand
);
router.post(
  "/update/:id",
  [userAuth],

  UpdateBrnad
);
router.get("/get", [userAuth], ReadBrand);
router.get("/get/:id", [userAuth], ReadBrandById);
router.delete("/delete/:id", [userAuth], DeleteBrand);
router.get("/get/:pageNo/:perPage/:searchKeyword", [userAuth], BrandList);

module.exports = router;
